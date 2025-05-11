<script setup lang="ts">
import { computed } from 'vue';
import type { CardTemplate } from '../types';

const props = defineProps<{
  template: CardTemplate;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  (e: 'select', templateId: number): void;
}>();

const cardClasses = computed(() => ({
  'template-card': true,
  'selected': props.isSelected
}));

const handleSelect = () => {
  emit('select', props.template.id);
};
</script>

<template>
  <div :class="cardClasses" @click="handleSelect">
    <div class="template-image">
      <img :src="template.image" :alt="template.name" />
      <div class="template-overlay"></div>
    </div>
    <div class="template-info">
      <h3>{{ template.name }}</h3>
      <p>{{ template.description }}</p>
      <div class="template-badge">模板 #{{ template.id }}</div>
    </div>
    <div class="template-selected" v-if="isSelected">
      <div class="checkmark-circle">
        <span class="checkmark">✓</span>
      </div>
      <div class="selected-label">已选择</div>
    </div>
    <div class="template-hover-effect">
      <span class="hover-text">点击选择</span>
    </div>
  </div>
</template>

<style scoped>
.template-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px var(--shadow-color);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  background-color: white;
  border: 2px solid transparent;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.template-card:hover {
  transform: translateY(-8px) rotateX(5deg);
  box-shadow: 0 15px 35px var(--shadow-color);
}

.template-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.template-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.template-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.3) 100%);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.template-card:hover .template-image img {
  transform: scale(1.08);
}

.template-card:hover .template-overlay {
  opacity: 0.2;
}

.template-info {
  padding: 1.2rem;
  position: relative;
  z-index: 1;
}

.template-info h3 {
  margin: 0 0 0.5rem;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.2rem;
}

.template-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-light-color);
  line-height: 1.5;
}

.template-badge {
  position: absolute;
  top: -12px;
  right: 12px;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  color: white;
  font-size: 0.7rem;
  padding: 0.3em 0.8em;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 3px 8px var(--shadow-color);
}

.template-card.selected {
  border: 2px solid var(--primary-color);
  box-shadow: 0 10px 30px var(--shadow-color);
}

.template-selected {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 90, 135, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.checkmark-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 5px 15px var(--shadow-color);
  animation: pulse 2s infinite;
}

.checkmark {
  font-size: 20px;
}

.selected-label {
  margin-top: 10px;
  background-color: white;
  color: var(--primary-color);
  padding: 0.3em 1em;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 3px 8px var(--shadow-color);
}

.template-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 90, 135, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.hover-text {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.5em 1.5em;
  border: 2px solid white;
  border-radius: 30px;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.template-card:hover .template-hover-effect {
  opacity: 1;
}

.template-card:hover .hover-text {
  transform: translateY(0);
}

.template-card.selected .template-hover-effect {
  display: none;
}

@media (max-width: 768px) {
  .template-image {
    height: 160px;
  }

  .template-info h3 {
    font-size: 1.1rem;
  }

  .template-info p {
    font-size: 0.85rem;
  }
}
</style>
