<script setup lang="ts">
</script>

<template>
  <section class="hero">
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
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 2.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out 0.2s both;
}

.cta-button {
  background: #0f766e;
  color: white;
  border: none;
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
  animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-button:hover {
  background: #0d5e57;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 118, 110, 0.4);
}

.cta-button:active {
  transform: translateY(0);
}

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

@media (max-width: 768px) {
  .hero {
    height: 80vh;
    min-height: 500px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}
</style>
