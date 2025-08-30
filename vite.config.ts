import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 允许在 TS 环境中使用 process 变量
declare const process: any;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 允许通过环境变量 VITE_BASE 配置子路径部署（如 GitHub Pages）
  base: process.env.VITE_BASE ?? '/',
})
