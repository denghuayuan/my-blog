<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import '@/styles/home.css'

import {
  fetchArticles,
  fetchBlogArticles,
  type ArticleSummary,
  type BlogProfile,
} from '@/api/articles'
import AboutSection from '@/sections/home/AboutSection.vue'
import FeaturedArticlesSection from '@/sections/home/FeaturedArticlesSection.vue'
import FloatingWidgets from '@/sections/home/FloatingWidgets.vue'
import HeroSection from '@/sections/home/HeroSection.vue'
import NewsletterSection from '@/sections/home/NewsletterSection.vue'
import SiteFooterSection from '@/sections/home/SiteFooterSection.vue'
import SiteHeaderSection from '@/sections/home/SiteHeaderSection.vue'
import SkillsSection from '@/sections/home/SkillsSection.vue'
import { homeContent } from '@/content/home'

const route = useRoute()

const articles = ref<ArticleSummary[]>([])
const author = ref<BlogProfile | null>(null)
const loading = ref(true)
const error = ref('')

async function loadArticles() {
  const username = typeof route.params.username === 'string' ? route.params.username : ''

  loading.value = true
  error.value = ''

  try {
    if (username) {
      const result = await fetchBlogArticles(username)
      author.value = result.author
      articles.value = result.articles
    } else {
      author.value = null
      articles.value = await fetchArticles()
    }
  } catch (requestError) {
    author.value = null
    articles.value = []
    error.value = requestError instanceof Error ? requestError.message : '加载文章失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadArticles)
watch(() => route.params.username, loadArticles)
</script>

<template>
  <section class="home-page">
    <SiteHeaderSection
      :brand-name="homeContent.brandName"
      :items="homeContent.navItems"
    />
    <HeroSection
      :author="author"
      :article-count="articles.length"
    />
    <FeaturedArticlesSection
      :articles="articles"
      :author="author"
      :loading="loading"
      :error="error"
    />
    <SkillsSection />
    <AboutSection />
    <NewsletterSection />
    <SiteFooterSection />
    <FloatingWidgets />
  </section>
</template>