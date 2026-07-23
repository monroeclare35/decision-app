---
name: project-overview
description: 决策助手 App 的整体架构、技术栈和功能模块
metadata:
  type: project
---

# 决策助手 (decision-app)

一个帮助用户做人生决策的 AI 辅助应用。

## 技术栈
- React 18 + TypeScript + Vite + Tailwind CSS + React Router v6
- AI: Claude API (`@anthropic-ai/sdk`) + DeepSeek
- 状态管理: Context + Reducer，localStorage 持久化
- 部署: Vercel (自动部署)

## 页面路由
- `/` — LandingPage (首页)
- `/onboarding` — OnboardingPage (新手引导，10 条理论打分)
- `/decide` — DecidePage (写决策描述，选分类，AI 分析)
- `/result/:id` — ResultPage (结果展示：分析、反向观点、行动建议、案例、信念反思)
- `/knowledge` — KnowledgePage (知识库：信念 + 金句 + 文章摘要)
- `/theories` — TheoriesPage (理论库：252 条理论，12 个领域)
- `/history` — HistoryPage (历史决策记录)
- `/settings` — SettingsPage (AI provider 切换、API Key)

## 核心数据模型
- **Theory**: 理论/原则，来自 12 个领域，source = preset/ai/user
- **Category**: 决策分类 — love(感情) / money(消费/投资) / study_work(学业/事业) / social(人际关系) / daily(日常困扰)
- **KnowledgeItem**: 知识库条目 — belief / quote / article
- **Decision**: 决策记录 — 描述 + 分类 + AI 结果
- **DecisionResult**: 匹配理论、知识、个性化分析、反向观点、行动建议、相似案例、信念反思
