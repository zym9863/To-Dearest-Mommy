<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import CardTemplate from './CardTemplate.vue';
import type { CardTemplate as CardTemplateType } from '../types';
import { fileToDataURL, resizeImage, generateAndDownloadImage } from '../utils/imageUtils';

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
    await generateAndDownloadImage(cardRef.value, '致爱妈咪贺卡');
    showSuccessMessage.value = true;
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
const isFormValid = computed(() => {
  return selectedTemplateId.value !== null && message.value.trim() !== '';
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
        <div class="progress-steps">
          <div class="progress-step" :class="{ 'active': activeStep >= 1, 'completed': selectedTemplateId !== null }">
            <div class="step-number">1</div>
            <div class="step-label">选择模板</div>
          </div>
          <div class="progress-step" :class="{ 'active': activeStep >= 2, 'completed': message.trim() !== '' }">
            <div class="step-number">2</div>
            <div class="step-label">添加祝福</div>
          </div>
          <div class="progress-step" :class="{ 'active': activeStep >= 3, 'completed': userImage !== null }">
            <div class="step-number">3</div>
            <div class="step-label">上传照片</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Template selection -->
    <div class="section card step-1" :class="{ 'active-step': activeStep === 1 }">
      <div class="step-header">
        <div class="step-icon">🎨</div>
        <h3>1. 选择贺卡模板</h3>
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
        >
          下一步 <span class="btn-icon">→</span>
        </button>
      </div>
    </div>

    <!-- Message input -->
    <div class="section card step-2" :class="{ 'active-step': activeStep === 2 }">
      <div class="step-header">
        <div class="step-icon">✍️</div>
        <h3>2. 添加祝福语</h3>
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
          :maxlength="maxChars + 10"
        ></textarea>
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
        <button @click="activeStep = 1; scrollToActiveStep()" class="prev-step-btn">
          <span class="btn-icon">←</span> 上一步
        </button>
        <button @click="activeStep = 3; scrollToActiveStep()" :disabled="message.trim() === ''" class="next-step-btn">
          下一步 <span class="btn-icon">→</span>
        </button>
      </div>
    </div>

    <!-- Image upload -->
    <div class="section card step-3" :class="{ 'active-step': activeStep === 3 }">
      <div class="step-header">
        <div class="step-icon">📷</div>
        <h3>3. 上传照片（可选）</h3>
      </div>

      <div class="upload-container">
        <div class="upload-area">
          <div class="form-group">
            <label for="image" class="upload-label">
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
        <button @click="activeStep = 2; scrollToActiveStep()" class="prev-step-btn">
          <span class="btn-icon">←</span> 上一步
        </button>
        <button
          @click="togglePreview"
          :disabled="!isFormValid"
          class="preview-btn"
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

        <div class="success-message" v-if="showSuccessMessage">
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
}

.creator-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  margin-bottom: 0.5rem;
}

.section-description {
  color: var(--text-light-color);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}

/* Progress bar */
.progress-container {
  max-width: 800px;
  margin: 2rem auto 0;
}

.progress-bar {
  height: 6px;
  background-color: var(--border-color);
  border-radius: 3px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  border-radius: 3px;
  transition: width 0.5s ease;
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
  transition: all 0.3s ease;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-light-color);
  transition: all 0.3s ease;
}

.step-label {
  font-size: 0.9rem;
  color: var(--text-light-color);
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  box-shadow: 0 0 0 4px var(--shadow-color);
}

.progress-step.active .step-label {
  color: var(--primary-color);
  font-weight: 600;
}

.progress-step.completed .step-number {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

/* Step sections */
.section.card {
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.4s ease;
  opacity: 0.8;
  transform: scale(0.98);
}

.section.active-step {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 15px 35px var(--shadow-color);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.step-icon {
  font-size: 1.8rem;
  margin-right: 1rem;
  animation: pulse 2s infinite;
}

.step-header h3 {
  margin: 0;
  color: var(--text-color);
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

/* Step navigation */
.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.next-step-btn, .prev-step-btn, .preview-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.btn-icon {
  margin: 0 5px;
  font-size: 1.1rem;
}

/* Message suggestions */
.message-suggestions {
  margin-top: 1.5rem;
}

.suggestions-title {
  font-size: 0.9rem;
  color: var(--text-light-color);
  margin-bottom: 0.8rem;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.suggestion-chip {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 0.5em 1em;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-chip:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
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
}

.char-count-danger {
  color: red;
}

/* Upload area */
.upload-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
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
  padding: 2rem;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

.upload-label:hover {
  border-color: var(--primary-color);
  background-color: rgba(255, 90, 135, 0.05);
}

.upload-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: var(--primary-color);
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
}

.upload-label:hover .upload-icon {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: scale(1.1);
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
}

.image-preview {
  position: relative;
  margin-top: 0;
  max-width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px var(--shadow-color);
  border: 4px solid white;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-preview:hover img {
  transform: scale(1.03);
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: all 0.3s ease;
}

.remove-image-btn:hover {
  background-color: var(--primary-color);
  color: white;
  transform: rotate(90deg);
}

/* Card preview section */
.card-preview-section {
  margin-top: 3rem;
  padding: 3rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 15px 40px var(--shadow-color);
  animation: fadeIn 0.5s ease;
}

.preview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-header h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.preview-tip {
  color: var(--text-light-color);
  font-size: 0.9rem;
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
  box-shadow: 0 20px 40px var(--shadow-color);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-container:hover {
  transform: rotateY(5deg) scale(1.02);
  box-shadow: 0 25px 50px var(--shadow-color);
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
}

.card-content {
  width: 80%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.card-header {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.card-message {
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  color: var(--text-color);
  margin-bottom: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  max-width: 220px;
  max-height: 160px;
  border-radius: 12px;
  overflow: hidden;
  margin: 1rem 0;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card-image:hover {
  transform: scale(1.05);
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
}

.card-signature {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 0.3rem;
  font-weight: 600;
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

.edit-btn, .download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  padding: 0.8em 1.5em;
  font-size: 1.1em;
}

.download-btn {
  background-color: var(--primary-color);
  color: white;
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
  margin-top: 1.5rem;
  background-color: var(--success-color);
  color: white;
  padding: 0.8em 1.5em;
  border-radius: 30px;
  display: flex;
  align-items: center;
  animation: fadeIn 0.5s ease;
}

.success-icon {
  margin-right: 8px;
  font-weight: bold;
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

  .next-step-btn, .prev-step-btn, .preview-btn {
    width: 100%;
  }

  .card-container {
    width: 100%;
    height: 350px;
  }

  .card-content {
    width: 90%;
    height: 85%;
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

  .edit-btn, .download-btn {
    width: 100%;
  }

  .card-preview-section {
    padding: 1.5rem;
  }
}
</style>
