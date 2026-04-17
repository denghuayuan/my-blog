<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div class="home-stat-item">
    <strong class="home-stat-value">{{ value }}</strong>
    <span class="home-stat-label">{{ label }}</span>
  </div>
</template>
