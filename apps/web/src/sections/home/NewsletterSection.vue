<script setup lang="ts">
import { ref } from 'vue'

import { homeContent } from '@/content/home'

const email = ref('')
const message = ref('')

function handleSubmit() {
  if (!email.value.trim()) {
    message.value = '先填写邮箱地址，订阅入口后面再接真实接口。'
    return
  }

  message.value = `已记录邮箱 ${email.value}，后续接入订阅服务时可以直接复用这个表单。`
  email.value = ''
}
</script>

<template>
  <section
    id="newsletter"
    class="home-section newsletter-section"
  >
    <div class="newsletter-card">
      <span class="newsletter-card__badge">{{ homeContent.newsletter.badge }}</span>
      <h2>{{ homeContent.newsletter.title }}</h2>
      <div class="newsletter-card__description">
        <p
          v-for="line in homeContent.newsletter.description"
          :key="line"
        >
          {{ line }}
        </p>
      </div>

      <form
        class="newsletter-card__form"
        @submit.prevent="handleSubmit"
      >
        <input
          v-model="email"
          type="email"
          :placeholder="homeContent.newsletter.placeholder"
        >
        <button type="submit">
          {{ homeContent.newsletter.submitLabel }}
        </button>
      </form>

      <p
        v-if="message"
        class="newsletter-card__message"
      >
        {{ message }}
      </p>

      <div class="newsletter-card__highlights">
        <span
          v-for="item in homeContent.newsletter.highlights"
          :key="item"
        >{{ item }}</span>
      </div>
    </div>
  </section>
</template>
