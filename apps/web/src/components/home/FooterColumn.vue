<script setup lang="ts">
import type { HomeFooterColumn } from '@/content/home'

defineProps<{
  column: HomeFooterColumn
}>()
</script>

<template>
  <section class="home-footer-column">
    <h3>{{ column.title }}</h3>
    <a
      v-for="link in column.links"
      :key="link.label"
      :href="link.href"
    >{{ link.label }}</a>
  </section>
</template>
