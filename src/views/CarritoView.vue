<script setup>
/**
 * Vista del Carrito de Compras (CarritoView.vue)
 * Muestra el resumen de compra, items seleccionados, cantidades,
 * subtotales, monto acumulado y opciones para eliminar o vaciar el carrito.
 */
import { useCarritoStore } from '../stores/carritoStore.js'

// Inyección del store de Pinia
const carritoStore = useCarritoStore()

/**
 * Incrementa la cantidad de un artículo llamando a la acción del store
 * @param {Object} item 
 */
const aumentarCantidad = (item) => {
  carritoStore.agregarAlCarrito(item)
}

/**
 * Disminuye la cantidad de un artículo a través del store
 * @param {string} id 
 */
const disminuirCantidad = (id) => {
  carritoStore.decrementarCantidad(id)
}

/**
 * Elimina un producto individual del carrito
 * @param {string} id 
 * @param {string} nombre 
 */
const eliminarItem = (id, nombre) => {
  if (window.confirm(`¿Deseas remover "${nombre}" del carrito?`)) {
    carritoStore.eliminarDelCarrito(id)
  }
}

/**
 * Vacia el carrito por completo tras confirmación del usuario
 */
const vaciarCarritoCompleto = () => {
  if (window.confirm('¿Estás seguro de que deseas vaciar todo el carrito de compras?')) {
    carritoStore.vaciarCarrito()
  }
}
</script>

<template>
  <div class="carrito-container">
    <!-- Encabezado de la vista -->
    <div class="carrito-header">
      <div>
        <h2>Carrito de Compras</h2>
        <p class="subtitle">Revisa los artículos que has seleccionado para tu pedido.</p>
      </div>

      <!-- Directiva v-if para mostrar botón Vaciar Carrito solo si hay items -->
      <button
        v-if="!carritoStore.estaVacio"
        class="btn btn-outline-danger"
        @click="vaciarCarritoCompleto"
      >
        🗑️ Vaciar Carrito
      </button>
    </div>

    <!-- Directiva v-if / v-else: Muestra la tabla si hay items, o mensaje de carrito vacío -->
    <div v-if="!carritoStore.estaVacio" class="carrito-content">
      <!-- Tabla responsiva de productos del carrito -->
      <div class="table-responsive">
        <table class="carrito-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Directiva v-for iterando sobre items del carrito con :key="item.id" (sin usar índice) -->
            <tr v-for="item in carritoStore.items" :key="item.id">
              <td class="item-name">
                <strong>{{ item.nombre }}</strong>
              </td>
              <td>${{ Number(item.precio).toFixed(2) }}</td>
              <td>
                <div class="cantidad-controles">
                  <!-- Directiva v-on (@click) para disminuir cantidad -->
                  <button
                    class="btn-qty"
                    title="Disminuir cantidad"
                    @click="disminuirCantidad(item.id)"
                  >
                    -
                  </button>
                  <span class="qty-badge">{{ item.cantidad }}</span>
                  <!-- Directiva v-on (@click) para aumentar cantidad -->
                  <button
                    class="btn-qty"
                    title="Aumentar cantidad"
                    @click="aumentarCantidad(item)"
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="subtotal-cell">
                ${{ (item.precio * item.cantidad).toFixed(2) }}
              </td>
              <td class="text-center">
                <!-- Directiva v-on (@click) para eliminar item individual -->
                <button
                  class="btn-delete"
                  title="Eliminar del carrito"
                  @click="eliminarItem(item.id, item.nombre)"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Resumen del Pedido / Total Acumulado -->
      <div class="resumen-card">
        <div class="resumen-row">
          <span>Artículos totales:</span>
          <strong>{{ carritoStore.totalItems }} unidades</strong>
        </div>
        <div class="resumen-row total-row">
          <span>Total a pagar:</span>
          <span class="total-monto">${{ carritoStore.totalAcumulado.toFixed(2) }}</span>
        </div>

        <div class="resumen-actions">
          <!-- Directiva v-bind implícita en to="/productos" -->
          <router-link to="/productos" class="btn btn-secondary">
            ← Seguir Comprando
          </router-link>
          <button class="btn btn-primary" @click="alert('¡Gracias por tu compra académica!')">
            ✅ Finalizar Compra
          </button>
        </div>
      </div>
    </div>

    <!-- Bloque alternativo: Carrito vacío con v-else -->
    <div v-else class="empty-cart-state">
      <div class="empty-icon">🛒</div>
      <h3>El carrito está vacío</h3>
      <p>Aún no has agregado productos a tu lista de compra.</p>
      <!-- Enlace hacia la lista de productos como solicita la especificación -->
      <router-link to="/productos" class="btn btn-primary">
        Explorar Catálogo de Productos
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.carrito-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.carrito-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
}

.carrito-header h2 {
  margin: 0 0 0.25rem 0;
  color: #0f172a;
}

.subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.carrito-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
}

.table-responsive {
  overflow-x: auto;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.carrito-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.carrito-table th {
  background-color: #f8fafc;
  padding: 1rem 1.25rem;
  font-weight: 600;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.carrito-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  color: #1e293b;
  vertical-align: middle;
}

.carrito-table tr:last-child td {
  border-bottom: none;
}

.item-name {
  font-size: 1rem;
  color: #0f172a;
}

.subtotal-cell {
  font-weight: 700;
  color: #16a34a;
}

.text-center {
  text-align: center;
}

.cantidad-controles {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.btn-qty {
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.15s ease;
}

.btn-qty:hover {
  background-color: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}

.qty-badge {
  font-weight: 700;
  min-width: 1.5rem;
  text-align: center;
}

.btn-delete {
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.btn-delete:hover {
  background-color: #ef4444;
  color: #ffffff;
}

/* Tarjeta de Resumen */
.resumen-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 450px;
  margin-left: auto;
}

.resumen-row {
  display: flex;
  justify-content: space-between;
  color: #475569;
  font-size: 1rem;
}

.total-row {
  border-top: 2px solid #e2e8f0;
  padding-top: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.total-monto {
  color: #16a34a;
}

.resumen-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.65rem 1.25rem;
  border-radius: 6px;
  font-size: 0.95rem;
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

.btn-secondary {
  background-color: #e2e8f0;
  color: #334155;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
}

.btn-outline-danger {
  background-color: #fff;
  border-color: #ef4444;
  color: #ef4444;
}

.btn-outline-danger:hover {
  background-color: #ef4444;
  color: #fff;
}

.empty-cart-state {
  text-align: center;
  padding: 3.5rem 1rem;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}

.empty-cart-state h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.empty-cart-state p {
  color: #64748b;
  margin-bottom: 1.5rem;
}
</style>
