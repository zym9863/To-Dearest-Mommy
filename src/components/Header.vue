<script setup lang="ts">
// Header component
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo-area">
          <div class="heart-icon">❤️</div>
          <h1 class="title" data-text="致爱妈咪">致爱妈咪</h1>
        </div>
        <p class="subtitle">
          <span class="subtitle-icon">🌸</span>
          用心表达对妈妈的爱
          <span class="subtitle-icon">🌸</span>
        </p>
      </div>
      <div class="header-decoration">
        <div class="decoration-item" v-for="n in 5" :key="n"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 2.5rem 0 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 249, 0.9));
  backdrop-filter: blur(10px);
  box-shadow: 
    0 10px 40px rgba(255, 90, 135, 0.1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent,
    var(--gradient-start),
    var(--gradient-end),
    var(--gradient-orange),
    transparent);
  animation: slideGradient 8s linear infinite;
}

@keyframes slideGradient {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.header::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 90, 135, 0.05) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  animation: pulseGlow 4s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

.header-content {
  position: relative;
  z-index: 2;
  animation: slideInUp 0.8s ease-out;
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.heart-icon {
  font-size: 2.5rem;
  animation: heartBeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 90, 135, 0.3));
  transform-origin: center;
}

.title {
  margin: 0;
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, 
    var(--gradient-start) 0%, 
    var(--gradient-end) 25%, 
    var(--gradient-purple) 50%, 
    var(--gradient-pink) 75%, 
    var(--gradient-orange) 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -1px;
  position: relative;
  animation: gradientShift 6s ease infinite;
  text-shadow: 0 2px 20px rgba(255, 90, 135, 0.2);
}

.title::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: none;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 90, 135, 0.3);
}

.subtitle {
  margin: 0.8rem 0 0;
  font-size: 1.3rem;
  color: var(--text-light-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.3s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle-icon {
  margin: 0 0.5rem;
  display: inline-block;
  font-size: 1.4rem;
}

.subtitle-icon:first-child {
  animation: rotateFlower 4s linear infinite;
}

.subtitle-icon:last-child {
  animation: rotateFlower 4s linear infinite reverse;
}

@keyframes rotateFlower {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(10deg) scale(1.1);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-10deg) scale(1.1);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

.header-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
}

.decoration-item {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, var(--gradient-pink), transparent);
  filter: blur(2px);
  animation: floatBubble 15s infinite;
}

@keyframes floatBubble {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  50% {
    transform: translateY(-50px) translateX(30px) scale(1.2);
    opacity: 0.2;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) translateX(-30px) scale(0.8);
    opacity: 0;
  }
}

.decoration-item:nth-child(1) {
  top: 20%;
  left: 10%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
  background: radial-gradient(circle, rgba(255, 90, 135, 0.2), transparent);
}

.decoration-item:nth-child(2) {
  top: 60%;
  left: 20%;
  width: 40px;
  height: 40px;
  animation-delay: 2s;
  background: radial-gradient(circle, rgba(255, 176, 192, 0.2), transparent);
}

.decoration-item:nth-child(3) {
  top: 30%;
  right: 20%;
  width: 60px;
  height: 60px;
  animation-delay: 4s;
  background: radial-gradient(circle, rgba(255, 158, 109, 0.2), transparent);
}

.decoration-item:nth-child(4) {
  top: 70%;
  right: 10%;
  width: 35px;
  height: 35px;
  animation-delay: 6s;
  background: radial-gradient(circle, rgba(255, 143, 163, 0.2), transparent);
}

.decoration-item:nth-child(5) {
  top: 40%;
  right: 40%;
  width: 45px;
  height: 45px;
  animation-delay: 8s;
  background: radial-gradient(circle, rgba(255, 214, 224, 0.2), transparent);
}

/* Sparkle effects */
.header-decoration::before,
.header-decoration::after {
  content: '✨';
  position: absolute;
  font-size: 1.5rem;
  animation: sparkle 3s linear infinite;
}

.header-decoration::before {
  top: 15%;
  left: 5%;
  animation-delay: 0.5s;
}

.header-decoration::after {
  top: 25%;
  right: 8%;
  animation-delay: 1.5s;
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
  .header {
    padding: 1.8rem 0 1.5rem;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .heart-icon {
    font-size: 2rem;
  }

  .decoration-item {
    display: none;
  }
}
</style>
