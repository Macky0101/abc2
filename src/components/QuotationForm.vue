<script setup lang="ts">
import { ref, reactive } from "vue";
import jsPDF from "jspdf";
import type { Lang } from "../content";

const props = defineProps<{
  lang: Lang;
}>();

const step = ref(1);
const errorMessage = ref("");
const isLoading = ref(false);

const formData = reactive({
  company: "",
  name: "",
  email: "",
  phone: "",
  industry: "",
  address: "",
  products: "",
  quantity: "",
  date: "",
  notes: "",
});

const t = (frText: string, enText: string) => (props.lang === "fr" ? frText : enText);

const validateAndProceed = async () => {
  if (!formData.company || !formData.name || !formData.email || !formData.products) {
    errorMessage.value = t(
      "Veuillez remplir les champs obligatoires (*)",
      "Please fill in all required fields (*)"
    );
    setTimeout(() => (errorMessage.value = ""), 3500);
    return;
  }

  isLoading.value = true;
  try {
    // Simuler l'envoi vers l'adresse email
    const subject = encodeURIComponent(`[Demande de Devis ABC²] - ${formData.company}`);
    const body = encodeURIComponent(
      `Société: ${formData.company}\nContact: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nSecteur: ${formData.industry}\nAdresse: ${formData.address}\n\nProduits demandés:\n${formData.products}\n\nQuantité: ${formData.quantity}\nDate: ${formData.date}\nNotes: ${formData.notes}`
    );
    
    // Étape 2: Confirmation
    step.value = 2;
  } catch (error) {
    errorMessage.value = t("Une erreur est survenue lors de l'envoi.", "An error occurred during submission.");
  } finally {
    isLoading.value = false;
  }
};

const downloadPDF = () => {
  const doc = new jsPDF();
  
  // En-tête vert pin
  doc.setFillColor(14, 47, 39);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("ABC² - GROUP", 105, 18, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    props.lang === "fr"
      ? "DEMANDE DE DEVIS OFFICIELLE · BAMAKO, MALI"
      : "OFFICIAL REQUEST FOR QUOTATION · BAMAKO, MALI",
    105,
    28,
    { align: "center" }
  );

  // Cadre infos demandeur
  doc.setFillColor(247, 248, 244);
  doc.setDrawColor(213, 218, 208);
  doc.roundedRect(14, 48, 182, 46, 2, 2, "FD");

  doc.setTextColor(18, 33, 29);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(props.lang === "fr" ? "Coordonnées du client" : "Customer Information", 20, 58);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${props.lang === "fr" ? "Entreprise" : "Company"}: ${formData.company}`, 20, 68);
  doc.text(`${props.lang === "fr" ? "Contact" : "Contact Name"}: ${formData.name}`, 20, 76);
  doc.text(`Email: ${formData.email}    ${props.lang === "fr" ? "Tél" : "Phone"}: ${formData.phone || "N/A"}`, 20, 84);

  // Cadre détails de la demande
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(14, 102, 182, 110, 2, 2, "FD");

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(14, 47, 39);
  doc.text(props.lang === "fr" ? "Détails des équipements / pièces" : "Requested Items & Specifications", 20, 114);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(18, 33, 29);
  doc.text(`${props.lang === "fr" ? "Secteur" : "Industry"}: ${formData.industry || "Général"}`, 20, 124);
  doc.text(`${props.lang === "fr" ? "Quantité estimée" : "Estimated quantity"}: ${formData.quantity || "N/A"}`, 20, 132);
  doc.text(`${props.lang === "fr" ? "Délai souhaité" : "Target date"}: ${formData.date || "N/A"}`, 110, 132);

  doc.setFont("helvetica", "bold");
  doc.text(props.lang === "fr" ? "Description des besoins :" : "Product Description:", 20, 144);
  
  doc.setFont("helvetica", "normal");
  const splitProducts = doc.splitTextToSize(formData.products || "", 170);
  doc.text(splitProducts, 20, 152);

  if (formData.notes) {
    doc.setFont("helvetica", "bold");
    doc.text(props.lang === "fr" ? "Remarques :" : "Notes:", 20, 182);
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(formData.notes, 170);
    doc.text(splitNotes, 20, 190);
  }

  // Pied de page
  doc.setFillColor(237, 239, 233);
  doc.rect(0, 270, 210, 27, "F");
  doc.setFontSize(8.5);
  doc.setTextColor(74, 91, 85);
  doc.text("ABC² - Group · Souleymanebougou, Immeuble Daouda Coulibaly, BP 1574, Bamako, Mali", 105, 279, { align: "center" });
  doc.text("Email: info@abc2-group.com · Partenaire officiel ELEMENT® au Mali", 105, 286, { align: "center" });

  doc.save(`Devis_ABC2_${formData.company.replace(/\s+/g, "_")}.pdf`);
};

const sendEmailDirect = () => {
  const mailtoLink = `mailto:info@abc2-group.com?subject=${encodeURIComponent(`Devis ABC2: ${formData.company}`)}&body=${encodeURIComponent(
    `Entreprise: ${formData.company}\nNom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nSecteur: ${formData.industry}\n\nBesoins:\n${formData.products}\n\nQuantité: ${formData.quantity}\nDate: ${formData.date}\nNotes: ${formData.notes}`
  )}`;
  window.location.href = mailtoLink;
};

const resetForm = () => {
  step.value = 1;
};
</script>

<template>
  <div class="quotation-card">
    <!-- Étape 1 : Saisie de la demande -->
    <div v-if="step === 1" class="form-container">
      <form @submit.prevent="validateAndProceed" class="quote-form">
        <div class="form-row">
          <div class="form-field">
            <label>{{ t("Nom de l'entreprise *", "Company name *") }}</label>
            <input 
              v-model="formData.company" 
              type="text" 
              required 
              :placeholder="t('Ex: Société Minière du Mali', 'e.g. Mining Corp Ltd')" 
            />
          </div>
          <div class="form-field">
            <label>{{ t("Votre nom complet *", "Contact name *") }}</label>
            <input 
              v-model="formData.name" 
              type="text" 
              required 
              :placeholder="t('Ex: Moussa Diarra', 'e.g. John Doe')" 
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>{{ t("Adresse email *", "Email address *") }}</label>
            <input 
              v-model="formData.email" 
              type="email" 
              required 
              placeholder="contact@societe.com" 
            />
          </div>
          <div class="form-field">
            <label>{{ t("Numéro de téléphone", "Phone number") }}</label>
            <input 
              v-model="formData.phone" 
              type="tel" 
              placeholder="+223 70 00 00 00" 
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>{{ t("Secteur d'activité", "Industry sector") }}</label>
            <select v-model="formData.industry">
              <option value="">{{ t("Sélectionnez votre secteur", "Select your industry") }}</option>
              <option value="Mines">{{ t("Mines & Extraction", "Mining & Extraction") }}</option>
              <option value="Manufacture">{{ t("Industrie manufacturière", "Manufacturing") }}</option>
              <option value="Energie">{{ t("Énergie & Renouvelable", "Energy & Renewables") }}</option>
              <option value="Autre">{{ t("Autre industrie", "Other industry") }}</option>
            </select>
          </div>
          <div class="form-field">
            <label>{{ t("Localisation / Site de livraison", "Delivery site location") }}</label>
            <input 
              v-model="formData.address" 
              type="text" 
              :placeholder="t('Ex: Bamako, Kayes, Sikasso...', 'e.g. Bamako, Site A...')" 
            />
          </div>
        </div>

        <div class="form-field">
          <label>
            {{ t("Pièces ou équipements demandés *", "Requested parts or equipment *") }}
            <span class="label-hint">{{ t("(Marque, réf. technique, dimensions)", "(Brand, part number, specs)") }}</span>
          </label>
          <textarea 
            v-model="formData.products" 
            rows="4" 
            required 
            :placeholder="t('Ex: Pièces d\'usure compatibles Metso HP400, mâchoires de concasseur, roulements SKF 22220, moteur WEG 75kW...', 'e.g. Wear parts compatible Metso HP400, jaw crusher plates, SKF bearings, WEG motors...')"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>{{ t("Quantité estimée", "Estimated quantity") }}</label>
            <input 
              v-model="formData.quantity" 
              type="text" 
              :placeholder="t('Ex: 4 pièces, 1 lot, 500 kg', 'e.g. 4 units, 1 batch')" 
            />
          </div>
          <div class="form-field">
            <label>{{ t("Délai ou date souhaitée", "Target delivery date") }}</label>
            <input 
              v-model="formData.date" 
              type="date" 
            />
          </div>
        </div>

        <div class="form-field">
          <label>{{ t("Notes ou contraintes particulières (facultatif)", "Additional notes (optional)") }}</label>
          <textarea 
            v-model="formData.notes" 
            rows="2" 
            :placeholder="t('Spécifications d\'emballage, urgence, certificat requis...', 'Packaging specs, urgent timeline, certs required...')"
          ></textarea>
        </div>

        <div v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-submit" :disabled="isLoading">
            <span v-if="!isLoading">{{ t("Générer et envoyer la demande", "Submit & generate quote request") }}</span>
            <span v-else>{{ t("Traitement...", "Processing...") }}</span>
            <span class="arrow">→</span>
          </button>
          <span class="response-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {{ t("Réponse sous 24h par nos ingénieurs", "24h response by our engineering team") }}
          </span>
        </div>
      </form>
    </div>

    <!-- Étape 2 : Confirmation & Téléchargement PDF -->
    <div v-else class="confirmation-box">
      <div class="confirm-icon">✓</div>
      <h3>{{ t("Demande enregistrée avec succès !", "Quote request successfully created!") }}</h3>
      <p class="confirm-intro">
        {{ t("Merci", "Thank you") }} <strong>{{ formData.name }}</strong> ({{ formData.company }}).
        {{ t("Notre équipe technique à Bamako a bien pris en compte votre demande.", "Our technical team in Bamako has received your request.") }}
      </p>

      <div class="summary-card">
        <h4>{{ t("Récapitulatif de votre demande :", "Request Summary:") }}</h4>
        <div class="summary-grid">
          <div><strong>{{ t("Entreprise :", "Company:") }}</strong> {{ formData.company }}</div>
          <div><strong>{{ t("Email :", "Email:") }}</strong> {{ formData.email }}</div>
          <div><strong>{{ t("Téléphone :", "Phone:") }}</strong> {{ formData.phone || "—" }}</div>
          <div><strong>{{ t("Secteur :", "Sector:") }}</strong> {{ formData.industry || "—" }}</div>
          <div class="full-row"><strong>{{ t("Produits :", "Products:") }}</strong> {{ formData.products }}</div>
        </div>
      </div>

      <div class="btn-group-confirm">
        <button type="button" @click="downloadPDF" class="btn btn-primary btn-pdf">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {{ t("Télécharger le récapitulatif PDF", "Download PDF Summary") }}
        </button>

        <button type="button" @click="sendEmailDirect" class="btn btn-pine">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
          </svg>
          {{ t("Envoyer par courriel direct", "Send Direct Email") }}
        </button>

        <button type="button" @click="resetForm" class="btn-link">
          {{ t("Faire une autre demande", "Make another request") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quotation-card {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 36px 40px;
  box-shadow: 0 16px 36px rgba(18, 33, 29, 0.06);
}

@media (max-width: 680px) {
  .quotation-card {
    padding: 24px 20px;
  }
}

.quote-form {
  display: grid;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 720px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-field label {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-hint {
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--ink-60);
}

.form-field input,
.form-field select,
.form-field textarea {
  font: 400 1rem var(--f-body);
  padding: 13px 15px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
  color: var(--ink);
  transition: all 0.2s ease;
  width: 100%;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--teal);
  background: var(--white);
  outline: none;
  box-shadow: 0 0 0 3px rgba(40, 166, 142, 0.15);
}

.form-field textarea {
  resize: vertical;
}

.error-banner {
  background: rgba(217, 32, 39, 0.1);
  border: 1px solid rgba(217, 32, 39, 0.3);
  color: var(--red);
  padding: 12px 16px;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.92rem;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 10px;
}

.btn-submit {
  padding: 16px 28px;
  font-size: 1.05rem;
}

.response-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--ink-60);
}

/* Confirmation */
.confirmation-box {
  text-align: center;
  padding: 24px 0;
}

.confirm-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: rgba(79, 179, 88, 0.15);
  color: var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
}

.confirm-intro {
  font-size: 1.15rem;
  color: var(--ink-60);
  max-width: 600px;
  margin: 0 auto 28px;
}

.summary-card {
  background: var(--concrete);
  border-radius: var(--radius);
  padding: 24px 28px;
  text-align: left;
  max-width: 640px;
  margin: 0 auto 32px;
}

.summary-card h4 {
  font-size: 1.05rem;
  margin-bottom: 16px;
  color: var(--pine);
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  font-size: 0.95rem;
}

.summary-grid .full-row {
  grid-column: 1 / -1;
  border-top: 1px solid var(--line);
  padding-top: 10px;
  margin-top: 4px;
}

.btn-group-confirm {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.btn-link {
  background: none;
  border: none;
  color: var(--ink-60);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 8px 12px;
}

.btn-link:hover {
  color: var(--ink);
}
</style>
