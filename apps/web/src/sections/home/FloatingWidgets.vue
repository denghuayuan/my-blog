<script setup lang="ts">
import { homeContent } from '@/content/home'
</script>

<template>
  <div
    class="floating-widgets"
    aria-hidden="true"
  >
    <div class="floating-blob floating-blob--violet" />
    <div class="floating-blob floating-blob--blue" />
    <div class="floating-blob floating-blob--pink" />
    <div class="floating-dot floating-dot--violet" />
    <div class="floating-dot floating-dot--pink" />
    <div class="floating-dot floating-dot--mint" />

    <aside class="floating-card floating-card--stats">
      <span>本周阅读</span>
      <strong>{{ homeContent.floating.weeklyReads }}</strong>
      <em>{{ homeContent.floating.weeklyDelta }}</em>
    </aside>

    <aside class="floating-card floating-card--notice">
      <div class="floating-card__icon">
        +
      </div>
      <div>
        <strong>{{ homeContent.floating.notificationTitle }}</strong>
        <span>{{ homeContent.floating.notificationTime }}</span>
      </div>
    </aside>
  </div>
</template>
