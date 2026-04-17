<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'

import {
  fetchArticleDetail,
  fetchBlogArticleDetail,
  type ArticleDetail,
  type BlogProfile,
} from '@/api/articles'

const route = useRoute()

const article = ref<ArticleDetail | null>(null)
const author = ref<BlogProfile | null>(null)
const loading = ref(true)
const error = ref('')

const renderedMarkdown = computed(() => {
  if (!article.value || article.value.bodyType !== 'markdown') {
    return ''
  }

  return marked.parse(article.value.content) as string
})

async function loadArticle() {
  const slug = String(route.params.slug || '')
  const username = typeof route.params.username === 'string' ? route.params.username : ''

  loading.value = true
  error.value = ''

  try {
    if (username) {
      const result = await fetchBlogArticleDetail(username, slug)
      author.value = result.author
      article.value = result.article
    } else {
      author.value = null
      article.value = await fetchArticleDetail(slug)
    }
  } catch (requestError) {
    author.value = null
    article.value = null
    error.value = requestError instanceof Error ? requestError.message : '加载文章失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadArticle)
watch(() => route.params.slug, loadArticle)

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <section class="page-grid">
    <div
      v-if="loading"
      class="panel"
    >
      正在加载文章详情…
    </div>
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <article
      v-else-if="article"
      class="article-detail"
    >
      <img
        v-if="article.coverUrl"
        class="detail-cover"
        :src="article.coverUrl"
        :alt="article.title"
      >
      <div class="meta">
        <span>{{ formatDate(article.createdAt) }}</span>
        <span class="status-pill">{{ article.status }}</span>
        <span class="status-pill">{{ article.bodyType }}</span>
      </div>
      <h1 class="detail-title">
        {{ article.title }}
      </h1>
      <p
        v-if="author"
        class="muted"
      >
        作者：{{ author.displayName }} · @{{ author.username }}
      </p>
      <p class="muted">
        {{ article.summary || '这篇文章没有单独摘要，直接阅读正文即可。' }}
      </p>
      <div
        v-if="article.bodyType === 'markdown'"
        class="detail-body markdown-body"
        v-html="renderedMarkdown"
      />
      <div
        v-else
        class="detail-body"
      >
        {{ article.content }}
      </div>
    </article>
  </section>
</template>