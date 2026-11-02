<script setup>
/**
 * Componente principal App.vue
 * Contiene la barra de navegación superior con router-link hacia cada ruta,
 * el indicador dinámico de items en el carrito y el contenedor router-view.
 */
import { useCarritoStore } from './stores/carritoStore.js'

// Instancia del store del carrito para obtener el contador en tiempo real
const carritoStore = useCarritoStore()
</script>

<template>
  <div id="app-wrapper">
    <!-- Barra de navegación principal -->
    <header class="navbar">
      <div class="nav-container">
        <!-- Logo / Marca del proyecto -->
        <router-link to="/" class="nav-brand">
          <span class="brand-icon">📦</span> Tienda Vue 3
        </router-link>

        <!-- Enlaces de navegación usando directivas de Vue Router -->
        <nav class="nav-links">
          <!-- Directiva v-bind implícita en to="/" para navegación SPA sin recarga -->
          <router-link to="/" class="nav-link" exact-active-class="active-link">
            Inicio
          </router-link>

          <router-link to="/productos" class="nav-link" active-class="active-link">
            Productos
          </router-link>

          <router-link to="/productos/crear" class="nav-link" active-class="active-link">
            Crear producto
          </router-link>

          <router-link to="/carrito" class="nav-link cart-link" active-class="active-link">
            🛒 Carrito
            <!-- Directiva v-if para mostrar la insignia solo si hay items en el carrito -->
            <span v-if="carritoStore.totalItems > 0" class="cart-badge">
              {{ carritoStore.totalItems }}
            </span>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Contenido dinámico renderizado por Vue Router según la URL actual -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Pie de página informativo -->
    <footer class="app-footer">
      <p>Proyecto Académico Vue 3 + Pinia + Vue Router — Desarrollado por Humberto Fonseca</p>
    </footer>
  </div>
</template>

<style scoped>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #1e293b;
  color: #ffffff;
  padding: 0.85rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #38bdf8;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav-brand:hover {
  opacity: 0.9;
}

.brand-icon {
  font-size: 1.4rem;
}

.nav-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.nav-link {
  color: #cbd5e1;
  text-decoration: none;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  position: relative;
}

.nav-link:hover {
  background-color: #334155;
  color: #ffffff;
}

/* Resaltado del enlace activo */
.active-link {
  background-color: #0284c7 !important;
  color: #ffffff !important;
  font-weight: 600;
}

.cart-link {
  position: relative;
}

.cart-badge {
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  min-width: 1.2rem;
  text-align: center;
  line-height: 1;
}

.main-content {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  box-sizing: border-box;
}

.app-footer {
  background-color: #0f172a;
  color: #94a3b8;
  text-align: center;
  padding: 1.25rem;
  font-size: 0.875rem;
  border-top: 1px solid #1e293b;
  margin-top: auto;
}
</style>
