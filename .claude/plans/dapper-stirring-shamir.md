# 情景化交互改造方案

## Context

当前所有打分都是对抽象原理做 0-5 评分（"沉没成本不是成本，你认同吗？"），用户全部打满分，没有区分度。改造为：**用微型情景探测用户的真实选择，揭示"你以为你遵循 X，但你的选择说明你实际偏向 Y"——这个 gap 才是核心价值**。

涉及三个场景：新手引导（10 题，手写情景）、困境理论探测（AI 生成 5-8 题）、追问探测（AI 生成 3-5 题）。

---

## 新决策流程

```
用户描述困境 → 选分类 → 点提交
  ↓
Phase B: AI 匹配最相关的 5-8 条理论 → 每条生成情景问题 → 用户逐题选择
  ↓
Phase C: AI 审视 B 的回答，发现矛盾 → 生成 3-5 道深化追问 → 用户逐题选择
  ↓
所有数据（困境 + B 回答 + C 回答）→ AI 深度分析 → 结果页
```

---

## 新增类型 (`src/types/index.ts`)

```typescript
ScenarioOption { label: string; value: string }
OnboardingScenario { id; situation; options; theoryMapping; revealedContent; domain; tags }
ProbeScenario { id; theoryId; theoryContent; situation; options }
ScenarioAnswer { scenarioId; selectedOption; theoryId; phase; timestamp }
DecisionProbeState { phase; probeScenarios[]; followUpScenarios[]; scenarioAnswers[]; currentIndex; dilemma; category }
```

AppState 新增 `probing: { currentState: DecisionProbeState | null; onboardingAnswers: ScenarioAnswer[] }`

---

## 改哪些文件（按实现顺序）

### Phase 1 — 类型和数据
1. **`src/types/index.ts`** — 新增上述类型，AppState 加 probing 字段
2. **`src/constants/config.ts`** — 加 `PROBE_SCENARIO_COUNT=8`, `FOLLOW_UP_COUNT=5`
3. **`src/constants/storage.ts`** — 加 `PROBE_STATE`, `ONBOARDING_ANSWERS` 两个 key
4. **`src/data/theories.ts`** — 用 `ONBOARDING_SCENARIOS`（10 道手写情景）替换 `ONBOARDING_THEORIES`，PRESET_THEORIES（252 条）不动

### Phase 2 — 状态管理
5. **`src/contexts/appReducer.ts`** — 加 5 个新 action：SET_PROBE_STATE / RECORD_SCENARIO_ANSWER / ADVANCE_PROBE_INDEX / CLEAR_PROBE_STATE / LOAD_ONBOARDING_ANSWERS
6. **`src/contexts/AppContext.tsx`** — 加载/持久化 probing 数据，暴露新便利方法

### Phase 3 — 核心组件
7. **`src/components/onboarding/ScenarioCard.tsx`** *(新建)* — 两态卡片：选择态（情景 + 选项按钮）+ 揭示态（高亮选择 + 理论揭示文），键盘快捷键 1/2/3
8. **`src/components/onboarding/FingerprintSummary.tsx`** — 改用 ScenarioAnswer[] 分析，新分类：价值观稳定型 / 情境依赖型 / 灵活适应型 / 领域偏好型

### Phase 4 — AI 服务
9. **`src/services/promptTemplates.ts`** — 新增 `buildProbeScenariosPrompt`、`buildFollowUpScenariosPrompt`，修改 `buildAdvicePrompt` 接受 scenarioAnswers 入参
10. **`src/services/ai.ts`** — 新增 `generateProbeScenarios()` 和 `generateFollowUpScenarios()`，沿用 Claude/DeepSeek 双 provider 模式

### Phase 5 — Hooks
11. **`src/hooks/useOnboarding.ts`** — `currentTheory` → `currentScenario`，`rateAndNext` → `answerAndNext(optionValue)`，记录 ScenarioAnswer
12. **`src/hooks/useProbing.ts`** *(新建)* — 管理探测全流程：answerCurrent / skipCurrent / startFollowUp / submitFinal
13. **`src/hooks/useDecisionSubmit.ts`** — 拆成两步：`submitDilemma`（生成 B 阶段情景 → 导航到 /probing）和 `submitFinalAnalysis`（收集所有回答 → AI 分析 → 保存决策）

### Phase 6 — 页面
14. **`src/pages/OnboardingPage.tsx`** — TheoryCard 换 ScenarioCard，加 showReveal 本地状态
15. **`src/pages/DecidePage.tsx`** — handleSubmit 改为导航到 /probing
16. **`src/pages/ProbingPage.tsx`** *(新建)* — 承载 B 和 C 两个阶段，进度条 + ScenarioCard + 加载态
17. **`src/pages/ResultPage.tsx`** — 顶部新增"探测旅程总结"区块
18. **`src/App.tsx`** — 加 `/probing` 路由

---

## 关键设计决策

- **ScenarioAnswer ≠ Theory Rating**：用户选了"在家休息"不等于给沉没成本理论打 5 分，系统只记录选择 + 揭示的理论，由 AI 在最终分析中解读模式
- **旧组件不删除**：TheoryCard、RatingStars 保留不动，避免影响理论浏览页等
- **刷新恢复**：probing 状态持久化到 localStorage，刷新后从 `currentIndex` 恢复；Phase C 生成中途刷新则检测到 followUpScenarios 为空后重新触发
- **AI 失败兜底**：如果场景生成失败，显示错误 + "跳过探测，直接分析"按钮，降级到原有单次分析流程

---

## 验证

1. 新手引导：走完 10 道情景题，确认每道有选择→揭示→下一题流程，最终 FingerprintSummary 展示风格分类而非强分阵营
2. 决策探测：提交困境 → AI 生成情景 → 逐题回答 → 追问阶段 → 最终分析 → 结果页含探测总结
3. 刷新恢复：探测中途刷新浏览器，确认恢复到当前题目
4. 降级：断开网络提交困境，确认出现跳过探测的兜底选项
