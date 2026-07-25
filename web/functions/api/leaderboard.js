const MAX_SCORE = 400_000_243_000
const MAX_PURCHASES = 1_000_000

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  })
}

function chinaDateKey() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date())
}

async function listScores(db, day, playerId = '') {
  const result = await db.prepare(`
    SELECT player_id, name, score, purchase_count
    FROM daily_scores
    WHERE day = ?
    ORDER BY score DESC, updated_at ASC
    LIMIT 20
  `).bind(day).all()

  return (result.results || []).map(item => ({
    id: `${day}:${item.player_id}`,
    name: item.name,
    score: item.score,
    purchaseCount: item.purchase_count,
    isCurrentUser: item.player_id === playerId
  }))
}

export async function onRequestGet({ env }) {
  if (!env.DB) {
    return json({ ok: false, message: 'D1 binding DB is not configured' }, 503)
  }
  const day = chinaDateKey()
  return json({ ok: true, day, records: await listScores(env.DB, day) })
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) {
    return json({ ok: false, message: 'D1 binding DB is not configured' }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, message: 'Invalid JSON body' }, 400)
  }

  const playerId = String(body.playerId || '').trim().slice(0, 80)
  const name = String(body.name || '匿名玩家').trim().slice(0, 10) || '匿名玩家'
  const score = Math.floor(Number(body.score))
  const purchaseCount = Math.floor(Number(body.purchaseCount))

  if (!playerId || !Number.isFinite(score) || score < 0 || score > MAX_SCORE) {
    return json({ ok: false, message: 'Invalid score' }, 400)
  }
  if (!Number.isFinite(purchaseCount) || purchaseCount < 0 || purchaseCount > MAX_PURCHASES) {
    return json({ ok: false, message: 'Invalid purchase count' }, 400)
  }

  const day = chinaDateKey()
  await env.DB.prepare(`
    INSERT INTO daily_scores (day, player_id, name, score, purchase_count, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(day, player_id) DO UPDATE SET
      name = excluded.name,
      score = excluded.score,
      purchase_count = excluded.purchase_count,
      updated_at = excluded.updated_at
    WHERE excluded.score > daily_scores.score
  `).bind(day, playerId, name, score, purchaseCount, Date.now()).run()

  return json({
    ok: true,
    day,
    records: await listScores(env.DB, day, playerId)
  })
}
