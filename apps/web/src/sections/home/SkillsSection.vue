<script setup lang="ts">
import SkillCard from '@/components/home/SkillCard.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import { homeContent } from '@/content/home'
</script>

<template>
  <section
    id="skills"
    class="home-section skills-section"
  >
    <SectionHeader
      :badge="homeContent.skills.badge"
      :title="homeContent.skills.title"
      :description="homeContent.skills.description"
      align="center"
    />
    <div class="skills-section__grid">
      <SkillCard
        v-for="skill in homeContent.skills.items"
        :key="skill.title"
        :skill="skill"
      />
    </div>
  </section>
</template>
