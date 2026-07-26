const { STRATEGIC_EVENT_RULES, STRATEGIC_EVENT_BANK } = require('../../web/decision-events')

const CHALLENGE = {
  initialWealth: 714200000000,
  // 依据 SpaceX IPO 单日账面增幅估算，仅作为游戏速度。
  incomePerSecond: 2180000,
  durationSeconds: 45
}

const PRODUCT_DEFINITIONS = [
  { id: 'burger', category: 'daily', emoji: '🍔', name: '巨无霸汉堡', price: 5, note: '最朴素的亿万富翁消费', stockLimit: null },
  { id: 'coffee', category: 'daily', emoji: '☕', name: '精品咖啡', price: 8, note: '请路过的人喝上一杯', stockLimit: null },
  { id: 'movie', category: 'daily', emoji: '🎟️', name: '电影票', price: 15, note: '包下今晚的黄金场', stockLimit: null },
  { id: 'dinner', category: 'daily', emoji: '🍽️', name: '米其林晚宴', price: 250, note: '今晚主厨只服务你', stockLimit: null },
  { id: 'worldtour', category: 'daily', emoji: '🌍', name: '环球旅行', price: 25000, note: '绕着地球奢游一圈', stockLimit: null },

  { id: 'console', category: 'digital', emoji: '🎮', name: '游戏主机', price: 499, note: '把客厅变成游戏世界', stockLimit: null },
  { id: 'phone', category: 'digital', emoji: '📱', name: '旗舰手机', price: 1499, note: '送给今天遇到的每个人', stockLimit: null },
  { id: 'vrheadset', category: 'digital', emoji: '🥽', name: '空间计算头显', price: 3499, note: '把桌面搬进眼前的空间', stockLimit: null },
  { id: 'gamingpc', category: 'digital', emoji: '🖥️', name: '顶配游戏电脑', price: 5800, note: '所有配置全部拉满', stockLimit: null },
  { id: 'robot', category: 'digital', emoji: '🤖', name: '人形机器人', price: 45000, note: '组建一支机器人管家队', stockLimit: null },
  { id: 'ailab', category: 'digital', emoji: '🧠', name: '人工智能实验室', price: 4200000000, note: '训练下一个超级模型', stockLimit: 10 },
  { id: 'aidatacenter', category: 'digital', emoji: '🗄️', name: 'AI 算力中心', price: 7000000000, note: '装满服务器与顶级加速芯片', stockLimit: 6 },

  { id: 'cybertruck', category: 'mobility', emoji: '🚙', name: 'Cybertruck 车队', price: 98000000, note: '一次买下一千辆', stockLimit: null },
  { id: 'motorcycle', category: 'mobility', emoji: '🏍️', name: '顶级摩托车', price: 30000, note: '感受首富的风与自由', stockLimit: null },
  { id: 'electriccar', category: 'mobility', emoji: '🚘', name: '高性能电动轿车', price: 95000, note: '日常通勤也要零百加速', stockLimit: null },
  { id: 'supercar', category: 'mobility', emoji: '🏎️', name: '限量超跑', price: 320000, note: '车库永远不嫌大', stockLimit: null },
  { id: 'f1car', category: 'mobility', emoji: '🏁', name: 'F1 赛车', price: 15000000, note: '把赛道级速度开回家', stockLimit: null },
  { id: 'privatejet', category: 'mobility', emoji: '✈️', name: '私人飞机', price: 65000000, note: '让机场按你的时间起飞', stockLimit: null },
  { id: 'yacht', category: 'mobility', emoji: '🛥️', name: '超级游艇', price: 150000000, note: '把海洋变成私人后院', stockLimit: null },
  { id: 'airliner', category: 'mobility', emoji: '🛫', name: '远程宽体客机', price: 250000000, note: '连头等舱和航线一起承包', stockLimit: null },

  { id: 'diamond', category: 'luxury', emoji: '💎', name: '巨型钻戒', price: 10000, note: '一颗足够耀眼的石头', stockLimit: null },
  { id: 'watch', category: 'luxury', emoji: '⌚', name: '传世名表', price: 15000, note: '时间也需要奢华包装', stockLimit: null },
  { id: 'villa', category: 'luxury', emoji: '🏡', name: '海景豪宅', price: 5000000, note: '每扇窗都能看见海', stockLimit: null },
  { id: 'rarediamond', category: 'luxury', emoji: '🔷', name: '稀世彩钻', price: 50000000, note: '拍卖场压轴登场的收藏级宝石', stockLimit: 3 },
  { id: 'club', category: 'empire', emoji: '⚽', name: '豪门足球俱乐部', price: 46800000000, note: '球场、阵容全部拿下', stockLimit: 2 },
  { id: 'island', category: 'empire', emoji: '🏝️', name: '私人岛屿', price: 480000000, note: '带码头和私人机场', stockLimit: null },
  { id: 'artwork', category: 'luxury', emoji: '🖼️', name: '世界名画', price: 780000000, note: '把博物馆镇馆之宝带回家', stockLimit: null },
  { id: 'castle', category: 'luxury', emoji: '🏰', name: '欧洲古堡', price: 950000000, note: '连历史也一起买下来', stockLimit: null },

  { id: 'hospital', category: 'empire', emoji: '🏥', name: '现代医院', price: 300000000, note: '建一座顶级医疗中心', stockLimit: null },
  { id: 'luxuryhotel', category: 'empire', emoji: '🏨', name: '五星级酒店', price: 600000000, note: '从大堂到顶层套房全部买下', stockLimit: null },
  { id: 'cruise', category: 'empire', emoji: '🚢', name: '豪华邮轮', price: 930000000, note: '一座漂在海上的城市', stockLimit: null },
  { id: 'skyscraper', category: 'empire', emoji: '🏙️', name: '摩天大楼', price: 850000000, note: '把名字写进城市天际线', stockLimit: null },
  { id: 'studio', category: 'empire', emoji: '🎬', name: '电影公司', price: 11400000000, note: '拍一部火星史诗', stockLimit: 5 },
  { id: 'stadium', category: 'empire', emoji: '🏟️', name: '顶级体育场', price: 2100000000, note: '今晚就冠名', stockLimit: 12 },
  { id: 'basketballteam', category: 'empire', emoji: '🏀', name: '职业篮球队', price: 7000000000, note: '球星、主场与冠军梦想打包收购', stockLimit: 4 },
  { id: 'gamecompany', category: 'empire', emoji: '👾', name: '游戏公司', price: 8600000000, note: '打造下一个全球爆款', stockLimit: 7 },

  { id: 'orbitalflight', category: 'space', emoji: '👨‍🚀', name: '载人绕轨旅行', price: 55000000, note: '买一张真正飞出地球的船票', stockLimit: 6 },
  { id: 'mars', category: 'space', emoji: '🪐', name: '火星殖民计划', price: 137500000000, note: '把文明送上另一颗星球', stockLimit: 1 },
  { id: 'satellite', category: 'space', emoji: '🛰️', name: '卫星星座', price: 5300000000, note: '把信号铺满天空', stockLimit: 8 },
  { id: 'moonbase', category: 'space', emoji: '🌕', name: '月球基地', price: 82300000000, note: '建造人类首个月城', stockLimit: 1 },
  { id: 'rocket', category: 'space', emoji: '🚀', name: '重型火箭计划', price: 23700000000, note: '包含十次完整发射', stockLimit: 3 },
  { id: 'spacestation', category: 'space', emoji: '🛸', name: '私人空间站', price: 35500000000, note: '在轨道上拥有一套房', stockLimit: 2 }
]

const PRODUCT_CATEGORIES = [
  { id: 'daily', emoji: '🛍️', name: '日常消费', caption: '从一顿饭开始挥霍' },
  { id: 'digital', emoji: '🎮', name: '数码潮玩', caption: '从头显到人工智能算力中心' },
  { id: 'mobility', emoji: '🏎️', name: '豪车出行', caption: '从电动车到远程宽体客机' },
  { id: 'luxury', emoji: '💎', name: '奢华生活', caption: '钻石、豪宅和传世收藏' },
  { id: 'empire', emoji: '🏙️', name: '资产帝国', caption: '买下建筑、球队与娱乐公司' },
  { id: 'space', emoji: '🚀', name: '太空未来', caption: '把预算烧向月球和火星' }
]

function formatMoney(value) {
  const amount = Math.max(0, Math.floor(value))
  if (amount >= 100000000000) return `$${(amount / 1000000000).toFixed(1)}B`
  if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(2)}B`
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`
  return `$${amount.toLocaleString('en-US')}`
}

function formatBalance(value) {
  return `$${Math.max(0, Math.floor(value)).toLocaleString('en-US')}`
}

function getPriceTier(price) {
  if (price < 100) return '零钱级'
  if (price < 10000) return '日常级'
  if (price < 1000000) return '轻奢级'
  if (price < 100000000) return '豪华级'
  if (price < 1000000000) return '亿万级'
  if (price < 10000000000) return '集团级'
  if (price < 50000000000) return '帝国级'
  return '星球级'
}

function createProducts(balance = CHALLENGE.initialWealth) {
  return PRODUCT_DEFINITIONS.map(item => ({
    ...item,
    count: 0,
    priceText: formatMoney(item.price),
    tierText: getPriceTier(item.price),
    canBuy: balance >= item.price,
    isSoldOut: false,
    stockLeft: item.stockLimit,
    stockText: item.stockLimit === null ? '不限量' : `余 ${item.stockLimit}`
  }))
}

function updateProducts(products, balance) {
  return products.map(item => {
    const isSoldOut = item.stockLimit !== null && item.count >= item.stockLimit
    const stockLeft = item.stockLimit === null ? null : item.stockLimit - item.count
    return {
      ...item,
      isSoldOut,
      stockLeft,
      stockText: item.stockLimit === null ? '不限量' : (isSoldOut ? '售罄' : `余 ${stockLeft}`),
      canBuy: !isSoldOut && balance >= item.price
    }
  })
}

function groupProducts(products) {
  return PRODUCT_CATEGORIES.map(category => ({
    ...category,
    items: products.filter(item => item.category === category.id)
  }))
}

function getDateKey() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDefaultNickname() {
  return `玩家${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
}

Page({
  data: {
    status: 'ready',
    balance: CHALLENGE.initialWealth,
    balanceText: formatBalance(CHALLENGE.initialWealth),
    incomeText: formatMoney(CHALLENGE.incomePerSecond),
    durationSeconds: CHALLENGE.durationSeconds,
    timeLeft: CHALLENGE.durationSeconds,
    timeText: '00:45',
    progress: 100,
    spent: 0,
    spentText: '$0',
    spentPercent: '0.00',
    earned: 0,
    earnedText: '$0',
    purchaseCount: 0,
    products: createProducts(),
    productGroups: groupProducts(createProducts()),
    latestAction: '限时内尽可能多花钱，金额越高，排名越靠前。',
    pulseIncome: false,
    nickname: '',
    leaderboard: [],
    leaderboardScope: '本机今日榜',
    currentRank: 0,
    showCompactStatus: false,
    showDecision: false,
    decisionPhase: 'question',
    decisionAssetName: '',
    decisionPrompt: '',
    decisionOptions: [],
    decisionChoice: '',
    decisionResultTitle: '',
    decisionResultMessage: '',
    decisionDeltaText: '',
    decisionPositive: false,
    showResult: false,
    resultTitle: '',
    resultMessage: '',
    resultEmoji: '🏁'
  },

  onLoad() {
    const nickname = wx.getStorageSync('spendMuskNickname') || getDefaultNickname()
    this.setData({
      nickname,
      leaderboard: this.loadLocalLeaderboard()
    })
    this.tryLoadCloudLeaderboard()
  },

  onUnload() {
    this.clearGameTimer()
  },

  onPageScroll(event) {
    const showCompactStatus = this.data.status === 'playing' && event.scrollTop > 320
    if (showCompactStatus !== this.data.showCompactStatus) {
      this.setData({ showCompactStatus })
    }
  },

  onNicknameInput(event) {
    this.setData({ nickname: event.detail.value.trimStart() })
  },

  startChallenge() {
    this.clearGameTimer()
    const nickname = this.data.nickname.trim() || getDefaultNickname()
    const products = createProducts()
    wx.setStorageSync('spendMuskNickname', nickname)

    this.startedAt = Date.now()
    this.lastTickAt = this.startedAt
    this.runId = `${this.startedAt}-${Math.random().toString(36).slice(2, 8)}`
    this.decisionSeenAssets = new Set()
    this.decisionMisses = 0
    this.decisionCount = 0
    this.currentDecision = null

    this.setData({
      status: 'playing',
      nickname,
      balance: CHALLENGE.initialWealth,
      balanceText: formatBalance(CHALLENGE.initialWealth),
      timeLeft: CHALLENGE.durationSeconds,
      timeText: this.formatTime(CHALLENGE.durationSeconds),
      progress: 100,
      spent: 0,
      spentText: '$0',
      spentPercent: '0.00',
      earned: 0,
      earnedText: '$0',
      purchaseCount: 0,
      products,
      productGroups: groupProducts(products),
      showCompactStatus: false,
      showDecision: false,
      decisionPhase: 'question',
      showResult: false,
      currentRank: 0,
      latestAction: '挑战开始！所有商品均已开放。'
    })

    this.gameTimer = setInterval(() => this.tick(), 100)
  },

  tick() {
    if (this.data.status !== 'playing' || this.data.showDecision) return

    const now = Date.now()
    const elapsedMs = now - this.startedAt
    const deltaMs = now - this.lastTickAt
    this.lastTickAt = now

    const nextBalance = this.data.balance + CHALLENGE.incomePerSecond * deltaMs / 1000
    const earned = CHALLENGE.incomePerSecond * elapsedMs / 1000
    const remainingMs = Math.max(0, CHALLENGE.durationSeconds * 1000 - elapsedMs)
    const timeLeft = Math.ceil(remainingMs / 1000)

    const products = updateProducts(this.data.products, nextBalance)
    this.setData({
      balance: nextBalance,
      balanceText: formatBalance(nextBalance),
      earned,
      earnedText: formatMoney(earned),
      timeLeft,
      timeText: this.formatTime(timeLeft),
      progress: remainingMs / (CHALLENGE.durationSeconds * 1000) * 100,
      products,
      productGroups: groupProducts(products),
      pulseIncome: Math.floor(elapsedMs / 1000) % 2 === 0
    })

    if (remainingMs <= 0) this.finishChallenge(nextBalance)
  },

  buyItem(event) {
    if (this.data.status !== 'playing' || this.data.showDecision) return

    const id = event.currentTarget.dataset.id
    const index = this.data.products.findIndex(item => item.id === id)
    if (index < 0) return

    const product = this.data.products[index]
    if (product.isSoldOut) {
      wx.showToast({ title: '该商品已售罄', icon: 'none' })
      return
    }
    if (this.data.balance < product.price) {
      wx.showToast({ title: '余额不够了', icon: 'none' })
      return
    }

    const balance = this.data.balance - product.price
    const spent = this.data.spent + product.price
    const changedProducts = this.data.products.map((item, itemIndex) => itemIndex === index
      ? { ...item, count: item.count + 1 }
      : item
    )

    const products = updateProducts(changedProducts, balance)
    this.setData({
      balance,
      balanceText: formatBalance(balance),
      spent,
      spentText: formatMoney(spent),
      spentPercent: (spent / (CHALLENGE.initialWealth + this.data.earned) * 100).toFixed(2),
      purchaseCount: this.data.purchaseCount + 1,
      products,
      productGroups: groupProducts(products),
      latestAction: `买下「${product.name}」−${product.priceText}`
    }, () => {
      if (product.count === 0) this.maybeOpenDecision(product)
    })

    wx.vibrateShort({ type: 'light' })
  },

  sellItem(event) {
    if (this.data.status !== 'playing' || this.data.showDecision) return

    const id = event.currentTarget.dataset.id
    const index = this.data.products.findIndex(item => item.id === id)
    if (index < 0 || this.data.products[index].count <= 0) return

    const product = this.data.products[index]
    const balance = this.data.balance + product.price
    const spent = Math.max(0, this.data.spent - product.price)
    const changedProducts = this.data.products.map((item, itemIndex) => itemIndex === index
      ? { ...item, count: item.count - 1 }
      : item
    )

    const products = updateProducts(changedProducts, balance)
    this.setData({
      balance,
      balanceText: formatBalance(balance),
      spent,
      spentText: formatMoney(spent),
      spentPercent: (spent / (CHALLENGE.initialWealth + this.data.earned) * 100).toFixed(2),
      purchaseCount: Math.max(0, this.data.purchaseCount - 1),
      products,
      productGroups: groupProducts(products),
      latestAction: `撤销「${product.name}」+${product.priceText}`
    })
  },

  maybeOpenDecision(product) {
    const events = STRATEGIC_EVENT_BANK[product.id]
    if (!events || this.decisionSeenAssets.has(product.id)) return

    this.decisionSeenAssets.add(product.id)
    if (this.decisionCount >= STRATEGIC_EVENT_RULES.maxEventsPerRun) return

    const chance = Math.min(
      0.75,
      STRATEGIC_EVENT_RULES.baseChance + this.decisionMisses * STRATEGIC_EVENT_RULES.chanceStep
    )
    const shouldTrigger = this.decisionMisses >= STRATEGIC_EVENT_RULES.pityAfterMisses
      || Math.random() < chance

    if (!shouldTrigger) {
      this.decisionMisses += 1
      return
    }

    const decisionEvent = events[Math.floor(Math.random() * events.length)]
    this.decisionMisses = 0
    this.decisionCount += 1
    this.decisionStartedAt = Date.now()
    this.currentDecision = { product, event: decisionEvent }
    this.setData({
      showDecision: true,
      decisionPhase: 'question',
      decisionAssetName: product.name,
      decisionPrompt: decisionEvent.prompt,
      decisionOptions: decisionEvent.options.map(option => option.label),
      decisionChoice: '',
      decisionResultTitle: '',
      decisionResultMessage: '',
      decisionDeltaText: '',
      decisionPositive: false
    })
  },

  chooseDecision(event) {
    if (!this.data.showDecision || this.data.decisionPhase !== 'question' || !this.currentDecision) return

    const optionIndex = Number(event.currentTarget.dataset.index)
    const option = this.currentDecision.event.options[optionIndex]
    if (!option) return

    const outcome = option.outcomes[Math.floor(Math.random() * option.outcomes.length)]
    const rawDelta = Math.round(this.currentDecision.product.price * outcome.ratio)
    const delta = rawDelta < 0 ? Math.max(rawDelta, -this.data.balance) : rawDelta
    const balance = Math.max(0, this.data.balance + delta)
    const products = updateProducts(this.data.products, balance)
    const positive = delta >= 0
    const deltaText = `${positive ? '+' : '−'}${formatMoney(Math.abs(delta))}`

    this.setData({
      balance,
      balanceText: formatBalance(balance),
      products,
      productGroups: groupProducts(products),
      decisionPhase: 'result',
      decisionChoice: option.label,
      decisionResultTitle: positive ? '项目传来好消息' : '项目出现额外损失',
      decisionResultMessage: outcome.message,
      decisionDeltaText: deltaText,
      decisionPositive: positive,
      latestAction: `${this.currentDecision.product.name}事件结算 ${deltaText}`
    })
  },

  continueAfterDecision() {
    if (!this.data.showDecision || this.data.decisionPhase !== 'result') return

    const now = Date.now()
    const pausedMs = Math.max(0, now - this.decisionStartedAt)
    this.startedAt += pausedMs
    this.lastTickAt = now
    this.currentDecision = null
    this.setData({
      showDecision: false,
      decisionPhase: 'question'
    })
  },

  finishChallenge(finalBalance) {
    if (this.data.status !== 'playing') return
    this.clearGameTimer()

    const record = {
      id: this.runId,
      name: this.data.nickname,
      score: Math.floor(this.data.spent),
      scoreText: formatMoney(this.data.spent),
      purchaseCount: this.data.purchaseCount,
      time: Date.now()
    }
    const leaderboard = this.saveLocalScore(record)
    const currentRank = leaderboard.findIndex(item => item.id === record.id) + 1

    this.setData({
      status: 'finished',
      balance: finalBalance,
      balanceText: formatBalance(finalBalance),
      timeLeft: 0,
      timeText: '00:00',
      progress: 0,
      showCompactStatus: false,
      showDecision: false,
      leaderboard,
      currentRank,
      showResult: true,
      resultEmoji: currentRank > 0 && currentRank <= 3 ? ['🥇', '🥈', '🥉'][currentRank - 1] : '🏁',
      resultTitle: `本局花掉 ${formatMoney(this.data.spent)}`,
      resultMessage: currentRank > 0
        ? `共购买 ${this.data.purchaseCount} 件商品，暂列今日第 ${currentRank} 名。`
        : `共购买 ${this.data.purchaseCount} 件商品，成绩已记录。`
    })

    this.submitCloudScore(record)
  },

  replay() {
    this.startChallenge()
  },

  closeResult() {
    this.setData({ showResult: false })
  },

  loadLocalLeaderboard() {
    const key = `spendMuskLeaderboard:${getDateKey()}`
    const records = wx.getStorageSync(key)
    return Array.isArray(records) ? records : []
  },

  saveLocalScore(record) {
    const key = `spendMuskLeaderboard:${getDateKey()}`
    const records = this.loadLocalLeaderboard()
      .concat(record)
      .sort((a, b) => b.score - a.score || a.time - b.time)
      .slice(0, 20)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
        scoreText: formatMoney(item.score)
      }))
    wx.setStorageSync(key, records)
    return records
  },

  tryLoadCloudLeaderboard() {
    if (!wx.cloud || !wx.cloud.callFunction) return
    try {
      wx.cloud.init({ traceUser: true })
      wx.cloud.callFunction({
        name: 'leaderboard',
        data: { action: 'list' }
      }).then(({ result }) => {
        if (result && result.ok && Array.isArray(result.records)) {
          this.setData({
            leaderboard: result.records.map((item, index) => ({
              ...item,
              rank: index + 1,
              scoreText: formatMoney(item.score)
            })),
            leaderboardScope: '全服今日榜'
          })
        }
      }).catch(() => {})
    } catch (error) {
      // 未启用云开发时继续使用本机排行榜。
    }
  },

  submitCloudScore(record) {
    if (!wx.cloud || !wx.cloud.callFunction) return
    wx.cloud.callFunction({
      name: 'leaderboard',
      data: {
        action: 'submit',
        name: record.name,
        score: record.score,
        purchaseCount: record.purchaseCount
      }
    }).then(({ result }) => {
      if (!result || !result.ok || !Array.isArray(result.records)) return
      const leaderboard = result.records.map((item, index) => ({
        ...item,
        rank: index + 1,
        scoreText: formatMoney(item.score)
      }))
      const currentRank = leaderboard.findIndex(item => item.isCurrentUser) + 1
      this.setData({
        leaderboard,
        leaderboardScope: '全服今日榜',
        currentRank: currentRank || this.data.currentRank,
        resultMessage: currentRank
          ? `共购买 ${record.purchaseCount} 件商品，暂列全服今日第 ${currentRank} 名。`
          : this.data.resultMessage
      })
    }).catch(() => {})
  },

  clearGameTimer() {
    if (this.gameTimer) {
      clearInterval(this.gameTimer)
      this.gameTimer = null
    }
  },

  formatTime(seconds) {
    const safeSeconds = Math.max(0, seconds)
    const minute = Math.floor(safeSeconds / 60)
    const second = safeSeconds % 60
    return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
  }
})
