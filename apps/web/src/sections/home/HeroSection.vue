<script setup lang="ts">
import { computed } from 'vue'

import type { BlogProfile } from '@/api/articles'
import HomeButton from '@/components/home/HomeButton.vue'
import StatItem from '@/components/home/StatItem.vue'
import { homeContent } from '@/content/home'

const props = defineProps<{
  author: BlogProfile | null
  articleCount: number
}>()

const title = computed(() => (props.author ? `Hi! 我是 ${props.author.displayName}` : homeContent.hero.title))
const subtitle = computed(() => (props.author ? `${props.author.displayName} 的公开博客主页` : homeContent.hero.subtitle))
const descriptionLines = computed(() => {
  if (props.author?.bio) {
    return [props.author.bio, '这里展示这个作者最近公开发布的内容。']
  }

  return homeContent.hero.description
})
const profileName = computed(() => props.author?.displayName || homeContent.brandName)
const profileHandle = computed(() => props.author?.username || 'yuki')
const profileRoleLine = computed(() => {
  if (props.author?.bio) {
    return props.author.bio
  }

  return homeContent.hero.roleLine
})
const stats = computed(() => {
  const defaultStats = [...homeContent.hero.stats]
  defaultStats[0] = {
    value: `${props.articleCount || 0}${props.articleCount > 0 ? '+' : ''}`,
    label: '篇公开文章',
  }

  return defaultStats
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-section__content">
      <span class="hero-section__badge">
        <span class="hero-section__badge-dot" />
        {{ homeContent.hero.badge }}
      </span>
      <div class="hero-section__headline">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
      <div class="hero-section__description">
        <p
          v-for="line in descriptionLines"
          :key="line"
        >
          {{ line }}
        </p>
      </div>
      <div class="hero-section__pills">
        <span
          v-for="tag in homeContent.hero.profileTags"
          :key="tag"
          class="hero-section__pill"
        >{{ tag }}</span>
      </div>
      <div class="hero-section__actions">
        <HomeButton
          :href="homeContent.hero.primaryAction.href"
          :label="homeContent.hero.primaryAction.label"
        />
        <HomeButton
          :href="homeContent.hero.secondaryAction.href"
          :label="homeContent.hero.secondaryAction.label"
          variant="secondary"
          external
        />
      </div>
      <div class="hero-section__stats">
        <StatItem
          v-for="stat in stats"
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
        />
      </div>
      <div class="hero-section__note-card">
        <strong>最近在更新</strong>
        <span>围绕多作者博客、Markdown 内容体验和前端视觉细节持续打磨中。</span>
      </div>
    </div>

    <aside class="hero-profile-card">
      <span class="hero-profile-card__status">公开更新中</span>
      <div class="hero-profile-card__avatar">
        {{ profileName.slice(0, 1) }}
      </div>
      <h2>{{ profileName }}</h2>
      <p>@{{ profileHandle }}</p>
      <span class="hero-profile-card__role">{{ profileRoleLine }}</span>
      <div class="hero-profile-card__tags">
        <span
          v-for="tag in homeContent.hero.profileTags"
          :key="tag"
          class="tag"
          :class="`is-${tag === '代码' ? 'pink' : tag === '生活' ? 'mint' : 'violet'}`"
        >
          {{ tag }}
        </span>
      </div>
    </aside>
  </section>
</template>
