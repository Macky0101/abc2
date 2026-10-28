export type Lang = 'fr' | 'en';

export interface SiteContent {
  nav: {
    pieces: string;
    equipment: string;
    chemicals: string;
    sectors: string;
    suppliers: string;
    company: string;
    contact: string;
    quoteBtn: string;
  };
  hero: {
    kicker: string;
    title: string;
    leadStrong: string;
    leadRest: string;
    quoteBtn: string;
    partnerBtn: string;
    facts: Array<{ title: string; subtitle: string }>;
  };
  targetAudience: {
    kicker: string;
    title: string;
    cards: Array<{ tag: string; title: string; desc: string; cta: string; link: string }>;
  };
  activities: {
    kicker: string;
    title: string;
    lead: string;
    items: Array<{
      tag: string;
      title: string;
      desc: string;
      cta: string;
      img: string;
      alt: string;
      link: string;
    }>;
  };
  steps: {
    kicker: string;
    title: string;
    list: Array<{ num: string; title: string; desc: string }>;
  };
  brands: {
    kicker: string;
    title: string;
    items: Array<{ name: string; desc: string }>;
  };
  sectors: {
    kicker: string;
    title: string;
    items: Array<{ tag: string; title: string; desc: string; cta: string; img: string; alt: string }>;
  };
  whyUs: {
    kicker: string;
    title: string;
    checks: string[];
    quoteBtn: string;
    aboutBtn: string;
    img: string;
    imgAlt: string;
  };
  quoteSection: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  faq: {
    kicker: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  ctaBand: {
    title: string;
    btn: string;
  };
  footer: {
    desc: string;
    productsTitle: string;
    companyTitle: string;
    contactTitle: string;
    addressLine1: string;
    addressLine2: string;
    email: string;
    rights: string;
    subLegal: string;
  };
}

export const content: Record<Lang, SiteContent> = {
  fr: {
    nav: {
      pieces: "Pièces ELEMENT®",
      equipment: "Équipements",
      chemicals: "Chimie & lubrifiants",
      sectors: "Secteurs",
      suppliers: "Fournisseurs",
      company: "Entreprise",
      contact: "Contact",
      quoteBtn: "Demander un devis"
    },
    hero: {
      kicker: "Import-export · Distribution industrielle · Mali & Afrique de l'Ouest",
      title: "Équipements industriels, pièces d'usure et lubrifiants au Mali",
      leadStrong: "L'équipement qu'il vous faut, là où vous en avez besoin.",
      leadRest: "Un réseau international de fournisseurs et une logistique maîtrisée jusqu'à votre site, pour les mines, l'industrie et l'énergie.",
      quoteBtn: "Demander un devis",
      partnerBtn: "Devenir fournisseur ou partenaire",
      facts: [
        { title: "Partenaire officiel ELEMENT®", subtitle: "Pièces compatibles Metso, Warman, Sandvik, FLS" },
        { title: "Mines, industrie, énergie", subtitle: "Les secteurs que nous servons au quotidien" },
        { title: "Équipe bilingue FR / EN", subtitle: "Ingénierie, achats, logistique et SAV" },
        { title: "Jusqu'à votre site", subtitle: "Port, douane, entrepôt Bamako, livraison" }
      ]
    },
    targetAudience: {
      kicker: "À qui nous nous adressons",
      title: "Un partenaire B2B pour toute la chaîne",
      cards: [
        {
          tag: "Clients industriels",
          title: "Vous exploitez une mine, une usine ou un site énergétique",
          desc: "Pièces d'usure, équipements, chimie et lubrifiants livrés sur site, avec un seul interlocuteur du sourcing au SAV.",
          cta: "Demander un devis",
          link: "#devis"
        },
        {
          tag: "Fabricants & fournisseurs",
          title: "Vous cherchez un distributeur au Mali",
          desc: "Nous importons, stockons, livrons et assurons le suivi technique de vos produits auprès des mines et des industriels d'Afrique de l'Ouest.",
          cta: "Devenir fournisseur",
          link: "#contact"
        },
        {
          tag: "Partenaires commerciaux",
          title: "Vous voulez collaborer sur des projets",
          desc: "Transitaires, bureaux d'études, intégrateurs, sous-traitants : travaillons ensemble sur les projets industriels de la région.",
          cta: "Proposer un partenariat",
          link: "#contact"
        }
      ]
    },
    activities: {
      kicker: "Nos activités",
      title: "Trois métiers, une seule chaîne de responsabilité",
      lead: "Un réseau international de fournisseurs et une logistique maîtrisée jusqu'à votre site.",
      items: [
        {
          tag: "Partenaire officiel au Mali",
          title: "Pièces d'usure et de rechange ELEMENT®",
          desc: "Gamme complète compatible Metso, Warman, Sandvik et FLS, fabriquée selon des normes d'ingénierie rigoureuses, à coût compétitif face aux pièces d'origine.",
          cta: "Voir les pièces ELEMENT®",
          img: "https://abc2-group.com/images/418a87f8-21d3-4798-b757-261cc246263d.JPG",
          alt: "Kit de pièces de rechange et d'usure pour équipements miniers",
          link: "#devis"
        },
        {
          tag: "WEG · SKF · VIBRAMACH · TEKO",
          title: "Équipements industriels",
          desc: "Moteurs et entraînements, roulements et étanchéité, criblage et tamisage, machines et composants pour conditions d'exploitation exigeantes.",
          cta: "Voir les équipements",
          img: "https://abc2-group.com/images/1bb09642-6e32-4b93-9ffc-79dba03865be.JPG",
          alt: "Roulement industriel et composant de transmission",
          link: "#devis"
        },
        {
          tag: "Consommables",
          title: "Produits chimiques & lubrifiants",
          desc: "Produits chimiques industriels, y compris pour les procédés d'extraction, et lubrifiants haute performance conformes aux normes internationales.",
          cta: "Voir la chimie & les lubrifiants",
          img: "https://abc2-group.com/images/1ec01b7b-0cf0-4802-a9ba-dd8c52233f5a.JPG",
          alt: "Produits chimiques industriels et contrôle qualité",
          link: "#devis"
        },
        {
          tag: "Port · douane · entrepôt · site",
          title: "Transport & logistique",
          desc: "Une logistique flexible, sécurisée et efficace pour livrer rapidement à travers le Mali et l'Afrique de l'Ouest.",
          cta: "Voir la logistique",
          img: "https://abc2-group.com/images/b6171c7d-32cc-4cf5-9174-47cd0be8f3e9.JPG",
          alt: "Entrepôt industriel et logistique d'approvisionnement",
          link: "#contact"
        }
      ]
    },
    steps: {
      kicker: "Nous pilotons les quatre étapes",
      title: "De l'usine du fournisseur à votre site",
      list: [
        { num: "01", title: "Sourcing", desc: "Fournisseurs certifiés, sélectionnés pour la qualité et la conformité." },
        { num: "02", title: "Port & douane", desc: "Formalités d'import et conformité réglementaire prises en charge." },
        { num: "03", title: "Entrepôt Bamako", desc: "Stockage et contrôle qualité avant expédition." },
        { num: "04", title: "Livraison sur site", desc: "Livraison, mise en service et service après-vente." }
      ]
    },
    brands: {
      kicker: "Marques partenaires",
      title: "Des marques reconnues, distribuées au Mali",
      items: [
        { name: "ELEMENT®", desc: "Pièces d'usure et de rechange" },
        { name: "WEG", desc: "Moteurs et entraînements" },
        { name: "SKF", desc: "Roulements, étanchéité, lubrification" },
        { name: "VIBRAMACH", desc: "Criblage et vibration" },
        { name: "TEKO", desc: "Machines et composants" }
      ]
    },
    sectors: {
      kicker: "Secteurs desservis",
      title: "Nous connaissons vos contraintes de terrain",
      items: [
        {
          tag: "Mines",
          title: "Industrie minière",
          desc: "Équipements de haute performance, chimie des procédés d'extraction et lubrifiants durables pour réduire les arrêts machines.",
          cta: "En savoir plus",
          img: "https://abc2-group.com/images/2f0d5501-9a24-4d1c-a195-1ee40260cfa5.JPG",
          alt: "Vue aérienne d'une exploitation minière"
        },
        {
          tag: "Manufacture",
          title: "Industrie manufacturière",
          desc: "Solutions robustes pour la productivité et la continuité des unités de production, y compris agroalimentaires.",
          cta: "En savoir plus",
          img: "https://abc2-group.com/images/c3b530c8-fa63-40d7-aa2d-9876e4d7ab5a.JPG",
          alt: "Pièces mécaniques et industrie de transformation"
        },
        {
          tag: "Énergie",
          title: "Énergie renouvelable",
          desc: "Équipements durables et innovants qui réduisent les coûts énergétiques et l'empreinte environnementale.",
          cta: "En savoir plus",
          img: "https://abc2-group.com/images/2e216f90-a82c-4142-9d70-23156dbfaa34.JPG",
          alt: "Installation solaire et transition énergétique"
        }
      ]
    },
    whyUs: {
      kicker: "Pourquoi ABC² - Group",
      title: "Ce que vous obtenez en travaillant avec nous",
      checks: [
        "Produits certifiés et conformes aux normes internationales",
        "Une équipe experte, disponible et bilingue français / anglais",
        "Logistique rapide et sécurisée dans toute la région",
        "Partenariats avec des marques fiables et innovantes",
        "Engagement pour des pratiques responsables et durables, encadré par nos politiques HSE",
        "Accompagnement humain et technique à chaque étape"
      ],
      quoteBtn: "Demander un devis",
      aboutBtn: "Découvrir l'entreprise",
      img: "https://abc2-group.com/images/fd2792e0-25fa-40ca-8a82-b5ad05fc2579.JPG",
      imgAlt: "Camions de transport sur site industriel"
    },
    quoteSection: {
      kicker: "Devis rapide & sur-mesure",
      title: "Demander un Devis Personnalisé",
      subtitle: "Remplissez ce formulaire pour recevoir un devis détaillé sous format PDF. Notre équipe technique vous répondra sous 24h."
    },
    faq: {
      kicker: "Questions fréquentes",
      title: "Ce que l'on nous demande souvent",
      items: [
        {
          q: "Quels produits ABC² - Group distribue-t-il au Mali ?",
          a: "Des équipements industriels (moteurs et entraînements WEG, roulements et étanchéité SKF, criblage VIBRAMACH, machines TEKO), des pièces d'usure et de rechange ELEMENT® compatibles Metso, Warman, Sandvik et FLS, ainsi que des produits chimiques industriels et des lubrifiants haute performance."
        },
        {
          q: "Pouvez-vous trouver une pièce qui n'est pas dans votre gamme ?",
          a: "Oui. Nous sourçons à la référence, à partir du plan ou de la plaque signalétique de votre machine, auprès de notre réseau international de fournisseurs."
        },
        {
          q: "Livrez-vous en dehors de Bamako ?",
          a: "Oui. Nous pilotons le transport, le passage portuaire et la douane, le stockage à Bamako et la livraison jusqu'à votre site, partout au Mali et en Afrique de l'Ouest."
        },
        {
          q: "Je suis fabricant : comment devenir fournisseur d'ABC² - Group ?",
          a: "Présentez votre société et vos gammes via le formulaire de contact. Nous étudions chaque candidature au regard des besoins de nos clients miniers, industriels et énergétiques."
        },
        {
          q: "Travaillez-vous en anglais ?",
          a: "Oui. Notre équipe est bilingue français / anglais, pour nos clients comme pour nos fournisseurs internationaux."
        }
      ]
    },
    ctaBand: {
      title: "Un projet ? Un besoin urgent de pièces ?",
      btn: "Demander un devis"
    },
    footer: {
      desc: "Équipements industriels, pièces de rechange et d'usure, produits chimiques et lubrifiants pour les mines, l'industrie et l'énergie. Partenaire officiel ELEMENT® au Mali.",
      productsTitle: "Produits & services",
      companyTitle: "Entreprise",
      contactTitle: "Contact",
      addressLine1: "Souleymanebougou, Immeuble Daouda Coulibaly",
      addressLine2: "BP 1574, Bamako, Mali",
      email: "info@abc2-group.com",
      rights: "ABC² - Group. Tous droits réservés.",
      subLegal: "Import-export · Distribution industrielle · Mali & Afrique de l'Ouest"
    }
  },
  en: {
    nav: {
      pieces: "ELEMENT® parts",
      equipment: "Equipment",
      chemicals: "Chemicals & lubricants",
      sectors: "Industries",
      suppliers: "Suppliers",
      company: "About us",
      contact: "Contact",
      quoteBtn: "Request a quote"
    },
    hero: {
      kicker: "Import-export · Industrial distribution · Mali & West Africa",
      title: "Industrial equipment, wear parts and lubricants in Mali",
      leadStrong: "The equipment you need, where you need it.",
      leadRest: "An international supplier network and controlled logistics to your site, for mining, manufacturing and energy.",
      quoteBtn: "Request a quote",
      partnerBtn: "Become a supplier or partner",
      facts: [
        { title: "Official ELEMENT® partner", subtitle: "Parts compatible with Metso, Warman, Sandvik, FLS" },
        { title: "Mining, manufacturing, energy", subtitle: "The industries we serve every day" },
        { title: "Bilingual FR / EN team", subtitle: "Engineering, purchasing, logistics, after-sales" },
        { title: "All the way to your site", subtitle: "Port, customs, Bamako warehouse, delivery" }
      ]
    },
    targetAudience: {
      kicker: "Who we work with",
      title: "A B2B partner for the whole supply chain",
      cards: [
        {
          tag: "Industrial customers",
          title: "You operate a mine, a plant or an energy site",
          desc: "Wear parts, equipment, chemicals and lubricants delivered to site, with a single contact from sourcing to after-sales.",
          cta: "Request a quote",
          link: "#devis"
        },
        {
          tag: "Manufacturers & suppliers",
          title: "You are looking for a distributor in Mali",
          desc: "We import, stock, deliver and provide technical support for your products to mines and manufacturers across West Africa.",
          cta: "Become a supplier",
          link: "#contact"
        },
        {
          tag: "Business partners",
          title: "You want to collaborate on projects",
          desc: "Freight forwarders, engineering firms, integrators, subcontractors: let's work together on industrial projects in the region.",
          cta: "Propose a partnership",
          link: "#contact"
        }
      ]
    },
    activities: {
      kicker: "What we do",
      title: "Three businesses, one chain of responsibility",
      lead: "An international supplier network and controlled logistics all the way to your site.",
      items: [
        {
          tag: "Official partner in Mali",
          title: "ELEMENT® wear and spare parts",
          desc: "Full range compatible with Metso, Warman, Sandvik and FLS, manufactured to rigorous engineering standards, at competitive cost versus OEM parts.",
          cta: "See ELEMENT® parts",
          img: "https://abc2-group.com/images/418a87f8-21d3-4798-b757-261cc246263d.JPG",
          alt: "Kit of spare and wear parts for mining equipment",
          link: "#devis"
        },
        {
          tag: "WEG · SKF · VIBRAMACH · TEKO",
          title: "Industrial equipment",
          desc: "Motors and drives, bearings and seals, screening, machinery and components built for demanding operating conditions.",
          cta: "See equipment",
          img: "https://abc2-group.com/images/1bb09642-6e32-4b93-9ffc-79dba03865be.JPG",
          alt: "Industrial bearing and transmission components",
          link: "#devis"
        },
        {
          tag: "Consumables",
          title: "Chemicals & lubricants",
          desc: "Industrial chemicals, including for extraction processes, and high-performance lubricants that meet international standards.",
          cta: "See chemicals & lubricants",
          img: "https://abc2-group.com/images/1ec01b7b-0cf0-4802-a9ba-dd8c52233f5a.JPG",
          alt: "Industrial chemicals in laboratory",
          link: "#devis"
        },
        {
          tag: "Port · customs · warehouse · site",
          title: "Transport & logistics",
          desc: "Flexible, secure and efficient logistics for fast delivery across Mali and West Africa.",
          cta: "See logistics",
          img: "https://abc2-group.com/images/b6171c7d-32cc-4cf5-9174-47cd0be8f3e9.JPG",
          alt: "Industrial warehouse and supply logistics",
          link: "#contact"
        }
      ]
    },
    steps: {
      kicker: "We manage all four steps",
      title: "From the supplier's factory to your site",
      list: [
        { num: "01", title: "Sourcing", desc: "Certified suppliers, selected for quality and compliance." },
        { num: "02", title: "Port & customs", desc: "Import formalities and regulatory compliance handled." },
        { num: "03", title: "Bamako warehouse", desc: "Storage and quality control before dispatch." },
        { num: "04", title: "Delivery to site", desc: "Delivery, commissioning and after-sales service." }
      ]
    },
    brands: {
      kicker: "Partner brands",
      title: "Trusted brands, distributed in Mali",
      items: [
        { name: "ELEMENT®", desc: "Wear and spare parts" },
        { name: "WEG", desc: "Motors and drives" },
        { name: "SKF", desc: "Bearings, seals, lubrication" },
        { name: "VIBRAMACH", desc: "Screening and vibration" },
        { name: "TEKO", desc: "Machinery and components" }
      ]
    },
    sectors: {
      kicker: "Industries served",
      title: "We know your field constraints",
      items: [
        {
          tag: "Mining",
          title: "Mining industry",
          desc: "High-performance equipment, extraction process chemicals and durable lubricants that reduce machine downtime.",
          cta: "Learn more",
          img: "https://abc2-group.com/images/2f0d5501-9a24-4d1c-a195-1ee40260cfa5.JPG",
          alt: "Aerial view of an open-pit gold mine"
        },
        {
          tag: "Manufacturing",
          title: "Manufacturing industry",
          desc: "Robust solutions for the productivity and continuity of production units, including food processing.",
          cta: "Learn more",
          img: "https://abc2-group.com/images/c3b530c8-fa63-40d7-aa2d-9876e4d7ab5a.JPG",
          alt: "Mechanical parts and industrial machining"
        },
        {
          tag: "Energy",
          title: "Renewable energy",
          desc: "Durable, innovative equipment that lowers energy costs and environmental footprint.",
          cta: "Learn more",
          img: "https://abc2-group.com/images/2e216f90-a82c-4142-9d70-23156dbfaa34.JPG",
          alt: "Solar panels under blue sky"
        }
      ]
    },
    whyUs: {
      kicker: "Why ABC² - Group",
      title: "What you get when you work with us",
      checks: [
        "Certified products that meet international standards",
        "An expert, available, bilingual French / English team",
        "Fast and secure logistics across the region",
        "Partnerships with reliable, innovative brands",
        "Commitment to responsible, sustainable practices, framed by our HSE policies",
        "Human and technical support at every step"
      ],
      quoteBtn: "Request a quote",
      aboutBtn: "About the company",
      img: "https://abc2-group.com/images/fd2792e0-25fa-40ca-8a82-b5ad05fc2579.JPG",
      imgAlt: "Haul trucks on mining site"
    },
    quoteSection: {
      kicker: "Fast & Tailored Quote",
      title: "Request a Personalized Quote",
      subtitle: "Fill out this form to receive a detailed quotation in PDF format. Our technical team will reply within 24 hours."
    },
    faq: {
      kicker: "FAQ",
      title: "Questions we are often asked",
      items: [
        {
          q: "What products does ABC² - Group distribute in Mali?",
          a: "Industrial equipment (WEG motors and drives, SKF bearings and seals, VIBRAMACH screening, TEKO machinery), ELEMENT® wear and spare parts compatible with Metso, Warman, Sandvik and FLS, as well as industrial chemicals and high-performance lubricants."
        },
        {
          q: "Can you source a part that is not in your range?",
          a: "Yes. We source by part number, drawing or machine nameplate through our international supplier network."
        },
        {
          q: "Do you deliver outside Bamako?",
          a: "Yes. We manage freight, port clearance and customs, storage in Bamako and delivery to your site, anywhere in Mali and West Africa."
        },
        {
          q: "I am a manufacturer: how do I become an ABC² - Group supplier?",
          a: "Introduce your company and product ranges using our contact form. We review every application against the needs of our mining, industrial and energy customers."
        },
        {
          q: "Do you work in English?",
          a: "Yes. Our team is bilingual French / English, for both our customers and our international suppliers."
        }
      ]
    },
    ctaBand: {
      title: "A project? An urgent need for parts?",
      btn: "Request a quote"
    },
    footer: {
      desc: "Industrial equipment, spare and wear parts, chemicals and lubricants for mining, manufacturing and energy. Official ELEMENT® partner in Mali.",
      productsTitle: "Products & services",
      companyTitle: "Company",
      contactTitle: "Contact",
      addressLine1: "Souleymanebougou, Immeuble Daouda Coulibaly",
      addressLine2: "BP 1574, Bamako, Mali",
      email: "info@abc2-group.com",
      rights: "ABC² - Group. All rights reserved.",
      subLegal: "Import-export · Industrial distribution · Mali & West Africa"
    }
  }
};
