const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const scores = db.collection('daily_scores')

function getChinaDateKey() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date())
}

async function listScores(openid) {
  const date = getChinaDateKey()
  const { data } = await scores
    .where({ date })
    .orderBy('score', 'desc')
    .orderBy('updatedAt', 'asc')
    .limit(20)
    .get()

  return data.map(item => ({
    id: item._id,
    name: item.name,
    score: item.score,
    purchaseCount: item.purchaseCount,
    isCurrentUser: item.openid === openid
  }))
}

exports.main = async event => {
  const { OPENID } = cloud.getWXContext()
  const action = event && event.action

  if (action === 'list') {
    return { ok: true, records: await listScores(OPENID) }
  }

  if (action !== 'submit') {
    return { ok: false, message: 'Unsupported action' }
  }

  const score = Math.max(0, Math.min(1000000000000, Math.floor(Number(event.score) || 0)))
  const purchaseCount = Math.max(0, Math.min(1000000, Math.floor(Number(event.purchaseCount) || 0)))
  const name = String(event.name || '匿名玩家').trim().slice(0, 10) || '匿名玩家'
  const date = getChinaDateKey()
  const existing = await scores.where({ date, openid: OPENID }).limit(1).get()

  if (existing.data.length === 0) {
    await scores.add({
      data: {
        date,
        openid: OPENID,
        name,
        score,
        purchaseCount,
        updatedAt: db.serverDate()
      }
    })
  } else if (score > existing.data[0].score) {
    await scores.doc(existing.data[0]._id).update({
      data: {
        name,
        score,
        purchaseCount,
        updatedAt: db.serverDate()
      }
    })
  }

  return { ok: true, records: await listScores(OPENID) }
}
