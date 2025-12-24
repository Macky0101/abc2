<template>
  <div class="quotation-form-container">
    <div class="form-header">
      <h2>📋 Demande de Devis</h2>
      <p>Remplissez ce formulaire pour envoyer votre demande de devis</p>
    </div>

    <!-- Étape 1 : Formulaire -->
    <div v-if="step === 1" class="form-step">
      <form @submit.prevent="validateAndProceed" class="simple-form">
        <div class="form-group">
          <label>Nom de votre entreprise *</label>
          <input v-model="formData.company" type="text" required placeholder="Votre société">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Votre nom *</label>
            <input v-model="formData.name" type="text" required placeholder="Votre nom complet">
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="formData.email" type="email" required placeholder="votre@email.com">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Téléphone</label>
            <input v-model="formData.phone" type="tel" placeholder="+223 XX XX XX XX">
          </div>
          <div class="form-group">
            <label>Secteur d'activité</label>
            <select v-model="formData.industry">
              <option value="">Choisissez</option>
              <option value="Mining">Industrie Minière</option>
              <option value="Agriculture">Agro-industrie</option>
              <option value="Energy">Énergie Renouvelable</option>
              <option value="Manufacturing">Manufacturier</option>
              <option value="Construction">Construction</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Adresse</label>
          <input v-model="formData.address" type="text" placeholder="Adresse complète">
        </div>

        <div class="form-group">
          <label>Produits demandés *</label>
          <textarea 
            v-model="formData.products" 
            rows="4" 
            required 
            placeholder="Décrivez précisément vos besoins :
• Type d'équipement
• Références techniques
• Quantités
• Spécifications particulières"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Quantité estimée</label>
            <input v-model="formData.quantity" placeholder="Ex: 10 unités, 500kg, etc.">
          </div>
          <div class="form-group">
            <label>Date souhaitée</label>
            <input v-model="formData.date" type="date">
          </div>
        </div>

        <div class="form-group">
          <label>Notes supplémentaires</label>
          <textarea 
            v-model="formData.notes" 
            rows="3" 
            placeholder="Informations complémentaires, délais, budget estimé..."
          ></textarea>
        </div>

        <button type="submit" class="btn-send-email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          Envoyer la demande
        </button>
      </form>
    </div>

    <!-- Étape 2 : Confirmation -->
    <div v-if="step === 2" class="confirmation-step">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h3>Demande envoyée avec succès !</h3>
        <p>Votre demande de devis a été envoyée à <strong>contact@abc2-group.com</strong></p>
        <p class="confirmation-details">
          Un conseiller ABC2-GROUP vous contactera dans les 24h à l'adresse :<br>
          <strong>{{ formData.email }}</strong>
        </p>
      </div>

      <div class="summary-card">
        <h4>Récapitulatif de votre demande :</h4>
        <div class="summary-details">
          <div><strong>Société :</strong> {{ formData.company }}</div>
          <div><strong>Contact :</strong> {{ formData.name }}</div>
          <div><strong>Téléphone :</strong> {{ formData.phone || 'Non renseigné' }}</div>
          <div><strong>Produits :</strong> {{ formData.products.substring(0, 150) }}...</div>
        </div>
      </div>

      <div class="actions">
        <button @click="downloadPDF" class="btn-download">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 10L12 15M12 15L7 10M12 15V3" stroke="currentColor" stroke-width="2"/>
          </svg>
          Télécharger le PDF
        </button>
        <button @click="sendAnother" class="btn-another">
          Faire une nouvelle demande
        </button>
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import jsPDF from 'jspdf';

// Étape du formulaire
const step = ref(1);
const errorMessage = ref('');
const isLoading = ref(false);

// Données du formulaire
const formData = reactive({
  company: '',
  name: '',
  email: '',
  phone: '',
  industry: '',
  address: '',
  products: '',
  quantity: '',
  date: '',
  notes: ''
});

// Validation et envoi
const validateAndProceed = async () => {
  if (!formData.company || !formData.name || !formData.email || !formData.products) {
    errorMessage.value = 'Veuillez remplir les champs obligatoires (*)';
    setTimeout(() => errorMessage.value = '', 3000);
    return;
  }

  isLoading.value = true;
  
  try {
    // 1. Générer le PDF
    const pdfBlob = await generatePDFBlob();
    
    // 2. Préparer l'email
    const emailSent = await sendEmailWithPDF();
    
    if (emailSent) {
      // 3. Passer à l'étape de confirmation
      step.value = 2;
    }
  } catch (error) {
    console.error('Erreur:', error);
    errorMessage.value = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
    setTimeout(() => errorMessage.value = '', 5000);
  } finally {
    isLoading.value = false;
  }
};

// Générer un PDF et retourner le blob
const generatePDFBlob = (): Promise<Blob> => {
  return new Promise((resolve) => {
    const doc = new jsPDF();
    
    // Configuration des couleurs
    const primaryColor: [number, number, number] = [4, 120, 135];

    
    // En-tête avec logo et titre
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ABC2-GROUP', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('DEMANDE DE DEVIS', 105, 30, { align: 'center' });
    
    // Informations de l'entreprise
    doc.setFillColor(243, 244, 246);
    doc.rect(10, 50, 190, 40, 'F');
    
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('ABC2-GROUP', 15, 60);
    doc.text('Import-Export & Distribution', 15, 65);
    doc.text('contact@abc2-group.com', 15, 70);
    doc.text('+223 65 55 36 83', 15, 75);
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('RÉFÉRENCE', 170, 60);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`DEV-${Date.now().toString().slice(-8)}`, 170, 65);
    doc.text(new Date().toLocaleDateString('fr-FR'), 170, 70);
    
    // Informations du client
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS DU CLIENT', 15, 100);
    
    doc.setDrawColor(...primaryColor);
    doc.line(15, 102, 80, 102);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    let y = 110;
    
    doc.text(`Société : ${formData.company}`, 15, y);
    doc.text(`Contact : ${formData.name}`, 15, y + 7);
    doc.text(`Email : ${formData.email}`, 15, y + 14);
    
    if (formData.phone) {
      doc.text(`Téléphone : ${formData.phone}`, 15, y + 21);
      y += 7;
    }
    
    if (formData.industry) {
      doc.text(`Secteur : ${formData.industry}`, 15, y + 21);
      y += 7;
    }
    
    if (formData.address) {
      doc.text(`Adresse : ${formData.address}`, 15, y + 21);
    }
    
    // Détails de la demande
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉTAILS DE LA DEMANDE', 15, 150);
    doc.line(15, 152, 80, 152);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const productsLines = doc.splitTextToSize(`Produits demandés : ${formData.products}`, 180);
    doc.text(productsLines, 15, 160);
    
    let currentY = 160 + (productsLines.length * 5);
    
    if (formData.quantity) {
      doc.text(`Quantité estimée : ${formData.quantity}`, 15, currentY + 10);
      currentY += 10;
    }
    
    if (formData.date) {
      doc.text(`Date souhaitée : ${formData.date}`, 15, currentY + 10);
      currentY += 10;
    }
    
    if (formData.notes) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('NOTES SUPPLÉMENTAIRES', 15, currentY + 20);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const notesLines = doc.splitTextToSize(formData.notes, 180);
      doc.text(notesLines, 15, currentY + 30);
    }
    
    // Pied de page
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text('Document généré automatiquement - ABC2-GROUP', 105, 280, { align: 'center' });
    doc.text('www.abc2-group.com', 105, 285, { align: 'center' });
    
    // Convertir en blob
    const pdfOutput = doc.output('blob');
    resolve(pdfOutput);
  });
};

// Envoyer l'email avec le PDF
const sendEmailWithPDF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const subject = encodeURIComponent(`[ABC2-GROUP] Demande de devis - ${formData.company}`);
  
    const body = encodeURIComponent(`
DEMANDE DE DEVIS - ABC2-GROUP
==============================

INFORMATIONS DU CLIENT
----------------------
• Société : ${formData.company}
• Contact : ${formData.name}
• Email : ${formData.email}
• Téléphone : ${formData.phone || 'Non précisé'}
• Secteur d'activité : ${formData.industry || 'Non précisé'}
• Adresse : ${formData.address || 'Non précisé'}

DÉTAILS DE LA DEMANDE
---------------------
${formData.products}

${formData.quantity ? `• Quantité estimée : ${formData.quantity}` : ''}
${formData.date ? `• Date souhaitée : ${formData.date}` : ''}

${formData.notes ? `NOTES SUPPLÉMENTAIRES :\n${formData.notes}` : ''}

---
Ce message a été envoyé via le formulaire de contact du site ABC2-GROUP
Date d'envoi : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
    `.trim());

    // Ouvrir le client email
    window.location.href = `mailto:contact@abc2-group.com?subject=${subject}&body=${body}`;
    
    // Attendre un peu avant de considérer l'envoi comme réussi
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

// Télécharger le PDF
const downloadPDF = () => {
  try {
    const doc = new jsPDF();
    
    // Configuration des couleurs
    const primaryColor: [number, number, number] = [4, 120, 135];
const secondaryColor: [number, number, number] = [31, 41, 55];
const lightColor: [number, number, number] = [156, 163, 175];

    
    // En-tête avec logo et titre
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ABC2-GROUP', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('DEMANDE DE DEVIS', 105, 30, { align: 'center' });
    
    // Informations de l'entreprise
    doc.setFillColor(243, 244, 246); // gris clair
    doc.rect(10, 50, 190, 40, 'F');
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('ABC2-GROUP', 15, 60);
    doc.text('Import-Export & Distribution', 15, 65);
    doc.text('contact@abc2-group.com', 15, 70);
    doc.text('+223 65 55 36 83', 15, 75);
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('RÉFÉRENCE', 170, 60);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`DEV-${Date.now().toString().slice(-8)}`, 170, 65);
    doc.text(new Date().toLocaleDateString('fr-FR'), 170, 70);
    
    // Informations du client
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS DU CLIENT', 15, 100);
    
    doc.setDrawColor(...primaryColor);
    doc.line(15, 102, 80, 102);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    let y = 110;
    
    doc.text(`Société : ${formData.company}`, 15, y);
    doc.text(`Contact : ${formData.phone}`, 15, y + 7);
    doc.text(`Email : ${formData.email}`, 15, y + 14);
    
    if (formData.phone) {
      doc.text(`Téléphone : ${formData.phone}`, 15, y + 21);
      y += 7;
    }
    
    if (formData.industry) {
      doc.text(`Secteur : ${formData.industry}`, 15, y + 21);
      y += 7;
    }
    
    if (formData.address) {
      doc.text(`Adresse : ${formData.address}`, 15, y + 21);
    }
    
    // Détails de la demande
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉTAILS DE LA DEMANDE', 15, 150);
    doc.line(15, 152, 80, 152);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Produits demandés
    const productsLines = doc.splitTextToSize(`Produits demandés : ${formData.products}`, 180);
    doc.text(productsLines, 15, 160);
    
    let currentY = 160 + (productsLines.length * 5);
    
    if (formData.quantity) {
      doc.text(`Quantité estimée : ${formData.quantity}`, 15, currentY + 10);
      currentY += 10;
    }
    
    if (formData.date) {
      doc.text(`Date souhaitée : ${formData.date}`, 15, currentY + 10);
      currentY += 10;
    }
    
    if (formData.notes) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('NOTES SUPPLÉMENTAIRES', 15, currentY + 20);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const notesLines = doc.splitTextToSize(formData.notes, 180);
      doc.text(notesLines, 15, currentY + 30);
    }
    
    // Pied de page
    doc.setFontSize(10);
    doc.setTextColor(...lightColor);
    doc.text('Document généré automatiquement - ABC2-GROUP', 105, 280, { align: 'center' });
    // doc.text('www.abc2-group.com', 105, 285, { align: 'center' });
    
    // Sauvegarder le PDF
    const fileName = `Devis_${formData.company.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
    
  } catch (error) {
    console.error('Erreur génération PDF:', error);
    errorMessage.value = 'Erreur lors de la génération du PDF';
    setTimeout(() => errorMessage.value = '', 3000);
  }
};

// Nouvelle demande
const sendAnother = () => {
  step.value = 1;
  // Réinitialiser le formulaire
  Object.keys(formData).forEach(key => {
    formData[key as keyof typeof formData] = '';
  });
};
</script>

<style scoped>
.quotation-form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  width: 100%;
  box-sizing: border-box;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f4f8;
}

.form-header h2 {
  color: #047857;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.form-header p {
  color: #64748b;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.4;
}

/* Étape 1 - Formulaire */
.form-step {
  background: #f8fafc;
  padding: clamp(1rem, 3vw, 2.5rem);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
}

.simple-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #334155;
  font-size: 0.95rem;
  line-height: 1.4;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background: white;
  color: #1e293b;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #047857;
  box-shadow: 0 0 0 3px rgba(4, 120, 135, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #94a3b8;
  font-size: 0.95rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
}

.btn-send-email {
  background: linear-gradient(135deg, #047857, #059669);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
  margin-top: 0.5rem;
  width: 100%;
  min-height: 50px;
}

.btn-send-email:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(4, 120, 135, 0.3);
}

.btn-send-email:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Étape 2 - Confirmation */
.confirmation-step {
  background: #f8fafc;
  padding: clamp(1rem, 3vw, 2.5rem);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  text-align: center;
  box-sizing: border-box;
}

.success-card {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 2px solid #10b981;
  box-sizing: border-box;
}

.success-icon {
  font-size: clamp(3rem, 8vw, 4rem);
  color: #047857;
  margin-bottom: 1rem;
  line-height: 1;
}

.success-card h3 {
  color: #047857;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.success-card p {
  color: #065f46;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.confirmation-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px dashed #10b981;
  color: #047857;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.summary-card {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  border-left: 4px solid #047857;
  text-align: left;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.summary-card h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  line-height: 1.3;
}

.summary-details {
  display: grid;
  gap: 0.5rem;
  color: #475569;
  font-size: 0.95rem;
}

.summary-details div {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
  word-break: break-word;
  line-height: 1.4;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-download {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
  min-height: 50px;
  flex: 1;
  min-width: 200px;
}

.btn-download:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-another {
  background: white;
  color: #047857;
  border: 2px solid #047857;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 50px;
  flex: 1;
  min-width: 200px;
}

.btn-another:hover {
  background: #f0fdf4;
  transform: translateY(-2px);
}

/* Messages d'erreur */
.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  border: 1px solid #fecaca;
  animation: fadeIn 0.3s;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.4;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Media Queries améliorées */
@media (max-width: 768px) {
  .quotation-form-container {
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 12px;
  }
  
  .form-step,
  .confirmation-step {
    padding: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn-download,
  .btn-another {
    width: 100%;
    min-width: unset;
  }
  
  .success-card {
    padding: 1.25rem;
  }
  
  .summary-card {
    padding: 1rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    font-size: 16px; /* Empêche le zoom sur iOS */
  }
}

@media (max-width: 480px) {
  .form-header h2 {
    font-size: 1.3rem;
  }
  
  .form-header p {
    font-size: 0.85rem;
  }
  
  .success-card h3 {
    font-size: 1.2rem;
  }
  
  .btn-send-email,
  .btn-download,
  .btn-another {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
  
  .form-group label {
    font-size: 0.9rem;
  }
  
  .summary-card h4 {
    font-size: 1.1rem;
  }
  
  .summary-details {
    font-size: 0.9rem;
  }
}

@media (max-width: 320px) {
  .quotation-form-container {
    padding: 0.5rem;
    margin: 0.25rem;
  }
  
  .form-step,
  .confirmation-step {
    padding: 0.75rem;
  }
  
  .simple-form {
    gap: 1rem;
  }
}
</style>