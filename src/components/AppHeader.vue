<script setup lang="ts">
import type { NavItem } from '@/types';
import { ref, onMounted } from 'vue';

const navItems: NavItem[] = [
  { label: 'Accueil', href: '#home' },
  { label: 'Présentation', href: '#presentation' },
  { label: 'Domaines', href: '#domaines' },
  { label: 'Secteurs', href: '#secteurs' },
  { label: 'Équipe', href: '#equipe' },
  { label: 'Partenaires', href: '#partenaires' },
  { label: 'Contact', href: '#contact' }
];

const isScrolled = ref(false);
const isMenuOpen = ref(false);

// Gestion du défilement
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50;
  });
}

// Fonction pour le défilement fluide
const smoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId.replace('#', ''));
  if (element) {
    const headerHeight = document.querySelector('.header')?.clientHeight || 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Ferme le menu mobile après clic
    if (window.innerWidth < 768) {
      isMenuOpen.value = false;
    }
  }
};

// Fermer le menu en cliquant à l'extérieur
const closeMenuOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.nav') && !target.closest('.menu-toggle')) {
    isMenuOpen.value = false;
  }
};

// Empêcher le défilement du body quand le menu est ouvert
watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
    document.addEventListener('click', closeMenuOnClickOutside);
  } else {
    document.body.style.overflow = '';
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
});

// Fermer le menu avec la touche Escape
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  document.body.style.overflow = '';
});

// Import de watch et onBeforeUnmount
import { watch, onBeforeUnmount } from 'vue';
</script>

<template>
  <header :class="['header', { 'scrolled': isScrolled, 'menu-open': isMenuOpen }]">
    <div class="container">
      <div class="logo" @click="smoothScroll('#home')">
        <img src="../../src/assets/logo-re.png" alt="Logo" class="logo">
        <span class="logo-text responsive-text">ABC2-GROUP</span>
      </div>

      <!-- Menu Hamburger pour mobile -->
      <button 
        class="menu-toggle" 
        :class="{ 'active': isMenuOpen }" 
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <!-- Navigation -->
      <nav class="nav" :class="{ 'active': isMenuOpen }">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="nav-link"
          @click.prevent="smoothScroll(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Overlay pour mobile -->
      <div v-if="isMenuOpen" class="menu-overlay" @click="isMenuOpen = false"></div>
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
  background: #F1F8F0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  padding: 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header.scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1002;
  width: 70px;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  white-space: nowrap;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
  font-size: clamp(0.95rem, 2.5vw, 1.5rem);
}



/* Menu Toggle (Hamburger) */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
}

.menu-toggle .bar {
  width: 100%;
  height: 3px;
  background-color: #1a1a1a;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.menu-toggle.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Navigation */
.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
  white-space: nowrap;
  outline: none;
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

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .nav {
    gap: 1.5rem;
  }
  
  .nav-link {
    font-size: 0.95rem;
  }
}

@media (max-width: 880px) {
  .container {
    padding: 0 1rem;
  }
  
  .logo-text {
    font-size: 1.3rem;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 0;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1001;
    overflow-y: auto;
  }
  
  .nav.active {
    right: 0;
  }
  
  .nav-link {
    width: 100%;
    padding: 1rem 0;
    font-size: 1.1rem;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #f9f9f9;
    padding-left: 0.5rem;
  }
  
  .nav-link::after {
    display: none;
  }
  
  .menu-overlay {
    display: block;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .logo {
    gap: 0.5rem;
  }
  
  .logo svg {
    width: 32px;
    height: 32px;
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
  
  .nav {
    width: 250px;
    padding: 4rem 1.5rem 2rem;
  }
  
  .nav-link {
    font-size: 1rem;
    padding: 0.9rem 0;
  }
  
  .menu-toggle {
    width: 26px;
    height: 20px;
  }
}

@media (max-width: 360px) {
  .logo-text {
    font-size: 1rem;
  }
  
  .nav {
    width: 220px;
    padding: 3.5rem 1rem 1.5rem;
  }
  
  .nav-link {
    font-size: 0.95rem;
    padding: 0.8rem 0;
  }
}

/* Pour les très hautes résolutions */
@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

/* Accessibilité : focus styles */

</style>