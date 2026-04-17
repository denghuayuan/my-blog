<script setup lang="ts">
import { homeContent } from '@/content/home'
</script>

<template>
  <section
    id="about"
    class="home-section about-section"
  >
    <div class="about-section__visual">
      <div class="about-collage about-collage--primary">
        <span class="about-collage__eyebrow">Design Studio</span>
        <strong>审美、结构与叙事感</strong>
      </div>
      <div class="about-collage about-collage--secondary">
        <span class="about-collage__chip">UI / UX</span>
        <span class="about-collage__chip">Frontend</span>
        <span class="about-collage__chip">Writing</span>
      </div>
      <div class="about-collage about-collage--tertiary">
        <span class="about-collage__metric">12 城市</span>
        <span class="about-collage__caption">把见闻、照片和灵感慢慢整理成内容。</span>
      </div>
    </div>

    <div class="about-section__content">
      <span class="home-section-badge">{{ homeContent.about.badge }}</span>
      <div class="about-section__title">
        <h2
          v-for="line in homeContent.about.title"
          :key="line"
        >
          {{ line }}
        </h2>
      </div>
      <p class="about-section__description">
        {{ homeContent.about.description }}
      </p>

      <div class="about-section__facts">
        <article
          v-for="fact in homeContent.about.facts"
          :key="fact.text"
          class="about-fact"
          :class="`tone-${fact.tone}`"
        >
          <span class="about-fact__icon">{{ fact.iconLabel }}</span>
          <span>{{ fact.text }}</span>
        </article>
      </div>

      <div class="about-section__socials">
        <a
          v-for="link in homeContent.about.socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.shortLabel }}
        </a>
      </div>
    </div>
  </section>
</template>
