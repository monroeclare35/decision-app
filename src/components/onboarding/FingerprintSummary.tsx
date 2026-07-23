import { useMemo } from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import { Link } from 'react-router-dom'
import { ONBOARDING_SCENARIOS, PRESET_THEORIES } from '../../data/theories'

// Tag-based dimension analysis.
// Each theory in PRESET_THEORIES has tags — we aggregate chosen-theory tags
// to reveal the user's actual tendencies (not just domain distribution).

interface ProfileDimensions {
  risk: 'conservative' | 'balanced' | 'aggressive'  // 风险态度
  think: 'rational' | 'intuitive'                     // 思维方式
  social: 'trusting' | 'cautious'                     // 社交倾向
  decide: 'analytical' | 'practical'                  // 决策速度
}

// Map tag keywords to dimensions
const TAG_RISK_CONSERVATIVE = new Set(['安全', '储蓄', '稳健', '止损', '备胎', '退路', '保守', '忍耐', '生存', '节俭'])
const TAG_RISK_AGGRESSIVE = new Set(['冒险', '冲劲', '机会', '开源', '收入', '自由', '进取', '果断'])
const TAG_THINK_RATIONAL = new Set(['理性', '逻辑', '批判', '客观', '分析', '复盘', '冷静'])
const TAG_THINK_INTUITIVE = new Set(['直觉', '感受', '情绪', '冲动', '本能', '体验', '热爱'])
const TAG_SOCIAL_TRUSTING = new Set(['信任', '善意', '开放', '坦诚', '沟通', '直球'])
const TAG_SOCIAL_CAUTIOUS = new Set(['边界', '界限', '保留', '警惕', '距离', '底线', '备胎'])
const TAG_DECIDE_ANALYTICAL = new Set(['分析', '深思', '三思', '权衡', '规划', '长远', '准备'])
const TAG_DECIDE_PRACTICAL = new Set(['行动', '执行', '简单', '简化', '果断', '当下', '快速'])

function classifyTags(tags: string[]): ProfileDimensions {
  let riskConservative = 0, riskAggressive = 0
  let thinkRational = 0, thinkIntuitive = 0
  let socialTrusting = 0, socialCautious = 0
  let decideAnalytical = 0, decidePractical = 0

  for (const tag of tags) {
    if (TAG_RISK_CONSERVATIVE.has(tag)) riskConservative++
    if (TAG_RISK_AGGRESSIVE.has(tag)) riskAggressive++
    if (TAG_THINK_RATIONAL.has(tag)) thinkRational++
    if (TAG_THINK_INTUITIVE.has(tag)) thinkIntuitive++
    if (TAG_SOCIAL_TRUSTING.has(tag)) socialTrusting++
    if (TAG_SOCIAL_CAUTIOUS.has(tag)) socialCautious++
    if (TAG_DECIDE_ANALYTICAL.has(tag)) decideAnalytical++
    if (TAG_DECIDE_PRACTICAL.has(tag)) decidePractical++
  }

  return {
    risk: riskAggressive > riskConservative ? 'aggressive' : 'conservative',
    think: thinkIntuitive > thinkRational ? 'intuitive' : 'rational',
    social: socialTrusting > socialCautious ? 'trusting' : 'cautious',
    decide: decidePractical > decideAnalytical ? 'practical' : 'analytical',
  }
}

interface ChosenTheory {
  theoryContent: string
  scenarioSituation: string
  optionLabel: string
}

interface Portrait {
  riskLabel: string
  riskDesc: string
  thinkLabel: string
  thinkDesc: string
  socialLabel: string
  socialDesc: string
  decideLabel: string
  decideDesc: string
  headline: string
  chosenTheories: ChosenTheory[]
}

function buildPortrait(
  dims: ProfileDimensions,
  chosenTheories: ChosenTheory[],
  total: number
): Portrait {
  const riskMap: Record<string, { label: string; desc: string }> = {
    conservative: { label: '风险厌恶', desc: `${total} 道题中，你更倾向于保守安全的选择——守住已有的，不轻易押注不确定的事。手里有粮心里不慌。` },
    aggressive: { label: '积极进取', desc: `${total} 道题中，你多次选择了更有风险但也更有回报的方向。机会来的时候你敢出手。` },
    balanced: { label: '灵活平衡', desc: '你在保守和进取之间灵活切换——看情况来，不死板也不冒进。' },
  }

  const thinkMap: Record<string, { label: string; desc: string }> = {
    rational: { label: '理性思考', desc: '你的选择倾向于数据分析、逻辑推理和冷静判断。情绪来了你能踩刹车。' },
    intuitive: { label: '直觉驱动', desc: '你的选择更多依赖当下的感受和直觉——你相信身体和情绪会告诉你答案。' },
  }

  const socialMap: Record<string, { label: string; desc: string }> = {
    trusting: { label: '信任前置', desc: '面对人际关系，你默认选择相信对方——先开门，等证据再关。' },
    cautious: { label: '边界优先', desc: '你在关系中第一反应是保护自己的边界——不是冷漠，是懂得自我保护。' },
  }

  const decideMap: Record<string, { label: string; desc: string }> = {
    analytical: { label: '深思熟虑', desc: '你做决定之前会反复想、想得很深——二阶效应、长远影响，你都会考虑。' },
    practical: { label: '快速落地', desc: '你不喜欢绕来绕去，差不多够了就动手。完美的分析不如实际行动。' },
  }

  const headlines: Record<string, string> = {
    'conservative-rational-cautious-analytical': '你像一个精算师——审慎、理性、重视边界、想得很深。',
    'conservative-rational-cautious-practical': '你务实且清醒——知道风险在哪，也懂得适可而止。',
    'conservative-rational-trusting-analytical': '你是温和的谋士——计算过风险，但仍愿意对人投信任票。',
    'conservative-rational-trusting-practical': '你是在乎安全感的实践者——不冒险，不猜疑，做就完了。',
    'conservative-intuitive-cautious-analytical': '你感性细腻但行为谨慎——直觉告诉你方向，理智帮你画边界。',
    'conservative-intuitive-cautious-practical': '你靠直觉避开坑——感受到危险就撤退，不多纠结。',
    'conservative-intuitive-trusting-analytical': '你心软但脑子清醒——对人敞开，对自己严格。',
    'conservative-intuitive-trusting-practical': '你温暖且可靠——先信人，先做事，不多想。',
    'aggressive-rational-cautious-analytical': '你胆大但算得精——敢冲，但不是盲冲。',
    'aggressive-rational-cautious-practical': '你是冷面棋手——出手快，也算得快，但对人保持距离。',
    'aggressive-rational-trusting-analytical': '你是有计划的冒险家——相信自己，也相信队友。',
    'aggressive-rational-trusting-practical': '你是行动派领袖——冲就完了，带着大家一起。',
    'aggressive-intuitive-cautious-analytical': '你内心狂野但外表冷静——冲动和克制在你体内并存。',
    'aggressive-intuitive-cautious-practical': '你是独狼——信自己，快速出拳，和人保持距离。',
    'aggressive-intuitive-trusting-analytical': '你是浪漫的赌徒——对人和机遇都充满热情，但不忘复盘。',
    'aggressive-intuitive-trusting-practical': '你是天生的破局者——直觉推着你往前走，你从不回头看。',
  }

  const key = `${dims.risk}-${dims.think}-${dims.social}-${dims.decide}`
  const headline = headlines[key] || '你的决策画像很独特——不同的维度的组合说明你不容易被单一标签概括。'

  return {
    riskLabel: riskMap[dims.risk]?.label || '',
    riskDesc: riskMap[dims.risk]?.desc || '',
    thinkLabel: thinkMap[dims.think]?.label || '',
    thinkDesc: thinkMap[dims.think]?.desc || '',
    socialLabel: socialMap[dims.social]?.label || '',
    socialDesc: socialMap[dims.social]?.desc || '',
    decideLabel: decideMap[dims.decide]?.label || '',
    decideDesc: decideMap[dims.decide]?.desc || '',
    headline,
    chosenTheories,
  }
}

export function FingerprintSummary() {
  const { state } = useAppContext()
  const { onboardingAnswers } = state.probing

  const portrait = useMemo(() => {
    const answers = onboardingAnswers.filter((a) => a.phase === 'onboarding' && a.selectedOption !== 'skipped')

    // Collect all tags from chosen theories
    const allTags: string[] = []
    const chosenTheories: ChosenTheory[] = []

    for (const answer of answers) {
      const scenario = ONBOARDING_SCENARIOS.find((s) => s.id === answer.scenarioId)
      if (!scenario) continue

      const theoryId = scenario.theoryMapping[answer.selectedOption]
      if (!theoryId) continue

      const theory = PRESET_THEORIES.find((t) => t.id === theoryId)
      if (!theory) continue

      allTags.push(...theory.tags)

      const optionLabel = scenario.options.find((o) => o.value === answer.selectedOption)?.label || ''
      chosenTheories.push({
        theoryContent: theory.content,
        scenarioSituation: scenario.situation,
        optionLabel,
      })
    }

    const dims = classifyTags(allTags)
    return buildPortrait(dims, chosenTheories, answers.length)
  }, [onboardingAnswers])

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <span className="text-6xl">🧬</span>
        <h2 className="mt-4 text-2xl font-bold text-surface-800">你的决策指纹已生成</h2>
        <p className="mt-2 text-sm text-surface-500">
          基于你的情景选择，我们分析了 4 个维度的决策倾向
        </p>
      </div>

      {/* Headline */}
      <div className="card rounded-2xl bg-surface-800 p-6 text-white">
        <p className="text-base leading-relaxed">{portrait.headline}</p>
      </div>

      {/* 4 Dimensions */}
      <div className="grid grid-cols-2 gap-3">
        {/* Risk */}
        <div className="card rounded-2xl bg-white p-5">
          <p className="mb-1 text-xs font-medium text-surface-400">风险态度</p>
          <p className="text-base font-bold text-surface-800">{portrait.riskLabel}</p>
          <p className="mt-2 text-xs leading-relaxed text-surface-500">{portrait.riskDesc}</p>
        </div>

        {/* Think */}
        <div className="card rounded-2xl bg-white p-5">
          <p className="mb-1 text-xs font-medium text-surface-400">思维模式</p>
          <p className="text-base font-bold text-surface-800">{portrait.thinkLabel}</p>
          <p className="mt-2 text-xs leading-relaxed text-surface-500">{portrait.thinkDesc}</p>
        </div>

        {/* Social */}
        <div className="card rounded-2xl bg-white p-5">
          <p className="mb-1 text-xs font-medium text-surface-400">社交倾向</p>
          <p className="text-base font-bold text-surface-800">{portrait.socialLabel}</p>
          <p className="mt-2 text-xs leading-relaxed text-surface-500">{portrait.socialDesc}</p>
        </div>

        {/* Decide */}
        <div className="card rounded-2xl bg-white p-5">
          <p className="mb-1 text-xs font-medium text-surface-400">决策节奏</p>
          <p className="text-base font-bold text-surface-800">{portrait.decideLabel}</p>
          <p className="mt-2 text-xs leading-relaxed text-surface-500">{portrait.decideDesc}</p>
        </div>
      </div>

      {/* Chosen theories */}
      {portrait.chosenTheories.length > 0 && (
        <div className="card rounded-2xl bg-white p-6">
          <h3 className="mb-3 text-sm font-semibold text-surface-600">
            是什么让你做出了这些选择
          </h3>
          <div className="space-y-3">
            {portrait.chosenTheories.map((ct, i) => (
              <div key={i} className="rounded-xl border border-surface-100 bg-surface-50/50 p-4">
                <p className="text-xs text-surface-400">{ct.scenarioSituation}</p>
                <div className="mt-2 flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-medium text-primary-600">
                    你选了
                  </span>
                  <span className="text-xs text-surface-600">{ct.optionLabel}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-surface-500">
                  这揭示了：{ct.theoryContent}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/decide"
          className="inline-flex items-center gap-2 rounded-2xl bg-surface-800 px-8 py-4 text-base font-medium text-white transition-all hover:bg-surface-700 active:scale-95"
        >
          🚀 开始做第一个决定
        </Link>
      </div>
    </div>
  )
}
