<script setup lang="ts">
import { ref, computed } from "vue";
import AppHeader from "./components/AppHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import QuotationForm from "./components/QuotationForm.vue";
import { content, type Lang } from "./content";

// Langue active (sauvegardée en localStorage si disponible)
const savedLang = (typeof localStorage !== "undefined" && localStorage.getItem("abc2_lang")) as Lang;
const currentLang = ref<Lang>(savedLang === "en" ? "en" : "fr");

const t = computed(() => content[currentLang.value]);

const setLang = (lang: Lang) => {
  currentLang.value = lang;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("abc2_lang", lang);
  }
  document.documentElement.lang = lang;
};

// Gestion des replis d'images
const handleImgError = (event: Event, fallbackSrc: string) => {
  const target = event.target as HTMLImageElement;
  if (target && target.src !== fallbackSrc) {
    target.src = fallbackSrc;
  }
};

const scrollTo = (id: string, e: Event) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div class="app-container" :id="`lang-${currentLang}`">
    <!-- Lien d'évitement accessibilité -->
    <a class="skip-link" href="#main-content">
      {{ currentLang === "fr" ? "Aller au contenu principal" : "Skip to content" }}
    </a>

    <!-- En-tête avec navigation, logo, sélecteur bilingue et bouton devis -->
    <AppHeader 
      :lang="currentLang" 
      :content="t" 
      @update:lang="setLang" 
    />

    <!-- Corps de page -->
    <main id="main-content">
      <!-- Section Héros avec défilement des images en arrière-plan (Carousel) -->
      <HeroSection :content="t" />

      <!-- Section À qui nous nous adressons -->
      <section class="section audience-section" id="audience">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.targetAudience.kicker }}</p>
            <h2>{{ t.targetAudience.title }}</h2>
          </div>
          <div class="grid g3">
            <article 
              v-for="(card, index) in t.targetAudience.cards" 
              :key="index" 
              class="card audience-card"
            >
              <p class="tag">{{ card.tag }}</p>
              <h3>{{ card.title }}</h3>
              <p>{{ card.desc }}</p>
              <a :href="card.link" class="more" @click="scrollTo(card.link.replace('#', ''), $event)">
                {{ card.cta }}
              </a>
            </article>
          </div>
        </div>
      </section>

      <!-- Section Nos activités (Pièces ELEMENT®, Équipements, Chimie, Logistique) -->
      <section class="section alt activities-section" id="pieces">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.activities.kicker }}</p>
            <h2>{{ t.activities.title }}</h2>
            <p class="lead">{{ t.activities.lead }}</p>
          </div>
          <div class="grid g2">
            <article 
              v-for="(item, index) in t.activities.items" 
              :key="index" 
              class="card card-img activity-card"
              :id="index === 1 ? 'equipements' : (index === 2 ? 'chimie' : (index === 3 ? 'logistique' : ''))"
            >
              <div class="card-img-wrapper">
                <img 
                  :src="item.img" 
                  :alt="item.alt" 
                  loading="lazy" 
                  width="800" 
                  height="500"
                  @error="handleImgError($event, `/images/image${(index % 8) + 1}.jpg`)"
                />
              </div>
              <div class="body">
                <p class="tag">{{ item.tag }}</p>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
                <a :href="item.link" class="more" @click="scrollTo(item.link.replace('#', ''), $event)">
                  {{ item.cta }}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Section 4 Étapes : De l'usine du fournisseur à votre site -->
      <section class="section dark process-section" id="processus">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.steps.kicker }}</p>
            <h2>{{ t.steps.title }}</h2>
          </div>
          <ol class="steps">
            <li v-for="(stepItem, index) in t.steps.list" :key="index">
              <h3>{{ stepItem.title }}</h3>
              <p>{{ stepItem.desc }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- Section Marques partenaires -->
      <section class="section brands-section" id="fournisseurs">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.brands.kicker }}</p>
            <h2>{{ t.brands.title }}</h2>
          </div>
          <div class="brands-grid">
            <div 
              v-for="(brand, index) in t.brands.items" 
              :key="index" 
              class="brand-box"
            >
              <strong>{{ brand.name }}</strong>
              <small>{{ brand.desc }}</small>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Secteurs desservis -->
      <section class="section alt sectors-section" id="secteurs">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.sectors.kicker }}</p>
            <h2>{{ t.sectors.title }}</h2>
          </div>
          <div class="grid g3">
            <article 
              v-for="(sector, index) in t.sectors.items" 
              :key="index" 
              class="card card-img sector-card"
            >
              <div class="card-img-wrapper">
                <img 
                  :src="sector.img" 
                  :alt="sector.alt" 
                  loading="lazy" 
                  width="800" 
                  height="500"
                  @error="handleImgError($event, `/images/image${((index + 4) % 8) + 1}.jpg`)"
                />
              </div>
              <div class="body">
                <p class="tag">{{ sector.tag }}</p>
                <h3>{{ sector.title }}</h3>
                <p>{{ sector.desc }}</p>
                <a href="#devis" class="more" @click="scrollTo('devis', $event)">
                  {{ sector.cta }}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Section Pourquoi ABC² - Group -->
      <section class="section why-section" id="entreprise">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.whyUs.kicker }}</p>
            <h2>{{ t.whyUs.title }}</h2>
          </div>
          <div class="split">
            <div class="why-content">
              <ul class="checks">
                <li v-for="(check, index) in t.whyUs.checks" :key="index">
                  {{ check }}
                </li>
              </ul>
              <div class="btn-row">
                <a href="#devis" class="btn btn-primary" @click="scrollTo('devis', $event)">
                  {{ t.whyUs.quoteBtn }}
                  <span>→</span>
                </a>
                <a href="#contact" class="btn btn-pine" @click="scrollTo('contact', $event)">
                  {{ t.whyUs.aboutBtn }}
                </a>
              </div>
            </div>
            <div class="why-image">
              <img 
                :src="t.whyUs.img" 
                :alt="t.whyUs.imgAlt" 
                loading="lazy" 
                width="800" 
                height="600"
                @error="handleImgError($event, '/images/image1.jpg')"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Section Demande de Devis Personnalisé avec Générateur PDF -->
      <section class="section devis-section" id="devis">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.quoteSection.kicker }}</p>
            <h2>{{ t.quoteSection.title }}</h2>
            <p class="lead">{{ t.quoteSection.subtitle }}</p>
          </div>
          <QuotationForm :lang="currentLang" />
        </div>
      </section>

      <!-- Section Questions fréquentes (FAQ) -->
      <section class="section alt faq-section" id="faq">
        <div class="wrap">
          <div class="section-head">
            <p class="kicker">{{ t.faq.kicker }}</p>
            <h2>{{ t.faq.title }}</h2>
          </div>
          <div class="faq-box">
            <details v-for="(faqItem, index) in t.faq.items" :key="index">
              <summary>
                <span>{{ faqItem.q }}</span>
                <span class="icon">+</span>
              </summary>
              <p>{{ faqItem.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <!-- Bandeau d'appel à l'action CTA -->
      <section class="cta-band">
        <div class="wrap">
          <h2>{{ t.ctaBand.title }}</h2>
          <a href="#devis" class="btn btn-primary" @click="scrollTo('devis', $event)">
            {{ t.ctaBand.btn }}
            <span>→</span>
          </a>
        </div>
      </section>
    </main>

    <!-- Pied de page officiel ABC² - Group -->
    <footer class="site-footer" id="contact">
      <div class="wrap">
        <div class="cols">
          <div class="col-brand">
            <a href="#" class="brand brand-light" @click.prevent="scrollTo('top', $event)">
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
            <p class="footer-desc">{{ t.footer.desc }}</p>
          </div>

          <div class="col-links">
            <h3>{{ t.footer.productsTitle }}</h3>
            <ul>
              <li><a href="#pieces" @click="scrollTo('pieces', $event)">{{ t.nav.pieces }}</a></li>
              <li><a href="#equipements" @click="scrollTo('equipements', $event)">{{ t.nav.equipment }}</a></li>
              <li><a href="#chimie" @click="scrollTo('chimie', $event)">{{ t.nav.chemicals }}</a></li>
              <li><a href="#pieces" @click="scrollTo('pieces', $event)">Transport &amp; logistique</a></li>
            </ul>
          </div>

          <div class="col-links">
            <h3>{{ t.footer.companyTitle }}</h3>
            <ul>
              <li><a href="#secteurs" @click="scrollTo('secteurs', $event)">{{ t.nav.sectors }}</a></li>
              <li><a href="#fournisseurs" @click="scrollTo('fournisseurs', $event)">{{ t.nav.suppliers }}</a></li>
              <li><a href="#entreprise" @click="scrollTo('entreprise', $event)">{{ t.nav.company }}</a></li>
              <li><a href="#devis" @click="scrollTo('devis', $event)">{{ t.nav.quoteBtn }}</a></li>
            </ul>
          </div>

          <div class="col-contact">
            <h3>{{ t.footer.contactTitle }}</h3>
            <ul>
              <li>{{ t.footer.addressLine1 }}</li>
              <li>{{ t.footer.addressLine2 }}</li>
              <li>
                <a :href="`mailto:${t.footer.email}`" class="contact-email">
                  {{ t.footer.email }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="legal">
          <span>© {{ new Date().getFullYear() }} {{ t.footer.rights }}</span>
          <span>{{ t.footer.subLegal }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 10px;
  background: var(--orange);
  color: #231301;
  padding: 10px 16px;
  font-weight: 700;
  z-index: 1000;
  border-radius: var(--radius);
}

.skip-link:focus {
  left: 12px;
}

/* Pied de page */
.site-footer {
  background: var(--ink);
  color: #C7D3CE;
  padding: 72px 0 32px;
  font-size: 0.95rem;
  margin-top: auto;
}

.site-footer .cols {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.1fr;
  gap: 40px;
}

@media (max-width: 900px) {
  .site-footer .cols {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 580px) {
  .site-footer .cols {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.col-brand .brand-light {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 18px;
}

.col-brand .brand-name {
  color: #ffffff;
}

.col-brand .brand-sub {
  color: #8FA39B;
}

.footer-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #A3B5AF;
  max-width: 38ch;
}

.site-footer h3 {
  font: 600 0.76rem/1 var(--f-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 20px;
}

.site-footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 11px;
}

.site-footer a {
  color: #C7D3CE;
  transition: color 0.2s ease;
}

.site-footer a:hover {
  color: var(--orange);
}

.contact-email {
  color: var(--orange) !important;
  font-weight: 600;
}

.legal {
  border-top: 1px solid #23352F;
  margin-top: 52px;
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  font-size: 0.86rem;
  color: #8FA39B;
}
</style>
