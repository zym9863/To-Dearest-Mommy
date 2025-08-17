<script setup lang="ts">
import { ref, computed } from 'vue';
import ReasonNote from './ReasonNote.vue';
import type { LoveReason } from '../types';

// State for the new reason input
const newReason = ref('');
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);
const reasons = ref<LoveReason[]>([
  {
    id: 1,
    content: '妈妈的饭菜是世界上最好吃的',
    createdAt: new Date('2023-05-10')
  },
  {
    id: 2,
    content: '妈妈总是在我难过的时候给我温暖的拥抱',
    createdAt: new Date('2023-05-11')
  },
  {
    id: 3,
    content: '妈妈教会了我如何坚强面对困难',
    createdAt: new Date('2023-05-12')
  },
  {
    id: 4,
    content: '妈妈的笑容是我最大的动力',
    createdAt: new Date('2023-05-13')
  },
  {
    id: 5,
    content: '妈妈总是支持我追求自己的梦想',
    createdAt: new Date('2023-05-14')
  }
]);

// Add a new reason with animation
const addReason = () => {
  if (newReason.value.trim() === '') return;

  isSubmitting.value = true;

  setTimeout(() => {
    const newId = reasons.value.length > 0
      ? Math.max(...reasons.value.map(r => r.id)) + 1
      : 1;

    reasons.value.push({
      id: newId,
      content: newReason.value.trim(),
      createdAt: new Date()
    });

    newReason.value = '';
    isSubmitting.value = false;

    // Show success message
    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);

    // Scroll to the bottom to see the new reason
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }, 500);
};

// Generate random positions for the notes
const getRandomPosition = (index: number) => {
  // Create a grid-like layout but with some randomness
  const row = Math.floor(index / 3);
  const col = index % 3;

  // Base position
  const baseX = col * 280 + 50;
  const baseY = row * 180 + 50;

  // Add some randomness
  const randomX = Math.random() * 60 - 30;
  const randomY = Math.random() * 60 - 30;

  return {
    left: `${baseX + randomX}px`,
    top: `${baseY + randomY}px`,
    zIndex: Math.floor(Math.random() * 5) + 1
  };
};

// Button classes based on state
const buttonClasses = computed(() => ({
  'add-button': true,
  'loading': isSubmitting.value
}));

// Character count
const charCount = computed(() => newReason.value.length);
const maxChars = 100;
const charCountClasses = computed(() => ({
  'char-count': true,
  'char-count-warning': charCount.value > maxChars * 0.8,
  'char-count-danger': charCount.value > maxChars
}));
</script>

<template>
  <div class="love-reasons">
    <h2 class="section-title">"爱妈咪N个理由"收集墙</h2>
    <p class="section-description">在这里分享你爱妈妈的理由，让爱的记忆永远珍藏</p>

    <!-- Add new reason form -->
    <div class="add-reason-form card">
      <div class="form-header">
        <div class="form-icon">❤️</div>
        <h3>添加你的爱的理由</h3>
      </div>

      <div class="form-group">
        <label for="new-reason">
          <span class="label-text">写下你爱妈妈的理由</span>
          <span :class="charCountClasses">{{ charCount }}/{{ maxChars }}</span>
        </label>
        <textarea
          id="new-reason"
          v-model="newReason"
          rows="3"
          placeholder="我爱妈妈，因为..."
          @keyup.enter="addReason"
          :maxlength="maxChars + 10"
        ></textarea>
      </div>

      <div class="form-actions">
        <button
          :class="buttonClasses"
          @click="addReason"
          :disabled="newReason.trim() === '' || isSubmitting || charCount > maxChars"
        >
          <span class="button-icon" v-if="!isSubmitting">✨</span>
          <span class="loader" v-if="isSubmitting"></span>
          {{ isSubmitting ? '添加中...' : '添加到收集墙' }}
        </button>

        <div class="success-message" v-if="showSuccessMessage">
          <span class="success-icon">✓</span> 添加成功！
        </div>
      </div>
    </div>

    <!-- Reasons collection wall -->
    <div class="reasons-wall">
      <div class="wall-background">
        <div class="wall-pattern"></div>
      </div>

      <div
        v-for="(reason, index) in reasons"
        :key="reason.id"
        class="reason-wrapper fade-in"
        :style="getRandomPosition(index)"
      >
        <ReasonNote :reason="reason" />
      </div>

      <div class="wall-decoration wall-decoration-1"></div>
      <div class="wall-decoration wall-decoration-2"></div>
      <div class="wall-decoration wall-decoration-3"></div>
    </div>
  </div>
</template>

<style scoped>
.love-reasons {
  margin: 4rem 0;
  position: relative;
  animation: fadeIn 1s ease-out;
}

.section-title {
  text-align: center;
  margin-bottom: 0.5rem;
  animation: slideInUp 0.8s ease-out;
}

.section-description {
  text-align: center;
  color: var(--text-light-color);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  animation: slideInUp 0.8s ease-out 0.2s;
}

.add-reason-form {
  max-width: 700px;
  margin: 0 auto 4rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(255, 90, 135, 0.15);
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  animation: bounceIn 0.8s ease-out 0.4s;
  position: relative;
  overflow: hidden;
}

.add-reason-form::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 90, 135, 0.1) 0%, transparent 70%);
  animation: rotateGlow 20s linear infinite;
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.form-icon {
  font-size: 2rem;
  margin-right: 1.2rem;
  animation: heartBeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 90, 135, 0.3));
}

.form-header h3 {
  margin: 0;
  font-size: 1.6rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.label-text {
  font-weight: 700;
  font-size: 1.1rem;
}

.char-count {
  float: right;
  font-size: 0.85rem;
  color: var(--text-light-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.char-count-warning {
  color: orange;
  font-weight: 700;
}

.char-count-danger {
  color: red;
  font-weight: 800;
  animation: pulse 0.5s ease infinite;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.add-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.button-icon {
  margin-right: 10px;
  font-size: 1.3rem;
  animation: float 2s ease-in-out infinite;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  background: linear-gradient(45deg, var(--success-color), #81c784);
  color: white;
  padding: 0.7em 1.3em;
  border-radius: 30px;
  display: flex;
  align-items: center;
  animation: bounceIn 0.8s ease;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  font-weight: 600;
}

.success-icon {
  margin-right: 8px;
  font-weight: bold;
  animation: heartBeat 1.5s infinite;
}

.reasons-wall {
  position: relative;
  min-height: 900px;
  margin-top: 3rem;
  background: linear-gradient(135deg, #ffffff, #fff8f9);
  border-radius: 25px;
  padding: 3.5rem;
  overflow: hidden;
  box-shadow: 
    0 25px 60px rgba(255, 90, 135, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid var(--glass-border);
  animation: fadeIn 1s ease-out 0.6s;
}

.wall-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  pointer-events: none;
}

.wall-pattern {
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255, 90, 135, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(255, 176, 192, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 40% 20%, rgba(255, 158, 109, 0.08) 0%, transparent 40%);
  background-size: 100% 100%;
  animation: floatPattern 20s ease-in-out infinite;
}

@keyframes floatPattern {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10px, -10px) scale(1.05); }
  66% { transform: translate(-10px, 10px) scale(0.95); }
}

.reason-wrapper {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: fadeIn 0.8s ease;
}

.reason-wrapper:hover {
  z-index: 100;
}

.wall-decoration {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.15;
  pointer-events: none;
  animation: float 10s ease-in-out infinite;
}

.wall-decoration-1 {
  top: 10%;
  left: 5%;
  width: 120px;
  height: 120px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff5a87"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
  animation-delay: 0s;
}

.wall-decoration-2 {
  bottom: 15%;
  right: 8%;
  width: 140px;
  height: 140px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff9e6d"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M15.9,8.1C15.5,7.7 14.8,7 13.5,7C13.3,7 13.1,7 12.9,7.1C12.6,7.2 12.3,7.3 12,7.3C11.7,7.3 11.4,7.2 11.1,7.1C10.9,7 10.7,7 10.5,7C9.2,7 8.5,7.7 8.1,8.1C7.7,8.5 7,9.2 7,10.5C7,10.7 7,10.9 7.1,11.1C7.2,11.4 7.3,11.7 7.3,12C7.3,12.3 7.2,12.6 7.1,12.9C7,13.1 7,13.3 7,13.5C7,14.8 7.7,15.5 8.1,15.9C8.5,16.3 9.2,17 10.5,17C10.7,17 10.9,17 11.1,16.9C11.4,16.8 11.7,16.7 12,16.7C12.3,16.7 12.6,16.8 12.9,16.9C13.1,17 13.3,17 13.5,17C14.8,17 15.5,16.3 15.9,15.9C16.3,15.5 17,14.8 17,13.5C17,13.3 17,13.1 16.9,12.9C16.8,12.6 16.7,12.3 16.7,12C16.7,11.7 16.8,11.4 16.9,11.1C17,10.9 17,10.7 17,10.5C17,9.2 16.3,8.5 15.9,8.1M12,9C13.7,9 15,10.3 15,12C15,13.7 13.7,15 12,15C10.3,15 9,13.7 9,12C9,10.3 10.3,9 12,9Z" /></svg>');
  animation-delay: 3s;
}

.wall-decoration-3 {
  top: 40%;
  right: 15%;
  width: 100px;
  height: 100px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232196f3"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>');
  animation-delay: 6s;
}

/* Sparkle effects */
.reasons-wall::before,
.reasons-wall::after {
  content: '✨';
  position: absolute;
  font-size: 2rem;
  animation: sparkle 4s linear infinite;
  pointer-events: none;
}

.reasons-wall::before {
  top: 5%;
  left: 10%;
  animation-delay: 0s;
}

.reasons-wall::after {
  bottom: 10%;
  right: 5%;
  animation-delay: 2s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

@media (max-width: 768px) {
  .reasons-wall {
    min-height: 600px;
    padding: 2rem;
  }

  .reason-wrapper {
    position: relative !important;
    margin-bottom: 2rem;
    left: 0 !important;
    top: 0 !important;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .add-button {
    width: 100%;
  }

  .success-message {
    width: 100%;
    justify-content: center;
  }

  .wall-decoration {
    display: none;
  }
}
</style>
