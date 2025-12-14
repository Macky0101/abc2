<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
import DomainCard from './components/DomainCard.vue';
import SectorCard from './components/SectorCard.vue';
import type { DomainCard as DomainCardType, SectorCard as SectorCardType } from './types';

const domainCards = ref<DomainCardType[]>([
  {
    icon: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 L30 35 L35 50 L50 45 L65 50 L70 35 Z" stroke="currentColor" stroke-width="3" fill="none"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
      <path d="M30 60 L25 75 L40 75 L35 60" stroke="currentColor" stroke-width="3" fill="none"/>
      <path d="M70 60 L75 75 L60 75 L65 60" stroke="currentColor" stroke-width="3" fill="none"/>
      <line x1="42" y1="28" x2="38" y2="22" stroke="currentColor" stroke-width="3"/>
      <line x1="58" y1="28" x2="62" y2="22" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    title: 'Import-Export',
    subtitle: '& Distribution',
    description: 'Présence au préset ce a carge aux fournisseurs fournisseurs',
    iconColor: '#047857'
  },
  {
    icon: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="75" rx="20" ry="8" fill="currentColor"/>
      <path d="M30 75 L35 35 C35 30 40 25 50 25 C60 25 65 30 65 35 L70 75" stroke="currentColor" stroke-width="3" fill="none"/>
      <ellipse cx="50" cy="35" rx="15" ry="6" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="42" y1="50" x2="40" y2="60" stroke="currentColor" stroke-width="2"/>
      <line x1="50" y1="48" x2="50" y2="62" stroke="currentColor" stroke-width="2"/>
      <line x1="58" y1="50" x2="60" y2="60" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    title: 'Produits Chimiques',
    subtitle: '& Lubrifiants',
    description: 'Prodance a préses de Tindustri, en developpe en conditions',
    iconColor: '#F59E0B'
  },
  {
    icon: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="35" width="50" height="30" rx="3" stroke="currentColor" stroke-width="3" fill="none"/>
      <rect x="30" y="40" width="15" height="12" fill="currentColor"/>
      <rect x="20" y="65" width="15" height="15" rx="7.5" fill="currentColor"/>
      <rect x="65" y="65" width="15" height="15" rx="7.5" fill="currentColor"/>
      <path d="M45 50 L55 50 L60 40 L75 40 L75 65" stroke="currentColor" stroke-width="3" fill="none"/>
      <circle cx="27.5" cy="72.5" r="4" fill="white"/>
      <circle cx="72.5" cy="72.5" r="4" fill="white"/>
    </svg>`,
    title: 'Transport',
    subtitle: '& Logistique',
    description: 'Materis de desh tager de maefel au haute excelle conditións',
    iconColor: '#DC2626'
  }
]);

const sectorCards = ref<SectorCardType[]>([
  {
    image: 'https://images.pexels.com/photos/3862600/pexels-photo-3862600.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Industrie Miniére',
    description: 'Avz : Tetchered psement dans les c\'iemiss mimaiches africames et en ouranne d\'monde.'
  },
  {
    image: 'https://images.pexels.com/photos/8853502/pexels-photo-8853502.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Agro-industrie & Industrie Manufacturiére',
    description: 'Supplément d\'equipements aquiperment et d\'a industriellors manufacturiéres pour tous les secteurs.'
  }
]);

const isVisible = ref<Record<string, boolean>>({});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value[entry.target.id] = true;
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[id]').forEach((el) => {
    observer.observe(el);
  });
});
</script>

<template>
  <div class="app">
    <AppHeader />
    <HeroSection />

    <section id="domaines" class="section domains-section" :class="{ 'visible': isVisible['domaines'] }">
      <div class="container">
        <h2 class="section-title">Nos Domaines Clés</h2>
        <div class="cards-grid three-cols">
          <DomainCard
            v-for="(card, index) in domainCards"
            :key="index"
            :card="card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          />
        </div>
      </div>
    </section>

    <section id="secteurs" class="section sectors-section" :class="{ 'visible': isVisible['secteurs'] }">
      <div class="container">
        <h2 class="section-title">Nos Secteurs d'Activité</h2>
        <div class="cards-grid two-cols">
          <SectorCard
            v-for="(card, index) in sectorCards"
            :key="index"
            :card="card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          />
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30L20 10L30 30L25 20H15L10 30Z" fill="#F59E0B"/>
              <path d="M20 10L30 30H35L25 10H20Z" fill="#047857"/>
            </svg>
            <span class="logo-text">ABC2-GROUP</span>
          </div>
          <nav class="footer-nav">
            <a href="#" class="footer-link">Politiques Environnemental et Social</a>
            <a href="#" class="footer-link">Politique Sante Si</a>
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: 5rem 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.domains-section {
  background: #f5f5f0;
}

.sectors-section {
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #1a1a1a;
}

.cards-grid {
  display: grid;
  gap: 2.5rem;
}

.three-cols {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.two-cols {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.footer {
  background: #f5f5f0;
  padding: 3rem 0;
  border-top: 1px solid #e5e5e5;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.footer-nav {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-link {
  color: #4a4a4a;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #047857;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }

  .cards-grid {
    gap: 2rem;
  }

  .three-cols,
  .two-cols {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-nav {
    flex-direction: column;
    align-items: center;
  }
}
</style>
