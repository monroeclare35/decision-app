import type { Theory } from '../types'

export const PRESET_THEORIES: Theory[] = [
  // ============================================================
  // 1. 👥 人际关系 — 30条
  // ============================================================
  // 信任与边界
  { id: 'rel_01', content: '信任前置——先相信对方是善意的，除非事实证明相反。带着戒备心入场，关系从一开始就歪了。', domain: 'relationships', tags: ['信任', '善意假设', '开场姿态'], source: 'preset' },
  { id: 'rel_02', content: '信任靠自己挣——别理所当然觉得别人该信你。每一件小事守信，信任账户才慢慢有余额。', domain: 'relationships', tags: ['信任', '积累', '信用'], source: 'preset' },
  { id: 'rel_03', content: '边界感是健康关系的基础——再好的朋友也有不该踩的线。不说"不"的人，最后往往最累。', domain: 'relationships', tags: ['边界', '自我保护', '说不'], source: 'preset' },
  { id: 'rel_04', content: '关系是麻烦出来的——适当向人求助、欠点小人情，反而让对方更愿意走近你。富兰克林效应。', domain: 'relationships', tags: ['求助', '连接', '富兰克林效应'], source: 'preset' },
  // 朋友筛选
  { id: 'rel_05', content: '你是你身边五个人的平均值——在不知不觉中，朋友的习惯、态度、收入水平都会影响你。', domain: 'relationships', tags: ['环境', '社交圈', '影响'], source: 'preset' },
  { id: 'rel_06', content: '朋友不在多，在于你倒霉的时候还有几个愿意接你电话。成年人的友谊靠筛选，不靠讨好。', domain: 'relationships', tags: ['筛选', '深度', '质量'], source: 'preset' },
  { id: 'rel_07', content: '邓巴数——人类大脑能维持的稳定社交关系大约150个。超出这个数，剩下的只是"认识的人"。', domain: 'relationships', tags: ['邓巴数', '社交上限', '精力'], source: 'preset' },
  // 社交智慧
  { id: 'rel_08', content: '弱连接的力量——帮你找到新工作、新机会的，往往不是好朋友，而是那些不太熟的点头之交。', domain: 'relationships', tags: ['弱连接', '机会', '信息'], source: 'preset' },
  { id: 'rel_09', content: '共情力——先接住对方的情绪，再说事。对方还在气头上你就开始讲道理，等于往火上浇水——灭了温暖也激起了蒸汽。', domain: 'relationships', tags: ['共情', '倾听', '沟通'], source: 'preset' },
  { id: 'rel_10', content: '别当"拯救者"——朋友跟你诉苦，大多数时候只是需要你听，不是需要你帮ta解决问题。', domain: 'relationships', tags: ['倾听', '陪伴', '不越界'], source: 'preset' },
  // 互惠与公平
  { id: 'rel_11', content: '互惠是社交的默认货币——别人请你吃饭，你总觉得欠了点什么。这不是算计，是人的本能。', domain: 'relationships', tags: ['互惠', '社交规范', '人类本能'], source: 'preset' },
  { id: 'rel_12', content: '对等原则——一段关系如果长期只有一方付出，迟早会崩。感情账户也需要双方充值。', domain: 'relationships', tags: ['对等', '付出', '平衡'], source: 'preset' },
  { id: 'rel_13', content: '帮你是情分，不帮是本分——别把别人的善意当理所当然。感恩比抱怨更能维持关系。', domain: 'relationships', tags: ['感恩', '期待管理', '情分'], source: 'preset' },
  { id: 'rel_14', content: '吃亏有时候是占便宜——退一步换来的口碑和信任，长远看比争一时之气值钱。', domain: 'relationships', tags: ['忍耐', '长远', '信任'], source: 'preset' },
  // 冲突处理
  { id: 'rel_15', content: '汉隆剃刀在人际关系中尤其好用——能用蠢解释的别用坏来猜。大多数让你不爽的事，对方只是没过脑子。', domain: 'relationships', tags: ['善意假设', '冲突', '误解'], source: 'preset' },
  { id: 'rel_16', content: '当面说——对第三方的意见不要通过第二方传递。想说谁的问题，直接找谁说。', domain: 'relationships', tags: ['直接沟通', '坦诚', '避免误会'], source: 'preset' },
  { id: 'rel_17', content: '面子文化——有时候争的不是理，是面子。给别人台阶下不是软弱，是智慧。', domain: 'relationships', tags: ['面子', '台阶', '社交智慧'], source: 'preset' },
  { id: 'rel_18', content: '冷战解决不了任何问题——不说话的时间越长，想修复就越难。沉默的成本比吵架高。', domain: 'relationships', tags: ['冷战', '沟通', '及时修复'], source: 'preset' },
  // 社交焦虑与比较
  { id: 'rel_19', content: '聚光灯效应——你以为大家都在看你，其实每个人都在忙着看自己。出丑没那么可怕。', domain: 'relationships', tags: ['社交焦虑', '自我意识', '放松'], source: 'preset' },
  { id: 'rel_20', content: '不要拿你的日常跟别人朋友圈的高光比——人家晒出来的是精修封面，你看到的自己是整本书。', domain: 'relationships', tags: ['社会比较', '社交媒体', '自我接纳'], source: 'preset' },
  { id: 'rel_21', content: '讨好型人格的尽头是耗竭——被所有人喜欢是不可能的，被对的人喜欢就够了。', domain: 'relationships', tags: ['讨好', '自我价值', '筛选'], source: 'preset' },
  { id: 'rel_22', content: '学会拒绝——每次"好的"如果都违背了你的内心，攒到最后就是一次大爆炸。温和而坚定地说不。', domain: 'relationships', tags: ['拒绝', '边界', '自爱'], source: 'preset' },
  // 更深层的社交洞察
  { id: 'rel_23', content: '不要在背后议论不在场的人——如果你真的有问题，跟那个人当面说。传到对方耳朵里的版本永远比你原话难听。', domain: 'relationships', tags: ['议论', '坦荡', '口碑'], source: 'preset' },
  { id: 'rel_24', content: '承认"我不知道"比装懂更赢得尊重——假装什么都懂的人，迟早被人看穿，而且看穿后再也回不去了。', domain: 'relationships', tags: ['真诚', '谦逊', '信任'], source: 'preset' },
  { id: 'rel_25', content: '己所不欲勿施于人——站别人鞋里想想。但反过来也一样：己所甚欲，也勿强施于人。', domain: 'relationships', tags: ['共情', '边界', '尊重差异'], source: 'preset' },
  { id: 'rel_26', content: '别用"我说话直"当伤人的借口——直率和刻薄之间隔着一条叫"在乎对方感受"的沟。', domain: 'relationships', tags: ['沟通', '善意', '说话之道'], source: 'preset' },
  { id: 'rel_27', content: '包容不是忍——一直忍着的包容迟早会炸。真正的包容是理解并接受了对方跟你的不同。', domain: 'relationships', tags: ['包容', '接纳', '差异'], source: 'preset' },
  { id: 'rel_28', content: '人和人之间需要一点"无用"的相处——别每次联系都带着目的。偶尔就是聊聊天气、吃啥，也挺好。', domain: 'relationships', tags: ['闲暇', '连接', '不功利'], source: 'preset' },
  { id: 'rel_29', content: '不要高估你在别人心里的位置——别人没回你消息、忘了你生日，大概率不是针对你，只是忙。', domain: 'relationships', tags: ['期待', '自我中心', '放松'], source: 'preset' },
  { id: 'rel_30', content: '真正的人脉不是你认识谁，而是你帮过谁——主动创造价值给别人的人，路会越走越宽。', domain: 'relationships', tags: ['人脉', '价值', '给予'], source: 'preset' },

  // ============================================================
  // 2. 💼 职场事业 — 28条
  // ============================================================
  { id: 'car_01', content: '选择比努力重要——在夕阳行业拼尽全力，不如在朝阳行业做到80分。先看好方向再加速。', domain: 'career', tags: ['方向', '行业选择', '策略'], source: 'preset' },
  { id: 'car_02', content: '努力本身也是一种选择——选对了方向之后，剩下拼的就是谁更能扛、更能熬。', domain: 'career', tags: ['努力', '坚持', '执行力'], source: 'preset' },
  { id: 'car_03', content: 'T型人才——一横是知识广度，一竖是专业深度。只有广度就是万金油，只有深度容易视野窄。', domain: 'career', tags: ['专才', '通才', '能力模型'], source: 'preset' },
  { id: 'car_04', content: '一万小时定律——在任何一个领域达到世界级，大约需要一万小时的刻意练习。天赋决定天花板，练习决定地板。', domain: 'career', tags: ['刻意练习', '专业', '积累'], source: 'preset' },
  { id: 'car_05', content: '热爱还是赚钱——把热爱当工作可能毁了热爱，但每天八小时做不喜欢的事也是在慢性消耗。最佳的解法是在热爱和市场的交集里找。', domain: 'career', tags: ['热爱', '收入', '平衡'], source: 'preset' },
  { id: 'car_06', content: '跳槽的最佳时机是你现在的工作学不到新东西了——不是为了钱而跳，而是为了成长曲线不躺平。', domain: 'career', tags: ['跳槽', '成长', '时机'], source: 'preset' },
  { id: 'car_07', content: '频繁跳槽简历会花——一年换一个，HR看到的是"这个人留不住"。除非有明确理由，每份工作至少待够两年。', domain: 'career', tags: ['跳槽', '简历', '稳定'], source: 'preset' },
  { id: 'car_08', content: '向上管理不是拍马屁——是让老板知道你在做什么、你需要什么支持、你遇到了什么困难。信息不对称对谁都没好处。', domain: 'career', tags: ['向上管理', '沟通', '主动'], source: 'preset' },
  { id: 'car_09', content: '功劳要让出去，责任要揽过来——团队出了问题你先扛，有了荣誉你先分。这看起来亏，实际上是最快的上升通道。', domain: 'career', tags: ['领导力', '担当', '格局'], source: 'preset' },
  { id: 'car_10', content: '彼得原理——在一个层级组织里，人人都会晋升到自己无法胜任的位置。所以你现在觉得吃力，可能不是你的问题，是这个位置本身就超纲了。', domain: 'career', tags: ['晋升', '能力上限', '组织'], source: 'preset' },
  { id: 'car_11', content: '光环效应——一个人在某方面成功，大家会默认ta在其他方面也厉害。别被名校或大厂标签唬住，也别低估自己。', domain: 'career', tags: ['光环', '偏见', '判断'], source: 'preset' },
  { id: 'car_12', content: '你的工作不应该是你生活的全部——把自我价值全部绑在职业成就上，一失业你就崩溃了。', domain: 'career', tags: ['工作', '自我价值', '平衡'], source: 'preset' },
  { id: 'car_13', content: '薪资谈判的第一法则：先开价的人吃亏。永远让对方先说一个数，或者在充分了解行情后自信地报一个合理上限。', domain: 'career', tags: ['薪资', '谈判', '锚定'], source: 'preset' },
  { id: 'car_14', content: '学会在会上发言——不一定要说得多深刻，但你的声音必须被听到。存在感是职场晋升的隐性门槛。', domain: 'career', tags: ['存在感', '表达', '晋升'], source: 'preset' },
  { id: 'car_15', content: '导师比老板重要——找一个比你段位高、愿意指点你的人。真正的贵人不是给你钱，是帮你少走弯路。', domain: 'career', tags: ['导师', '贵人', '成长'], source: 'preset' },
  { id: 'car_16', content: '别在背后说老板坏话——尤其是对同事。职场没有不透风的墙，你永远不知道谁跟谁有私交。', domain: 'career', tags: ['谨慎', '职场政治', '口碑'], source: 'preset' },
  { id: 'car_17', content: '每一份工作都是一个案例——哪怕是不喜欢的工作，也尽量做到有始有终。离开的样子决定你在这个圈子的口碑。', domain: 'career', tags: ['离职', '口碑', '职业素养'], source: 'preset' },
  { id: 'car_18', content: '管理预期比达成结果更重要——承诺一周完成，花了两周就是延期。一开始就说两周，提前一天交就是惊喜。', domain: 'career', tags: ['预期管理', '信任', '靠谱'], source: 'preset' },
  { id: 'car_19', content: '不要把平台的能力当成自己的能力——在BAT年薪百万，真的裸辞自己干可能月入五千。分清"我"和"我的位置"。', domain: 'career', tags: ['能力圈', '平台', '自知'], source: 'preset' },
  { id: 'car_20', content: '副业不是必须的——如果你在主业上的成长空间还很大，把精力全投进去比东搞西搞划算。专注本身也是稀缺资源。', domain: 'career', tags: ['副业', '专注', '精力'], source: 'preset' },
  { id: 'car_21', content: '30岁前拼技术，30岁后拼资源和判断——技能有保质期，但眼光和人脉升值的速度比任何一个技术都快。', domain: 'career', tags: ['职业阶段', '转型', '长期规划'], source: 'preset' },
  { id: 'car_22', content: '职场里的"不可替代性"是伪命题——没有谁不可替代。真正的安全感来自你的可迁移能力，而不是当前职位。', domain: 'career', tags: ['安全感', '可迁移', '能力'], source: 'preset' },
  { id: 'car_23', content: '别等"准备好了"再行动——完美的准备不存在。在70%把握的时候就出手，剩下30%在过程中补。', domain: 'career', tags: ['行动', '完美主义', '时机'], source: 'preset' },
  { id: 'car_24', content: '开会之前先问：这封邮件能解决吗？——别浪费所有人的时间，也别浪费时间在开会上。', domain: 'career', tags: ['效率', '会议', '时间管理'], source: 'preset' },
  { id: 'car_25', content: '工作汇报要学会讲故事——先讲结论，再说过程，最后说其中的关键数据。领导没时间听流水账。', domain: 'career', tags: ['汇报', '表达', '结构化'], source: 'preset' },
  { id: 'car_26', content: '真正的铁饭碗不是一个岗位，是你离开任何一家公司都有下家要的能力——投资自己的可迁移技能比押注一家公司靠谱。', domain: 'career', tags: ['能力', '长期', '安全感'], source: 'preset' },
  { id: 'car_27', content: '公司不是家——裁员的时候不会因为你感情深就多给你一个月。保持职业性，别把全部情感投进公司。', domain: 'career', tags: ['职业', '边界', '清醒'], source: 'preset' },
  { id: 'car_28', content: '把自己当一家公司来经营——你的每一个技能是你的产品、你的时间是你的资本、你的职业路径是你的战略。', domain: 'career', tags: ['自我经营', '战略', '个人品牌'], source: 'preset' },

  // ============================================================
  // 3. 💕 亲密家庭 — 30条（亲密15+亲子15）
  // ============================================================
  // --- 亲密关系 ---
  { id: 'fam_01', content: '爱是一个动词——不是"我对你有感觉"就完了，而是在感觉消退的时候依然选择为你做点什么。', domain: 'family', tags: ['爱情', '行动', '承诺'], source: 'preset' },
  { id: 'fam_02', content: '感觉会消退，但选择可以持续——热恋的化学物质最多维持18个月，之后的感情靠的是共同经历和责任。', domain: 'family', tags: ['长期关系', '化学', '选择'], source: 'preset' },
  { id: 'fam_03', content: '吵架不是为了赢——是为了让关系更好。如果在争吵中"赢"了，但对方关上了心门，那你其实是输了。', domain: 'family', tags: ['争吵', '沟通', '目标'], source: 'preset' },
  { id: 'fam_04', content: '依附理论——你在亲密关系里的焦虑或回避，大概率跟你小时候和父母的相处模式有关。看见它，才能不被它控制。', domain: 'family', tags: ['依附', '原生家庭', '自我认知'], source: 'preset' },
  { id: 'fam_05', content: '承诺恐惧——怕承诺不是怕失去自由，而是怕自己不够好、怕辜负对方。解决之道是坦诚而非逃避。', domain: 'family', tags: ['承诺', '恐惧', '坦诚'], source: 'preset' },
  { id: 'fam_06', content: '新鲜感vs安全感——别拿"没感觉了"当分手的借口。每段长期关系都会经历激情的消退，区别在于你们是否愿意一起创造新的体验。', domain: 'family', tags: ['新鲜感', '长期', '努力'], source: 'preset' },
  { id: 'fam_07', content: '分手止损——沉没成本不该影响你的决定。已经投入的三年不是再浪费三年的理由。', domain: 'family', tags: ['分手', '沉没成本', '止损'], source: 'preset' },
  { id: 'fam_08', content: '好的关系让你更自由而不是更焦虑——如果你总在猜对方在想什么、回消息慢了两分钟就心慌，这是安全感不足的信号。', domain: 'family', tags: ['安全', '焦虑', '健康关系'], source: 'preset' },
  { id: 'fam_09', content: '不要试图"修复"你的伴侣——你找的是一个爱人，不是一个项目。接受对方的完整面貌，包括那些你不太喜欢的部分。', domain: 'family', tags: ['接纳', '边界', '尊重'], source: 'preset' },
  { id: 'fam_10', content: '婚姻和恋爱是两个游戏——恋爱是两个人的事，婚姻是两个家庭系统的事。规则不一样，别用恋爱逻辑经营婚姻。', domain: 'family', tags: ['婚姻', '家庭', '现实'], source: 'preset' },
  { id: 'fam_11', content: '分手后别急着回头——大脑在失恋时会产生类似戒断反应的状态。你想回头可能不是还爱他，只是大脑在想要那剂止疼药。', domain: 'family', tags: ['分手', '戒断', '理性'], source: 'preset' },
  { id: 'fam_12', content: '爱的五种语言——肯定的言语、精心的时刻、接受礼物、服务的行动、身体的接触。搞清楚彼此的语言，别用自己的方式去爱一个不需要的人。', domain: 'family', tags: ['表达', '理解', '差异'], source: 'preset' },
  { id: 'fam_13', content: '每次想吐槽伴侣，先问自己：这事五年后还重要吗？——大部分日常摩擦在时间维度下都不值一提。', domain: 'family', tags: ['小事', '视角', '包容'], source: 'preset' },
  { id: 'fam_14', content: '金钱观不合是关系里最大的暗雷——恋爱时不谈钱，结了婚天天为钱吵。储蓄狂和月光族在一起需要提前画好边界。', domain: 'family', tags: ['金钱观', '价值观', '沟通'], source: 'preset' },
  { id: 'fam_15', content: '分开的时候别跟共同朋友站队——尊重彼此过去的时光，也给朋友保留中立的自由。体面离开的人，未来更容易被善意想起。', domain: 'family', tags: ['分手', '体面', '朋友'], source: 'preset' },
  // --- 亲子关系 ---
  { id: 'fam_16', content: '陪伴的质量比时长重要——放下手机全情陪孩子一小时，比在旁边刷朋友圈呆一整个下午有用得多。', domain: 'family', tags: ['陪伴', '质量', '专注'], source: 'preset' },
  { id: 'fam_17', content: '鸡娃不如鸡自己——父母活得精彩、有追求，孩子自然学着向上。你天天躺沙发刷手机却要求娃刷题，说服力在哪。', domain: 'family', tags: ['榜样', '身教', '自我要求'], source: 'preset' },
  { id: 'fam_18', content: '别把自己没完成的人生清单甩给孩子——ta有ta的路。你的遗憾应该是你的教训，不是ta的作业。', domain: 'family', tags: ['期望', '尊重', '独立'], source: 'preset' },
  { id: 'fam_19', content: '表扬努力而不是表扬聪明——"你好聪明"养出的是害怕失败的孩子；"你好努力"养出的是愿意挑战的孩子。', domain: 'family', tags: ['表扬', '成长', '心态'], source: 'preset' },
  { id: 'fam_20', content: '放过完美——没有人能当满分父母。偶尔对孩子发脾气、偶尔不想陪玩，都很正常。够好的父母就够了。', domain: 'family', tags: ['接纳', '减压', '现实'], source: 'preset' },
  { id: 'fam_21', content: '给孩子选择的权力——穿哪双鞋、先做哪科作业，这些都让ta选。从小被剥夺选择权的人，长大后最容易犹豫不决。', domain: 'family', tags: ['自主', '决策力', '成长'], source: 'preset' },
  { id: 'fam_22', content: '犯错是学习的最佳时机——不要在娃犯错时大喊大叫。平静地问三个问题：发生了什么？你学到了什么？下次怎么做？', domain: 'family', tags: ['犯错', '教育', '成长'], source: 'preset' },
  { id: 'fam_23', content: '原生家庭影响你，但不定义你——你可以理解父母为什么那样做，同时也选择不走那条路。打破循环需要勇气，但完全有可能。', domain: 'family', tags: ['原生家庭', '突破', '自我选择'], source: 'preset' },
  { id: 'fam_24', content: '跟父母保持适当的距离——孝顺不是无条件服从。定期电话、常回家看看的同时，重大的决定你自己做。', domain: 'family', tags: ['孝顺', '边界', '自主'], source: 'preset' },
  { id: 'fam_25', content: '你的童年经历决定了你如何表达爱——如果父母从不说"我爱你"，你长大后也可能说不出口。这不是你的错，但你注意到了就可以改。', domain: 'family', tags: ['代际', '表达', '觉察'], source: 'preset' },
  { id: 'fam_26', content: '老人更需要被需要——让父母帮你做点力所能及的事，他们反而更开心。被需要的感觉比任何保健品都续命。', domain: 'family', tags: ['老年', '被需要', '孝顺'], source: 'preset' },
  { id: 'fam_27', content: '别在孩子面前说另一半的坏话——无论你跟伴侣关系多紧张，孩子不需要被迫站队。这对ta的安全感是毁灭性的。', domain: 'family', tags: ['孩子', '安全感', '夫妻关系'], source: 'preset' },
  { id: 'fam_28', content: '教育不是修机器——每个孩子出厂设置就不一样。外向的适合团队项目，内向的适合独立探索。尊重天性比统一标准重要。', domain: 'family', tags: ['天性', '差异', '教育'], source: 'preset' },
  { id: 'fam_29', content: '多说"我愿意跟你商量"而不是"我说了算"——在权威和民主之间找到一个平衡，比永远端着父母的架子效果好得多。', domain: 'family', tags: ['权威', '商量', '尊重'], source: 'preset' },
  { id: 'fam_30', content: '你养孩子的压力一大半来自跟别人比——别的小孩3岁会背唐诗、5岁钢琴四级，但他可能爬树的时候最开心。每个生命有自己的节奏。', domain: 'family', tags: ['比较', '节奏', '焦虑'], source: 'preset' },

  // ============================================================
  // 4. 🌱 成长校园 — 22条
  // ============================================================
  { id: 'gro_01', content: '学历是敲门砖，但不是终身饭票——大学毕业头三年，HR看学历；三年之后，看经历；五年之后，看成果。', domain: 'growth', tags: ['学历', '能力', '长期'], source: 'preset' },
  { id: 'gro_02', content: '选专业看兴趣还是看就业——如果只能选一个，选兴趣。做喜欢的事更容易熬过瓶颈期，熬过去就是稀缺人才。', domain: 'growth', tags: ['专业', '兴趣', '就业'], source: 'preset' },
  { id: 'gro_03', content: '同学的压力不等于你的方向——别人进投行你也进，别人考公你也考。但别人的答案不一定适合你的问题。', domain: 'growth', tags: ['同辈压力', '方向', '自我'], source: 'preset' },
  { id: 'gro_04', content: '考试考的是你的记忆，不是你的智商——别拿考试成绩定义自己。很多后来很厉害的人，当年都不是第一名。', domain: 'growth', tags: ['考试', '自我认知', '长期'], source: 'preset' },
  { id: 'gro_05', content: '辍学成功的都是幸存者——别拿比尔·盖茨辍学来给自己逃课找理由。他辍的是哈佛，而且他当时已经能写出操作系统了。', domain: 'growth', tags: ['幸存者偏差', '辍学', '个案'], source: 'preset' },
  { id: 'gro_06', content: '学习不是为了考试，是为了建立自己的思维框架——毕业后忘掉的知识才是真学到了的东西。剩下的那些叫应试技巧。', domain: 'growth', tags: ['学习', '思维', '框架'], source: 'preset' },
  { id: 'gro_07', content: '成长型思维——相信能力可以后天培养的人，遇到挫折会想"我还要怎么练"；反之则会想"我就是不行"。两种心态通向完全不同的未来。', domain: 'growth', tags: ['成长', '心态', '努力'], source: 'preset' },
  { id: 'gro_08', content: '不是每个人都需要考研——如果是为了逃避找工作而读研，读完出来一样要面对。想清楚再考。', domain: 'growth', tags: ['考研', '逃避', '方向'], source: 'preset' },
  { id: 'gro_09', content: '阅读不是越多越好——一年读100本但每本都只翻目录，不如精读5本并真的去实践。读书的目的不是读完，是用上。', domain: 'growth', tags: ['阅读', '实践', '质量'], source: 'preset' },
  { id: 'gro_10', content: '趁年轻多试错——30岁前换几个方向、走几条弯路的成本，远低于40岁才发现走错了路。试错窗口有价值。', domain: 'growth', tags: ['试错', '年轻', '窗口期'], source: 'preset' },
  { id: 'gro_11', content: '独处的能力是一个人成熟的标志——不需要靠社交填满每一分钟，跟自己待着也能自在的人，内心是富足的。', domain: 'growth', tags: ['独处', '成熟', '内心'], source: 'preset' },
  { id: 'gro_12', content: '毕业后的前五年是能力跃升的黄金期——这段时间你的精力最好、负担最小。拼命学东西，别在这个阶段求安稳。', domain: 'growth', tags: ['黄金期', '学习', '积累'], source: 'preset' },
  { id: 'gro_13', content: '好奇心是最好的老师——对某个领域持续好奇的人，一定比被逼着学的人走得远。保护好你的好奇心，别被刷题教育磨没了。', domain: 'growth', tags: ['好奇', '自驱', '学习'], source: 'preset' },
  { id: 'gro_14', content: '老师对你的判断不一定准确——很多老师用成绩来定义学生。成年后你就会发现，成绩只是人生中极短的一个维度。', domain: 'growth', tags: ['老师', '评价', '长期视角'], source: 'preset' },
  { id: 'gro_15', content: '适应力比任何专业都值钱——世界变化太快，今天热门的技能五年后可能被AI替代。学会学习比学会任何一门技能都重要。', domain: 'growth', tags: ['适应', '学习能力', '变化'], source: 'preset' },
  { id: 'gro_16', content: '别让算法决定你学什么——看了几个考研视频就一直被推考研，让你以为全世界都在考研。主动搜索自己想学的东西。', domain: 'growth', tags: ['信息茧房', '学习', '主动'], source: 'preset' },
  { id: 'gro_17', content: '有好奇心但别容易分心——看到什么新鲜都想学，最后啥也没学会。一年选一个主题深耕，比同时开十个坑有效。', domain: 'growth', tags: ['专注', '深度', '精力'], source: 'preset' },
  { id: 'gro_18', content: '学会提问比知道答案重要——能用问题打开局面的人，往往比背了一堆标准答案的人更厉害。', domain: 'growth', tags: ['提问', '思考', '深度'], source: 'preset' },
  { id: 'gro_19', content: '写作是整理思维最好的方式——脑子里一团浆糊的时候，试着把想法写下来。写到纸上你才发现自己之前有多混乱。', domain: 'growth', tags: ['写作', '理清思路', '输出'], source: 'preset' },
  { id: 'gro_20', content: '学门外语不是为了考试——是为了多一个视角看世界。每种语言承载着一种独特的文化逻辑，学会了，你的认知框架就多一扇窗。', domain: 'growth', tags: ['外语', '视角', '文化'], source: 'preset' },
  { id: 'gro_21', content: '刻意练习的本质不是重复，是在边界上扩张——你已经熟练的内容练再多也只是保温，要想进步必须反复挑战你刚好做不好的那一点。', domain: 'growth', tags: ['刻意练习', '边界', '进步'], source: 'preset' },
  { id: 'gro_22', content: '持续学习的习惯 > 天赋 > 文凭——一个每天看点新东西的人，十年后跟一个停止学习的人比，差距大到像是两个物种。', domain: 'growth', tags: ['终身学习', '习惯', '复利'], source: 'preset' },

  // ============================================================
  // 5. 💰 财富消费 — 20条（原80条中保留14条+新增6条）
  // ============================================================
  { id: 'fin_01', content: '别把鸡蛋搁一个篮子里——分散开来，东边不亮西边亮，晚上睡得踏实。', domain: 'finance', tags: ['分散', '风险', '稳健'], source: 'preset' },
  { id: 'fin_02', content: '把鸡蛋放一个篮子，然后盯紧这个篮子——分散太开反而什么都抓不牢。巴菲特就这路子。', domain: 'finance', tags: ['集中', '专注', '深度'], source: 'preset' },
  { id: 'fin_03', content: '省一分就是挣一分。消费降级比涨工资来得快，小钱不省大钱难留。', domain: 'finance', tags: ['节俭', '消费', '储蓄'], source: 'preset' },
  { id: 'fin_04', content: '钱是挣出来的，不是抠出来的。一门心思省钱不如想想怎么开源，天花板不一样。', domain: 'finance', tags: ['开源', '收入', '思维'], source: 'preset' },
  { id: 'fin_05', content: '现金为王——手里有粮心里不慌。机会来了你得有钱接，危机来了你得有钱扛。', domain: 'finance', tags: ['现金流', '安全', '机会'], source: 'preset' },
  { id: 'fin_06', content: '钱放着就是贬值——通货膨胀在那摆着，现金不配就叫温水煮青蛙。', domain: 'finance', tags: ['通胀', '投资', '增值'], source: 'preset' },
  { id: 'fin_07', content: '复利是世界第八大奇迹。早开始五年比后面多投一倍还管用，时间是你这边的人。', domain: 'finance', tags: ['复利', '长期', '耐心'], source: 'preset' },
  { id: 'fin_08', content: '下落的刀别伸手接——跌的时候抄底，十次有八次割手。等刀插地上不动了再说。', domain: 'finance', tags: ['时机', '风险', '抄底'], source: 'preset' },
  { id: 'fin_09', content: '趋势是你的朋友——别跟市场较劲，顺着走比逆着游省力得多。', domain: 'finance', tags: ['市场', '顺势', '谦逊'], source: 'preset' },
  { id: 'fin_10', content: '不熟不做——买自己没搞明白的东西，跟闭着眼开车差不多。能力圈比收益率重要。', domain: 'finance', tags: ['能力圈', '认知', '谨慎'], source: 'preset' },
  { id: 'fin_11', content: '贵的东西买的时候心疼，用起来天天爽。便宜货买的时候爽，用两次就吃灰。', domain: 'finance', tags: ['消费观', '质量', '长期'], source: 'preset' },
  { id: 'fin_12', content: '平替也很香——不是所有东西都需要买最好的，够用就行，别被消费主义忽悠。', domain: 'finance', tags: ['性价比', '消费', '理性'], source: 'preset' },
  { id: 'fin_13', content: '最好的投资是往自己身上砸——学个能变现的技能、保持健康，谁也拿不走。', domain: 'finance', tags: ['自我提升', '长期', '认知'], source: 'preset' },
  { id: 'fin_14', content: '高回报的东西必然高风险——别人告诉你稳赚不赔的时候，多想想人家图什么。', domain: 'finance', tags: ['风险', '回报', '警惕'], source: 'preset' },
  // 新增
  { id: 'fin_15', content: 'FIRE运动——财务独立、提早退休。核心是极简消费+高储蓄率+被动收入覆盖生活。听上去很美，但你需要先熬过前十年。', domain: 'finance', tags: ['FIRE', '自由', '极简'], source: 'preset' },
  { id: 'fin_16', content: '买房还是租房——没有绝对答案。买房是强制储蓄+安全感，租房是灵活+现金流。算清楚持有成本和机会成本再决定。', domain: 'finance', tags: ['买房', '租房', '算账'], source: 'preset' },
  { id: 'fin_17', content: '不要负债消费——花呗、白条、信用卡分期，都是让你提前花未来的钱。利息加起来吓死人，而你已经习惯了这个生活方式。', domain: 'finance', tags: ['负债', '消费', '警惕'], source: 'preset' },
  { id: 'fin_18', content: '体验比物质更值——旅行一次的记忆五年后还在，同价位的包可能早就丢了。花钱在经历上比花在东西上更让人幸福。', domain: 'finance', tags: ['体验', '消费', '幸福'], source: 'preset' },
  { id: 'fin_19', content: '应急金是自由的第一道防线——至少存够6个月生活费，你才敢对不喜欢的工作说不。没有这笔钱，你就没有议价权。', domain: 'finance', tags: ['应急', '自由', '安全感'], source: 'preset' },
  { id: 'fin_20', content: '钱是工具不是目的——挣钱的终点是为了过你想过的生活。如果挣钱的过程让你痛苦到忘了为什么而挣，那是本末倒置。', domain: 'finance', tags: ['金钱观', '目的', '生活'], source: 'preset' },

  // ============================================================
  // 6. ⚡ 效率习惯 — 18条
  // ============================================================
  { id: 'pro_01', content: '二八定律的日常版——你今天要做的事情里，只有20%真正推动结果。先找出那两件，其他的推掉或者往后放。', domain: 'productivity', tags: ['二八定律', '优先级', '聚焦'], source: 'preset' },
  { id: 'pro_02', content: '吃掉那只青蛙——每天早上先把最难、最不想做的那件事干掉，接下来一整天都轻松。', domain: 'productivity', tags: ['优先级', '拖延', '攻坚'], source: 'preset' },
  { id: 'pro_03', content: '番茄工作法——25分钟全神贯注做一件事，然后休息5分钟。适合"看起来简单但就是不想开始"的那种任务。', domain: 'productivity', tags: ['专注', '时间', '方法'], source: 'preset' },
  { id: 'pro_04', content: '习惯养成不是21天——那是被断章取义的结论。真正的习惯固化可能需要66天甚至更久。关键是中间断了不要自我否定，捡起来继续。', domain: 'productivity', tags: ['习惯', '坚持', '数据'], source: 'preset' },
  { id: 'pro_05', content: '早起不是对所有人都有用——有人是百灵鸟有人是猫头鹰，基因决定的。如果你的效率高峰在半夜，别强迫自己早上5点起来感动自己。', domain: 'productivity', tags: ['睡眠', '个体差异', '效率'], source: 'preset' },
  { id: 'pro_06', content: 'GTD的核心不是做更多事——是把所有该做的事从脑子里搬到一个你信任的系统里，释放你的大脑内存去真正思考。', domain: 'productivity', tags: ['GTD', '系统', '专注'], source: 'preset' },
  { id: 'pro_07', content: '拖延的本质不是懒——是怕做不好、怕结果不如预期、怕迈出第一步之后的压力。认识到这一点，比骂自己懒有用一万倍。', domain: 'productivity', tags: ['拖延', '完美主义', '自我认知'], source: 'preset' },
  { id: 'pro_08', content: '自律不如他律——告诉别人你的目标、找人一起打卡、公开承诺截止时间。利用面子和社会压力来约束自己。', domain: 'productivity', tags: ['自律', '他律', '承诺'], source: 'preset' },
  { id: 'pro_09', content: '环境设计比意志力靠谱——别把薯片放在桌上然后靠意志力不吃。把薯片藏起来、水果放在桌上，直接改环境。', domain: 'productivity', tags: ['环境', '习惯', '设计'], source: 'preset' },
  { id: 'pro_10', content: '不要用忙碌来欺骗自己——回了几十封邮件、开了三个会，感觉自己忙了一整天，但最重要的事纹丝未动。忙碌≠产出。', domain: 'productivity', tags: ['忙碌', '产出', '自我欺骗'], source: 'preset' },
  { id: 'pro_11', content: '学会战略偷懒——有些事做到80分就够了，剩下的时间花在那些必须做到95分的事上。平均用力是最低效的策略。', domain: 'productivity', tags: ['优先级', '偷懒', '效率'], source: 'preset' },
  { id: 'pro_12', content: '每天只列三件必做的事——多出来的完成了算奖励，没完成也不亏欠。长清单只会带来挫败感。', domain: 'productivity', tags: ['清单', '聚焦', '成就感'], source: 'preset' },
  { id: 'pro_13', content: '决策疲劳是真实存在的——做太多小决定会耗尽你的判断力。乔布斯穿同样衣服、扎克伯格同理，就是为了把精力留给大事。', domain: 'productivity', tags: ['决策疲劳', '精力', '精简'], source: 'preset' },
  { id: 'pro_14', content: '两分钟原则——如果一件事两分钟内能做完，立刻做别拖。晾着它占用的心理带宽比做掉它更多。', domain: 'productivity', tags: ['即时行动', '小事', '效率'], source: 'preset' },
  { id: 'pro_15', content: '不要同时追两只兔子——一段时间只设定一个最重要的目标。多线程并行最终往往哪个都没跑远。', domain: 'productivity', tags: ['聚焦', '目标', '专注'], source: 'preset' },
  { id: 'pro_16', content: '你的早晨决定你的一天——起来第一个小时做什么，基本上奠定了接下来八小时的基调。别一睁眼就刷手机。', domain: 'productivity', tags: ['早晨', '仪式', '基调'], source: 'preset' },
  { id: 'pro_17', content: '批量处理同类任务——回复消息集中在三个时间段，别每次手机一震就看。上下文切换的成本比你以为的高得多。', domain: 'productivity', tags: ['批量', '专注', '效率'], source: 'preset' },
  { id: 'pro_18', content: '你的待办清单应该由"重要不紧急"的事主导——如果每天都在救火（重要且紧急），那是你之前没做提前量。这种模式撑不久的。', domain: 'productivity', tags: ['四象限', '规划', '预防'], source: 'preset' },

  // ============================================================
  // 7. 🧠 心智认知 — 20条（保留原80条中心理部分精华）
  // ============================================================
  { id: 'cog_01', content: '沉没成本不是成本。已经搭进去的时间、钱、感情，不该影响你下一步往哪走。', domain: 'cognition', tags: ['沉没成本', '止损', '理性'], source: 'preset' },
  { id: 'cog_02', content: '确认偏误——人天然爱看支持自己观点的东西。真正的思考是主动去找那些打脸的数据。', domain: 'cognition', tags: ['确认偏误', '批判思维', '信息'], source: 'preset' },
  { id: 'cog_03', content: '损失厌恶——丢一百块的难受，大概要赚两百块才能补回来。人对"失去"天然更敏感。', domain: 'cognition', tags: ['损失厌恶', '保守', '情绪'], source: 'preset' },
  { id: 'cog_04', content: '锚定效应——你看到的第一个数字会悄悄变成尺子。原价999现价699，那个999就是锚。', domain: 'cognition', tags: ['锚定', '判断', '偏见'], source: 'preset' },
  { id: 'cog_05', content: '从众效应——周围人都在干一件事的时候，不跟着干挺难受的。但人群并不总是对的。', domain: 'cognition', tags: ['从众', '社交压力', '独立思考'], source: 'preset' },
  { id: 'cog_06', content: '幸存者偏差——你刷到的成功故事只是冰山尖尖，底下沉了多少艘船你看不见。', domain: 'cognition', tags: ['幸存者偏差', '成功学', '统计'], source: 'preset' },
  { id: 'cog_07', content: '过度选择——选项太多反而选不出来。菜单有五十道菜不如五道菜让你吃得开心。', domain: 'cognition', tags: ['选择悖论', '满足', '幸福'], source: 'preset' },
  { id: 'cog_08', content: '框架效应——"成功率90%"和"失败率10%"说的是一回事，但你的反应完全不同。', domain: 'cognition', tags: ['框架', '表述', '决策'], source: 'preset' },
  { id: 'cog_09', content: '近因效应——最近发生的事对你判断的影响，远大于很久以前的事，哪怕后者更重要。', domain: 'cognition', tags: ['近因', '记忆', '偏见'], source: 'preset' },
  { id: 'cog_10', content: '禀赋效应——你手上的东西天然觉得更值钱。一个杯子你买了就觉得别人该出更高的价才肯卖。', domain: 'cognition', tags: ['禀赋效应', '估值', '偏见'], source: 'preset' },
  { id: 'cog_11', content: '赌徒谬误——连开了五次大，你觉得下次该开小了？不对，每次都是独立的。', domain: 'cognition', tags: ['概率', '独立事件', '赌博'], source: 'preset' },
  { id: 'cog_12', content: '峰终定律——你对一段经历的评价，主要取决于最爽（最痛）的时刻和结束时的感受，而不是全程平均。所以约会结尾和旅行收官特别重要。', domain: 'cognition', tags: ['记忆', '体验', '峰值'], source: 'preset' },
  { id: 'cog_13', content: '达克效应——不太懂的人往往最自信，真正懂的反而容易怀疑自己。无知者无畏。', domain: 'cognition', tags: ['自信', '能力', '元认知'], source: 'preset' },
  { id: 'cog_14', content: '控制错觉——人总觉得自己能控制随机事件，骰子掷之前吹口气没用但大家都吹。', domain: 'cognition', tags: ['控制感', '随机', '谦逊'], source: 'preset' },
  { id: 'cog_15', content: '基本归因错误——别人犯错是因为他这个人不行，自己犯错是因为当时情况特殊。这个双标人人都有。', domain: 'cognition', tags: ['归因', '双标', '自省'], source: 'preset' },
  { id: 'cog_16', content: '后见之明——事情发生之后你觉得"我早就知道会这样"。其实当时你什么都不知道。别用马后炮折磨自己。', domain: 'cognition', tags: ['后见之明', '自省', '宽容'], source: 'preset' },
  { id: 'cog_17', content: '可得性启发——容易被回忆起来的事你觉得更常见。新闻天天报飞机失事你就觉得坐飞机很危险，其实开车去机场那段路更危险。', domain: 'cognition', tags: ['可得性', '媒体', '风险评估'], source: 'preset' },
  { id: 'cog_18', content: '人天生是认知吝啬鬼——大脑喜欢走捷径，能不动脑就不动脑。所以重要的决定一定要写下来、列利弊，逼自己动脑。', domain: 'cognition', tags: ['认知吝啬', '深度思考', '方法'], source: 'preset' },
  { id: 'cog_19', content: '你的记忆不是录像机——每次回忆都是重新建构。重要的事情做笔记，别相信"我肯定忘不了"。', domain: 'cognition', tags: ['记忆', '记录', '靠谱'], source: 'preset' },
  { id: 'cog_20', content: '正态分布思维——大多数人在大多数维度上都处于中间位置。别总觉得自己特别差或者特别好，你可能就是中间那一大坨。', domain: 'cognition', tags: ['正态分布', '平常心', '自我认知'], source: 'preset' },

  // ============================================================
  // 8. 🔧 决策工具 — 18条（保留原决策科学+处世精华）
  // ============================================================
  { id: 'dec_01', content: '二阶思维——做了A不只想到A的结果，还要想别人会怎么回应，回应完又会怎样。多想一层。', domain: 'decision', tags: ['二阶思维', '深度', '博弈'], source: 'preset' },
  { id: 'dec_02', content: '汉隆剃刀——能用蠢解释的别用坏来猜。大多数让你不爽的事不是针对你，就是对方没过脑子。', domain: 'decision', tags: ['善意假设', '解释', '社交'], source: 'preset' },
  { id: 'dec_03', content: '奥卡姆剃刀——最简单的解释大概率是对的。绕来绕去的说法要么是忽悠，要么是自己也没想明白。', domain: 'decision', tags: ['简洁', '解释', '效率'], source: 'preset' },
  { id: 'dec_04', content: '10-10-10法则——10分钟后怎么看？10个月后呢？10年后呢？时间一拉长，好多纠结就消散了。', domain: 'decision', tags: ['时间维度', '视角', '影响'], source: 'preset' },
  { id: 'dec_05', content: '后悔最小化——想象自己八十岁了回头看：这个决定你最后悔没做的是什么？选那个。', domain: 'decision', tags: ['后悔', '长期视角', '人生'], source: 'preset' },
  { id: 'dec_06', content: '可逆决策大胆试——能反悔的选择就放手去干，反正可以退回来。不能反悔的才需要好好琢磨。', domain: 'decision', tags: ['可逆性', '风险', '试错'], source: 'preset' },
  { id: 'dec_07', content: '事前验尸——做决定前先想象这个计划已经失败了，"它是怎么死掉的？"然后提前堵住那些窟窿。', domain: 'decision', tags: ['风险管理', '反向思考', '预防'], source: 'preset' },
  { id: 'dec_08', content: '五个为什么——一个问题往下追问五次"为什么"，通常能挖到真正的根。别停在表面。', domain: 'decision', tags: ['追问', '根源', '深度思考'], source: 'preset' },
  { id: 'dec_09', content: '第一性原理——别管别人怎么干的，回到最基本的事实和原理，从零开始想。', domain: 'decision', tags: ['创新', '根本', '独立思考'], source: 'preset' },
  { id: 'dec_10', content: '满意即可而非最优——追求"最好"会让你陷入无穷尽的比较。差不多好就够了，剩下精力干别的。', domain: 'decision', tags: ['满意原则', '效率', '知足'], source: 'preset' },
  { id: 'dec_11', content: '决策疲劳——做太多小决定会耗尽你的判断力。重要的事放在精力好的时候，小事先砍掉。', domain: 'decision', tags: ['精力管理', '优先级', '效率'], source: 'preset' },
  { id: 'dec_12', content: '如果你不是你自己，而是一个朋友来问你这个问题，你会给他什么建议？——换个视角往往更清醒。', domain: 'decision', tags: ['视角转换', '自我抽离', '建议'], source: 'preset' },
  { id: 'dec_13', content: '做决策时写下来——脑子里的想法是混乱的，写到纸上才能看清逻辑漏洞。', domain: 'decision', tags: ['书面思考', '清晰', '逻辑'], source: 'preset' },
  { id: 'dec_14', content: '踩坑比看书学得快——理论告诉你别碰火炉，只有亲手碰过你才知道烫是什么感觉。但大坑还是看看书的好。', domain: 'decision', tags: ['经验', '试错', '学习'], source: 'preset' },
  { id: 'dec_15', content: '灰度思维——世界不是非黑即白的，大多数事卡在灰色地带。接受了这点，做决策就没那么容易钻牛角尖。', domain: 'decision', tags: ['灰度', '复杂', '包容'], source: 'preset' },
  { id: 'dec_16', content: '最坏情况兜底法——你这个选择最差会怎样？能接受吗？如果能，那焦虑就只是噪音。如果不能，先想好退路再动手。', domain: 'decision', tags: ['底线', '安全', '预判'], source: 'preset' },
  { id: 'dec_17', content: '如果信息不足，宁可晚点决定——决策的质量上限是你的信息质量。没搞清楚就匆忙出手，不如等一等。', domain: 'decision', tags: ['信息', '耐心', '时机'], source: 'preset' },
  { id: 'dec_18', content: '直觉和数据要两手抓——纯看数据会忽视人的因素，纯靠直觉会被偏见带偏。好决策是两者相互校准的结果。', domain: 'decision', tags: ['直觉', '数据', '平衡'], source: 'preset' },

  // ============================================================
  // 9. 💪 健康身心 — 18条
  // ============================================================
  { id: 'hea_01', content: '睡眠是地基——睡眠不够的时候，情绪、注意力、记忆力全线崩塌。任何健康习惯，从保证7小时睡眠开始。', domain: 'health', tags: ['睡眠', '基础', '精力'], source: 'preset' },
  { id: 'hea_02', content: '运动不是减肥工具，是大脑保健品——有氧运动提高BDNF（脑源性神经营养因子），直接让你脑子更好使、情绪更稳定。', domain: 'health', tags: ['运动', '大脑', '情绪'], source: 'preset' },
  { id: 'hea_03', content: '身体会替情绪记着——长期压力会转成背痛、胃痛、失眠。听身体说话，别只当做器质性毛病，也可能根子在心情。', domain: 'health', tags: ['身心', '压力', '信号'], source: 'preset' },
  { id: 'hea_04', content: '焦虑是正常的——焦虑本身不是病，是对不确定性的自然反应。只有当你为了逃避焦虑而什么都不敢做的时候，它才是问题。', domain: 'health', tags: ['焦虑', '正常化', '行动'], source: 'preset' },
  { id: 'hea_05', content: '冥想不是玄学是大脑训练——每天10分钟观察呼吸，练的是"不被念头带着走"的能力。跟练肌肉一样，需要持续。', domain: 'health', tags: ['冥想', '注意力', '训练'], source: 'preset' },
  { id: 'hea_06', content: '糖是合法的毒品——它劫持你的奖赏系统。别跟糖较劲靠意志力，直接不让它进家门最有效。', domain: 'health', tags: ['糖', '饮食', '环境设计'], source: 'preset' },
  { id: 'hea_07', content: '预防比治疗便宜一万倍——每年体检花的几百块，可能省下几十万的医药费和不可逆的身体损伤。', domain: 'health', tags: ['预防', '体检', '投资'], source: 'preset' },
  { id: 'hea_08', content: '心理健康和身体健康一样重要——别觉得"我就是太矫情"。持续的消沉、无动力、兴趣减退，该看心理咨询就去看。', domain: 'health', tags: ['心理', '就医', '正视'], source: 'preset' },
  { id: 'hea_09', content: '阳光是免费补剂——每天15分钟户外自然光，调节褪黑素节律、提升维生素D、改善心情。还没副作用。', domain: 'health', tags: ['阳光', '生物钟', '自然'], source: 'preset' },
  { id: 'hea_10', content: '呼吸是最被低估的工具——当你紧张、愤怒、焦虑的时候，深吸一口气停四秒再缓缓呼出。副交感神经被激活，你的身体骗不了大脑。', domain: 'health', tags: ['呼吸', '调节', '即时'], source: 'preset' },
  { id: 'hea_11', content: '坐着是新的吸烟——每天久坐超8小时，心血管风险和代谢问题直线上升。站一站、走两步，比喝什么养生茶都管用。', domain: 'health', tags: ['久坐', '运动', '习惯'], source: 'preset' },
  { id: 'hea_12', content: '心理韧性不是硬扛——是在被打了之后有弹回来的能力，包括允许自己躺一会儿再爬起来。', domain: 'health', tags: ['韧性', '恢复', '自愈'], source: 'preset' },
  { id: 'hea_13', content: '饮食不是非黑即白——别因为吃了一顿炸鸡就觉得全毁了。长期饮食模式比单顿吃的什么重要得多。偶尔放纵不会毁了你。', domain: 'health', tags: ['饮食', '灵活', '长期'], source: 'preset' },
  { id: 'hea_14', content: '一个能坚持的饮食习惯，比一个完美但你两天就放弃的计划强——健康的及格线很低，做到70分就很好。', domain: 'health', tags: ['习惯', '坚持', '及格'], source: 'preset' },
  { id: 'hea_15', content: '别跟自己的荷尔蒙作对——饿了就是饿了，困了就是困了。长期用咖啡因压疲劳、用意志力压饥饿，身体迟早让你加倍还。', domain: 'health', tags: ['身体', '信号', '尊重'], source: 'preset' },
  { id: 'hea_16', content: '社交也是健康的一部分——长期的孤独对身体的伤害相当于每天抽15根烟。维护社交关系和运动、吃好一样重要。', domain: 'health', tags: ['社交', '孤独', '健康'], source: 'preset' },
  { id: 'hea_17', content: '别等到身体报警才开始关注健康——人在健康时总觉得病痛离自己很远。但所有慢性病都是攒出来的，不是突然降临的。', domain: 'health', tags: ['预防', '习惯', '警惕'], source: 'preset' },
  { id: 'hea_18', content: '心理健康不是天天开心——是能接住不开心的时刻，能让负面情绪流过自己而不被它决定你是谁。', domain: 'health', tags: ['心理健康', '接纳', '成熟'], source: 'preset' },

  // ============================================================
  // 10. 🏛️ 生活哲学 — 20条
  // ============================================================
  { id: 'phi_01', content: '斯多葛——分清什么你能控制、什么你不能。控制你对事情的反应，接受事情本身不由你说了算。', domain: 'philosophy', tags: ['斯多葛', '控制', '接受'], source: 'preset' },
  { id: 'phi_02', content: '存在主义——人生没有预设的意义，你得自己给。自由选择的重量叫责任，但也只有自由选择才真正属于你。', domain: 'philosophy', tags: ['存在主义', '自由', '责任'], source: 'preset' },
  { id: 'phi_03', content: '实用主义——一个想法有没有价值，看它能不能帮你在现实中过得更好。它是不是"真理"没那么重要，它管用就行。', domain: 'philosophy', tags: ['实用主义', '效果', '灵活'], source: 'preset' },
  { id: 'phi_04', content: '虚无主义的两面——"一切都没有意义"可以是绝望的理由，也可以是解脱的理由。反正没意义，那就自己去定义什么值得。', domain: 'philosophy', tags: ['虚无主义', '自由', '自我'], source: 'preset' },
  { id: 'phi_05', content: '道家无为——不是什么都不做，是不逆着事物的本性硬来。顺着水流的方向比你逆游省力一百倍。', domain: 'philosophy', tags: ['道家', '无为', '顺应'], source: 'preset' },
  { id: 'phi_06', content: '儒家中庸——不走极端。A有A的道理，B有B的道理，智慧在于找到两者之间的那条路。', domain: 'philosophy', tags: ['中庸', '平衡', '智慧'], source: 'preset' },
  { id: 'phi_07', content: '禅——活在当下不是一个口号，是一项需要刻意练习的能力。吃饭的时候就吃饭，别刷着手机想着下午的会。', domain: 'philosophy', tags: ['禅', '当下', '专注'], source: 'preset' },
  { id: 'phi_08', content: '荒诞主义——人生是荒诞的，人在寻找意义的路上却找不到终极答案。面对这场荒诞，继续过自己的日子就是最大的反抗。', domain: 'philosophy', tags: ['荒诞', '加缪', '坚持'], source: 'preset' },
  { id: 'phi_09', content: '悲观者正确，乐观者成功——看到问题的人永远是大多数，但解决问题的人往往是那个还愿意说"也许可以试试"的傻子。', domain: 'philosophy', tags: ['乐观', '行动', '概率'], source: 'preset' },
  { id: 'phi_10', content: '过程比结果重要——目标是方向，但人生大部分时间都在赶路而非抵达。如果赶路的过程是完全的痛苦，那方向再好也撑不久。', domain: 'philosophy', tags: ['过程', '结果', '旅程'], source: 'preset' },
  { id: 'phi_11', content: '自由vs安全——多一份自由就少一份确定。选择创业就没固定收入的安全网，选择体制内就少了说走就走的自由。两者永远在拉扯。', domain: 'philosophy', tags: ['自由', '安全', '取舍'], source: 'preset' },
  { id: 'phi_12', content: '个人vs集体——在一个重集体的文化里，你是不是总觉得自己为别人而活？完全的自我和完全的奉献之间，你要找到自己的平衡点。', domain: 'philosophy', tags: ['个人', '集体', '平衡'], source: 'preset' },
  { id: 'phi_13', content: '稳定vs变化——稳定让人心安但可能停滞，变化让人兴奋但可能焦虑。人生不同阶段的权重不同，别用二十岁的心态定义四十岁的选择。', domain: 'philosophy', tags: ['稳定', '变化', '阶段'], source: 'preset' },
  { id: 'phi_14', content: '公平vs效率——一个社会（一个公司、一个家庭）不能只要效率不要公平，也不能只要公平不要效率。你倾向于哪一方决定了你在很多事上的立场。', domain: 'philosophy', tags: ['公平', '效率', '价值观'], source: 'preset' },
  { id: 'phi_15', content: '历史是进步的还是循环的——如果你相信历史在进步，那你就相信努力会改变未来。如果你相信循环，那你就更倾向于先保全自己再等风来。', domain: 'philosophy', tags: ['史观', '进步', '循环'], source: 'preset' },
  { id: 'phi_16', content: '英雄造时势还是时势造英雄——是乔布斯改变了手机行业，还是智能手机的时代必然会到来、乔布斯只是那阵风最先吹起来的旗？两种叙事影响你如何看待自己的主动性。', domain: 'philosophy', tags: ['英雄', '时势', '主动性'], source: 'preset' },
  { id: 'phi_17', content: '技术乐观vs技术悲观——互联网让信息更自由了，也制造了史上最大的回音室。AI能解决很多问题，也可能制造新的。你站哪边？', domain: 'philosophy', tags: ['技术', '乐观', '悲观'], source: 'preset' },
  { id: 'phi_18', content: '人是理性的吗——经济学假设人是理性人，但行为经济学用数据告诉你人一点都不理性。你自己生活中的选择是不是经常也经不起推敲？但那又怎样。', domain: 'philosophy', tags: ['理性', '行为', '人性'], source: 'preset' },
  { id: 'phi_19', content: '你的价值观排序——把自由、安全、爱、成就、快乐、意义、健康排个序。排完了你会发现很多纠结都源于排名冲突。', domain: 'philosophy', tags: ['价值观', '排序', '自我认知'], source: 'preset' },
  { id: 'phi_20', content: '选择做一个"好人"本身就是一个哲学选择——没有宇宙法则规定你必须善良。你选择善良，是因为你愿意承担善良的代价。', domain: 'philosophy', tags: ['善良', '选择', '道德'], source: 'preset' },

  // ============================================================
  // 11. 🏮 处世智慧 — 16条（原有精选+新增）
  // ============================================================
  { id: 'wis_01', content: '三思而后行——气头上做的决定，十个有九个会后悔。给自己一晚上的冷静期。', domain: 'wisdom', tags: ['谨慎', '冷静', '决策'], source: 'preset' },
  { id: 'wis_02', content: '机不可失时不再来——有些窗口就那么一瞬间，犹豫一下就翻篇了。', domain: 'wisdom', tags: ['机会', '果断', '时机'], source: 'preset' },
  { id: 'wis_03', content: '船到桥头自然直——好多事到时候自然有办法，提前焦虑也是白焦虑。', domain: 'wisdom', tags: ['乐观', '放松', '顺其自然'], source: 'preset' },
  { id: 'wis_04', content: '人无远虑必有近忧——走一步看一步当然轻松，但麻烦迟早找上门。', domain: 'wisdom', tags: ['规划', '远见', '预防'], source: 'preset' },
  { id: 'wis_05', content: '今朝有酒今朝醉——明天的事明天再说。想太多反而迈不开步子。', domain: 'wisdom', tags: ['及时行乐', '放松', '当下'], source: 'preset' },
  { id: 'wis_06', content: '延迟满足——忍住眼前的糖后面能拿两颗。能等的人，人生长期收益普遍更高。', domain: 'wisdom', tags: ['自控', '长期', '耐心'], source: 'preset' },
  { id: 'wis_07', content: '事缓则圆——有些事急不得，越急越拧巴，搁一搁反而就顺了。', domain: 'wisdom', tags: ['耐心', '等待', '时机'], source: 'preset' },
  { id: 'wis_08', content: '趁热打铁——势头在的时候别停，一鼓作气冲过去。', domain: 'wisdom', tags: ['时机', '冲劲', '执行'], source: 'preset' },
  { id: 'wis_09', content: '知足常乐——幸福不在你拥有多少，在你觉得自己够了。', domain: 'wisdom', tags: ['满足', '幸福', '欲望'], source: 'preset' },
  { id: 'wis_10', content: '取法乎上仅得乎中——把目标定高一点，哪怕只做到八成也比一开始就定低了好。', domain: 'wisdom', tags: ['进取', '目标', '标准'], source: 'preset' },
  { id: 'wis_11', content: '亲兄弟明算账——钱的事一开始就讲清楚，含糊着含糊着就变成了心结。', domain: 'wisdom', tags: ['界限', '金钱', '规则'], source: 'preset' },
  { id: 'wis_12', content: '兼听则明偏信则暗——只听一边的故事容易被人带沟里。', domain: 'wisdom', tags: ['信息', '多元', '决策'], source: 'preset' },
  { id: 'wis_13', content: '吃亏是福——退一步换来的口碑和信任，长远看比争一时之气值钱。', domain: 'wisdom', tags: ['忍耐', '长远', '信任'], source: 'preset' },
  { id: 'wis_14', content: '会哭的孩子有奶吃——不吭声不争取，别人以为你什么都行，资源就绕着你走了。', domain: 'wisdom', tags: ['争取', '表达', '资源'], source: 'preset' },
  { id: 'wis_15', content: '大智若愚——真正懂的人往往看起来不那么聪明，因为他们知道每件事有多复杂。反倒是半桶水最爱晃荡。', domain: 'wisdom', tags: ['谦逊', '智慧', '低调'], source: 'preset' },
  { id: 'wis_16', content: '良言一句三冬暖，恶语伤人六月寒——你的一句话可能改变别人一天、一年甚至一生。说话前先问问这句话有必要吗、是真的吗、是善意的吗。', domain: 'wisdom', tags: ['语言', '善意', '三思'], source: 'preset' },

  // ============================================================
  // 12. 🌐 网络思潮 — 12条
  // ============================================================
  { id: 'tre_01', content: 'YOLO——人就活一次，有些体验哪怕贵点、冒险点也值。老了最怕没故事可讲。', domain: 'trends', tags: ['体验', '冒险', '人生'], source: 'preset' },
  { id: 'tre_02', content: '躺平不是认输——是不想卷了。接受"差不多就行了"，有时候比"必须赢"更健康。', domain: 'trends', tags: ['拒绝内卷', '接纳', '生活方式'], source: 'preset' },
  { id: 'tre_03', content: '断舍离——东西太多心会乱。扔掉不用的不只是物品，还有消耗你的关系和念头。', domain: 'trends', tags: ['极简', '清理', '自由'], source: 'preset' },
  { id: 'tre_04', content: 'FOMO——刷朋友圈觉得全世界都在嗨，只有你一个人在家。其实大家都在家刷手机。', domain: 'trends', tags: ['FOMO', '焦虑', '社交'], source: 'preset' },
  { id: 'tre_05', content: '熵增定律——房间不收拾就自动变乱，生活也是。不主动维持秩序，它会自己滑向混乱。', domain: 'trends', tags: ['熵增', '秩序', '主动'], source: 'preset' },
  { id: 'tre_06', content: '长期主义——今天做的这件事，一年后回头看你会高兴吗？会的话就干。不会的话再想想。', domain: 'trends', tags: ['长期', '坚持', '价值'], source: 'preset' },
  { id: 'tre_07', content: '杠铃策略——一头极度保守保底，一头极度冒险博上限。中间那大块平庸地带，跳过去。', domain: 'trends', tags: ['杠铃策略', '风险', '不对称'], source: 'preset' },
  { id: 'tre_08', content: '信息节食——脑子跟胃一样，垃圾信息灌多了会撑坏。刷一小时短视频比吃炸鸡还伤脑子。', domain: 'trends', tags: ['信息', '注意力', '健康'], source: 'preset' },
  { id: 'tre_09', content: '做难而正确的事——舒服的路越走越窄，难的路越走越宽。但前提是你真心在乎那个方向。', domain: 'trends', tags: ['挑战', '成长', '选择'], source: 'preset' },
  { id: 'tre_10', content: '不下桌就有翻盘的机会——投资也好人生也好，活下来比赢得漂亮重要得多。别一把梭哈。', domain: 'trends', tags: ['生存', '持久', '稳健'], source: 'preset' },
  { id: 'tre_11', content: '反脆弱——有些东西不只扛得住冲击，还能在冲击中变得更强。肌肉、免疫系统、创业公司都是这样。', domain: 'trends', tags: ['反脆弱', '韧性', '成长'], source: 'preset' },
  { id: 'tre_12', content: 'JOMO——不参加那个局、不追那个热点，反而省下大把时间做自己真正喜欢的事。错过的快乐。', domain: 'trends', tags: ['JOMO', '自由', '选择'], source: 'preset' },
]

export const TOTAL_THEORIES = PRESET_THEORIES.length // 252

// 10 representative onboarding questions — 2 from each of 5 core areas
export const ONBOARDING_THEORIES: Theory[] = [
  PRESET_THEORIES.find((t) => t.id === 'fin_01')!,  // 分散投资
  PRESET_THEORIES.find((t) => t.id === 'fin_04')!,  // 钱是挣出来的
  PRESET_THEORIES.find((t) => t.id === 'cog_01')!,  // 沉没成本
  PRESET_THEORIES.find((t) => t.id === 'cog_02')!,  // 确认偏误
  PRESET_THEORIES.find((t) => t.id === 'rel_01')!,  // 信任前置
  PRESET_THEORIES.find((t) => t.id === 'rel_03')!,  // 边界感
  PRESET_THEORIES.find((t) => t.id === 'wis_01')!,  // 三思后行
  PRESET_THEORIES.find((t) => t.id === 'wis_02')!,  // 机不可失
  PRESET_THEORIES.find((t) => t.id === 'dec_03')!,  // 奥卡姆剃刀
  PRESET_THEORIES.find((t) => t.id === 'dec_01')!,  // 二阶思维
]

// Fisher-Yates shuffle
export function shuffleTheories(theories: Theory[]): Theory[] {
  const arr = [...theories]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const DOMAIN_GROUPS = [
  { domain: 'relationships' as const, label: '人际关系', icon: '👥', description: '朋友、社交、边界、信任' },
  { domain: 'career' as const, label: '职场事业', icon: '💼', description: '工作、晋升、跳槽、热爱' },
  { domain: 'family' as const, label: '亲密家庭', icon: '💕', description: '爱情、婚姻、亲子、原生家庭' },
  { domain: 'growth' as const, label: '成长校园', icon: '🌱', description: '学习、考试、选择、年轻试错' },
  { domain: 'finance' as const, label: '财富消费', icon: '💰', description: '投资、消费、省钱、赚钱' },
  { domain: 'productivity' as const, label: '效率习惯', icon: '⚡', description: '习惯、拖延、效率、时间管理' },
  { domain: 'cognition' as const, label: '心智认知', icon: '🧠', description: '偏见、思维、记忆、认知' },
  { domain: 'decision' as const, label: '决策工具', icon: '🔧', description: '框架、方法、思维模型' },
  { domain: 'health' as const, label: '健康身心', icon: '💪', description: '睡眠、运动、饮食、心理' },
  { domain: 'philosophy' as const, label: '生活哲学', icon: '🏛️', description: '哲学、价值观、史观、世界观' },
  { domain: 'wisdom' as const, label: '处世智慧', icon: '🏮', description: '谚语、俗语、祖辈经验' },
  { domain: 'trends' as const, label: '网络思潮', icon: '🌐', description: '当代流行观念和框架' },
]
