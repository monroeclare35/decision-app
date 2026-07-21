import type { Theory } from '../types'

export const PRESET_THEORIES: Theory[] = [
  // ============================================================
  // 财富与风险 (14) — 管钱的各种说法，正反都有
  // ============================================================
  // 分散 vs 集中
  {
    id: 'fin_01',
    content: '别把鸡蛋搁一个篮子里——分散开来，东边不亮西边亮，晚上睡得踏实。',
    domain: 'finance', tags: ['分散', '风险', '稳健'], source: 'preset',
  },
  {
    id: 'fin_02',
    content: '把鸡蛋放一个篮子，然后盯紧这个篮子——分散太开反而什么都抓不牢。巴菲特就这路子。',
    domain: 'finance', tags: ['集中', '专注', '深度'], source: 'preset',
  },
  // 省钱 vs 赚钱
  {
    id: 'fin_03',
    content: '省一分就是挣一分。消费降级比涨工资来得快，小钱不省大钱难留。',
    domain: 'finance', tags: ['节俭', '消费', '储蓄'], source: 'preset',
  },
  {
    id: 'fin_04',
    content: '钱是挣出来的，不是抠出来的。一门心思省钱不如想想怎么开源，天花板不一样。',
    domain: 'finance', tags: ['开源', '收入', '思维'], source: 'preset',
  },
  // 现金 vs 投资
  {
    id: 'fin_05',
    content: '现金为王——手里有粮心里不慌。机会来了你得有钱接，危机来了你得有钱扛。',
    domain: 'finance', tags: ['现金流', '安全', '机会'], source: 'preset',
  },
  {
    id: 'fin_06',
    content: '钱放着就是贬值——通货膨胀在那摆着，现金不配就叫温水煮青蛙。',
    domain: 'finance', tags: ['通胀', '投资', '增值'], source: 'preset',
  },
  // 复利 + 时间
  {
    id: 'fin_07',
    content: '复利是世界第八大奇迹。早开始五年比后面多投一倍还管用，时间是你这边的人。',
    domain: 'finance', tags: ['复利', '长期', '耐心'], source: 'preset',
  },
  // 抄底 vs 顺势
  {
    id: 'fin_08',
    content: '下落的刀别伸手接——跌的时候抄底，十次有八次割手。等刀插地上不动了再说。',
    domain: 'finance', tags: ['时机', '风险', '抄底'], source: 'preset',
  },
  {
    id: 'fin_09',
    content: '趋势是你的朋友——别跟市场较劲，顺着走比逆着游省力得多。',
    domain: 'finance', tags: ['市场', '顺势', '谦逊'], source: 'preset',
  },
  // 能力圈
  {
    id: 'fin_10',
    content: '不熟不做——买自己没搞明白的东西，跟闭着眼开车差不多。能力圈比收益率重要。',
    domain: 'finance', tags: ['能力圈', '认知', '谨慎'], source: 'preset',
  },
  // 消费观
  {
    id: 'fin_11',
    content: '贵的东西买的时候心疼，用起来天天爽。便宜货买的时候爽，用两次就吃灰。',
    domain: 'finance', tags: ['消费观', '质量', '长期'], source: 'preset',
  },
  {
    id: 'fin_12',
    content: '平替也很香——不是所有东西都需要买最好的，够用就行，别被消费主义忽悠。',
    domain: 'finance', tags: ['性价比', '消费', '理性'], source: 'preset',
  },
  // 投资自己
  {
    id: 'fin_13',
    content: '最好的投资是往自己身上砸——学个能变现的技能、保持健康，谁也拿不走。',
    domain: 'finance', tags: ['自我提升', '长期', '认知'], source: 'preset',
  },
  // 风险收益
  {
    id: 'fin_14',
    content: '高回报的东西必然高风险——别人告诉你稳赚不赔的时候，多想想人家图什么。',
    domain: 'finance', tags: ['风险', '回报', '警惕'], source: 'preset',
  },

  // ============================================================
  // 心智与认知 (16) — 脑子怎么转的，以及怎么跟它对着干
  // ============================================================
  {
    id: 'cog_01',
    content: '沉没成本不是成本。已经搭进去的时间、钱、感情，不该影响你下一步往哪走。',
    domain: 'psychology', tags: ['沉没成本', '止损', '理性'], source: 'preset',
  },
  {
    id: 'cog_02',
    content: '确认偏误——人天然爱看支持自己观点的东西。真正的思考是主动去找那些打脸的数据。',
    domain: 'psychology', tags: ['确认偏误', '批判思维', '信息'], source: 'preset',
  },
  {
    id: 'cog_03',
    content: '损失厌恶——丢一百块的难受，大概要赚两百块才能补回来。人对"失去"天然更敏感。',
    domain: 'psychology', tags: ['损失厌恶', '保守', '情绪'], source: 'preset',
  },
  {
    id: 'cog_04',
    content: '锚定效应——你看到的第一个数字会悄悄变成尺子。原价999，现价699，那个999就是锚。',
    domain: 'psychology', tags: ['锚定', '判断', '偏见'], source: 'preset',
  },
  {
    id: 'cog_05',
    content: '从众效应——周围人都在干一件事的时候，不跟着干挺难受的。但人群并不总是对的。',
    domain: 'psychology', tags: ['从众', '社交压力', '独立思考'], source: 'preset',
  },
  {
    id: 'cog_06',
    content: '幸存者偏差——你刷到的成功故事只是冰山尖尖，底下沉了多少艘船你看不见。',
    domain: 'psychology', tags: ['幸存者偏差', '成功学', '统计'], source: 'preset',
  },
  {
    id: 'cog_07',
    content: '过度选择——选项太多反而选不出来。菜单有五十道菜不如五道菜让你吃得开心。',
    domain: 'psychology', tags: ['选择悖论', '满足', '幸福'], source: 'preset',
  },
  {
    id: 'cog_08',
    content: '框架效应——"成功率90%"和"失败率10%"说的是一回事，但你的反应完全不同。',
    domain: 'psychology', tags: ['框架', '表述', '决策'], source: 'preset',
  },
  {
    id: 'cog_09',
    content: '控制错觉——人总觉得自己能控制随机事件。骰子掷之前吹口气没用，但大家都吹。',
    domain: 'psychology', tags: ['控制感', '随机', '谦逊'], source: 'preset',
  },
  {
    id: 'cog_10',
    content: '近因效应——最近发生的事对你判断的影响，远大于很久以前的事，哪怕后者更重要。',
    domain: 'psychology', tags: ['近因', '记忆', '偏见'], source: 'preset',
  },
  {
    id: 'cog_11',
    content: '禀赋效应——你手上的东西天然觉得更值钱。一个杯子你买了就觉得别人该出更高的价才肯卖。',
    domain: 'psychology', tags: ['禀赋效应', '估值', '偏见'], source: 'preset',
  },
  {
    id: 'cog_12',
    content: '赌徒谬误——连开了五次大了，你觉得下次该开小了？不对，每次都是独立的。',
    domain: 'psychology', tags: ['概率', '独立事件', '赌博'], source: 'preset',
  },
  {
    id: 'cog_13',
    content: '峰终定律——你对一段经历的评价，主要取决于最爽（最痛）的时刻和结束时的感受，而不是全程平均。',
    domain: 'psychology', tags: ['记忆', '体验', '峰值'], source: 'preset',
  },
  {
    id: 'cog_14',
    content: '达克效应——不太懂的人往往最自信，真正懂的反而容易怀疑自己。无知者无畏。',
    domain: 'psychology', tags: ['自信', '能力', '元认知'], source: 'preset',
  },
  {
    id: 'cog_15',
    content: '拖延的本质不是懒——是怕做不好、怕结果不如预期。认识到这一点比骂自己有用。',
    domain: 'psychology', tags: ['拖延', '完美主义', '自我认知'], source: 'preset',
  },
  {
    id: 'cog_16',
    content: '成长型思维——相信能力可以后天练出来的人，比觉得"天赋决定一切"的人走得更远。',
    domain: 'psychology', tags: ['成长', '心态', '努力'], source: 'preset',
  },

  // ============================================================
  // 处世之道 (18) — 祖辈传下来的，经常相互矛盾的生活智慧
  // ============================================================
  // 谨慎 vs 果断
  {
    id: 'folk_01',
    content: '三思而后行——气头上做的决定，十个有九个会后悔。给自己一晚上的冷静期。',
    domain: 'folk', tags: ['谨慎', '冷静', '决策'], source: 'preset',
  },
  {
    id: 'folk_02',
    content: '机不可失，时不再来。有些窗口就那么一瞬间，犹豫一下就翻篇了。该出手时别磨叽。',
    domain: 'folk', tags: ['机会', '果断', '时机'], source: 'preset',
  },
  // 随缘 vs 规划
  {
    id: 'folk_03',
    content: '船到桥头自然直——好多事到时候自然有办法，提前焦虑也是白焦虑。',
    domain: 'folk', tags: ['乐观', '放松', '顺其自然'], source: 'preset',
  },
  {
    id: 'folk_04',
    content: '人无远虑必有近忧——走一步看一步当然轻松，但麻烦迟早找上门。防患于未然比救火强。',
    domain: 'folk', tags: ['规划', '远见', '预防'], source: 'preset',
  },
  // 忍耐 vs 争取
  {
    id: 'folk_05',
    content: '吃亏是福——退一步换来的信任和口碑，长远看比争一时之气值钱。',
    domain: 'folk', tags: ['忍耐', '长远', '人际关系'], source: 'preset',
  },
  {
    id: 'folk_06',
    content: '会哭的孩子有奶吃——不吭声、不争取，别人以为你什么都行，资源就绕着你走了。',
    domain: 'folk', tags: ['争取', '表达', '资源'], source: 'preset',
  },
  // 当下 vs 长远
  {
    id: 'folk_07',
    content: '今朝有酒今朝醉——明天的事明天再说。想太多反而迈不开步子，当下的快乐也是快乐。',
    domain: 'folk', tags: ['及时行乐', '放松', '当下'], source: 'preset',
  },
  {
    id: 'folk_08',
    content: '延迟满足——忍住眼前的糖，后面能拿两颗。能等的人，人生长期收益普遍更高。',
    domain: 'folk', tags: ['自控', '长期', '耐心'], source: 'preset',
  },
  // 环境
  {
    id: 'folk_09',
    content: '近朱者赤近墨者黑——你跟什么人混久了，价值观和习惯会慢慢被同化，润物细无声。',
    domain: 'folk', tags: ['环境', '社交圈', '影响'], source: 'preset',
  },
  // 知足 vs 进取
  {
    id: 'folk_10',
    content: '知足常乐——幸福不在你拥有多少，在你觉得自己够了。跟别人比永远比不完。',
    domain: 'folk', tags: ['满足', '幸福', '欲望'], source: 'preset',
  },
  {
    id: 'folk_11',
    content: '取法乎上仅得乎中——把目标定高一点，哪怕只做到八成也比一开始就定低了好。',
    domain: 'folk', tags: ['进取', '目标', '标准'], source: 'preset',
  },
  // 共情 + 倾听
  {
    id: 'folk_12',
    content: '己所不欲勿施于人——站别人鞋里想想。你觉得难受的事，大概率别人也觉得难受。',
    domain: 'folk', tags: ['共情', '换位思考', '道德'], source: 'preset',
  },
  {
    id: 'folk_13',
    content: '兼听则明偏信则暗——只听一边的故事容易被人带沟里。多听几方再拿主意。',
    domain: 'folk', tags: ['信息', '多元', '决策'], source: 'preset',
  },
  // 急 vs 缓
  {
    id: 'folk_14',
    content: '事缓则圆——有些事情急不得，越急越拧巴，搁一搁反而就顺了。',
    domain: 'folk', tags: ['耐心', '等待', '时机'], source: 'preset',
  },
  {
    id: 'folk_15',
    content: '趁热打铁——势头在的时候别停，一鼓作气冲过去。等劲头过了再想起来就费劲了。',
    domain: 'folk', tags: ['时机', '冲劲', '执行'], source: 'preset',
  },
  // 大方 vs 计较
  {
    id: 'folk_16',
    content: '朋友之间别算太清——算来算去算的是情分。大方点，吃点小亏换舒坦关系。',
    domain: 'folk', tags: ['大方', '友谊', '情分'], source: 'preset',
  },
  {
    id: 'folk_17',
    content: '亲兄弟明算账——钱的事一开始就讲清楚，含糊着含糊着就变成了心结。丑话说在前头不丑。',
    domain: 'folk', tags: ['界限', '金钱', '规则'], source: 'preset',
  },
  {
    id: 'folk_18',
    content: '己所甚欲，也勿施于人——你觉得好的东西别人不一定需要。推荐和强加是两码事。',
    domain: 'folk', tags: ['尊重', '边界', '共情'], source: 'preset',
  },

  // ============================================================
  // 决策科学 (16) — 拿来就能用的思维工具
  // ============================================================
  {
    id: 'dec_01',
    content: '二阶思维——做了A不只想到A的结果，还要想别人会怎么回应，回应完又会怎样。多想一层。',
    domain: 'decision_science', tags: ['二阶思维', '深度', '博弈'], source: 'preset',
  },
  {
    id: 'dec_02',
    content: '汉隆剃刀——能用蠢解释的别用坏来猜。大多数让你不爽的事不是针对你，就是对方没过脑子。',
    domain: 'decision_science', tags: ['善意假设', '解释', '社交'], source: 'preset',
  },
  {
    id: 'dec_03',
    content: '奥卡姆剃刀——最简单的解释大概率是对的。绕来绕去的说法要么是忽悠，要么是自己也没想明白。',
    domain: 'decision_science', tags: ['简洁', '解释', '效率'], source: 'preset',
  },
  {
    id: 'dec_04',
    content: '帕累托法则——八成结果来自两成功夫。找对那关键的两成，别什么都平均用力。',
    domain: 'decision_science', tags: ['二八定律', '优先级', '聚焦'], source: 'preset',
  },
  {
    id: 'dec_05',
    content: '世界不是非黑即白——大多数事卡在灰色地带。接受了这点，做决策就没那么容易钻牛角尖。',
    domain: 'decision_science', tags: ['灰色思维', '复杂', '包容'], source: 'preset',
  },
  {
    id: 'dec_06',
    content: '后悔最小化——想象自己八十岁了回头看：这个决定你最后悔没做的是什么？选那个。',
    domain: 'decision_science', tags: ['后悔', '长期视角', '人生'], source: 'preset',
  },
  {
    id: 'dec_07',
    content: '10-10-10法则——10分钟后怎么看？10个月后呢？10年后呢？时间一拉长，好多纠结就消散了。',
    domain: 'decision_science', tags: ['时间维度', '视角', '影响'], source: 'preset',
  },
  {
    id: 'dec_08',
    content: '可逆决策大胆试——能反悔的选择就放手去干，反正可以退回来。不能反悔的才需要好好琢磨。',
    domain: 'decision_science', tags: ['可逆性', '风险', '试错'], source: 'preset',
  },
  {
    id: 'dec_09',
    content: '方向比速度重要——跑错了方向，跑得再快也是白搭。先抬头看路，再踩油门。',
    domain: 'decision_science', tags: ['方向', '目标', '策略'], source: 'preset',
  },
  {
    id: 'dec_10',
    content: '五个为什么——一个问题往下追问五次"为什么"，通常能挖到真正的根。别停在表面。',
    domain: 'decision_science', tags: ['追问', '根源', '深度思考'], source: 'preset',
  },
  {
    id: 'dec_11',
    content: '事前验尸——做决定前先想象这个计划已经失败了，"它是怎么死掉的？"然后提前堵住那些窟窿。',
    domain: 'decision_science', tags: ['风险管理', '反向思考', '预防'], source: 'preset',
  },
  {
    id: 'dec_12',
    content: '决策疲劳——做太多小决定会耗尽你的判断力。重要的事放在精力好的时候，小事先砍掉。',
    domain: 'decision_science', tags: ['精力管理', '优先级', '效率'], source: 'preset',
  },
  {
    id: 'dec_13',
    content: '第一性原理——别管别人怎么干的，回到最基本的事实和原理，从零开始想。马斯克造火箭就这么想的。',
    domain: 'decision_science', tags: ['创新', '根本', '独立思考'], source: 'preset',
  },
  {
    id: 'dec_14',
    content: '如果你不是你自己，而是一个朋友来问你这个问题，你会给他什么建议？——换个视角往往更清醒。',
    domain: 'decision_science', tags: ['视角转换', '自我抽离', '建议'], source: 'preset',
  },
  {
    id: 'dec_15',
    content: '做决策时写下来——脑子里的想法是混乱的，写到纸上才能看清逻辑漏洞。',
    domain: 'decision_science', tags: ['书面思考', '清晰', '逻辑'], source: 'preset',
  },
  {
    id: 'dec_16',
    content: '满意即可，而非最优——追求"最好"会让你陷入无穷尽的比较。差不多好就够了，剩下的精力干别的。',
    domain: 'decision_science', tags: ['满意原则', '效率', '知足'], source: 'preset',
  },

  // ============================================================
  // 现代思潮 (16) — 网络时代挂在嘴边的那些
  // ============================================================
  // 冒险 vs 躺平
  {
    id: 'mod_01',
    content: 'YOLO（You Only Live Once）——人就活一次，有些体验哪怕贵点、冒险点也值。老了最怕没故事可讲。',
    domain: 'meme', tags: ['体验', '冒险', '人生'], source: 'preset',
  },
  {
    id: 'mod_02',
    content: '躺平不是认输——是不想卷了。接受"差不多就行了"，有时候比"必须赢"更健康。',
    domain: 'meme', tags: ['拒绝内卷', '接纳', '生活方式'], source: 'preset',
  },
  // 断舍离
  {
    id: 'mod_03',
    content: '断舍离——东西太多心会乱。扔掉不用的不只是物品，还有消耗你的关系和念头。',
    domain: 'meme', tags: ['极简', '清理', '自由'], source: 'preset',
  },
  // FOMO
  {
    id: 'mod_04',
    content: 'FOMO（害怕错过）——刷朋友圈觉得全世界都在嗨，只有你一个人在家。其实大家都在家刷手机。',
    domain: 'meme', tags: ['FOMO', '焦虑', '社交'], source: 'preset',
  },
  // 熵
  {
    id: 'mod_05',
    content: '熵增定律——房间不收拾就自动变乱，生活也是。不主动维持秩序，它会自己滑向混乱。',
    domain: 'meme', tags: ['熵增', '秩序', '主动'], source: 'preset',
  },
  // 长期主义
  {
    id: 'mod_06',
    content: '长期主义——今天做的这件事，一年后回头看你会高兴吗？会的话就干。不会的话再想想。',
    domain: 'meme', tags: ['长期', '坚持', '价值'], source: 'preset',
  },
  // 杠铃策略
  {
    id: 'mod_07',
    content: '杠铃策略——一头极度保守保底，一头极度冒险博上限。中间那大块平庸地带，跳过去。',
    domain: 'meme', tags: ['杠铃策略', '风险', '不对称'], source: 'preset',
  },
  // 信息节食
  {
    id: 'mod_08',
    content: '信息节食——脑子跟胃一样，垃圾信息灌多了会撑坏。刷一小时短视频比吃炸鸡还伤脑子。',
    domain: 'meme', tags: ['信息', '注意力', '健康'], source: 'preset',
  },
  // 难而正确
  {
    id: 'mod_09',
    content: '做难而正确的事——舒服的路越走越窄，难的路越走越宽。但前提是你真心在乎那个方向。',
    domain: 'meme', tags: ['挑战', '成长', '选择'], source: 'preset',
  },
  // 在场
  {
    id: 'mod_10',
    content: '不下桌就有翻盘的机会——投资也好人生也好，活下来比赢得漂亮重要得多。别一把梭哈。',
    domain: 'meme', tags: ['生存', '持久', '稳健'], source: 'preset',
  },
  // 一万小时定律
  {
    id: 'mod_11',
    content: '一万小时定律——在任何一个领域做到世界级，大概需要一万小时的刻意练习。天赋决定上限，练习决定下限。',
    domain: 'meme', tags: ['练习', '专业', '积累'], source: 'preset',
  },
  // 刻意练习 vs 天赋
  {
    id: 'mod_12',
    content: '天赋比努力重要——方向不对的努力只是自我感动。找到你天生比别人轻松的那件事，比死磕短板明智。',
    domain: 'meme', tags: ['天赋', '方向', '优势'], source: 'preset',
  },
  // 墨菲定律
  {
    id: 'mod_13',
    content: '墨菲定律——任何可能出错的事，最终一定会出错。别抱侥幸心理，给意外留好缓冲。',
    domain: 'meme', tags: ['风险', '预防', '悲观'], source: 'preset',
  },
  // 吸引力法则
  {
    id: 'mod_14',
    content: '吸引力法则——你专注于什么，就会吸引什么。整天想着"别搞砸"，反而更容易搞砸。',
    domain: 'meme', tags: ['心态', '专注', '自我实现'], source: 'preset',
  },
  // JOMO (Joy of Missing Out)
  {
    id: 'mod_15',
    content: 'JOMO（错过的快乐）——不参加那个局、不追那个热点，反而省下大把时间做自己真正喜欢的事。',
    domain: 'meme', tags: ['JOMO', '自由', '选择'], source: 'preset',
  },
  // 反脆弱
  {
    id: 'mod_16',
    content: '反脆弱——有些事情不只扛得住冲击，还能在冲击中变得更强。肌肉、免疫系统、创业公司都是这样。',
    domain: 'meme', tags: ['反脆弱', '韧性', '成长'], source: 'preset',
  },
]

// Fisher-Yates shuffle — used by onboarding to present theories in random order
export function shuffleTheories(theories: Theory[]): Theory[] {
  const arr = [...theories]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const DOMAIN_GROUPS = [
  { domain: 'finance' as const, label: '财富与风险', description: '关于钱、投资和消费的各种说法' },
  { domain: 'psychology' as const, label: '心智与认知', description: '关于脑子怎么转的各种发现' },
  { domain: 'folk' as const, label: '处世之道', description: '祖祖辈辈传下来的生活经验' },
  { domain: 'decision_science' as const, label: '决策科学', description: '帮你看清问题的思维工具' },
  { domain: 'meme' as const, label: '现代思潮', description: '网络时代大家嘴上常挂的那些' },
]
