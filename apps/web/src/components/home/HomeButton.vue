<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string
    label: string
    variant?: 'primary' | 'secondary'
    external?: boolean
  }>(),
  {
    href: '#',
    variant: 'primary',
    external: false,
  },
)
</script>

<template>
  <a
    class="home-button"
    :class="`is-${props.variant}`"
    :href="props.href"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noreferrer' : undefined"
  >
    <span class="home-button-dot" />
    <span>{{ props.label }}</span>
  </a>
</template>
