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
  padding: 3rem 0 1.5rem;
  margin-top: 5rem;
  background-color: white;
  position: relative;
  color: var(--text-color);
  font-size: 0.9rem;
}

.footer-decoration {
  position: absolute;
  top: -70px;
  left: 0;
  width: 100%;
  height: 70px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="%23ff5a87"/><path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="%23ff5a87"/><path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="%23ff5a87"/></svg>') no-repeat;
  background-size: cover;
  background-position: center bottom;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.heart-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color);
}

.footer-link:hover::after {
  width: 100%;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--background-color);
  color: var(--primary-color);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px var(--shadow-color);
  background-color: var(--primary-color);
  color: white;
}

.social-icon {
  font-size: 1.2rem;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border-color), transparent);
  margin-bottom: 1.5rem;
}

.copyright {
  text-align: center;
  color: var(--text-light-color);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
