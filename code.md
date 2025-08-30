# 代码审查报告（To-Dearest-Mommy）

更新时间：2025-08-31

## 项目概览
- 技术栈：Vite 6 + Vue 3.5（SFC, `<script setup>`）+ TypeScript
- 结构清晰：components、utils、types 分层良好；静态资源位于 `public/templates`；样式集中在 `src/style.css`
- 主要页面：`GreetingCard`（贺卡制作与下载）、`LoveReasons`（爱妈咪理由便签墙）

## 优点亮点
- 组件化良好：模板卡片、便签、头/脚组件拆分细致，props/emit 类型安全
- 视觉体验佳：统一 CSS 变量与玻璃拟态、渐变/动效，交互流畅
- 实用工具：`imageUtils` 封装文件->DataURL、图片缩放与 html2canvas 导出
- 基础类型完善：`CardTemplate`、`GreetingCard`、`LoveReason` 明确

## 问题与改进建议

### 1) 架构与可维护性
- 问题：样式逻辑高度分散在各组件 `<style scoped>` 与全局 `style.css`，存在重复变量/动画命名
- 建议：
  - 建立样式约定与层次：base tokens（颜色/间距/阴影）留全局，组件私有样式尽量本地化；提取通用动画到 `styles/_animations.css`
  - 引入 ESLint + Prettier，统一风格与可读性

### 2) 组件与状态
- 问题：`LoveReasons` 原因列表仅内存持有，刷新即丢失；`GreetingCard` 步骤状态不可持久化
- 建议：
  - 使用 `localStorage` 做轻量持久化（键如 `tdm.reasons`, `tdm.cardDraft`）
  - 增加去重/截断策略与输入校验（长度、空白、重复）

### 3) 类型与数据
- 问题：接口中 `Date` 类型用于运行时，但若未来序列化存储会产生字符串/Date 不一致
- 建议：
  - 存储层统一为 ISO 字符串；读出时解析为 `Date`（或直接以字符串展示）
  - 为 `utils/imageUtils.ts` 补充错误返回类型/Result 风格与超时/取消控制

### 4) 可访问性（A11y）
- 问题：
  - 仅视觉反馈，缺少语义与可聚焦元素（例如卡片选择、进度步骤）
  - 动画较多，未尊重 `prefers-reduced-motion`
  - 颜色对比部分场景偏低（浅色文本叠加渐变背景）
- 建议：
  - 为交互元素补充语义与键盘操作：`role="button"`、`aria-pressed`、`aria-current`、`tabindex`、`aria-live="polite"`（成功消息）
  - 样式层加入 `@media (prefers-reduced-motion: reduce)` 降低/关闭动画
  - 使用对比度检查（目标文本对比度 ≥ 4.5:1）

### 5) 性能
- 问题：
  - 大量阴影/渐变/动画可能影响移动端 FPS
  - html2canvas 以 `scale: 2` 渲染，低端设备可能内存紧张
- 建议：
  - 为下载提供「清晰度选项」（1x / 1.5x / 2x）；失败时降级提示
  - 在图片处理加入 `toBlob` 并控制质量与最长边，降低体积
  - 对滚动进入区域的装饰/动画做惰性启用

### 6) 隐私与资源
- 问题：
  - 用户上传照片处理在前端，但项目无隐私声明；跨域图片用于画布可能触发 taint（依赖 CORS）
- 建议：
  - 提供简短隐私声明：仅本地处理、不上传服务器；下载完成后可提示清除草稿
  - 为模板图片设置 `crossorigin`（或继续放 `public/` 同源）

### 7) 构建与工程化
- 问题：缺少 Lint/测试/CI；Vite `base` 未配置，若部署到子路径（如 GitHub Pages）会出问题
- 建议：
  - 新增：ESLint（@antfu/eslint-config 或 vue 官方配置）、Prettier、Vitest + @vue/test-utils
  - CI：GitHub Actions 执行 typecheck/lint/test/build
  - 若发布到 GH Pages，设置 `vite.config.ts` 的 `base: '/To-Dearest-Mommy/'`

### 8) UI/UX 小项
- 输入框字符计数超限仅变色，建议禁止提交并给出错误文案
- 进度条 33/34% 粗糙，可改为步骤完成度 0/50/100 或按需分配

## 风险清单（按影响×概率）
- 移动端卡顿/导出失败（高×中）
- A11y 不达标影响可用性（中×高）
- 子路径部署资源 404（中×中）
- 本地数据未持久化导致用户流失（中×中）

## 快速改进优先级
- P0（本周）
  - 本地持久化草稿与理由墙；输入校验与去重（已实现：storage.ts、GreetingCard、LoveReasons）
  - `prefers-reduced-motion` 支持；为交互元素补 aria/键盘焦点（已实现：全局 CSS、CardTemplate、GreetingCard、成功消息 aria-live）
  - 下载清晰度选项与失败降级提示（已实现：imageUtils 支持 1x/1.5x/2x 与降级；UI 选择器）
- P1（下周）
  - ESLint/Prettier/Vitest + 基础单元测试；GitHub Actions CI
  - `vite.config.ts` 补 `base`（若需子路径部署）
  - 简短隐私声明页与页脚链接
- P2（随后）
  - i18n（zh-CN/EN）；更多模板与主题切换
  - 性能细化（图片 toBlob 压缩、动画惰性启动）

## 质量门禁速查
- Build：未执行（可通过 pnpm run build 验证）
- Typecheck：已在编辑器静态检查通过（关键文件无错误）
- Lint：未配置
- Test：未配置

可选本地验证（Windows cmd）：

```cmd
pnpm i
pnpm run build
pnpm run preview
```

## 需求覆盖
- 创建代码审查报告：已提交 `code.md`
- 创建产品待办事项：见 `product.md`
