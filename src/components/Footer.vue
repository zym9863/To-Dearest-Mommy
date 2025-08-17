<script setup lang="ts">
// Footer component
</script>

<template>
  <footer class="footer">
    <div class="footer-decoration">
      <div class="wave"></div>
    </div>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <span class="heart-icon">❤️</span>
          <span class="logo-text">致爱妈咪</span>
        </div>

        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">联系我们</a>
        </div>

        <div class="social-links">
          <a href="#" class="social-link">
            <span class="social-icon">📱</span>
          </a>
          <a href="#" class="social-link">
            <span class="social-icon">💬</span>
          </a>
          <a href="#" class="social-link">
            <span class="social-icon">📧</span>
          </a>
        </div>
      </div>

      <div class="footer-divider"></div>

      <p class="copyright">致爱妈咪 &copy; {{ new Date().getFullYear() }} - 用爱表达感恩</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 4rem 0 2rem;
  margin-top: 6rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 249, 0.95));
  position: relative;
  color: var(--text-color);
  font-size: 0.95rem;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent,
    var(--gradient-start) 20%,
    var(--gradient-end) 50%,
    var(--gradient-orange) 80%,
    transparent);
  animation: slideGradient 10s linear infinite;
}

@keyframes slideGradient {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.footer-decoration {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="%23ff5a87"/><path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="%23ff5a87"/><path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="%23ff5a87"/></svg>') no-repeat;
  background-size: 50% 100%;
  background-position: 0 bottom;
  animation: waveMove 15s linear infinite;
}

@keyframes waveMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Floating hearts decoration */
.footer::after {
  content: '❤️';
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.15;
  animation: floatHeart 8s ease-in-out infinite;
}

@keyframes floatHeart {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.15;
  }
  50% {
    transform: translateY(-50px) translateX(30px) rotate(15deg);
    opacity: 0.1;
  }
  90% {
    opacity: 0.15;
  }
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
  animation: fadeIn 1s ease-out;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.heart-icon {
  font-size: 1.8rem;
  animation: heartBeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 5px rgba(255, 90, 135, 0.3));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, 
    var(--gradient-start) 0%, 
    var(--gradient-end) 50%, 
    var(--gradient-purple) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: gradientShift 5s ease infinite;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.3em 0;
}

.footer-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.footer-link:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.footer-link:hover::before {
  width: 100%;
}

.social-links {
  display: flex;
  gap: 1.2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  border: 1px solid var(--glass-border);
  color: var(--primary-color);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
}

.social-link:hover {
  transform: translateY(-5px) rotate(5deg);
  box-shadow: 0 8px 20px var(--shadow-color);
  color: white;
  border-color: transparent;
}

.social-link:hover::before {
  width: 100%;
  height: 100%;
}

.social-link:hover .social-icon {
  z-index: 1;
  transform: scale(1.1);
}

.social-icon {
  font-size: 1.3rem;
  position: relative;
  transition: transform 0.3s ease;
}

.footer-divider {
  height: 2px;
  background: linear-gradient(to right, 
    transparent 10%, 
    var(--border-color) 30%, 
    var(--gradient-start) 50%, 
    var(--border-color) 70%, 
    transparent 90%);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.footer-divider::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.5), 
    transparent);
  animation: shimmerDivider 3s infinite;
}

@keyframes shimmerDivider {
  0% { left: -100%; }
  100% { left: 100%; }
}

.copyright {
  text-align: center;
  color: var(--text-light-color);
  font-size: 0.9rem;
  position: relative;
  padding: 1rem 0;
}

.copyright::before,
.copyright::after {
  content: '♥';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  opacity: 0.3;
  font-size: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.copyright::before {
  left: 20%;
}

.copyright::after {
  right: 20%;
  animation-delay: 1s;
}

/* Floating decorations */
.footer {
  position: relative;
}

.footer > .container::before,
.footer > .container::after {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 90, 135, 0.1), transparent);
  animation: float 10s ease-in-out infinite;
  pointer-events: none;
}

.footer > .container::before {
  top: 20%;
  left: 5%;
  animation-delay: 0s;
}

.footer > .container::after {
  bottom: 30%;
  right: 5%;
  animation-delay: 5s;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-links {
    flex-direction: column;
    gap: 1.2rem;
  }

  .social-links {
    justify-content: center;
    margin-top: 1rem;
  }

  .copyright::before {
    left: 10%;
  }

  .copyright::after {
    right: 10%;
  }
}
</style>
