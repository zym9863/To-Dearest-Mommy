<script setup lang="ts">
// Header component
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo-area">
          <div class="heart-icon">❤️</div>
          <h1 class="title">致爱妈咪</h1>
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
  background-color: white;
  box-shadow: 0 5px 20px rgba(255, 90, 135, 0.1);
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
}

.header-content {
  position: relative;
  z-index: 2;
}

.logo-area {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.heart-icon {
  font-size: 2.2rem;
  margin-right: 0.8rem;
  animation: pulse 2s infinite;
}

.title {
  margin: 0;
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -1px;
  position: relative;
}

.subtitle {
  margin: 0.5rem 0 0;
  font-size: 1.3rem;
  color: var(--text-light-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtitle-icon {
  margin: 0 0.5rem;
  animation: float 3s infinite;
  display: inline-block;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--secondary-color), var(--border-color));
  opacity: 0.2;
}

.decoration-item:nth-child(1) {
  top: 20%;
  left: 10%;
  width: 60px;
  height: 60px;
  animation: float 6s infinite;
}

.decoration-item:nth-child(2) {
  top: 60%;
  left: 20%;
  width: 30px;
  height: 30px;
  animation: float 7s infinite;
}

.decoration-item:nth-child(3) {
  top: 30%;
  right: 20%;
  width: 50px;
  height: 50px;
  animation: float 5s infinite;
}

.decoration-item:nth-child(4) {
  top: 70%;
  right: 10%;
  width: 25px;
  height: 25px;
  animation: float 8s infinite;
}

.decoration-item:nth-child(5) {
  top: 40%;
  right: 40%;
  width: 35px;
  height: 35px;
  animation: float 9s infinite;
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
}
</style>
