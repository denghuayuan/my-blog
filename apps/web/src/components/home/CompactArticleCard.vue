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

const formattedMeta = computed(() => {
  const date = new Date(props.article.createdAt).toLocaleDateString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
  })

  return `${date} · ${props.article.bodyType === 'markdown' ? 'Markdown' : '短文'}`
})
</script>

<template>
  <RouterLink
    class="compact-article-card"
    :to="articleHref"
  >
    <div class="compact-article-card__media">
      <img
        v-if="article.coverUrl"
        :src="article.coverUrl"
        :alt="article.title"
      >
      <div
        v-else
        class="compact-article-card__placeholder"
      >
        {{ article.title.slice(0, 2) }}
      </div>
    </div>
    <div class="compact-article-card__body">
      <span class="tag is-blue">{{ article.status === 'published' ? '专题' : '草稿' }}</span>
      <h3>{{ article.title }}</h3>
      <div class="compact-article-card__meta">
        <span>{{ formattedMeta }}</span>
        <span class="compact-article-card__metric">{{ article.summary ? article.summary.length : 0 }}</span>
      </div>
    </div>
  </RouterLink>
</template>
