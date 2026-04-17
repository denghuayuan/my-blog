<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { fetchArticles, type ArticleSummary } from '@/api/articles'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const articles = ref<ArticleSummary[]>([])
const loading = ref(true)
const error = ref('')

const latestArticles = computed(() => articles.value.slice(0, 8))
const authorBlogPath = computed(() => authStore.authorBlogPath)
const authorLinkLabel = computed(() => (authStore.username ? '进入我的博客主页' : '登录后创建你的博客主页'))

async function loadArticles() {
  loading.value = true
  error.value = ''

  try {
    articles.value = await fetchArticles()
  } catch (requestError) {
    articles.value = []
    error.value = requestError instanceof Error ? requestError.message : '加载文章失败'
  } finally {
    loading.value = false
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(loadArticles)
</script>

<template>
  <section class="page-grid">
    <section class="hero-card">
      <span class="eyebrow">Multi-Author Blog</span>
      <h1 class="hero-title">多人博客平台首页</h1>
      <p class="hero-copy">
        根路径现在回到平台聚合页，展示全站公开内容。每个作者保留自己的独立博客主页，通过用户名路由访问。
      </p>
      <div class="meta">
        <span class="status-pill">{{ articles.length }} 篇公开文章</span>
        <span class="status-pill">作者主页：/u/:username</span>
      </div>
      <div class="meta">
        <RouterLink
          class="status-pill"
          :to="authorBlogPath"
        >{{ authorLinkLabel }}</RouterLink>
        <RouterLink
          class="status-pill"
          to="/admin/articles"
        >后台管理</RouterLink>
      </div>
    </section>

    <section
      v-if="loading"
      class="panel"
    >
      正在加载平台文章…
    </section>

    <section
      v-else-if="error"
      class="panel"
    >
      {{ error }}
    </section>

    <section
      v-else-if="latestArticles.length"
      class="article-list"
    >
      <RouterLink
        v-for="article in latestArticles"
        :key="article.id"
        class="article-card"
        :to="`/article/${article.slug}`"
      >
        <img
          v-if="article.coverUrl"
          class="article-cover"
          :src="article.coverUrl"
          :alt="article.title"
        >
        <div class="meta">
          <span>{{ formatDate(article.createdAt) }}</span>
          <span class="status-pill">{{ article.bodyType }}</span>
        </div>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-summary">
          {{ article.summary || '这篇文章还没有单独摘要，点击进入查看完整内容。' }}
        </p>
      </RouterLink>
    </section>

    <section
      v-else
      class="panel"
    >
      目前还没有公开文章，先去后台发布第一篇内容。
    </section>
  </section>
</template>