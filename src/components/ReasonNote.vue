<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { LoveReason } from '../types';

const props = defineProps<{
  reason: LoveReason;
}>();

// Generate random position and rotation for the note
const randomRotation = ref(Math.random() * 10 - 5); // -5 to 5 degrees
const randomDelay = ref(Math.random() * 2); // 0 to 2 seconds

// Generate random animation type (heart, flower, etc.)
const animationType = ref(Math.floor(Math.random() * 5)); // 0, 1, 2, 3, or 4

// Generate random color variation
const colorVariation = ref(Math.floor(Math.random() * 20)); // 0 to 19

const noteStyle = computed(() => ({
  transform: `rotate(${randomRotation.value}deg)`,
  animationDelay: `${randomDelay.value}s`
}));

const noteClass = computed(() => {
  const classes = ['reason-note'];

  switch (animationType.value) {
    case 0:
      classes.push('heart-style');
      break;
    case 1:
      classes.push('flower-style');
      break;
    case 2:
      classes.push('star-style');
      break;
    case 3:
      classes.push('ribbon-style');
      break;
    case 4:
      classes.push('gift-style');
      break;
  }

  // Add color variation
  classes.push(`color-variation-${colorVariation.value % 5}`);

  return classes;
});

// Format date to Chinese format
const formattedDate = computed(() => {
  const date = new Date(props.reason.createdAt);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
});
</script>

<template>
  <div :class="noteClass" :style="noteStyle">
    <div class="note-decoration"></div>
    <div class="note-pin"></div>
    <div class="note-content">
      <p class="reason-content">{{ reason.content }}</p>
      <div class="reason-date">{{ formattedDate }}</div>
    </div>
    <div class="note-tape note-tape-left"></div>
    <div class="note-tape note-tape-right"></div>
  </div>
</template>

<style scoped>
.reason-note {
  position: relative;
  width: 220px;
  min-height: 120px;
  padding: 1.5rem 1.2rem 1rem;
  border-radius: 2px;
  box-shadow: 0 10px 20px var(--shadow-color);
  background-color: white;
  animation: float 5s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
}

.reason-note:hover {
  transform: scale(1.08) rotate(0deg) !important;
  z-index: 10;
  box-shadow: 0 15px 30px var(--shadow-color);
}

.note-content {
  position: relative;
  z-index: 2;
}

.reason-content {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 0.8rem;
  color: var(--text-color);
  font-weight: 500;
  word-break: break-word;
}

.reason-date {
  font-size: 0.75rem;
  color: var(--text-light-color);
  text-align: right;
  font-style: italic;
}

.note-decoration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  opacity: 0.1;
  z-index: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.note-pin {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.note-tape {
  position: absolute;
  height: 30px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.6);
  opacity: 0.7;
  transform: rotate(-5deg);
  z-index: 2;
}

.note-tape-left {
  top: -15px;
  left: 20px;
  transform: rotate(-45deg);
}

.note-tape-right {
  top: -15px;
  right: 20px;
  transform: rotate(45deg);
}

/* Different styles for notes */
.heart-style {
  background-color: #fff0f5;
  border: 1px solid var(--border-color);
}

.heart-style .note-decoration {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff5a87"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
}

.heart-style .note-tape {
  background-color: rgba(255, 90, 135, 0.2);
}

.flower-style {
  background-color: #fff8f0;
  border: 1px solid #ffe0c0;
}

.flower-style .note-decoration {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff9e6d"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M15.9,8.1C15.5,7.7 14.8,7 13.5,7C13.3,7 13.1,7 12.9,7.1C12.6,7.2 12.3,7.3 12,7.3C11.7,7.3 11.4,7.2 11.1,7.1C10.9,7 10.7,7 10.5,7C9.2,7 8.5,7.7 8.1,8.1C7.7,8.5 7,9.2 7,10.5C7,10.7 7,10.9 7.1,11.1C7.2,11.4 7.3,11.7 7.3,12C7.3,12.3 7.2,12.6 7.1,12.9C7,13.1 7,13.3 7,13.5C7,14.8 7.7,15.5 8.1,15.9C8.5,16.3 9.2,17 10.5,17C10.7,17 10.9,17 11.1,16.9C11.4,16.8 11.7,16.7 12,16.7C12.3,16.7 12.6,16.8 12.9,16.9C13.1,17 13.3,17 13.5,17C14.8,17 15.5,16.3 15.9,15.9C16.3,15.5 17,14.8 17,13.5C17,13.3 17,13.1 16.9,12.9C16.8,12.6 16.7,12.3 16.7,12C16.7,11.7 16.8,11.4 16.9,11.1C17,10.9 17,10.7 17,10.5C17,9.2 16.3,8.5 15.9,8.1M12,9C13.7,9 15,10.3 15,12C15,13.7 13.7,15 12,15C10.3,15 9,13.7 9,12C9,10.3 10.3,9 12,9M18,2C19.1,2 20,2.9 20,4C20,5.1 19.1,6 18,6C16.9,6 16,5.1 16,4C16,2.9 16.9,2 18,2M6,2C7.1,2 8,2.9 8,4C8,5.1 7.1,6 6,6C4.9,6 4,5.1 4,4C4,2.9 4.9,2 6,2M18,18C19.1,18 20,18.9 20,20C20,21.1 19.1,22 18,22C16.9,22 16,21.1 16,20C16,18.9 16.9,18 18,18M6,18C7.1,18 8,18.9 8,20C8,21.1 7.1,22 6,22C4.9,22 4,21.1 4,20C4,18.9 4.9,18 6,18M21,7C22.1,7 23,7.9 23,9C23,10.1 22.1,11 21,11C19.9,11 19,10.1 19,9C19,7.9 19.9,7 21,7M3,7C4.1,7 5,7.9 5,9C5,10.1 4.1,11 3,11C1.9,11 1,10.1 1,9C1,7.9 1.9,7 3,7M21,13C22.1,13 23,13.9 23,15C23,16.1 22.1,17 21,17C19.9,17 19,16.1 19,15C19,13.9 19.9,13 21,13M3,13C4.1,13 5,13.9 5,15C5,16.1 4.1,17 3,17C1.9,17 1,16.1 1,15C1,13.9 1.9,13 3,13Z" /></svg>');
}

.flower-style .note-tape {
  background-color: rgba(255, 158, 109, 0.2);
}

.star-style {
  background-color: #f0f8ff;
  border: 1px solid #c0e0ff;
}

.star-style .note-decoration {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232196f3"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>');
}

.star-style .note-tape {
  background-color: rgba(33, 150, 243, 0.2);
}

.ribbon-style {
  background-color: #f0fff0;
  border: 1px solid #c0ffc0;
}

.ribbon-style .note-decoration {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234caf50"><path d="M20,6C17.8,6 16,7.8 16,10V14H8V10C8,7.8 6.2,6 4,6H2V18H4C6.2,18 8,16.2 8,14V14H16V14C16,16.2 17.8,18 20,18H22V6H20Z" /></svg>');
}

.ribbon-style .note-tape {
  background-color: rgba(76, 175, 80, 0.2);
}

.gift-style {
  background-color: #fff0ff;
  border: 1px solid #ffc0ff;
}

.gift-style .note-decoration {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239c27b0"><path d="M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" /></svg>');
}

.gift-style .note-tape {
  background-color: rgba(156, 39, 176, 0.2);
}

/* Color variations */
.color-variation-0 {
  box-shadow: 0 10px 20px rgba(255, 90, 135, 0.15);
}

.color-variation-1 {
  box-shadow: 0 10px 20px rgba(255, 158, 109, 0.15);
}

.color-variation-2 {
  box-shadow: 0 10px 20px rgba(33, 150, 243, 0.15);
}

.color-variation-3 {
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.15);
}

.color-variation-4 {
  box-shadow: 0 10px 20px rgba(156, 39, 176, 0.15);
}
</style>
