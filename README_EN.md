# To Dearest Mommy

[中文](README.md) | [English](README_EN.md)

This project is a Mother's Day greeting card web application based on Vue 3 + TypeScript + Vite.

## Directory Structure

```
src/
  App.vue                # Main application component
  main.ts                # Entry file
  style.css              # Global styles
  assets/                # Static resources
  components/            # Main functional components
    CardTemplate.vue     # Card template component
    Footer.vue           # Footer
    GreetingCard.vue     # Greeting card display and editing
    Header.vue           # Header
    HelloWorld.vue       # Example component
    LoveReasons.vue      # List of reasons for love
    ReasonNote.vue       # Reason note
  types/                 # TypeScript type definitions
  utils/                 # Utility functions
```

## Main Features
- Select greeting card templates (such as balloon, flower, tree)
- Edit greeting card content and reasons for love
- Generate and display personalized greeting cards

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```
3. Access the local address (usually http://localhost:5173/) to view the effect.

## Related Links
- [Vue 3 `<script setup>` SFCs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [Vite Official Documentation](https://vitejs.dev/)
- [TypeScript Official Documentation](https://www.typescriptlang.org/)