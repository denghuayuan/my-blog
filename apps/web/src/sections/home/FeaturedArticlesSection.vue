<script setup lang="ts">
import { computed } from 'vue'

import type { ArticleSummary, BlogProfile } from '@/api/articles'
import CompactArticleCard from '@/components/home/CompactArticleCard.vue'
import FeaturedArticleCard from '@/components/home/FeaturedArticleCard.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import { homeContent } from '@/content/home'

const props = defineProps<{
  articles: ArticleSummary[]
  author: BlogProfile | null
  loading: boolean
  error: string
}>()

const primaryArticle = computed(() => props.articles[0] || null)
const secondaryArticles = computed(() => props.articles.slice(1, 3))
</script>

<template>
  <section
    id="featured"
    class="home-section featured-section"
  >
    <div class="featured-section__header-row">
      <SectionHeader
        :badge="homeContent.featured.badge"
        :title="homeContent.featured.title"
        :description="homeContent.featured.description"
      />
      <a
        class="featured-section__link"
        href="#featured-list"
      >{{ homeContent.featured.actionLabel }}</a>
    </div>

    <div
      v-if="loading"
      class="panel"
    >
      正在加载文章列表…
    </div>
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>
    <div
      v-else-if="!articles.length"
      class="empty"
    >
      目前还没有已发布文章。
    </div>

    <div
      v-else
      id="featured-list"
      class="featured-section__grid"
    >
      <FeaturedArticleCard
        v-if="primaryArticle"
        :article="primaryArticle"
        :author-username="author?.username"
      />
      <div class="featured-section__stack">
        <CompactArticleCard
          v-for="article in secondaryArticles"
          :key="article.id"
          :article="article"
          :author-username="author?.username"
        />
      </div>
    </div>
  </section>
</template>
