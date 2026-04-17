<script setup lang="ts">
import type { HomeSkillItem } from '../../content/home'

defineProps<{
  skill: HomeSkillItem
}>()
</script>

<template>
  <article
    class="skill-card"
    :class="`tone-${skill.tone}`"
  >
    <div class="skill-card__body">
      <div class="skill-card__icon">
        {{ skill.iconLabel }}
      </div>
      <div class="skill-card__copy">
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.subtitle }}</p>
      </div>
    </div>
    <div class="skill-card__footer">
      <span>{{ skill.articleCount }}</span>
      <span class="skill-card__arrow">+</span>
    </div>
  </article>
</template>
