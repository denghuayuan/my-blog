<script setup lang="ts">
import type { HomeNavItem } from '@/content/home'

defineProps<{
  brandName: string
  items: HomeNavItem[]
}>()
</script>

<template>
  <header
    id="top"
    class="home-header"
  >
    <div class="home-header__brand">
      <div class="home-header__brand-mark">
        Y
      </div>
      <span>{{ brandName }}</span>
    </div>
    <nav class="home-header__nav">
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
      >{{ item.label }}</a>
    </nav>
    <a
      class="home-header__cta"
      href="#newsletter"
    >联系我</a>
  </header>
</template>
