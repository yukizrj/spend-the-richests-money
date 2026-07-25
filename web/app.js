const CONFIG = {
  initialWealth: 400_000_000_000,
  incomePerSecond: 5_400,
  durationSeconds: 45
}

const categories = [
  { id: 'daily', emoji: '🛍️', name: '日常消费', caption: '从一顿饭开始挥霍' },
  { id: 'digital', emoji: '🎮', name: '数码潮玩', caption: '从游戏机到人工智能实验室' },
  { id: 'mobility', emoji: '🏎️', name: '豪车出行', caption: '打造首富的移动车库' },
  { id: 'luxury', emoji: '💎', name: '奢华生活', caption: '钻石、豪宅和传世收藏' },
  { id: 'empire', emoji: '🏙️', name: '资产帝国', caption: '买下建筑、球队与娱乐公司' },
  { id: 'space', emoji: '🚀', name: '太空未来', caption: '把预算烧向月球和火星' }
]

const productDefinitions = [
  ['burger', 'daily', '🍔', '巨无霸汉堡', 5, '最朴素的亿万富翁消费', null],
  ['coffee', 'daily', '☕', '精品咖啡', 8, '请路过的人喝上一杯', null],
  ['movie', 'daily', '🎟️', '电影票', 15, '包下今晚的黄金场', null],
  ['dinner', 'daily', '🍽️', '米其林晚宴', 250, '今晚主厨只服务你', null],
  ['worldtour', 'daily', '🌍', '环球旅行', 25_000, '绕着地球奢游一圈', null],
  ['console', 'digital', '🎮', '游戏主机', 499, '把客厅变成游戏世界', null],
  ['phone', 'digital', '📱', '旗舰手机', 1_499, '送给今天遇到的每个人', null],
  ['gamingpc', 'digital', '🖥️', '顶配游戏电脑', 5_800, '所有配置全部拉满', null],
  ['robot', 'digital', '🤖', '人形机器人', 45_000, '组建一支机器人管家队', null],
  ['ailab', 'digital', '🧠', '人工智能实验室', 4_200_000_000, '训练下一个超级模型', 10],
  ['cybertruck', 'mobility', '🚙', 'Cybertruck 车队', 98_000_000, '一次买下一千辆', null],
  ['motorcycle', 'mobility', '🏍️', '顶级摩托车', 30_000, '感受首富的风与自由', null],
  ['supercar', 'mobility', '🏎️', '限量超跑', 320_000, '车库永远不嫌大', null],
  ['f1car', 'mobility', '🏁', 'F1 赛车', 15_000_000, '把赛道级速度开回家', null],
  ['privatejet', 'mobility', '✈️', '私人飞机', 65_000_000, '让机场按你的时间起飞', null],
  ['yacht', 'mobility', '🛥️', '超级游艇', 150_000_000, '把海洋变成私人后院', null],
  ['diamond', 'luxury', '💎', '巨型钻戒', 10_000, '一颗足够耀眼的石头', null],
  ['watch', 'luxury', '⌚', '传世名表', 15_000, '时间也需要奢华包装', null],
  ['villa', 'luxury', '🏡', '海景豪宅', 5_000_000, '每扇窗都能看见海', null],
  ['artwork', 'luxury', '🖼️', '世界名画', 780_000_000, '把博物馆镇馆之宝带回家', null],
  ['castle', 'luxury', '🏰', '欧洲古堡', 950_000_000, '连历史也一起买下来', null],
  ['club', 'empire', '⚽', '豪门足球俱乐部', 46_800_000_000, '球场、阵容全部拿下', 2],
  ['island', 'empire', '🏝️', '私人岛屿', 480_000_000, '带码头和私人机场', null],
  ['hospital', 'empire', '🏥', '现代医院', 300_000_000, '建一座顶级医疗中心', null],
  ['cruise', 'empire', '🚢', '豪华邮轮', 930_000_000, '一座漂在海上的城市', null],
  ['skyscraper', 'empire', '🏙️', '摩天大楼', 850_000_000, '把名字写进城市天际线', null],
  ['studio', 'empire', '🎬', '电影公司', 11_400_000_000, '拍一部火星史诗', 5],
  ['stadium', 'empire', '🏟️', '顶级体育场', 2_100_000_000, '今晚就冠名', 12],
  ['gamecompany', 'empire', '👾', '游戏公司', 8_600_000_000, '打造下一个全球爆款', 7],
  ['mars', 'space', '🪐', '火星殖民计划', 137_500_000_000, '把文明送上另一颗星球', 1],
  ['satellite', 'space', '🛰️', '卫星星座', 5_300_000_000, '把信号铺满天空', 8],
  ['moonbase', 'space', '🌕', '月球基地', 82_300_000_000, '建造人类首个月城', 1],
  ['rocket', 'space', '🚀', '重型火箭计划', 23_700_000_000, '包含十次完整发射', 3],
  ['spacestation', 'space', '🛸', '私人空间站', 35_500_000_000, '在轨道上拥有一套房', 2]
].map(([id, category, emoji, name, price, note, stockLimit]) => ({
  id, category, emoji, name, price, note, stockLimit
}))

const $ = selector => document.querySelector(selector)

const elements = {
  balance: $('#balance'),
  timeText: $('#timeText'),
  progressBar: $('#progressBar'),
  spentText: $('#spentText'),
  spentPercent: $('#spentPercent'),
  purchaseCount: $('#purchaseCount'),
  latestAction: $('#latestAction'),
  liveStatus: $('#liveStatus'),
  incomeChip: $('#incomeChip'),
  productGroups: $('#productGroups'),
  leaderboardRows: $('#leaderboardRows'),
  leaderboardScope: $('#leaderboardScope'),
  myRank: $('#myRank'),
  startDialog: $('#startDialog'),
  resultDialog: $('#resultDialog'),
  nicknameInput: $('#nicknameInput'),
  startButton: $('#startButton'),
  replayButton: $('#replayButton'),
  closeResultButton: $('#closeResultButton'),
  resultEmoji: $('#resultEmoji'),
  resultTitle: $('#resultTitle'),
  resultMessage: $('#resultMessage'),
  resultPercent: $('#resultPercent'),
  resultCount: $('#resultCount')
}

const state = {
  status: 'ready',
  balance: CONFIG.initialWealth,
  spent: 0,
  earned: 0,
  purchaseCount: 0,
  products: [],
  timer: null,
  startedAt: 0,
  lastTickAt: 0,
  runId: '',
  nickname: '',
  leaderboard: [],
  leaderboardMode: 'local'
}

function formatMoney(value) {
  const amount = Math.max(0, Math.floor(value))
  if (amount >= 100_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(2)}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`
  return `$${amount.toLocaleString('en-US')}`
}

function formatBalance(value) {
  return `$${Math.max(0, Math.floor(value)).toLocaleString('en-US')}`
}

function getPriceTier(price) {
  if (price < 100) return '零钱级'
  if (price < 10_000) return '日常级'
  if (price < 1_000_000) return '轻奢级'
  if (price < 100_000_000) return '豪华级'
  if (price < 1_000_000_000) return '亿万级'
  if (price < 10_000_000_000) return '集团级'
  if (price < 50_000_000_000) return '帝国级'
  return '星球级'
}

function createProducts() {
  return productDefinitions.map(product => ({ ...product, count: 0 }))
}

function getDateKey() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date())
}

function getPlayerId() {
  let id = localStorage.getItem('spendRichestPlayerId')
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem('spendRichestPlayerId', id)
  }
  return id
}

function defaultNickname() {
  return `玩家${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
}

function stockText(product) {
  if (product.stockLimit === null) return '不限量'
  const left = Math.max(0, product.stockLimit - product.count)
  return left === 0 ? '售罄' : `余 ${left}`
}

function isSoldOut(product) {
  return product.stockLimit !== null && product.count >= product.stockLimit
}

function isPlaying() {
  return state.status === 'playing'
}

function renderProducts() {
  elements.productGroups.innerHTML = categories.map(category => {
    const items = state.products.filter(product => product.category === category.id)
    return `
      <section class="category-group">
        <div class="category-head">
          <div class="category-icon">${category.emoji}</div>
          <div class="category-copy">
            <h3>${category.name}</h3>
            <p>${category.caption}</p>
          </div>
          <span class="category-count">${items.length} 项</span>
        </div>
        <div class="product-grid">
          ${items.map(product => {
            const soldOut = isSoldOut(product)
            const canBuy = isPlaying() && !soldOut && state.balance >= product.price
            return `
              <article class="product-card ${!canBuy && product.count === 0 ? 'unaffordable' : ''}" data-product="${product.id}">
                <div class="product-top">
                  <div class="product-emoji">${product.emoji}</div>
                  <div class="product-meta">
                    ${product.count ? `<span class="owned">×${product.count}</span>` : ''}
                    <span class="stock ${soldOut ? 'sold-out' : ''}">${stockText(product)}</span>
                  </div>
                </div>
                <h4>${product.name}</h4>
                <p class="product-note">${product.note}</p>
                <div class="product-bottom">
                  <div class="price">
                    <strong>${formatMoney(product.price)}</strong>
                    <small>${getPriceTier(product.price)}</small>
                  </div>
                  <div class="stepper">
                    <button class="step-button minus" data-action="sell" data-id="${product.id}" ${!isPlaying() || product.count <= 0 ? 'disabled' : ''} aria-label="撤销 ${product.name}">−</button>
                    <button class="step-button" data-action="buy" data-id="${product.id}" ${!canBuy ? 'disabled' : ''} aria-label="购买 ${product.name}">＋</button>
                  </div>
                </div>
              </article>
            `
          }).join('')}
        </div>
      </section>
    `
  }).join('')
}

function renderStats() {
  const totalWealth = CONFIG.initialWealth + state.earned
  const percent = totalWealth ? state.spent / totalWealth * 100 : 0
  elements.balance.textContent = formatBalance(state.balance)
  elements.spentText.textContent = formatMoney(state.spent)
  elements.spentPercent.textContent = `${percent.toFixed(2)}%`
  elements.purchaseCount.textContent = state.purchaseCount.toLocaleString('en-US')
}

function setAction(message) {
  elements.latestAction.textContent = message
}

function buyProduct(id) {
  if (!isPlaying()) return
  const product = state.products.find(item => item.id === id)
  if (!product || isSoldOut(product) || state.balance < product.price) return
  product.count += 1
  state.balance -= product.price
  state.spent += product.price
  state.purchaseCount += 1
  setAction(`买下「${product.name}」−${formatMoney(product.price)}`)
  renderStats()
  renderProducts()
}

function sellProduct(id) {
  if (!isPlaying()) return
  const product = state.products.find(item => item.id === id)
  if (!product || product.count <= 0) return
  product.count -= 1
  state.balance += product.price
  state.spent = Math.max(0, state.spent - product.price)
  state.purchaseCount = Math.max(0, state.purchaseCount - 1)
  setAction(`撤销「${product.name}」+${formatMoney(product.price)}`)
  renderStats()
  renderProducts()
}

function formatTime(seconds) {
  return `00:${String(Math.max(0, seconds)).padStart(2, '0')}`
}

function tick() {
  if (!isPlaying()) return
  const now = Date.now()
  const elapsed = now - state.startedAt
  const delta = now - state.lastTickAt
  state.lastTickAt = now
  state.balance += CONFIG.incomePerSecond * delta / 1000
  state.earned = CONFIG.incomePerSecond * elapsed / 1000
  const remainingMs = Math.max(0, CONFIG.durationSeconds * 1000 - elapsed)
  const seconds = Math.ceil(remainingMs / 1000)
  elements.timeText.textContent = formatTime(seconds)
  elements.progressBar.style.width = `${remainingMs / (CONFIG.durationSeconds * 1000) * 100}%`
  elements.incomeChip.classList.toggle('pulse', Math.floor(elapsed / 1000) % 2 === 0)
  renderStats()
  if (remainingMs <= 0) finishGame()
}

function startGame() {
  clearInterval(state.timer)
  state.nickname = elements.nicknameInput.value.trim().slice(0, 10) || defaultNickname()
  localStorage.setItem('spendRichestNickname', state.nickname)
  state.status = 'playing'
  state.balance = CONFIG.initialWealth
  state.spent = 0
  state.earned = 0
  state.purchaseCount = 0
  state.products = createProducts()
  state.startedAt = Date.now()
  state.lastTickAt = state.startedAt
  state.runId = `${state.startedAt}-${Math.random().toString(36).slice(2, 8)}`
  elements.timeText.textContent = '00:45'
  elements.progressBar.style.width = '100%'
  elements.liveStatus.classList.add('live')
  elements.liveStatus.querySelector('span').textContent = 'LIVE'
  setAction('挑战开始！所有商品均已开放。')
  renderStats()
  renderProducts()
  elements.startDialog.close()
  elements.resultDialog.close()
  state.timer = setInterval(tick, 100)
}

async function finishGame() {
  if (!isPlaying()) return
  clearInterval(state.timer)
  state.status = 'finished'
  elements.liveStatus.classList.remove('live')
  elements.liveStatus.querySelector('span').textContent = 'RANK'
  elements.timeText.textContent = '00:00'
  elements.progressBar.style.width = '0%'
  renderProducts()

  const score = Math.floor(state.spent)
  const record = {
    id: state.runId,
    playerId: getPlayerId(),
    name: state.nickname,
    score,
    purchaseCount: state.purchaseCount,
    time: Date.now()
  }

  const localRecords = saveLocalScore(record)
  let rank = localRecords.findIndex(item => item.id === record.id) + 1
  renderLeaderboard(localRecords, '浏览器本地今日榜', rank)

  elements.resultTitle.textContent = `本局花掉 ${formatMoney(score)}`
  elements.resultPercent.textContent = elements.spentPercent.textContent
  elements.resultCount.textContent = `${state.purchaseCount} 件`
  elements.resultEmoji.textContent = rank && rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : '🏁'
  elements.resultMessage.textContent = rank ? `暂列今日第 ${rank} 名，正在同步全站排行榜。` : '成绩已记录。'
  elements.resultDialog.showModal()

  const remote = await submitRemoteScore(record)
  if (remote) {
    rank = remote.records.findIndex(item => item.isCurrentUser) + 1
    renderLeaderboard(remote.records, 'Cloudflare 免费全站今日榜', rank)
    elements.resultEmoji.textContent = rank && rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : '🏁'
    elements.resultMessage.textContent = rank
      ? `共购买 ${state.purchaseCount} 件商品，暂列全站今日第 ${rank} 名。`
      : `共购买 ${state.purchaseCount} 件商品，成绩已进入全站榜。`
  }
}

function localKey() {
  return `spendRichestLeaderboard:${getDateKey()}`
}

function loadLocalScores() {
  try {
    const records = JSON.parse(localStorage.getItem(localKey()) || '[]')
    return Array.isArray(records) ? records : []
  } catch {
    return []
  }
}

function saveLocalScore(record) {
  const records = loadLocalScores()
    .concat(record)
    .sort((a, b) => b.score - a.score || a.time - b.time)
    .slice(0, 20)
  localStorage.setItem(localKey(), JSON.stringify(records))
  return records
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderLeaderboard(records, scope, currentRank = 0) {
  state.leaderboard = records
  elements.leaderboardScope.textContent = `${scope} · 按支出金额排名`
  elements.myRank.classList.toggle('hidden', !currentRank)
  elements.myRank.textContent = currentRank ? `我的 #${currentRank}` : ''
  elements.leaderboardRows.innerHTML = records.length
    ? records.map((record, index) => `
        <div class="rank-row">
          <span class="rank-number">${index + 1}</span>
          <span class="rank-name">${escapeHtml(record.name)}</span>
          <span class="rank-items">${Number(record.purchaseCount || 0).toLocaleString('en-US')} 件</span>
          <strong class="rank-score">${formatMoney(record.score)}</strong>
        </div>
      `).join('')
    : '<div class="rank-empty">今天还没有成绩，第一名等你来拿。</div>'
}

async function loadLeaderboard() {
  try {
    const response = await fetch('/api/leaderboard', { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error('Leaderboard unavailable')
    const payload = await response.json()
    if (!payload.ok || !Array.isArray(payload.records)) throw new Error('Invalid leaderboard')
    renderLeaderboard(payload.records, 'Cloudflare 免费全站今日榜')
    state.leaderboardMode = 'remote'
  } catch {
    renderLeaderboard(loadLocalScores(), '浏览器本地今日榜')
    state.leaderboardMode = 'local'
  }
}

async function submitRemoteScore(record) {
  try {
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(record)
    })
    if (!response.ok) return null
    const payload = await response.json()
    return payload.ok && Array.isArray(payload.records) ? payload : null
  } catch {
    return null
  }
}

elements.productGroups.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]')
  if (!button) return
  if (button.dataset.action === 'buy') buyProduct(button.dataset.id)
  if (button.dataset.action === 'sell') sellProduct(button.dataset.id)
})

elements.startButton.addEventListener('click', startGame)
elements.replayButton.addEventListener('click', startGame)
elements.closeResultButton.addEventListener('click', () => {
  elements.resultDialog.close()
  document.querySelector('.leaderboard').scrollIntoView({ behavior: 'smooth', block: 'start' })
})

elements.startDialog.addEventListener('cancel', event => event.preventDefault())

state.nickname = localStorage.getItem('spendRichestNickname') || defaultNickname()
elements.nicknameInput.value = state.nickname
state.products = createProducts()
renderProducts()
renderStats()
loadLeaderboard()
elements.startDialog.showModal()
