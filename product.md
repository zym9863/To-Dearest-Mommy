# 产品待办事项（To-Dearest-Mommy）

更新时间：2025-08-31

## 目标与愿景
- 让用户快速为妈妈制作个性化电子贺卡，并收集“爱妈咪的理由”，留下温馨数字记忆。
- 优先保障移动端流畅、可访问、隐私友好。

## 里程碑划分
- M1 可用版：贺卡制作三步流顺畅、可下载；理由墙可添加与持久化；移动端不卡顿
- M2 体验版：A11y 达标、轻量动画策略、基本国际化、隐私声明上线
- M3 成长版：更多模板主题、分享与导入导出、基础测试与CI稳定、性能工具化

---

## Must（必须）
1. 本地持久化（draft + 理由墙）
   - 描述：将 `GreetingCard` 草稿（模板ID、祝福语、图片DataURL或引用）与 `LoveReasons` 列表存入 localStorage。
   - 验收：刷新后数据仍在；可清空；容量超限有降级提示。
   - 备注：统一序列化为 JSON，日期用 ISO 字符串。
   - 进度：已完成（`src/utils/storage.ts`、`GreetingCard.vue`、`LoveReasons.vue`）。

2. 输入校验与防重复
   - 描述：祝福语和理由内容做长度、空白、重复校验；超限禁止提交并提示原因。
   - 验收：超限按钮禁用；提示可读；重复项不可添加。
   - 进度：已完成（最小长度、maxlength、去重）。

3. 下载清晰度选项
   - 描述：html2canvas 导出提供 1x/1.5x/2x 选项；失败给出降级建议（降低清晰度/关闭图片）。
   - 验收：三个选项可选；弱机型 1x 能成功导出。
   - 进度：已完成（`imageUtils.ts` 扩展、UI 下拉）。

4. 可访问性基础
   - 描述：关键交互元素补充 aria 属性与键盘可达；`aria-live` 用于成功消息；对比度优化。
   - 验收：Tab 可遍历所有可交互元素；NVDA 朗读信息合理；对比度≥4.5:1。
   - 进度：部分完成（aria 属性、aria-live、键盘操作已加；对比度维持原主题，后续可再提升）。

5. 降低动画强度
   - 描述：支持 `prefers-reduced-motion: reduce`；在移动端或 reduce 时关闭重阴影/过度动画。
   - 验收：系统开启减少动效后页面动画明显减少，FPS 提升。
   - 进度：已完成（全局与组件内媒体查询）。

6. 部署友好
   - 描述：若发布到子路径，配置 Vite `base`；提供 GH Pages 指南。
   - 验收：在 `https://<user>.github.io/To-Dearest-Mommy/` 一切资源 200。
   - 进度：已加入可配置 `base`（`vite.config.ts` 使用环境变量 `VITE_BASE`）。

---

## Should（较重要）
1. ESLint/Prettier/Vitest + 基础测试
   - 验收：`pnpm run typecheck && pnpm run test && pnpm run lint` 全绿；新增 3-5 个单测覆盖 utils 与关键渲染。

2. CI 工作流
   - 验收：PR 自动跑 typecheck/lint/test/build；主干保护。

3. 隐私声明页
   - 验收：页脚链接可进隐私页；说明仅本地处理图片，不上传服务器。

4. 下载后引导
   - 验收：下载成功后提供“继续编辑/清空草稿/去分享”按钮。

---

## Could（可选增强）
1. 主题与模板扩展
   - 验收：新增 3 套主题与 5 个模板；模板元数据源可配置（JSON）。

2. 分享卡片
   - 验收：生成仅文本版与小图预览，便于复制到微信/短信；或尝试 Web Share API。

3. 导入导出
   - 验收：可以导出/导入理由墙与贺卡草稿 JSON 文件。

4. i18n（zh-CN/EN）
   - 验收：切换语言生效；默认根据浏览器语言。

5. 性能工具化
   - 验收：图片压缩使用 `toBlob` + 质量参数；下载前预估内存占用并告警。

---

## Won’t（本期不做）
- 账号系统与云端同步
- 后端存储或公共墙（涉及审核与隐私）

---

## 技术任务分解（与 Must 对齐）
- localStorage 封装：`src/utils/storage.ts`（get/set/remove，命名空间 `tdm.*`）
- `GreetingCard`：状态读写持久化；预览与下载清晰度弹窗；失败兜底
- `LoveReasons`：新增前判重；持久化；删除/清空能力（可选）
- 全局样式：新增 `styles/_a11y.css`、`styles/_animations.css`，加 `prefers-reduced-motion`
- Vite 配置：`base` 条件化；文档在 README 增补 GH Pages 部署章节

---

## 依赖与风险
- 移动端内存受限导致导出失败：提供 1x 降级与不含图片导出
- localStorage 容量限制：控制图片最长边与压缩质量

---

## 度量指标（成功标准）
- 首屏交互时间（移动端中端机）≤ 2s
- 导出成功率 ≥ 98%（1x 模式）
- 页面可访问性得分（Lighthouse）≥ 90
- 崩溃/卡死反馈为 0（试运行阶段）

---

## 开发与验证清单（Windows cmd）
```cmd
pnpm i
pnpm run dev
```

更多：
```cmd
pnpm run build
pnpm run preview
```
