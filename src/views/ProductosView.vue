<script setup>
/**
 * Vista de Lista de Productos (ProductosView.vue)
 * Muestra el catálogo de productos registrados en el store.
 * Incluye acciones para:
 *  - Navegar a edición (/productos/:id)
 *  - Eliminar producto (confirmando previamente y eliminándolo también del carrito)
 *  - Agregar producto al carrito
 *  - Notificación temporal reactiva usando v-show
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productosStore.js'
import { useCarritoStore } from '../stores/carritoStore.js'

const router = useRouter()
const productosStore = useProductosStore()
const carritoStore = useCarritoStore()

// Estado local para mensaje de confirmación temporal al interactuar
const mensajeNotificacion = ref('')
const mostrarNotificacion = ref(false)
let timerNotificacion = null

/**
 * Muestra una alerta temporal visual utilizando la directiva v-show
 * @param {string} texto - Mensaje a mostrar
 */
const dispararNotificacion = (texto) => {
  mensajeNotificacion.value = texto
  mostrarNotificacion.value = true

  if (timerNotificacion) clearTimeout(timerNotificacion)
  timerNotificacion = setTimeout(() => {
    mostrarNotificacion.value = false
  }, 2500)
}

/**
 * Acción del componente: Despacha la adición al carritoStore
 * @param {Object} producto 
 */
const agregarAlCarrito = (producto) => {
  carritoStore.agregarAlCarrito(producto)
  dispararNotificacion(`¡"${producto.nombre}" agregado al carrito con éxito!`)
}

/**
 * Acción del componente: Solicita confirmación y llama a productosStore.eliminarProducto()
 * @param {Object} producto 
 */
const confirmarEliminacion = (producto) => {
  const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"? Esta acción también lo removerá del carrito.`)
  if (confirmacion) {
    productosStore.eliminarProducto(producto.id)
    dispararNotificacion(`Producto "${producto.nombre}" eliminado correctamente.`)
  }
}

/**
 * Navega hacia la vista de edición usando el router programático
 * @param {string} id 
 */
const irAEditar = (id) => {
  router.push(`/productos/${id}`)
}
</script>

<template>
  <div class="productos-view">
    <!-- Encabezado con título y botón de crear -->
    <div class="header-bar">
      <div>
        <h2>Catálogo de Productos</h2>
        <p class="subtitle">Gestiona los productos disponibles o agrégalos a tu carrito.</p>
      </div>
      <!-- Directiva v-bind implícita en to="/productos/crear" -->
      <router-link to="/productos/crear" class="btn btn-success">
        ➕ Nuevo Producto
      </router-link>
    </div>

    <!-- Directiva v-show: Muestra u oculta la barra de notificación manteniendo el elemento en el DOM -->
    <div v-show="mostrarNotificacion" class="notificacion-toast">
      <span>🔔</span> {{ mensajeNotificacion }}
    </div>

    <!-- Directiva v-if / v-else: Condicional según si existen productos en el store -->
    <div v-if="productosStore.totalProductos > 0" class="productos-grid">
      <!-- Directiva v-for iterando sobre la lista de productos con :key único (id) -->
      <article
        v-for="producto in productosStore.productos"
        :key="producto.id"
        class="producto-card"
      >
        <div class="card-header">
          <h3 class="producto-nombre">{{ producto.nombre }}</h3>
          <!-- Directiva v-bind para clases dinámicas o formato de precio -->
          <span class="producto-precio">${{ Number(producto.precio).toFixed(2) }}</span>
        </div>

        <p class="producto-desc">
          <!-- Directiva v-if / v-else para la descripción opcional -->
          <span v-if="producto.descripcion">{{ producto.descripcion }}</span>
          <span v-else class="sin-desc">Sin descripción disponible.</span>
        </p>

        <div class="card-actions">
          <!-- Directiva v-on (@click) para disparar navegación hacia edición -->
          <button
            class="btn btn-outline-warning"
            title="Editar producto"
            @click="irAEditar(producto.id)"
          >
            ✏️ Editar
          </button>

          <!-- Directiva v-on (@click) para confirmar y eliminar -->
          <button
            class="btn btn-outline-danger"
            title="Eliminar producto"
            @click="confirmarEliminacion(producto)"
          >
            🗑️ Eliminar
          </button>

          <!-- Directiva v-on (@click) para agregar al carrito -->
          <button
            class="btn btn-primary"
            title="Agregar al carrito de compras"
            @click="agregarAlCarrito(producto)"
          >
            🛒 Al carrito
          </button>
        </div>
      </article>
    </div>

    <!-- Bloque alternativo cuando la lista de productos está vacía -->
    <div v-else class="empty-state">
      <p class="empty-icon">📭</p>
      <h3>No hay productos registrados en el catálogo</h3>
      <p>Crea el primer producto para comenzar.</p>
      <router-link to="/productos/crear" class="btn btn-primary">
        Crear Producto Ahora
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.productos-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
}

.header-bar h2 {
  margin: 0 0 0.25rem 0;
  color: #0f172a;
}

.subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

/* Notificación temporal con animación suave */
.notificacion-toast {
  background-color: #0284c7;
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
  transition: opacity 0.3s ease;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.5rem;
}

.producto-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.producto-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.producto-nombre {
  margin: 0;
  font-size: 1.15rem;
  color: #1e293b;
  font-weight: 600;
}

.producto-precio {
  font-size: 1.25rem;
  font-weight: 700;
  color: #16a34a;
  background-color: #dcfce7;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  white-space: nowrap;
}

.producto-desc {
  color: #475569;
  font-size: 0.92rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.sin-desc {
  font-style: italic;
  color: #94a3b8;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
}

.btn-primary {
  background-color: #0284c7;
  color: #ffffff;
  flex: 1;
}

.btn-primary:hover {
  background-color: #0369a1;
}

.btn-success {
  background-color: #16a34a;
  color: #ffffff;
}

.btn-success:hover {
  background-color: #15803d;
}

.btn-outline-warning {
  background-color: #fff;
  border-color: #f59e0b;
  color: #b45309;
}

.btn-outline-warning:hover {
  background-color: #fef3c7;
}

.btn-outline-danger {
  background-color: #fff;
  border-color: #ef4444;
  color: #b91c1c;
}

.btn-outline-danger:hover {
  background-color: #fee2e2;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.empty-icon {
  font-size: 3rem;
  margin: 0 0 0.5rem 0;
}
</style>
