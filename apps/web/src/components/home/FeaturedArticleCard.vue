<script setup lang="ts">
import { computed } from 'vue'

import type { ArticleSummary } from '@/api/articles'

const props = defineProps<{
  article: ArticleSummary
  authorUsername?: string
}>()

const articleHref = computed(() =>
  props.authorUsername ? `/u/${props.authorUsername}/article/${props.article.slug}` : `/article/${props.article.slug}`,
)

const formattedDate = computed(() =>
  new Date(props.article.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)
</script>

<template>
  <RouterLink
    class="featured-article-card"
    :to="articleHref"
  >
    <div class="featured-article-card__media">
      <img
        v-if="article.coverUrl"
        :src="article.coverUrl"
        :alt="article.title"
      >
      <div
        v-else
        class="featured-article-card__placeholder"
      >
        Article
      </div>
    </div>
    <div class="featured-article-card__body">
      <div class="featured-article-card__tags">
        <span class="tag is-violet">{{ article.bodyType === 'markdown' ? 'Markdown' : '文章' }}</span>
        <span class="tag is-pink">{{ article.status === 'published' ? '已发布' : '草稿' }}</span>
      </div>
      <h3>{{ article.title }}</h3>
      <p>{{ article.summary || '这篇文章还没有摘要，点击进入查看完整内容。' }}</p>
      <footer class="featured-article-card__footer">
        <div class="featured-article-card__meta">
          <span>{{ formattedDate }}</span>
          <span>·</span>
          <span>{{ article.bodyType === 'markdown' ? 'Markdown 阅读' : '轻量阅读' }}</span>
        </div>
        <span class="featured-article-card__cta">阅读</span>
      </footer>
    </div>
  </RouterLink>
</template>
