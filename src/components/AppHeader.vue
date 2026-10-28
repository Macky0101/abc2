<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Lang, SiteContent } from '../content';

const props = defineProps<{
  lang: Lang;
  content: SiteContent;
}>();

const emit = defineEmits<{
  (e: 'update:lang', newLang: Lang): void;
  (e: 'navigate', sectionId: string): void;
}>();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const setLang = (l: Lang) => {
  emit('update:lang', l);
};

const handleNav = (targetId: string, event: Event) => {
  event.preventDefault();
  closeMenu();
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <header class="site-header">
    <div class="wrap header-wrap">
      <!-- Logo marque ABC² - Group -->
      <a href="#" class="brand" @click.prevent="handleNav('top', $event)" aria-label="ABC² - Group, Accueil">
        <svg class="brand-logo-svg" viewBox="0 0 220 240" role="img" aria-label="ABC² - Group Logo">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="26">
            <polyline points="28,226 28,46 58,84" stroke="#F59321"/>
            <line x1="22" y1="228" x2="148" y2="142" stroke="#D92027"/>
            <line x1="76" y1="138" x2="192" y2="26" stroke="#28A68E"/>
            <polyline points="194,30 194,212 164,190" stroke="#4FB358"/>
          </g>
        </svg>
        <span class="brand-text">
          <span class="brand-name">ABC<sup>2</sup> - GROUP</span>
          <span class="brand-sub">BAMAKO · MALI</span>
        </span>
      </a>

      <!-- Menu burger pour mobile -->
      <button 
        class="menu-toggle" 
        :aria-expanded="isMenuOpen" 
        aria-controls="nav-main"
        aria-label="Menu principal"
        @click="toggleMenu"
      >
        <span class="burger-bar" :class="{ 'open': isMenuOpen }"></span>
        <span class="burger-bar" :class="{ 'open': isMenuOpen }"></span>
        <span class="burger-bar" :class="{ 'open': isMenuOpen }"></span>
      </button>

      <!-- Navigation principale -->
      <nav class="nav" id="nav-main" :class="{ 'open': isMenuOpen }" aria-label="Navigation principale">
        <ul>
          <li><a href="#pieces" @click="handleNav('pieces', $event)">{{ content.nav.pieces }}</a></li>
          <li><a href="#equipements" @click="handleNav('equipements', $event)">{{ content.nav.equipment }}</a></li>
          <li><a href="#chimie" @click="handleNav('chimie', $event)">{{ content.nav.chemicals }}</a></li>
          <li><a href="#secteurs" @click="handleNav('secteurs', $event)">{{ content.nav.sectors }}</a></li>
          <li><a href="#fournisseurs" @click="handleNav('fournisseurs', $event)">{{ content.nav.suppliers }}</a></li>
          <li><a href="#entreprise" @click="handleNav('entreprise', $event)">{{ content.nav.company }}</a></li>
          <li class="nav-contact"><a href="#contact" @click="handleNav('contact', $event)">{{ content.nav.contact }}</a></li>
        </ul>
      </nav>

      <!-- Sélecteur de langue bilingue -->
      <div class="lang-switch" aria-label="Langue">
        <button 
          type="button" 
          :class="{ active: lang === 'fr' }" 
          @click="setLang('fr')" 
          title="Passer en Français"
        >
          FR
        </button>
        <button 
          type="button" 
          :class="{ active: lang === 'en' }" 
          @click="setLang('en')" 
          title="Switch to English"
        >
          EN
        </button>
      </div>

      <!-- Bouton d'action principal -->
      <a href="#devis" class="btn btn-primary header-cta" @click="handleNav('devis', $event)">
        {{ content.nav.quoteBtn }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(247, 248, 244, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
  transition: all 0.2s ease;
}

.header-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 74px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex: none;
  transition: opacity 0.2s ease;
}

.brand:hover {
  opacity: 0.9;
}

.brand-logo-svg {
  width: 36px;
  height: 39px;
  flex: none;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font: 800 1.22rem/1 var(--f-display);
  letter-spacing: 0.02em;
  color: var(--ink);
}

.brand-name sup {
  font-size: 0.62em;
  color: var(--orange);
}

.brand-sub {
  display: block;
  font: 600 0.65rem/1 var(--f-mono);
  letter-spacing: 0.22em;
  color: var(--ink-60);
  margin-top: 5px;
}

.nav {
  margin-left: auto;
}

.nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav a {
  display: block;
  padding: 10px 11px;
  font-size: 0.93rem;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  border-radius: var(--radius);
  color: var(--ink);
  transition: all 0.15s ease;
}

.nav a:hover {
  background: var(--concrete);
  color: var(--pine);
}

.nav li.nav-contact {
  display: none;
}

.lang-switch {
  display: flex;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--paper);
  flex: none;
}

.lang-switch button {
  background: none;
  border: none;
  font: 600 0.76rem/1 var(--f-mono);
  padding: 9px 12px;
  cursor: pointer;
  color: var(--ink-60);
  transition: all 0.2s ease;
}

.lang-switch button:hover {
  color: var(--ink);
  background: rgba(0, 0, 0, 0.04);
}

.lang-switch button.active {
  background: var(--pine);
  color: #ffffff;
}

.header-cta {
  flex: none;
  padding: 12px 18px;
  font-size: 0.92rem;
}

.menu-toggle {
  display: none;
  margin-left: auto;
  background: none;
  border: 1px solid var(--line);
  padding: 10px;
  border-radius: var(--radius);
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
}

.burger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--ink);
  transition: all 0.3s ease;
}

.burger-bar.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger-bar.open:nth-child(2) {
  opacity: 0;
}

.burger-bar.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 1220px) {
  .header-cta {
    display: none;
  }
  .nav li.nav-contact {
    display: block;
  }
}

@media (max-width: 1060px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    display: none;
    position: absolute;
    top: 74px;
    left: 0;
    right: 0;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
    padding: 16px 24px 24px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }

  .nav.open {
    display: block;
    animation: slideDown 0.25s ease-out;
  }

  .nav ul {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }

  .nav a {
    padding: 12px 14px;
    font-size: 1.05rem;
  }

  .lang-switch {
    order: 2;
  }
  
  .menu-toggle {
    order: 3;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
