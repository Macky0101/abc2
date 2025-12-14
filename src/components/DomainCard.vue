<script setup lang="ts">
import type { DomainCard } from '@/types';


defineProps<{
  card: DomainCard;
}>();
</script>

<template>
  <div class="domain-card">
    <div class="icon-container" :style="{ color: card.iconColor }">
      <div v-html="card.icon" class="icon"></div>
    </div>
    <h3 class="title">{{ card.title }}</h3>
    <p v-if="card.subtitle" class="subtitle">{{ card.subtitle }}</p>
    <p class="description">{{ card.description }}</p>
  </div>
</template>

<style scoped>
.domain-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.domain-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.icon-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.description {
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.5;
  margin: 0;
}
</style>
