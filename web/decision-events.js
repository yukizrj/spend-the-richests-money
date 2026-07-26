const STRATEGIC_EVENT_RULES = {
  baseChance: 0.25,
  chanceStep: 0.1,
  pityAfterMisses: 3,
  maxEventsPerRun: 3
}

const STRATEGIC_EVENT_BANK = {
  aidatacenter: [
    {
      prompt: '首批加速芯片交付延期，算力中心的建设计划需要调整。',
      options: [
        {
          label: '改用另一家芯片供应商',
          outcomes: [
            { ratio: 0.16, message: '新供应商提前交货，额外算力订单迅速排满。' },
            { ratio: -0.11, message: '兼容调试比预期复杂，机房被迫延期启用。' }
          ]
        },
        {
          label: '等待原供应商完成交付',
          outcomes: [
            { ratio: 0.1, message: '新一代芯片如期到货，单位算力成本明显下降。' },
            { ratio: -0.08, message: '交付再次推迟，预售客户要求项目赔偿。' }
          ]
        }
      ]
    },
    {
      prompt: '当地电网无法立即满足满负荷运行需求。',
      options: [
        {
          label: '签订长期清洁能源协议',
          outcomes: [
            { ratio: 0.13, message: '长期电价锁定成功，运营成本低于同行。' },
            { ratio: -0.09, message: '配套输电工程超支，首期成本快速上升。' }
          ]
        },
        {
          label: '自建独立能源系统',
          outcomes: [
            { ratio: 0.2, message: '独立能源系统稳定运行，并开始对外售电。' },
            { ratio: -0.15, message: '储能系统出现故障，扩建计划全面延后。' }
          ]
        }
      ]
    },
    {
      prompt: '一家热门模型公司希望锁定中心未来三年的大部分算力。',
      options: [
        {
          label: '接受长期独家合作',
          outcomes: [
            { ratio: 0.14, message: '合作方模型爆红，长期合同价值随之提升。' },
            { ratio: -0.1, message: '合作方产品遇冷，大量预留算力长期闲置。' }
          ]
        },
        {
          label: '保留算力公开竞价',
          outcomes: [
            { ratio: 0.18, message: '市场需求激增，公开算力价格持续上涨。' },
            { ratio: -0.07, message: '需求短暂降温，机房利用率低于预期。' }
          ]
        }
      ]
    }
  ],
  luxuryhotel: [
    {
      prompt: '酒店翻修时发现一层未被记录的历史建筑结构。',
      options: [
        {
          label: '保留结构并改造成特色套房',
          outcomes: [
            { ratio: 0.17, message: '特色套房成为城市新地标，预订排到明年。' },
            { ratio: -0.1, message: '保护工程反复修改，翻修预算不断增加。' }
          ]
        },
        {
          label: '调整设计并绕开原有结构',
          outcomes: [
            { ratio: 0.09, message: '新方案快速通过审批，酒店提前恢复营业。' },
            { ratio: -0.08, message: '施工路线变得复杂，客房面积被迫缩水。' }
          ]
        }
      ]
    },
    {
      prompt: '一场国际盛典希望临时包下酒店全部客房。',
      options: [
        {
          label: '接受整店包场',
          outcomes: [
            { ratio: 0.15, message: '盛典全球直播，酒店品牌价值大幅提升。' },
            { ratio: -0.07, message: '活动临时取消，原有客人也已全部退订。' }
          ]
        },
        {
          label: '保留原有住客安排',
          outcomes: [
            { ratio: 0.08, message: '稳定服务赢得口碑，会员续订率创下新高。' },
            { ratio: -0.06, message: '酒店错过曝光机会，旺季入住率不及同行。' }
          ]
        }
      ]
    },
    {
      prompt: '酒店所在海湾即将启动新的滨海开发计划。',
      options: [
        {
          label: '参与开发公共滨海区域',
          outcomes: [
            { ratio: 0.19, message: '新海滨成为热门目的地，周边资产同步升值。' },
            { ratio: -0.12, message: '开发审批停滞，前期投入长期无法回收。' }
          ]
        },
        {
          label: '专注升级酒店内部设施',
          outcomes: [
            { ratio: 0.11, message: '全新康体中心带来稳定的高端客群。' },
            { ratio: -0.08, message: '升级期间噪音不断，酒店收到大量退款申请。' }
          ]
        }
      ]
    }
  ],
  studio: [
    {
      prompt: '年度大片开拍前，导演提出彻底重写结局。',
      options: [
        {
          label: '按新结局重新筹备',
          outcomes: [
            { ratio: 0.21, message: '新结局引发热议，影片票房远超预期。' },
            { ratio: -0.14, message: '补拍规模失控，制作周期延长了半年。' }
          ]
        },
        {
          label: '保留已经完成的剧本',
          outcomes: [
            { ratio: 0.1, message: '制作顺利收尾，影片按时抢占黄金档期。' },
            { ratio: -0.09, message: '试映反响平淡，宣传费用被迫继续增加。' }
          ]
        }
      ]
    },
    {
      prompt: '两部重点影片都希望获得同一个暑期档首映日期。',
      options: [
        {
          label: '优先上映科幻大片',
          outcomes: [
            { ratio: 0.18, message: '科幻大片成为年度现象级作品。' },
            { ratio: -0.12, message: '同档竞争激烈，巨额宣发没有换来票房。' }
          ]
        },
        {
          label: '优先上映喜剧新片',
          outcomes: [
            { ratio: 0.14, message: '喜剧口碑发酵，以小博大拿下票房冠军。' },
            { ratio: -0.08, message: '观众反响分化，院线迅速减少排片。' }
          ]
        }
      ]
    },
    {
      prompt: '视效团队建议为新片采用一套尚未大规模使用的制作技术。',
      options: [
        {
          label: '让整部影片采用新技术',
          outcomes: [
            { ratio: 0.2, message: '制作技术成为行业标准，并带来授权收入。' },
            { ratio: -0.16, message: '渲染系统频繁崩溃，影片不得不延期。' }
          ]
        },
        {
          label: '只在关键场景中试用',
          outcomes: [
            { ratio: 0.09, message: '关键场景广受好评，制作成本也保持稳定。' },
            { ratio: -0.06, message: '两套制作流程互不兼容，返工量持续增加。' }
          ]
        }
      ]
    }
  ],
  gamecompany: [
    {
      prompt: '新游戏上线前，测试玩家对两种核心玩法评价相当。',
      options: [
        {
          label: '主推开放世界探索',
          outcomes: [
            { ratio: 0.2, message: '探索玩法引发直播热潮，首月销量刷新纪录。' },
            { ratio: -0.13, message: '庞大地图内容不足，玩家评分迅速下滑。' }
          ]
        },
        {
          label: '主推多人竞技模式',
          outcomes: [
            { ratio: 0.18, message: '竞技赛事快速走红，赞助商纷纷加入。' },
            { ratio: -0.11, message: '匹配系统问题频发，大量玩家选择退款。' }
          ]
        }
      ]
    },
    {
      prompt: '运营团队需要确定新赛季内容的发布方式。',
      options: [
        {
          label: '一次性开放全部内容',
          outcomes: [
            { ratio: 0.12, message: '丰富内容带回大量老玩家，销量再次增长。' },
            { ratio: -0.09, message: '玩家迅速消耗完内容，活跃度很快回落。' }
          ]
        },
        {
          label: '分阶段更新赛季内容',
          outcomes: [
            { ratio: 0.16, message: '连续更新保持热度，社区规模稳步扩大。' },
            { ratio: -0.1, message: '首阶段内容过少，玩家没有等到后续更新。' }
          ]
        }
      ]
    },
    {
      prompt: '游戏发布当晚，服务器同时涌入远超预期的玩家。',
      options: [
        {
          label: '立即扩充云端服务器',
          outcomes: [
            { ratio: 0.15, message: '服务器稳定承接流量，游戏登上全球榜首。' },
            { ratio: -0.08, message: '热度迅速回落，闲置算力产生高额账单。' }
          ]
        },
        {
          label: '启用排队并逐步扩容',
          outcomes: [
            { ratio: 0.1, message: '排队系统运行平稳，扩容成本得到控制。' },
            { ratio: -0.12, message: '等待时间过长，玩家在社交平台集中差评。' }
          ]
        }
      ]
    }
  ],
  basketballteam: [
    {
      prompt: '球队有机会签下一位合同即将到期的明星球员。',
      options: [
        {
          label: '围绕明星球员重组阵容',
          outcomes: [
            { ratio: 0.19, message: '新阵容一路打进总决赛，球队估值快速上涨。' },
            { ratio: -0.14, message: '阵容磨合失败，高薪合同锁死后续操作空间。' }
          ]
        },
        {
          label: '保留现有年轻阵容',
          outcomes: [
            { ratio: 0.13, message: '年轻球员集体成长，球队成为赛季黑马。' },
            { ratio: -0.09, message: '核心球员状态下滑，球队连续无缘季后赛。' }
          ]
        }
      ]
    },
    {
      prompt: '主场冠名合同到期，两家公司给出了不同合作方案。',
      options: [
        {
          label: '选择全球消费品牌',
          outcomes: [
            { ratio: 0.14, message: '全球营销计划落地，球队海外收入增长。' },
            { ratio: -0.08, message: '合作品牌陷入争议，冠名合同提前终止。' }
          ]
        },
        {
          label: '选择本地科技公司',
          outcomes: [
            { ratio: 0.17, message: '科技体验馆吸引观众，主场上座率创新高。' },
            { ratio: -0.11, message: '合作公司资金紧张，赞助款迟迟没有到账。' }
          ]
        }
      ]
    },
    {
      prompt: '球队需要在赛季中途确定接下来的执教方案。',
      options: [
        {
          label: '邀请冠军教练接手',
          outcomes: [
            { ratio: 0.18, message: '战术调整立刻奏效，球队开启连胜。' },
            { ratio: -0.12, message: '新体系与球员冲突，更衣室气氛持续恶化。' }
          ]
        },
        {
          label: '让助理教练带队完成赛季',
          outcomes: [
            { ratio: 0.11, message: '熟悉球队的助教稳定局面并获得球员支持。' },
            { ratio: -0.08, message: '临场经验不足，关键比赛连续失利。' }
          ]
        }
      ]
    }
  ],
  satellite: [
    {
      prompt: '卫星发射前出现两个可用窗口。',
      options: [
        {
          label: '使用本周的首个窗口',
          outcomes: [
            { ratio: 0.16, message: '天气短暂转好，卫星全部进入预定轨道。' },
            { ratio: -0.13, message: '高空风向突变，发射中止并更换部分组件。' }
          ]
        },
        {
          label: '等待下个月的新窗口',
          outcomes: [
            { ratio: 0.11, message: '等待期间完成软件升级，组网效率明显提高。' },
            { ratio: -0.09, message: '延期触发客户违约条款，订单收入减少。' }
          ]
        }
      ]
    },
    {
      prompt: '星座需要在两处候选地点建设新的地面站。',
      options: [
        {
          label: '建设在沿海数据枢纽',
          outcomes: [
            { ratio: 0.14, message: '地面站接入主干网络，商业客户快速增加。' },
            { ratio: -0.1, message: '海岸天气影响设备，维护成本不断升高。' }
          ]
        },
        {
          label: '建设在高原观测基地',
          outcomes: [
            { ratio: 0.18, message: '信号质量超出预期，星座获得科研大单。' },
            { ratio: -0.12, message: '偏远施工难度过高，设备运输严重超支。' }
          ]
        }
      ]
    },
    {
      prompt: '轨道监测系统发现一片正在接近的太空碎片。',
      options: [
        {
          label: '提前调整整组卫星轨道',
          outcomes: [
            { ratio: 0.12, message: '轨道调整顺利完成，系统可靠性赢得新合同。' },
            { ratio: -0.09, message: '额外燃料消耗缩短了部分卫星的使用寿命。' }
          ]
        },
        {
          label: '仅调整受到影响的卫星',
          outcomes: [
            { ratio: 0.15, message: '精准避让成功，星座服务没有中断。' },
            { ratio: -0.14, message: '碎片轨迹再次变化，多颗卫星被迫离线。' }
          ]
        }
      ]
    }
  ],
  rocket: [
    {
      prompt: '新发动机在地面测试中出现一组异常数据。',
      options: [
        {
          label: '拆解发动机重新检查',
          outcomes: [
            { ratio: 0.13, message: '团队发现潜在缺陷，新设计获得额外订单。' },
            { ratio: -0.08, message: '检查没有找到问题，项目却错过了发射窗口。' }
          ]
        },
        {
          label: '增加测试后继续使用',
          outcomes: [
            { ratio: 0.17, message: '后续测试全部通过，发动机按期完成首飞。' },
            { ratio: -0.15, message: '异常再次出现，整批发动机需要返厂。' }
          ]
        }
      ]
    },
    {
      prompt: '火箭上面级的关键部件可以选择两条供应路线。',
      options: [
        {
          label: '交给成熟供应商生产',
          outcomes: [
            { ratio: 0.1, message: '供应链稳定交付，火箭按计划完成组装。' },
            { ratio: -0.07, message: '供应商产线排期冲突，交付时间不断推迟。' }
          ]
        },
        {
          label: '建立新的自有生产线',
          outcomes: [
            { ratio: 0.2, message: '自动化产线投产，单枚火箭成本大幅下降。' },
            { ratio: -0.16, message: '新产线良率不足，大批部件无法使用。' }
          ]
        }
      ]
    },
    {
      prompt: '一位重要客户希望把任务提前到下一次发射。',
      options: [
        {
          label: '重新安排发射清单',
          outcomes: [
            { ratio: 0.16, message: '紧急任务成功，客户追加了长期发射合同。' },
            { ratio: -0.11, message: '任务调整引发连锁延期，多位客户索赔。' }
          ]
        },
        {
          label: '维持原定发射顺序',
          outcomes: [
            { ratio: 0.11, message: '稳定履约获得市场认可，订单持续增长。' },
            { ratio: -0.09, message: '重要客户转投竞争对手，后续订单流失。' }
          ]
        }
      ]
    }
  ],
  mars: [
    {
      prompt: '首批基地需要在两处候选着陆区之间做出选择。',
      options: [
        {
          label: '选择靠近地下冰层的平原',
          outcomes: [
            { ratio: 0.2, message: '基地发现丰富水冰，长期补给成本大幅下降。' },
            { ratio: -0.14, message: '地层比预期松软，着陆设施严重受损。' }
          ]
        },
        {
          label: '选择地形稳定的高地',
          outcomes: [
            { ratio: 0.14, message: '基地快速建成，并建立稳定通信链路。' },
            { ratio: -0.1, message: '水资源过于稀少，补给任务数量被迫增加。' }
          ]
        }
      ]
    },
    {
      prompt: '生命保障系统的最终方案仍有两套设计可选。',
      options: [
        {
          label: '采用完全封闭循环系统',
          outcomes: [
            { ratio: 0.22, message: '循环效率刷新纪录，基地开始对外输出技术。' },
            { ratio: -0.17, message: '核心过滤模块失效，整套系统需要重新设计。' }
          ]
        },
        {
          label: '采用模块化补给系统',
          outcomes: [
            { ratio: 0.13, message: '模块维护简单，基地扩建速度明显提升。' },
            { ratio: -0.11, message: '补给发射连续延期，基地建设被迫停工。' }
          ]
        }
      ]
    },
    {
      prompt: '第一条火星货运航线需要确定运输计划。',
      options: [
        {
          label: '集中发送大型货运飞船',
          outcomes: [
            { ratio: 0.24, message: '大型货船满载抵达，基地建设提前完成。' },
            { ratio: -0.19, message: '货船偏离转移轨道，大批设备无法按时送达。' }
          ]
        },
        {
          label: '分批发送多艘小型飞船',
          outcomes: [
            { ratio: 0.16, message: '多批补给顺利衔接，运输网络开始商业化。' },
            { ratio: -0.12, message: '多次发射推高成本，部分设备重复采购。' }
          ]
        }
      ]
    }
  ]
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STRATEGIC_EVENT_RULES, STRATEGIC_EVENT_BANK }
}

if (typeof window !== 'undefined') {
  window.STRATEGIC_EVENT_RULES = STRATEGIC_EVENT_RULES
  window.STRATEGIC_EVENT_BANK = STRATEGIC_EVENT_BANK
}
