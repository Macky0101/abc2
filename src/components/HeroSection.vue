<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { SiteContent } from '../content';

const props = defineProps<{
  content: SiteContent;
}>();

const emit = defineEmits<{
  (e: 'navigate', sectionId: string): void;
}>();

const currentSlide = ref(0);
let slideTimer: ReturnType<typeof setInterval> | null = null;

const slides = [
  { id: 1, src: '/images/image1.jpg', alt: 'Équipements miniers et concassage' },
  { id: 2, src: '/images/image2.jpg', alt: 'Pièces d\'usure et composants de broyage' },
  { id: 3, src: '/images/image3.jpg', alt: 'Engrenages et transmission industrielle' },
  { id: 4, src: '/images/image4.jpg', alt: 'Moteurs électriques et variateurs WEG' },
  { id: 5, src: '/images/image5.jpg', alt: 'Chimie de procédé et lubrifiants' },
  { id: 6, src: '/images/image6.jpg', alt: 'Logistique et entrepôt de stockage à Bamako' },
  { id: 7, src: '/images/image7.jpg', alt: 'Opérations minières et installations industrielles' },
  { id: 8, src: '/images/image8.jpg', alt: 'Énergie renouvelable et distribution' }
];

const totalSlides = slides.length;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides;
  resetTimer();
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
  resetTimer();
};

const goToSlide = (idx: number) => {
  currentSlide.value = idx;
  resetTimer();
};

const startTimer = () => {
  stopTimer();
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides;
  }, 5000);
};

const stopTimer = () => {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
};

const resetTimer = () => {
  stopTimer();
  startTimer();
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

const scrollTo = (id: string, e: Event) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <section class="hero" id="top" @mouseenter="stopTimer" @mouseleave="startTimer">
    <!-- Diaporama d'images en arrière-plan -->
    <div class="hero-carousel-bg" aria-hidden="true">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        class="bg-slide"
        :class="{ active: index === currentSlide }"
      >
        <img 
          :src="slide.src" 
          :alt="slide.alt"
          class="bg-img"
          loading="eager"
        />
      </div>
    </div>

    <!-- Filtre dégradé vert pin foncé pour lisibilité maximale -->
    <div class="hero-gradient-overlay"></div>

    <!-- Flèches de défilement du carousel -->
    <button 
      type="button" 
      class="slide-nav-btn prev-btn" 
      @click="prevSlide" 
      aria-label="Image précédente"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button 
      type="button" 
      class="slide-nav-btn next-btn" 
      @click="nextSlide" 
      aria-label="Image suivante"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- Contenu du héros -->
    <div class="wrap hero-wrap">
      <p class="kicker">{{ content.hero.kicker }}</p>
      <h1>{{ content.hero.title }}</h1>
      <p class="lead">
        <strong style="color: #ffffff;">{{ content.hero.leadStrong }}</strong> {{ content.hero.leadRest }}
      </p>

      <div class="btn-row">
        <a href="#devis" class="btn btn-primary" @click="scrollTo('devis', $event)">
          {{ content.hero.quoteBtn }}
          <span class="btn-arrow">→</span>
        </a>
        <a href="#fournisseurs" class="btn btn-ghost" @click="scrollTo('fournisseurs', $event)">
          {{ content.hero.partnerBtn }}
        </a>
      </div>

      <!-- Indicateurs de diaporama -->
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          class="indicator-pill"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
          :aria-label="`Diapositive ${index + 1}`"
        >
          <span class="indicator-progress"></span>
        </button>
      </div>

      <!-- Grille de faits marquants (Hero facts) -->
      <div class="hero-facts">
        <div v-for="(fact, index) in content.hero.facts" :key="index" class="hero-fact-card">
          <strong>{{ fact.title }}</strong>
          <span>{{ fact.subtitle }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  color: #ffffff;
  background: var(--pine);
  overflow: hidden;
  min-height: 84vh;
  display: flex;
  align-items: center;
}

/* Background Carousel */
.hero-carousel-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 6s ease-out;
  transform: scale(1.08);
}

.bg-slide.active {
  opacity: 0.42;
  transform: scale(1);
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
}

/* Gradient overlay */
.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    102deg,
    rgba(14, 47, 39, 0.97) 22%,
    rgba(14, 47, 39, 0.88) 55%,
    rgba(14, 47, 39, 0.62) 100%
  );
  pointer-events: none;
}

/* Controls */
.slide-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(14, 47, 39, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
  opacity: 0.7;
}

.slide-nav-btn:hover {
  opacity: 1;
  background: var(--orange);
  color: #231301;
  border-color: var(--orange);
  transform: translateY(-50%) scale(1.08);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

@media (max-width: 768px) {
  .slide-nav-btn {
    display: none;
  }
}

/* Content */
.hero-wrap {
  position: relative;
  z-index: 2;
  padding-top: 96px;
  padding-bottom: 96px;
  width: 100%;
}

.hero h1 {
  max-width: 17ch;
  margin-bottom: 0.4em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}

.btn-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

/* Indicators */
.carousel-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 36px;
  margin-bottom: 12px;
}

.indicator-pill {
  width: 28px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.indicator-pill:hover {
  background: rgba(255, 255, 255, 0.5);
}

.indicator-pill.active {
  width: 48px;
  background: var(--orange);
}

/* Facts Grid */
.hero-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin-top: 48px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
}

.hero-fact-card {
  background: rgba(14, 47, 39, 0.88);
  backdrop-filter: blur(10px);
  padding: 22px 24px;
  transition: background 0.2s ease;
}

.hero-fact-card:hover {
  background: rgba(18, 61, 51, 0.95);
}

.hero-fact-card strong {
  display: block;
  font-family: var(--f-display);
  font-size: 1.05rem;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin-bottom: 5px;
}

.hero-fact-card span {
  color: #B9C7C1;
  font-size: 0.92rem;
  line-height: 1.45;
}

@media (max-width: 860px) {
  .hero-wrap {
    padding-top: 72px;
    padding-bottom: 68px;
  }
  .hero-facts {
    grid-template-columns: 1fr;
    margin-top: 36px;
  }
}
</style>