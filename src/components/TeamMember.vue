<script setup lang="ts">
import type { TeamMember as TeamMemberType } from '../types';

defineProps<{
  member: TeamMemberType;
  index: number;
}>();
</script>

<template>
  <div class="team-member" :style="{ animationDelay: `${index * 0.1}s` }">
    <div class="team-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M8 12 L11 15 L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="team-content">
      <h3 class="team-role">{{ member.role }}</h3>
      <p class="team-description">{{ member.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.team-member {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.team-icon {
  color: #047857;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.team-icon svg {
  width: 24px;
  height: 24px;
}

.team-role {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.team-description {
  color: #4a5568;
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .team-member {
    padding: 1rem;
  }
  
  .team-role {
    font-size: 1rem;
  }
}
</style>