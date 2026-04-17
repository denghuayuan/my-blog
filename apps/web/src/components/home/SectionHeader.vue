<script setup lang="ts">
const props = defineProps<{
  badge: string
  title: string
  description: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <header
    class="home-section-header"
    :class="`is-${props.align || 'left'}`"
  >
    <span class="home-section-badge">{{ props.badge }}</span>
    <h2 class="home-section-title">
      {{ props.title }}
    </h2>
    <p class="home-section-description">
      {{ props.description }}
    </p>
  </header>
</template>
