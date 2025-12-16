<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
import DomainCard from './components/DomainCard.vue';
import SectorCard from './components/SectorCard.vue';
import IndustrieMiniereImg from '@/assets/miniers.jpg';
import AgroIndustrieImg from '@/assets/barrile.png';
import EnergieRenouvelableImg from '@/assets/champ.jpg';
import type { 
  DomainCard as DomainCardType, 
  SectorCard as SectorCardType
} from './types';

// Données descriptives
const companyDescription = ref<string>(`ABC2 – Group est une entreprise spécialisée dans l'import-export et la distribution d'équipements industriels, de pièces de rechange, de produits chimiques et de lubrifiants haute performance, destinés aux industries de pointe. Forte d'une expertise éprouvée et d'un réseau international de partenaires de confiance, ABC2 – Group accompagne les entreprises industrielles en leur proposant des solutions fiables, personnalisées et durables pour optimiser leurs opérations.`);

const whyChooseUs = ref<string[]>([
  'Produits certifiés et conformes aux normes internationales',
  'Équipe experte et disponible',
  'Logistique rapide et sécurisée dans toute la région',
  'Partenariat avec des marques fiables et innovantes',
  'Engagement pour des pratiques responsables et durables',
  'Accompagnement humain et technique à chaque étape'
]);

const engagementPoints = ref<string[]>([
  'Qualité : des produits fiables, conformes aux standards internationaux',
  'Réactivité : un service rapide et efficace, adapté aux contraintes industrielles',
  'Proximité : un accompagnement sur mesure et une relation client durable'
]);

const contactInfo = ref({
  email: 'contact@abc2-group.com',
  description: `Vous avez un projet ? Besoin urgent d'un équipement ou de pièces de rechange ? ABC2 – Group est votre partenaire industriel de confiance, au service de la performance et de la durabilité.`
});

// Domaines d'activité
const domainCards = ref<DomainCardType[]>([
  {
    icon: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <!-- Gros engrenage (en bas à gauche) -->
      <circle cx="35" cy="65" r="15" stroke="currentColor" stroke-width="2.5" fill="none"/>
      
      <!-- Dents du gros engrenage -->
      <rect x="49" y="64" width="5" height="2" rx="0.5" fill="currentColor"/>
      <rect x="21" y="64" width="5" height="2" rx="0.5" fill="currentColor"/>
      <rect x="34" y="49" width="2" height="5" rx="0.5" fill="currentColor"/>
      <rect x="34" y="79" width="2" height="5" rx="0.5" fill="currentColor"/>
      
      <!-- Petit engrenage (en haut à droite) -->
      <circle cx="65" cy="35" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
      
      <!-- Dents du petit engrenage -->
      <rect x="74" y="34" width="3" height="2" rx="0.5" fill="currentColor"/>
      <rect x="56" y="34" width="3" height="2" rx="0.5" fill="currentColor"/>
      <rect x="64" y="46" width="2" height="3" rx="0.5" fill="currentColor"/>
      <rect x="64" y="24" width="2" height="3" rx="0.5" fill="currentColor"/>
      
      <!-- Centre des engrenages -->
      <circle cx="35" cy="65" r="3" fill="currentColor"/>
      <circle cx="65" cy="35" r="2" fill="currentColor"/>
      
      <!-- Flèche de connexion (diagonale avec double flèche) -->
      <path d="M40 60 L60 40" stroke="currentColor" stroke-width="3" fill="none"/>
      
      <!-- Tête de flèche (double sens) -->
      <path d="M45 55 L40 60 L42 62" fill="currentColor"/>
      <path d="M55 45 L60 40 L58 38" fill="currentColor"/>
      
      <!-- Points de connexion -->
      <circle cx="40" cy="60" r="3" fill="currentColor"/>
      <circle cx="60" cy="40" r="3" fill="currentColor"/>
      
      <!-- Indication import (flèche vers le gros engrenage) -->
      <path d="M38 62 L33 67 L35 69" fill="#047857"/>
      
      <!-- Indication export (flèche vers le petit engrenage) -->
      <path d="M62 38 L67 33 L65 31" fill="#DC2626"/>
    </svg>`,
    title: 'Import-Export & Distribution',
    subtitle: '',
    description: 'Nous mettons à disposition une large gamme d\'équipements industriels et de pièces détachées essentiels au bon fonctionnement des installations. Tous nos produits sont rigoureusement sélectionnés selon des standards techniques stricts et conformes aux normes internationales.',
    iconColor: '#047857'
  },
  {
    icon:  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 15 H60 V30 L70 50 V85 H30 V50 L40 30 Z"
      fill="#facc15" stroke="#ca8a04" stroke-width="3"/>

    <line x1="40" y1="15" x2="60" y2="15" stroke="#ca8a04" stroke-width="3"/>

    <circle cx="45" cy="60" r="3" fill="#fde047"/>
    <circle cx="55" cy="65" r="2.5" fill="#fde047"/>
    <circle cx="50" cy="72" r="2" fill="#fde047"/>
  </svg>`,
    title: 'Produits Chimiques & Lubrifiants',
    subtitle: '',
    description: 'Nous proposons une variété de produits chimiques industriels et de lubrifiants de haute qualité, adaptés aux besoins spécifiques des clients, pour améliorer la performance des machines et prolonger la durée de vie des équipements.',
    iconColor: '#F59E0B'
  },
  {
    icon: `<svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <!-- Cabine du camion (inversée) -->
      <rect x="50" y="40" width="25" height="20" rx="2" stroke="currentColor" stroke-width="3" fill="none"/>
      <rect x="20" y="35" width="30" height="25" rx="2" stroke="currentColor" stroke-width="3" fill="none"/>
      
      <!-- Roues -->
      <circle cx="35" cy="65" r="8" stroke="currentColor" stroke-width="3" fill="none"/>
      <circle cx="65" cy="65" r="8" stroke="currentColor" stroke-width="3" fill="none"/>
      
      <!-- Intérieur roues -->
      <circle cx="35" cy="65" r="4" fill="currentColor"/>
      <circle cx="65" cy="65" r="4" fill="currentColor"/>
      
      <!-- Fenêtre cabine (inversée) -->
      <rect x="23" y="42" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="33" y="42" width="8" height="8" fill="currentColor" opacity="0.3"/>
      
      <!-- Fenêtre remorque -->
      <rect x="53" y="42" width="10" height="8" fill="currentColor" opacity="0.3"/>
      
      <!-- Phares (inversés) -->
      <circle cx="25" cy="43" r="3" fill="#FFD700"/>
      <circle cx="25" cy="57" r="3" fill="#DC2626"/>
      
      <!-- Pare-chocs (inversé) -->
      <rect x="75" y="60" width="5" height="3" fill="currentColor"/>
      
      <!-- Échappement -->
      <rect x="15" y="50" width="3" height="8" fill="#666"/>
      
      <!-- Détails remorque -->
      <rect x="52" y="52" width="20" height="3" fill="currentColor" opacity="0.5"/>
    </svg>`,
    title: 'Transport & Logistique',
    subtitle: '',
    description: 'ABC2 – Group assure une logistique flexible, sécurisée et efficace pour garantir la livraison rapide des marchandises à travers le Mali et l\'Afrique de l\'Ouest. Nos solutions logistiques sont conçues pour répondre aux impératifs des secteurs industriels.',
    iconColor: '#DC2626'
  }
]);

// Secteurs d'activité
const sectorCards = ref<SectorCardType[]>([
  {
    image: IndustrieMiniereImg,
    title: 'Industrie Minière',
    description: 'Le Mali figure parmi les principaux producteurs d\'or en Afrique. ABC2 – Group soutient cette industrie stratégique en fournissant des équipements de haute performance, des produits chimiques essentiels aux procédés d\'extraction, ainsi que des lubrifiants durables pour réduire les arrêts machines et les coûts d\'exploitation.'
  },
  {
    image: AgroIndustrieImg,
    title: 'Agro-industrie & Industrie Manufacturière',
    description: 'Nous desservons les industries manufacturières en leur proposant des solutions robustes et sur mesure pour améliorer leur productivité et garantir la continuité de leurs activités.'
  },
  {
    image: EnergieRenouvelableImg,
    title: 'Énergie Renouvelable',
    description: 'ABC2 – Group accompagne les entreprises dans la mise en place de solutions technologiques modernes et performantes. Nous proposons des équipements durables et innovants permettant de réduire les coûts énergétiques et l\'empreinte environnementale.'
  }
]);

// Équipe
const teamMembers = ref([
  {
    role: 'Ingénieurs spécialisés',
    description: 'En mécanique, électricité et procédés industriels'
  },
  {
    role: 'Experts en approvisionnement',
    description: 'En négociation avec les fournisseurs internationaux'
  },
  {
    role: 'Coordinateurs logistiques',
    description: 'Assurant la rapidité et la sécurité des livraisons'
  },
  {
    role: 'Techniciens SAV et agents de support technique',
    description: 'À l\'écoute des besoins clients'
  },
  {
    role: 'Consultants bilingues',
    description: 'Pour un service fluide en français et en anglais'
  }
]);

// Partenaires (version simplifiée)
const partners = ref({
  mainPartner: 'ELEMENT®',
  mainDescription: 'En partenariat avec Element Mining and Construction Oy (Finlande), nous fournissons une gamme complète de pièces d\'usure et de rechange, entièrement compatibles avec les grandes marques telles que Metso, Warman, Sandvik, FLS, et bien d\'autres. Conçues selon des normes d\'ingénierie rigoureuses, les pièces ELEMENT® assurent une performance optimale à des coûts compétitifs.',
  brands: ['WEG', 'VIBRAMACH', 'TEKO', 'SKF']
});

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

    <!-- Section Présentation -->
    <section id="presentation" class="section presentation-section" :class="{ 'visible': isVisible['presentation'] }">
      <div class="container">
        <h2 class="section-title">ABC2 – Group</h2>
        <div class="presentation-content">
          <p class="presentation-text">{{ companyDescription }}</p>
        </div>
      </div>
    </section>

    <!-- Domaines d'activité -->
    <section id="domaines" class="section domains-section" :class="{ 'visible': isVisible['domaines'] }">
      <div class="container">
        <h2 class="section-title">Nos Domaines d'Activité</h2>
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

    <!-- Secteurs d'activité -->
    <section id="secteurs" class="section sectors-section" :class="{ 'visible': isVisible['secteurs'] }">
      <div class="container">
        <h2 class="section-title">Nos Secteurs d'Activité</h2>
        <div class="cards-grid three-cols">
          <SectorCard
            v-for="(card, index) in sectorCards"
            :key="index"
            :card="card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          />
        </div>
      </div>
    </section>

    <!-- Notre Équipe -->
    <section id="equipe" class="section team-section" :class="{ 'visible': isVisible['equipe'] }">
      <div class="container">
        <h2 class="section-title">Notre Équipe</h2>
        <div class="team-intro">
          <p>Derrière chaque projet et chaque solution, se trouve une équipe de professionnels engagés, dotés d'une connaissance approfondie des réalités industrielles en Afrique de l'Ouest.</p>
        </div>
        <div class="team-grid">
          <div 
            v-for="(member, index) in teamMembers" 
            :key="index" 
            class="team-member"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
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
        </div>
      </div>
    </section>

    <!-- Partenaires -->
    <section id="partenaires" class="section partners-section" :class="{ 'visible': isVisible['partenaires'] }">
      <div class="container">
        <h2 class="section-title">Nos Partenaires</h2>
        <div class="partner-main">
          <h3 class="partner-title">{{ partners.mainPartner }}</h3>
          <p class="partner-description">{{ partners.mainDescription }}</p>
        </div>
        <div class="brands-section">
          <h3 class="brands-title">Nos Marques Partenaires</h3>
          <div class="brands-grid">
            <div 
              v-for="(brand, index) in partners.brands" 
              :key="index" 
              class="brand-item"
            >
              <span class="brand-name">{{ brand }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Engagement -->
    <section id="engagement" class="section engagement-section" :class="{ 'visible': isVisible['engagement'] }">
      <div class="container">
        <h2 class="section-title">Notre Engagement</h2>
        <div class="engagement-content">
          <p class="engagement-intro">Chez ABC2 – Group, notre approche repose sur trois piliers fondamentaux :</p>
          <ul class="engagement-list">
            <li v-for="(point, index) in engagementPoints" :key="index" class="engagement-point">
              {{ point }}
            </li>
          </ul>
          <p class="engagement-note">Notre service après-vente et notre assistance technique sont pensés pour vous accompagner à chaque étape, depuis l'identification de vos besoins jusqu'à l'optimisation continue de vos équipements.</p>
        </div>
      </div>
    </section>

    <!-- Pourquoi nous choisir -->
    <section id="pourquoi" class="section why-section" :class="{ 'visible': isVisible['pourquoi'] }">
      <div class="container">
        <h2 class="section-title">Pourquoi Choisir ABC2 – Group ?</h2>
        <div class="why-grid">
          <div 
            v-for="(reason, index) in whyChooseUs" 
            :key="index" 
            class="why-item"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="why-icon">✓</div>
            <span class="why-text">{{ reason }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section contact-section" :class="{ 'visible': isVisible['contact'] }">
      <div class="container">
        <h2 class="section-title-contact">Contactez-Nous</h2>
        <div class="contact-content">
          <p class="contact-description">{{ contactInfo.description }}</p>
          <div class="contact-email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="email-icon">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <a :href="`mailto:${contactInfo.email}`" class="email-link">{{ contactInfo.email }}</a>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="@/assets/logo-re.png" alt="Logo" class="logo">
            <span class="logo-text">ABC2-GROUP</span>
          </div>
          <nav class="footer-nav">
            <a href="#" class="footer-link">Politiques Environnemental et Social</a>
            <a href="#" class="footer-link">Politique Santé Sécurité</a>
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
  line-height: 1.6;
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

/* Styles spécifiques pour chaque section */
.presentation-section {
  background: white;
  padding-top: 2rem;
}

.presentation-content {
  max-width: 800px;
  margin: 0 auto;
}

.presentation-text {
  font-size: 1.1rem;
  color: #4a5568;
  text-align: center;
  line-height: 1.8;
}

.domains-section {
  background: #F1F8F0;
}

.sectors-section {
  background: white;
}

.team-section {
  background: #F1F8F0;
}

.partners-section {
  background: white;
}

.engagement-section {
  background: #F1F8F0;
}

.why-section {
  background: white;
}

.contact-section {
  background: #f7fbf6;
  color: rgb(0, 0, 0);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: inherit;
}
.section-title-contact {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: rgb(0, 0, 0);
}

.contact-section .section-title {
  color: white;
}

.cards-grid {
  display: grid;
  gap: 2.5rem;
}

.three-cols {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Équipe */
.team-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.team-grid {
  display: grid;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.team-member {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.team-icon {
  color: #047857;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.team-role {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.team-description {
  color: #4a5568;
}

/* Partenaires */
.partner-main {
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
}

.partner-title {
  font-size: 1.8rem;
  color: #047857;
  margin-bottom: 1rem;
  font-weight: 600;
}

.partner-description {
  color: #4a5568;
  line-height: 1.7;
}

.brands-section {
  max-width: 800px;
  margin: 0 auto;
}

.brands-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #2d3748;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.brand-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.brand-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.brand-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
}

/* Engagement */
.engagement-content {
  max-width: 800px;
  margin: 0 auto;
}

.engagement-intro {
  text-align: center;
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.engagement-list {
  list-style: none;
  margin-bottom: 2rem;
}

.engagement-point {
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border-left: 4px solid #047857;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #2d3748;
  font-weight: 500;
}

.engagement-note {
  text-align: center;
  font-style: italic;
  color: #4a5568;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

/* Pourquoi nous choisir */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.why-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.why-icon {
  color: #047857;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.why-text {
  color: #2d3748;
  font-weight: 500;
}

/* Contact */
.contact-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #ffffff;
  border-radius: 50px;
  transition: background 0.3s ease;
  border-color: #c7c79e;
  border-style: solid;
  border-width: 1px;
}

.contact-email:hover {
  background: #F1F8F0;
}

.email-icon {
  color: rgb(0, 0, 0);
}

.email-link {
  color: rgb(0, 0, 0);
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.email-link:hover {
  opacity: 0.9;
}

/* Footer */
.footer {
  background: #F1F8F0;
  color: rgb(0, 0, 0);
  padding: 3rem 0;
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
.logo{
  display: flex;
  width: 70px;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1002;
}


.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
}

.footer-nav {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-link {
  color: #7c7c7c;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #000000;
}

/* Animations */
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

  .three-cols {
    grid-template-columns: 1fr;
  }

  .why-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-nav {
    flex-direction: column;
    align-items: center;
  }

  .contact-email {
    flex-direction: column;
    text-align: center;
  }
}
</style>