<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import GreetingCard from './components/GreetingCard.vue';
import LoveReasons from './components/LoveReasons.vue';
</script>

<template>
  <div class="app-container">
    <Header />

    <main class="container">
      <section class="section">
        <GreetingCard />
      </section>

      <section class="section">
        <LoveReasons />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
