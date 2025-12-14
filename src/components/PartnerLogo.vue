<script setup lang="ts">
import type { PartnerLogo as PartnerLogoType } from '../types';

defineProps<{
  partner: PartnerLogoType;
}>();
</script>

<template>
  <div class="partner-logo">
    <div class="logo-container">
      <div v-if="partner.logoUrl" class="logo-image">
        <img :src="partner.logoUrl" :alt="partner.name" />
      </div>
      <div v-else class="logo-text">
        {{ partner.name }}
      </div>
    </div>
    <div v-if="partner.description" class="partner-description">
      {{ partner.description }}
    </div>
  </div>
</template>

<style scoped>
.partner-logo {
  text-align: center;
  transition: transform 0.3s ease;
}

.partner-logo:hover {
  transform: translateY(-5px);
}

.logo-container {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
}

.logo-image img {
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.partner-description {
  color: #4a5568;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .logo-container {
    padding: 1.5rem;
    height: 120px;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
}
</style>