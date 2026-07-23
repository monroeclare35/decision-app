---
name: deploy-workflow
description: 代码改动后的部署流程：build → commit → push GitHub → Vercel 自动部署
metadata:
  type: reference
---

# 部署工作流

代码改完后，用户会执行以下流程：

1. **构建检查** (终端):
   ```
   npm run build
   ```
   或类似的 npm 命令（通常 3 行以内）

2. **推送代码**:
   通过 git push 到 GitHub: https://github.com/monroeclare35/decision-app

3. **自动部署**:
   Vercel 自动从 GitHub 拉取并部署到: https://decision-app-ebon-tau.vercel.app

**Why:** 用户期望改动后能快速在浏览器看到效果，整个流程从改代码到线上生效。

**How to apply:** 改动完成后提醒用户运行 build 确认无误，然后他们自己 git push。不需要替用户 commit/push（除非明确要求）。
