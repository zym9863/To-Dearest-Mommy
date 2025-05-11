# To Dearest Mommy

[中文](README.md) | [English](README_EN.md)

本项目是一个基于 Vue 3 + TypeScript + Vite 的母亲节贺卡 Web 应用。

## 目录结构

```
src/
  App.vue                # 应用主组件
  main.ts                # 入口文件
  style.css              # 全局样式
  assets/                # 静态资源
  components/            # 主要功能组件
    CardTemplate.vue     # 贺卡模板组件
    Footer.vue           # 页脚
    GreetingCard.vue     # 贺卡展示与编辑
    Header.vue           # 页头
    HelloWorld.vue       # 示例组件
    LoveReasons.vue      # 爱的理由列表
    ReasonNote.vue       # 理由便签
  types/                 # TypeScript 类型定义
  utils/                 # 工具函数
```

## 主要功能
- 选择贺卡模板（如 balloon、flower、tree）
- 编辑贺卡内容和爱的理由
- 生成并展示专属贺卡

## 启动项目

1. 安装依赖：
   ```powershell
   npm install
   ```
2. 启动开发服务器：
   ```powershell
   npm run dev
   ```
3. 访问本地地址（通常为 http://localhost:5173/）查看效果。

## 相关链接
- [Vue 3 `<script setup>` SFCs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [Vite 官方文档](https://vitejs.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
