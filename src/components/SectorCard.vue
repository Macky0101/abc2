<script setup lang="ts">
import type { SectorCard } from '@/types';


defineProps<{
  card: SectorCard;
}>();
</script>

<template>
  <div class="sector-card">
    <div class="image-container">
      <img :src="card.image" :alt="card.title" />
    </div>
    <div class="content">
      <h3 class="title">{{ card.title }}</h3>
      <p class="description">{{ card.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.sector-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.sector-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sector-card:hover .image-container img {
  transform: scale(1.05);
}

.content {
  padding: 2rem;
}

.title {
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
