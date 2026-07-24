# 慧咪 v0.4 — Agent Harness 对话式架构

## Context

当前是表单工作流：填表 → 等进度条 → 做情景题 → 做追问 → 等分析 → 看结果。用户被推着走，交互僵硬。

改造为 Agent Harness：用户打开聊天框说一句话，咪儿自然对话引导，聊着聊着就把决策做了。AI 决定什么时候问诊、什么时候探测、什么时候给建议——而不是预设的页面流程。

## 核心理念

```
Workflow（旧）:  用户 → 页面1 → 页面2 → 页面3 → 结果        （人在走流程）
Agent（新）:     用户 ↔ 咪儿 ↔ [工具：查理论/生成情景/分析]    （AI 在驱动）
```

## 架构概览

```
ChatPage
  ├─ MessageList          ← 聊天记录，自动滚到底
  │   ├─ ChatBubble       ← 用户消息 / 咪儿消息
  │   └─ ScenarioCard     ← 复用：情景选择嵌在对话里
  ├─ ChatInput            ← 输入框 + 发送按钮
  └─ Agent Loop（核心）
       ├─ System Prompt   ← 咪儿人设 + 决策协议
       ├─ Tools           ← 理论匹配 / 情景生成 / 分析
       └─ Streaming       ← 流式输出，打字机效果
```

## 咪儿的 System Prompt 设计

```
你是「慧咪」，一只帮人做决策的猫。你不是冷冰冰的 AI 顾问——
你是一只会认真听、慢慢问、最后轻声说出建议的猫。

## 你的风格
- 温暖、好奇、不评判。像朋友聊天，不像专家诊断。
- 用语口语化，偶尔用「喵」「咪儿觉得…」「唔…」
- 不要学术术语，不要"认知偏误"、"沉没成本"这类词
- 短句为主，每次不超过 3-4 句话

## 你的工作方式
当用户跟你聊一个困境时，你按这个节奏来——但不是死板的流程，是自然的对话：

1. **先听**：用户说了困境后，先共情，再说你听到了什么。
   "唔，异地确实很累。咪儿听到了——你们已经异地半年，你开始不确定这段关系还能不能走下去，对吗？"

2. **再问（像医生问诊）**：了解会影响建议的具体事实。
   - 你俩在一起多久了？异地之前感情怎么样？
   - 有没有聊过什么时候结束异地？
   - 如果没有任何现实障碍，你心里还爱她吗？

3. **探测（如果需要）**：把理论变成具体的二选一。
   用「<scenario>标签包裹理论名和情景</scenario>」，前端会自动渲染成卡片。
   "<scenario name='止损还是坚持' id='cog_01' options='[{\"label\":\"再坚持半年看看\",\"value\":\"stay\"},{\"label\":\"现在放手，及时止损\",\"value\":\"leave\"}]'>你已经为这段关系付出了两年。如果现在放手，你觉得是「及时止损」，还是觉得「不甘心」？</scenario>"

4. **分析**：聊够了，说一声「咪儿帮你理一理」，然后用 <analysis> 标签给出结构化建议。
   ```

## 新组件

### ChatBubble（新建）
- 用户消息：右对齐，浅色背景
- 咪儿消息：左对齐，带猫图标，支持 Markdown
- 咪儿消息中的 `<scenario>` 标签 → 自动渲染为 ScenarioCard
- 咪儿消息中的 `<analysis>` 标签 → 渲染为结构化分析卡片

### ChatInput（新建）
- 固定在底部的输入栏
- 多行 textarea + 发送按钮
- Enter 发送，Shift+Enter 换行

### ChatPage（新建）
- 全屏聊天界面
- 顶部：返回首页按钮 + 标题「跟咪儿聊聊」
- 首次进入：咪儿主动打招呼 "喵～有什么拿不定主意的？跟咪儿说说。"
- 复用现有的 LoadingSpinner、Toast

## 修改的组件

### ScenarioCard
- 加 `inline` prop：在聊天中嵌入时更紧凑的样式（小卡片，无边距）

### LandingPage
- CTA 按钮改为「跟咪儿聊聊」→ 导航到 `/chat`
- 保留「深度分析」小字链接 → `/decide`（旧的完整流程）

### Navbar
- 加「聊天」导航项 `/chat`

### App.tsx
- 加 `/chat` 路由

## 新增 AI Service

### `sendChatMessage(config, messages, onChunk): Promise<string>`
- 支持 Claude 流式（`anthropic.messages.stream()`）
- 支持 DeepSeek 流式（SSE 解析）
- `onChunk(text)` 回调逐个 token 更新 UI

## 聊天状态管理

在 AppState.probing 下新增：
```typescript
chat: {
  messages: ChatMessage[]     // 对话历史
  isStreaming: boolean        // 是否正在生成回复
}
```

ChatMessage 类型：
```typescript
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string             // Markdown，可能包含 <scenario> / <analysis>
  createdAt: string
}
```

## Agent Loop

```
用户发消息
  →
1. 构建 messages 数组（system prompt + 历史对话 + 新消息）
2. 调用 sendChatMessage()，流式接收
3. 解析流式内容中的 <scenario> / <analysis> 标签
4. 渲染到 ChatBubble：
   - 纯文本 → Markdown 渲染
   - <scenario> → ScenarioCard（用户点击后 answer 发回给 AI）
   - <analysis> → 分析卡片
5. 用户对 scenario 的选择 → 作为用户消息发回 AI 继续对话
```

## 不删除的旧内容

- DecidePage + ProbingPage + ResultPage 保留，作为「深度分析」入口
- 所有现有 AI 函数保留
- 理论库、知识库不变

## 实现顺序

1. **类型 + 状态**：ChatMessage、chat state、reducer actions
2. **AI Streaming**：sendChatMessage（Claude + DeepSeek）
3. **ChatBubble**：渲染消息 + 解析 scenario/analysis 标签
4. **ChatInput**：输入框组件
5. **ChatPage**：整合消息列表 + 输入框 + Agent Loop
6. **路由 + 导航**：/chat 路由、Navbar 加聊天、首页 CTA 改
7. **咪儿 System Prompt**：精调人格和对话节奏

## 验证

1. 打开首页 → 点「跟咪儿聊聊」→ 咪儿打招呼
2. 输入一个困境（如"我对象是不是不要我了"）→ 咪儿共情 + 反问
3. 回答几个问题 → 咪儿可能穿插 scenario 卡片
4. 点击卡片选项 → 咪儿收到选择，继续对话
5. 聊到一定程度 → 咪儿给出结构化分析
6. 刷新页面 → 聊天记录保留（localStorage）
