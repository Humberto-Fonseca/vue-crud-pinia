<script setup>
/**
 * Vista de Inicio (InicioView.vue)
 * Muestra la bienvenida al proyecto académico, un resumen del catálogo y estado del carrito,
 * así como accesos directos mediante router-link.
 */
import { useProductosStore } from '../stores/productosStore.js'
import { useCarritoStore } from '../stores/carritoStore.js'

// Lectura de los stores de Pinia (los componentes solo leen y llaman acciones)
const productosStore = useProductosStore()
const carritoStore = useCarritoStore()
</script>

<template>
  <div class="inicio-container">
    <!-- Encabezado de Bienvenida -->
    <section class="hero-card">
      <h1 class="hero-title">Sistema de Gestión de Productos y Carrito</h1>
      <p class="hero-subtitle">
        Single Page Application (SPA) desarrollada con <strong>Vue 3</strong>, 
        gestión de estado centralizada con <strong>Pinia</strong> y navegación con <strong>Vue Router</strong>.
      </p>
      
      <div class="hero-actions">
        <!-- Directiva v-bind implícita en to="/productos" -->
        <router-link to="/productos" class="btn btn-primary">
          📦 Ver Catálogo de Productos
        </router-link>
        <router-link to="/carrito" class="btn btn-secondary">
          🛒 Ver Carrito ({{ carritoStore.totalItems }} items)
        </router-link>
      </div>
    </section>

    <!-- Tarjetas de resumen del sistema -->
    <section class="stats-grid">
      <!-- Tarjeta: Catálogo -->
      <div class="stat-card">
        <div class="stat-icon">🏷️</div>
        <div class="stat-info">
          <h3>Productos en Catálogo</h3>
          <p class="stat-number">{{ productosStore.totalProductos }}</p>
          <span class="stat-desc">Disponibles para editar, eliminar o comprar</span>
        </div>
      </div>

      <!-- Tarjeta: Items en Carrito -->
      <div class="stat-card">
        <div class="stat-icon">🛍️</div>
        <div class="stat-info">
          <h3>Items en Carrito</h3>
          <p class="stat-number">{{ carritoStore.totalItems }}</p>
          <!-- Directiva v-if / v-else para mostrar estado del carrito -->
          <span v-if="!carritoStore.estaVacio" class="stat-desc text-success">
            Total acumulado: ${{ carritoStore.totalAcumulado.toFixed(2) }}
          </span>
          <span v-else class="stat-desc text-muted">
            El carrito está actualmente vacío
          </span>
        </div>
      </div>

      <!-- Tarjeta: Tecnologías -->
      <div class="stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-info">
          <h3>Pila Tecnológica</h3>
          <ul class="tech-list">
            <li>Vue 3 & Vite</li>
            <li>Pinia State Management</li>
            <li>Vue Router (Hash History)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Sección de Información Académica -->
    <section class="info-section">
      <h3>Detalles del Proyecto</h3>
      <p>
        Este proyecto ha sido estructurado siguiendo las mejores prácticas de arquitectura frontend:
        toda la lógica de negocio y mutación de datos reside estrictamente dentro de los Stores de Pinia.
        Los componentes se limitan a renderizar la vista y despachar acciones.
      </p>
    </section>
  </div>
</template>

<style scoped>
.inicio-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #ffffff;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.hero-title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #38bdf8;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #cbd5e1;
  max-width: 750px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: transform 0.15s ease, background-color 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #0284c7;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0369a1;
}

.btn-secondary {
  background-color: #334155;
  color: #f8fafc;
  border: 1px solid #475569;
}

.btn-secondary:hover {
  background-color: #475569;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  margin: 0 0 0.4rem 0;
  font-size: 1.05rem;
  color: #334155;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.3rem 0;
}

.stat-desc {
  font-size: 0.85rem;
}

.text-success {
  color: #16a34a;
  font-weight: 600;
}

.text-muted {
  color: #64748b;
}

.tech-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.875rem;
  color: #475569;
}

.info-section {
  background-color: #f8fafc;
  border-left: 4px solid #0284c7;
  padding: 1.25rem 1.5rem;
  border-radius: 6px;
  color: #334155;
  line-height: 1.6;
}

.info-section h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #0f172a;
}
</style>
