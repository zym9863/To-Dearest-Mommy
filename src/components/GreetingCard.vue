<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import CardTemplate from './CardTemplate.vue';
import type { CardTemplate as CardTemplateType } from '../types';
import { fileToDataURL, resizeImage, generateAndDownloadImage, type DownloadScale } from '../utils/imageUtils';
import { getItem, setItem } from '../utils/storage';

// Card templates
const templates = ref<CardTemplateType[]>([
  {
    id: 1,
    name: '温馨花朵',
    image: '/templates/flower.jpg',
    description: '粉色花朵装饰，温馨浪漫'
  },
  {
    id: 2,
    name: '爱心气球',
    image: '/templates/balloon.jpg',
    description: '红色爱心气球，表达浓浓爱意'
  },
  {
    id: 3,
    name: '感恩树',
    image: '/templates/tree.jpg',
    description: '生命之树，象征母爱的伟大'
  }
]);

// Selected template
const selectedTemplateId = ref<number | null>(null);
const selectedTemplate = computed(() =>
  templates.value.find(t => t.id === selectedTemplateId.value) || null
);

// User inputs
const message = ref('');
const userImage = ref<string | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const isPreviewMode = ref(false);
const isDownloading = ref(false);
const showSuccessMessage = ref(false);
const activeStep = ref(1);
const downloadScale = ref<DownloadScale>(2);

// keys
const STORAGE_KEY = 'cardDraft';

// 恢复草稿
onMounted(() => {
  const draft = getItem<any>(STORAGE_KEY, null);
  if (draft) {
    selectedTemplateId.value = draft.templateId ?? null;
    message.value = typeof draft.message === 'string' ? draft.message : '';
    userImage.value = typeof draft.image === 'string' ? draft.image : null;
    // 恢复时如果已有模板与消息，定位到第3步
    if (selectedTemplateId.value && message.value.trim()) {
      activeStep.value = 3;
    }
  }
});

// 保存草稿（节流简单处理）
watch([selectedTemplateId, message, userImage], ([t, m, img]) => {
  setItem(STORAGE_KEY, {
    templateId: t,
    message: m,
    image: img,
    updatedAt: new Date().toISOString()
  });
});

// Handle template selection
const selectTemplate = (templateId: number) => {
  selectedTemplateId.value = templateId;
  if (activeStep.value === 1) {
    setTimeout(() => {
      activeStep.value = 2;
      scrollToActiveStep();
    }, 300);
  }
};

// Handle image upload
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    try {
      const dataUrl = await fileToDataURL(file);
      userImage.value = await resizeImage(dataUrl, 800, 600);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }
};

// Generate and download the card
const downloadCard = async () => {
  if (!cardRef.value) return;

  isDownloading.value = true;

  try {
  const res = await generateAndDownloadImage(cardRef.value, { fileName: '致爱妈咪贺卡', scale: downloadScale.value });
  showSuccessMessage.value = res.ok;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error downloading card:', error);
  } finally {
    isDownloading.value = false;
  }
};

// Toggle preview mode
const togglePreview = () => {
  isPreviewMode.value = !isPreviewMode.value;

  if (isPreviewMode.value) {
    setTimeout(() => {
      if (cardRef.value) {
        cardRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
};

// Check if form is valid
const MIN_MSG = 5;
const isFormValid = computed(() => {
  const msg = message.value.trim();
  return selectedTemplateId.value !== null && msg.length >= MIN_MSG && msg.length <= maxChars;
});

// Character count
const charCount = computed(() => message.value.length);
const maxChars = 200;
const charCountClasses = computed(() => ({
  'char-count': true,
  'char-count-warning': charCount.value > maxChars * 0.8,
  'char-count-danger': charCount.value > maxChars
}));

// Progress percentage
const progressPercentage = computed(() => {
  let percentage = 0;

  if (selectedTemplateId.value !== null) percentage += 33;
  if (message.value.trim() !== '') percentage += 33;
  if (userImage.value !== null) percentage += 34;

  return percentage;
});

// Scroll to active step
const scrollToActiveStep = () => {
  const stepElement = document.querySelector(`.step-${activeStep.value}`);
  if (stepElement) {
    stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Watch message changes to advance to next step
watch(message, (newValue) => {
  if (newValue.trim() !== '' && activeStep.value === 2) {
    setTimeout(() => {
      activeStep.value = 3;
      scrollToActiveStep();
    }, 500);
  }
});

// Format date
const formattedDate = computed(() => {
  const date = new Date();
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
});
</script>

<template>
  <div class="greeting-card-creator">
    <div class="creator-header">
      <h2 class="section-title">定制祝福电子贺卡</h2>
      <p class="section-description">为妈妈创建一张独特的电子贺卡，表达您的爱与感恩</p>

      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
        <div class="progress-steps" role="list" aria-label="制作进度">
          <div class="progress-step" role="listitem" :aria-current="activeStep === 1 ? 'step' : undefined" :class="{ 'active': activeStep >= 1, 'completed': selectedTemplateId !== null }">
            <div class="step-number">1</div>
            <div class="step-label">选择模板</div>
          </div>
          <div class="progress-step" role="listitem" :aria-current="activeStep === 2 ? 'step' : undefined" :class="{ 'active': activeStep >= 2, 'completed': message.trim() !== '' }">
            <div class="step-number">2</div>
            <div class="step-label">添加祝福</div>
          </div>
          <div class="progress-step" role="listitem" :aria-current="activeStep === 3 ? 'step' : undefined" :class="{ 'active': activeStep >= 3, 'completed': userImage !== null }">
            <div class="step-number">3</div>
            <div class="step-label">上传照片</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Template selection -->
    <div class="section card step-1" :class="{ 'active-step': activeStep === 1 }" aria-labelledby="step1-title">
      <div class="step-header">
        <div class="step-icon">🎨</div>
        <h3 id="step1-title">1. 选择贺卡模板</h3>
      </div>

      <div class="templates-grid">
        <CardTemplate
          v-for="template in templates"
          :key="template.id"
          :template="template"
          :isSelected="selectedTemplateId === template.id"
          @select="selectTemplate"
        />
      </div>

      <div class="step-navigation">
        <button
          @click="activeStep = 2; scrollToActiveStep()"
          :disabled="selectedTemplateId === null"
          class="next-step-btn"
          aria-label="下一步，添加祝福"
        >
          下一步 <span class="btn-icon">→</span>
        </button>
      </div>
    </div>

    <!-- Message input -->
  <div class="section card step-2" :class="{ 'active-step': activeStep === 2 }" aria-labelledby="step2-title">
      <div class="step-header">
        <div class="step-icon">✍️</div>
    <h3 id="step2-title">2. 添加祝福语</h3>
      </div>

      <div class="form-group">
        <label for="message">
          <span class="label-text">写下您对妈妈的祝福</span>
          <span :class="charCountClasses">{{ charCount }}/{{ maxChars }}</span>
        </label>
        <textarea
          id="message"
          v-model="message"
          rows="4"
          placeholder="亲爱的妈妈，感谢您的养育之恩..."
          :maxlength="maxChars"
          aria-describedby="message-help"
        ></textarea>
        <small id="message-help" class="sr-only">最少 {{ MIN_MSG }} 字，最多 {{ maxChars }} 字</small>
      </div>

      <div class="message-suggestions">
        <p class="suggestions-title">祝福语建议：</p>
        <div class="suggestion-chips">
          <div class="suggestion-chip" @click="message = '亲爱的妈妈，感谢您无私的爱与付出，您是我生命中最重要的人。'">感谢付出</div>
          <div class="suggestion-chip" @click="message = '妈妈，您的爱如阳光般温暖，如雨露般滋润，永远照耀着我的生命。'">温暖祝福</div>
          <div class="suggestion-chip" @click="message = '妈妈，您的坚强与智慧一直是我前进的动力，我爱您！'">表达爱意</div>
        </div>
      </div>

      <div class="step-navigation">
  <button @click="activeStep = 1; scrollToActiveStep()" class="prev-step-btn" aria-label="上一步，选择模板">
          <span class="btn-icon">←</span> 上一步
        </button>
  <button @click="activeStep = 3; scrollToActiveStep()" :disabled="!isFormValid" class="next-step-btn" aria-label="下一步，上传照片">
          下一步 <span class="btn-icon">→</span>
        </button>
      </div>
    </div>

    <!-- Image upload -->
  <div class="section card step-3" :class="{ 'active-step': activeStep === 3 }" aria-labelledby="step3-title">
      <div class="step-header">
        <div class="step-icon">📷</div>
    <h3 id="step3-title">3. 上传照片（可选）</h3>
      </div>

      <div class="upload-container">
        <div class="upload-area">
          <div class="form-group">
            <label for="image" class="upload-label" role="button" tabindex="0" aria-controls="image" aria-label="选择或更换照片">
              <div class="upload-icon">
                <span v-if="!userImage">+</span>
                <span v-else>✓</span>
              </div>
              <span>{{ userImage ? '更换照片' : '上传与妈妈的合影' }}</span>
              <small>支持 JPG、PNG 格式</small>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden-input"
            />
          </div>
        </div>

        <div class="image-preview-container" v-if="userImage">
          <div class="image-preview">
            <img :src="userImage" alt="预览图片" />
            <button class="remove-image-btn" @click="userImage = null">×</button>
          </div>
        </div>
      </div>

      <div class="step-navigation">
        <button @click="activeStep = 2; scrollToActiveStep()" class="prev-step-btn" aria-label="上一步，编辑祝福">
          <span class="btn-icon">←</span> 上一步
        </button>
        <button
          @click="togglePreview"
          :disabled="!isFormValid"
          class="preview-btn"
          :aria-pressed="isPreviewMode"
        >
          <span class="btn-icon">👁️</span> {{ isPreviewMode ? '返回编辑' : '预览贺卡' }}
        </button>
      </div>
    </div>

    <!-- Card preview -->
  <div class="card-preview-section" v-if="isPreviewMode && selectedTemplate">
      <div class="preview-header">
        <h3>贺卡预览</h3>
        <p class="preview-tip">这是您的贺卡预览，您可以下载并发送给妈妈</p>
      </div>

      <div class="card-preview">
        <div class="card-container" ref="cardRef">
          <div class="card-background" :style="{ backgroundImage: `url(${selectedTemplate.image})` }">
            <div class="card-content">
              <div class="card-header">
                <div class="card-title">致最亲爱的妈妈</div>
              </div>
              <div class="card-message">{{ message }}</div>
              <div class="card-image" v-if="userImage">
                <img :src="userImage" alt="用户上传图片" />
              </div>
              <div class="card-footer">
                <div class="card-signature">爱您的孩子</div>
                <div class="card-date">{{ formattedDate }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="preview-actions">
          <div class="scale-select">
            <label for="scale">清晰度</label>
            <select id="scale" v-model.number="downloadScale" aria-label="选择下载清晰度">
              <option :value="1">1x（兼容性最佳）</option>
              <option :value="1.5">1.5x</option>
              <option :value="2">2x（最清晰）</option>
            </select>
          </div>
          <button
            @click="togglePreview"
            class="edit-btn"
          >
            <span class="btn-icon">✏️</span> 返回编辑
          </button>
          <button
            @click="downloadCard"
            :disabled="isDownloading"
            class="download-btn"
          >
            <span class="loader" v-if="isDownloading"></span>
            <span class="btn-icon" v-else>💾</span>
            {{ isDownloading ? '下载中...' : '下载贺卡' }}
          </button>
        </div>

        <div class="success-message" v-if="showSuccessMessage" aria-live="polite">
          <span class="success-icon">✓</span> 贺卡已成功下载！
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.greeting-card-creator {
  margin: 3rem 0;
  position: relative;
  animation: fadeIn 1s ease-out;
}

.creator-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  margin-bottom: 0.5rem;
  animation: slideInUp 0.8s ease-out;
}

.section-description {
  color: var(--text-light-color);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  animation: slideInUp 0.8s ease-out 0.2s;
}

/* Progress bar */
.progress-container {
  max-width: 800px;
  margin: 2rem auto 0;
  animation: fadeIn 1s ease-out 0.4s;
}

.progress-bar {
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, 
    var(--gradient-start) 0%, 
    var(--gradient-end) 50%, 
    var(--gradient-purple) 100%);
  background-size: 200% 200%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  animation: gradientShift 4s ease infinite;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.33%;
  position: relative;
  transition: all 0.4s ease;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: var(--text-light-color);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.step-label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light-color);
  transition: all 0.4s ease;
}

.progress-step.active .step-number {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 0 0 4px rgba(255, 90, 135, 0.2);
}

.progress-step.active .step-label {
  color: var(--primary-color);
  font-weight: 700;
}

.progress-step.completed .step-number {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
  transform: scale(1.1) rotate(10deg);
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.4);
}

.progress-step.completed .step-label {
  color: var(--success-color);
}

/* Step sections */
.section.card {
  padding: 2.5rem;
  margin-bottom: 2rem;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0.7;
  transform: perspective(1000px) rotateY(5deg) scale(0.95);
  transform-origin: right center;
}

.section.active-step {
  opacity: 1;
  transform: perspective(1000px) rotateY(0deg) scale(1);
  box-shadow: 0 20px 50px var(--shadow-color);
  border-color: var(--primary-color);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.step-icon {
  font-size: 2rem;
  margin-right: 1.2rem;
  animation: bounceIn 0.8s ease;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
}

.step-header h3 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--primary-color);
  font-weight: 700;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  margin: 2.5rem 0;
}

/* Step navigation */
.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.next-step-btn, .prev-step-btn, .preview-btn, .edit-btn, .download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  padding: 0.8em 1.8em;
  font-size: 1.05em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-icon {
  margin: 0 8px;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.next-step-btn:hover .btn-icon,
.prev-step-btn:hover .btn-icon {
  transform: translateX(5px);
}

.prev-step-btn:hover .btn-icon {
  transform: translateX(-5px);
}

.next-step-btn {
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  color: white;
  border: none;
}

.prev-step-btn {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
}

.preview-btn {
  background: linear-gradient(45deg, var(--gradient-purple), var(--gradient-pink));
  color: white;
  border: none;
}

/* Message suggestions */
.message-suggestions {
  margin-top: 2rem;
}

.suggestions-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.suggestion-chip {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 0.6em 1.2em;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.suggestion-chip:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 5px 15px var(--shadow-color);
}

/* Character count */
.char-count {
  float: right;
  font-size: 0.8rem;
  color: var(--text-light-color);
  font-weight: normal;
  transition: color 0.3s ease;
}

.char-count-warning {
  color: orange;
  font-weight: 600;
}

.char-count-danger {
  color: red;
  font-weight: 700;
}

/* Upload area */
.upload-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
  animation: fadeIn 0.5s ease-out;
}

.upload-area {
  flex: 1;
  min-width: 250px;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
  text-align: center;
}

.upload-label:hover {
  border-color: var(--primary-color);
  background-color: rgba(255, 90, 135, 0.1);
  transform: scale(1.03);
  box-shadow: 0 10px 20px var(--shadow-color);
}

.upload-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  color: var(--primary-color);
  border: 2px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.upload-label:hover .upload-icon {
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  color: white;
  border-color: transparent;
  transform: rotate(15deg) scale(1.1);
}

.upload-label span {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-color);
}

.upload-label small {
  margin-top: 0.5rem;
  color: var(--text-light-color);
  font-size: 0.8rem;
}

.hidden-input {
  display: none;
}

.image-preview-container {
  flex: 1;
  min-width: 250px;
  animation: bounceIn 0.8s ease-out;
}

.image-preview {
  position: relative;
  margin-top: 0;
  max-width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px var(--shadow-color);
  border: 5px solid white;
  transform: rotate(3deg);
  transition: transform 0.4s ease;
}

.image-preview:hover {
  transform: rotate(0deg) scale(1.05);
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.remove-image-btn:hover {
  background-color: var(--primary-color);
  color: white;
  transform: rotate(180deg) scale(1.1);
}

/* Card preview section */
.card-preview-section {
  margin-top: 3rem;
  padding: 3rem;
  background: linear-gradient(-45deg, #fff8f9, #ffe5ec, #fff0f5, #fff8f9);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  border-radius: 20px;
  box-shadow: 0 20px 60px var(--shadow-color);
  animation: fadeIn 0.8s ease-out;
  position: relative;
  overflow: hidden;
}

.card-preview-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 40%);
  animation: rotateGlow 20s linear infinite;
}

@keyframes rotateGlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.preview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-header h3 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: 800;
}

.preview-tip {
  color: var(--text-light-color);
  font-size: 1rem;
}

.card-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  width: 600px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  perspective: 1500px;
  position: relative;
}

.card-container:hover {
  transform: rotateY(10deg) rotateX(5deg) scale(1.05);
  box-shadow: 0 35px 70px rgba(0,0,0,0.2);
}

.card-background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
}

.card-content {
  width: 85%;
  height: 85%;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--glass-border);
  transform: translateZ(50px);
}

.card-header {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.card-message {
  font-size: 1.2rem;
  line-height: 1.7;
  text-align: center;
  color: var(--text-color);
  margin-bottom: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'KaiTi', serif;
  font-weight: 500;
}

.card-image {
  max-width: 220px;
  max-height: 160px;
  border-radius: 12px;
  overflow: hidden;
  margin: 1rem 0;
  border: 4px solid white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.4s ease;
  transform: translateZ(30px) rotateY(-5deg);
}

.card-image:hover {
  transform: scale(1.1) translateZ(40px) rotateY(0deg);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-footer {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  transform: translateZ(20px);
}

.card-signature {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 0.3rem;
  font-weight: 700;
  font-family: 'Long Cang', cursive;
}

.card-date {
  font-size: 0.9rem;
  color: var(--text-light-color);
  font-style: italic;
}

.preview-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.scale-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.scale-select label {
  margin: 0;
}

.edit-btn {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
}

.download-btn {
  background: linear-gradient(45deg, var(--success-color), #66bb6a);
  color: white;
  border: none;
}

.download-btn:hover,
.edit-btn:hover,
.preview-btn:hover,
.next-step-btn:hover,
.prev-step-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  margin-top: 1.5rem;
  background: linear-gradient(45deg, var(--success-color), #81c784);
  color: white;
  padding: 0.8em 1.5em;
  border-radius: 30px;
  display: flex;
  align-items: center;
  animation: bounceIn 0.8s ease;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.success-icon {
  margin-right: 8px;
  font-weight: bold;
  animation: heartBeat 1.5s infinite;
}

@media (max-width: 768px) {
  .templates-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .step-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .next-step-btn, .prev-step-btn, .preview-btn, .edit-btn, .download-btn {
    width: 100%;
  }

  .card-container {
    width: 100%;
    height: auto;
    min-height: 450px;
  }

  .card-content {
    width: 90%;
    height: auto;
    min-height: 400px;
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-message {
    font-size: 1rem;
  }

  .card-image {
    max-width: 180px;
    max-height: 120px;
  }

  .preview-actions {
  flex-direction: column;
  width: 100%;
  }

  .card-preview-section {
    padding: 1.5rem;
  }
}

/* 减少动效：尊重系统设置 */
@media (prefers-reduced-motion: reduce) {
  .greeting-card-creator,
  .section-title,
  .section-description,
  .progress-container,
  .step-icon,
  .image-preview-container,
  .card-preview-section,
  .card-container:hover,
  .card-image:hover,
  .download-btn:hover,
  .edit-btn:hover,
  .preview-btn:hover,
  .next-step-btn:hover,
  .prev-step-btn:hover {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
</style>
