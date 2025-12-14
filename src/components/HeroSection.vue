<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isMobile = ref(false);

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Cleanup
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});

import { onBeforeUnmount } from 'vue';
</script>

<template>
  <section class="hero">
    <!-- Image de fond optimisée pour mobile -->
    <picture>
      <!-- Pour mobile (écrans étroits) -->
      <source 
        media="(max-width: 768px)" 
        srcset="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop"
      >
      <!-- Pour tablette -->
      <source 
        media="(max-width: 1024px)" 
        srcset="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200"
      >
      <!-- Pour desktop -->
      <img
        src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Approvisionnement technique"
        class="hero-bg"
        loading="eager"
      >
    </picture>
    
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">
        APPROVISIONNEMENT<br />
        TECHNIQUE
      </h1>
      <button class="cta-button">Demander un devis</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  max-height: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

/* Image de fond */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: clamp(2rem, 8vw, 4.5rem);
  font-weight: 800;
  letter-spacing: clamp(0.5px, 0.5vw, 2px);
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease-out 0.2s both;
  padding: 0 1rem;
}

.cta-button {
  background: #0f766e;
  color: white;
  border: none;
  padding: clamp(0.875rem, 3vw, 1.25rem) clamp(1.5rem, 6vw, 3rem);
  font-size: clamp(1rem, 3vw, 1.125rem);
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
  animation: fadeInUp 1s ease-out 0.4s both;
  min-height: 44px; /* Taille minimale pour le toucher sur mobile */
  min-width: 160px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta-button:hover {
  background: #0d5e57;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 118, 110, 0.4);
}

.cta-button:active {
  transform: translateY(0);
}

/* Pour mobile portrait */
@media (max-width: 768px) and (orientation: portrait) {
  .hero {
    height: 90vh;
    min-height: 450px;
  }
  
  .hero-title {
    font-size: clamp(1.75rem, 7vw, 2.5rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  
  .hero-content {
    padding: 1rem 0.5rem;
  }
}

/* Pour mobile paysage */
@media (max-width: 900px) and (orientation: landscape) {
  .hero {
    height: 100vh;
    min-height: 300px;
  }
  
  .hero-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    margin-bottom: 1rem;
  }
  
  .cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
}

/* Pour tablette */
@media (min-width: 769px) and (max-width: 1024px) {
  .hero {
    height: 85vh;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
  }
}

/* Pour petits téléphones (iPhone SE, etc.) */
@media (max-width: 375px) {
  .hero {
    height: 85vh;
    min-height: 400px;
  }
  
  .hero-title {
    font-size: 1.5rem;
    letter-spacing: 0.25px;
  }
  
  .cta-button {
    min-width: 140px;
    padding: 0.75rem 1.25rem;
  }
}

/* Pour très grands écrans */
@media (min-width: 1920px) {
  .hero {
    max-height: 1400px;
  }
  
  .hero-title {
    font-size: 5rem;
  }
  
  .cta-button {
    padding: 1.5rem 4rem;
    font-size: 1.25rem;
  }
}

/* Accessibilité : focus */
.cta-button:focus {
  outline: 3px solid rgba(15, 118, 110, 0.5);
  outline-offset: 2px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth scrolling pour toute la page */
html {
  scroll-behavior: smooth;
}
</style>