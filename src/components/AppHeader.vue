<script setup lang="ts">
import type { NavItem } from '@/types';
import { ref } from 'vue';

const navItems: NavItem[] = [
  { label: 'Accueil', href: '#' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Domaines d\'intervention', href: '#domaines' },
  { label: 'Partenaires', href: '#partenaires' }
];

const isScrolled = ref(false);

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50;
  });
}
</script>

<template>
  <header :class="['header', { 'scrolled': isScrolled }]">
    <div class="container">
      <div class="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 30L20 10L30 30L25 20H15L10 30Z" fill="#F59E0B"/>
          <path d="M20 10L30 30H35L25 10H20Z" fill="#047857"/>
        </svg>
        <span class="logo-text">ABC2-GROUP</span>
      </div>
      <nav class="nav">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="nav-link"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 1rem 0;
}

.header.scrolled {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #047857;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #047857;
}

.nav-link:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
</style>
