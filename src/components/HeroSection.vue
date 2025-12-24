<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);
const currentSlide = ref(0);
const totalSlides = 8;
let slideInterval: ReturnType<typeof setTimeout>;

const images = [
  { id: 1, src: '/images/image1.jpg', alt: 'Image 1' },
  { id: 2, src: '/images/image2.jpg', alt: 'Image 2' },
  { id: 3, src: '/images/image3.jpg', alt: 'Image 3' },
  { id: 4, src: '/images/image4.jpg', alt: 'Image 4' },
  { id: 5, src: '/images/image5.jpg', alt: 'Image 5' },
  { id: 6, src: '/images/image6.jpg', alt: 'Image 6' },
  { id: 7, src: '/images/image7.jpg', alt: 'Image 7' },
  { id: 8, src: '/images/image8.jpg', alt: 'Image 8' }
];


const contactInfo = ref({
  email: 'contact@abc2-group.com',
});

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetInterval();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides;
  resetInterval();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
  resetInterval();
};

const startInterval = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides;
  }, 5000); // Change toutes les 5 secondes
};

const resetInterval = () => {
  clearInterval(slideInterval);
  startInterval();
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  startInterval(); // Démarrer le carousel automatique
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  clearInterval(slideInterval);
});

const scrollToDevis = () => {
  const devisSection = document.getElementById('devis');
  if (devisSection) {
    devisSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
</script>

<template>
  <section class="hero">
    <!-- Carousel Container -->
    <div class="carousel-container">
      <!-- Images du carousel -->
      <div 
        v-for="(image, index) in images" 
        :key="image.id"
        class="carousel-slide"
        :class="{ 'active': index === currentSlide }"
      >
        <!-- Image de fond optimisée pour mobile -->
        <picture>
          <!-- Mobile -->
          <source
            media="(max-width: 768px)"
            :srcset="image.src"
          />
          <!-- Tablette -->
          <source
            media="(max-width: 1024px)"
            :srcset="image.src"
          />
          <!-- Desktop -->
          <img
            :src="image.src"
            :alt="image.alt"
            class="hero-bg"
            loading="lazy"
          />
        </picture>
      </div>
      
      <!-- Overlay pour améliorer la lisibilité du texte -->
      <div class="hero-overlay"></div>
      
      <!-- Boutons de navigation du carousel -->
      <button 
        class="carousel-btn prev-btn" 
        @click="prevSlide"
        aria-label="Image précédente"
      >
        <span class="carousel-arrow">←</span>
      </button>
      
      <button 
        class="carousel-btn next-btn" 
        @click="nextSlide"
        aria-label="Image suivante"
      >
        <span class="carousel-arrow">→</span>
      </button>
      
      <!-- Indicateurs de slide -->
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in images"
          :key="index"
          class="carousel-indicator"
          :class="{ 'active': index === currentSlide }"
          @click="goToSlide(index)"
          :aria-label="`Aller à l'image ${index + 1}`"
        />
      </div>
    </div>
    
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-eyebrow">Bienvenue chez</span>
        <span class="hero-brand">ABC2-GROUP</span>
        <span class="hero-tagline">
          Votre partenaire expert en approvisionnement industriel<br class="line-break" />
          et assistance technique sur mesure
        </span>
      </h1>
      
      <!-- <a
        :href="`mailto:${contactInfo.email}`"
        class="cta-button"
        aria-label="Demander un devis"
      >
        <span class="cta-text">Demander un devis</span>
        <span class="cta-arrow">→</span>
      </a> -->

      <a
  href="#devis"
  class="cta-button"
  aria-label="Aller au formulaire de devis"
  @click.prevent="scrollToDevis"
>
  <span class="cta-text">Demander un devis</span>
  <span class="cta-arrow">→</span>
</a>

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

/* Conteneur du carousel */
.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Slides du carousel */
.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  pointer-events: none;
}

.carousel-slide.active {
  opacity: 1;
  pointer-events: auto;
}

/* Image de fond */
.carousel-slide .hero-bg {
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
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 1rem;
  width: 100%;
  max-width: min(1200px, 90vw);
  margin: 0 auto;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  width: 100%;
}

/* Petit texte d'introduction */
.hero-eyebrow {
  font-size: clamp(0.85rem, 2vw, 1.2rem);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #a7f3d0;
  opacity: 0.9;
  display: block;
}

/* Nom de marque fort */
.hero-brand {
  font-size: clamp(2rem, 8vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #ffffff;
  text-align: center;
  display: block;
  margin: 0.2rem 0;

  /* Dégradé premium */
  background: linear-gradient(
    90deg,
    #ecfdf5 0%,
    #5eead4 50%,
    #99f6e4 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  word-break: break-word;
  overflow-wrap: break-word;
}

.hero-brand::after {
  content: '';
  display: block;
  margin: 0.6rem auto 0;
  width: min(60%, 300px);
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #14b8a6, #5eead4);
  opacity: 0.85;
}

/* Slogan */
.hero-tagline {
  font-size: clamp(1rem, 3vw, 1.6rem);
  font-weight: 500;
  line-height: 1.4;
  max-width: min(900px, 95%);
  color: #e5e7eb;
  text-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  margin-top: 0.5rem;
  display: block;
}

/* Gestion du saut de ligne */
.line-break {
  display: block;
}

/* Boutons de navigation du carousel */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

/* Indicateurs de slide */
.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 2;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.carousel-indicator:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.carousel-indicator.active {
  background: white;
  transform: scale(1.2);
}

/* CTA Button */
.cta-button {
  background: linear-gradient(135deg, #0f766e, #14b8a6);
  color: white;
  text-decoration: none;
  padding: clamp(0.85rem, 2.5vw, 1.15rem) 
           clamp(1.5rem, 5vw, 2.8rem);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  font-weight: 700;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 48px;
  min-width: 200px;
  max-width: 95vw;
  box-shadow:
    0 8px 24px rgba(15, 118, 110, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  transition: all 0.35s ease;
  animation: fadeInUp 1s ease-out 0.4s both;
  white-space: nowrap;
  z-index: 3;
  position: relative;
}

/* Texte */
.cta-text {
  white-space: nowrap;
}

/* Flèche animée */
.cta-arrow {
  font-size: 1.3em;
  transition: transform 0.35s ease;
}

/* Hover */
.cta-button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 14px 32px rgba(15, 118, 110, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);
}

.cta-button:hover .cta-arrow {
  transform: translateX(6px);
}

/* Active */
.cta-button:active {
  transform: translateY(-1px);
}

/* Focus accessibilité */
.cta-button:focus-visible,
.carousel-btn:focus-visible,
.carousel-indicator:focus-visible {
  outline: 3px solid rgba(20, 184, 166, 0.6);
  outline-offset: 4px;
}

/* ===== RESPONSIVE ADAPTATIONS ===== */

/* Mobile portrait */
@media (max-width: 768px) and (orientation: portrait) {
  .hero {
    height: 90vh;
    min-height: 450px;
  }
  
  .hero-content {
    padding: 1rem 0.75rem;
    gap: clamp(1.2rem, 5vw, 2rem);
  }
  
  .hero-brand {
    font-size: clamp(1.8rem, 7vw, 3rem);
  }
  
  .hero-tagline {
    font-size: clamp(0.95rem, 3.5vw, 1.3rem);
    line-height: 1.3;
  }
  
  .line-break {
    display: none; /* On enlève le saut forcé sur mobile */
  }
  
  .cta-button {
    min-width: 180px;
    padding: 0.8rem 1.8rem;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .prev-btn {
    left: 10px;
  }
  
  .next-btn {
    right: 10px;
  }
  
  .carousel-indicators {
    bottom: 20px;
  }
  
  .carousel-indicator {
    width: 10px;
    height: 10px;
  }
}

/* Mobile paysage */
@media (max-width: 900px) and (orientation: landscape) {
  .hero {
    height: 100vh;
    min-height: 300px;
  }
  
  .hero-content {
    gap: 1.2rem;
    padding: 0.5rem;
  }
  
  .hero-brand {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
  }
  
  .hero-tagline {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    line-height: 1.2;
  }
  
  .cta-button {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    min-width: 160px;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
  }
}

/* Petits téléphones (iPhone SE, etc.) */
@media (max-width: 375px) {
  .hero {
    height: 85vh;
    min-height: 400px;
  }
  
  .hero-content {
    padding: 0.5rem;
    gap: 1.5rem;
  }
  
  .hero-eyebrow {
    font-size: 0.8rem;
  }
  
  .hero-brand {
    font-size: 1.7rem;
  }
  
  .hero-tagline {
    font-size: 0.95rem;
    line-height: 1.25;
  }
  
  .cta-button {
    min-width: 160px;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .carousel-indicators {
    bottom: 15px;
  }
  
  .carousel-indicator {
    width: 8px;
    height: 8px;
  }
}

/* Tablette */
@media (min-width: 769px) and (max-width: 1024px) {
  .hero {
    height: 85vh;
  }
  
  .hero-content {
    max-width: min(1000px, 85vw);
  }
  
  .hero-brand {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
  }
  
  .hero-tagline {
    font-size: clamp(1.2rem, 2.8vw, 1.5rem);
  }
}

/* Très grands écrans */
@media (min-width: 1920px) {
  .hero {
    max-height: 1400px;
  }
  
  .hero-content {
    max-width: 1400px;
  }
  
  .hero-brand {
    font-size: 5rem;
  }
  
  .hero-tagline {
    font-size: 1.8rem;
  }
  
  .cta-button {
    padding: 1.3rem 3.5rem;
    font-size: 1.2rem;
  }
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