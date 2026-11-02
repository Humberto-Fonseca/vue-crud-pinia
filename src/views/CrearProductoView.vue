<script setup>
/**
 * Vista de Crear Producto (CrearProductoView.vue)
 * Formulario para el alta de un nuevo producto en el catálogo.
 * Llama a la acción agregarProducto del store de Pinia y redirige a /productos.
 */
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productosStore.js'
import ProductoForm from '../components/ProductoForm.vue'

const router = useRouter()
const productosStore = useProductosStore()

/**
 * Manejador que recibe los datos validados del componente formulario
 * e interactúa con el store de productos.
 * @param {Object} datosProducto - { nombre, precio, descripcion }
 */
const manejarGuardar = (datosProducto) => {
  try {
    // TODA la lógica de creación vive en el store
    productosStore.agregarProducto(datosProducto)
    // Redirección SPA hacia el listado de productos
    router.push('/productos')
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}

/**
 * Cancela la operación y vuelve al catálogo
 */
const manejarCancelar = () => {
  router.push('/productos')
}
</script>

<template>
  <div class="crear-producto-container">
    <div class="breadcrumb">
      <!-- Directiva v-bind implícita en to="/productos" -->
      <router-link to="/productos">← Volver al Catálogo</router-link>
    </div>

    <div class="form-wrapper">
      <h2>Registrar Nuevo Producto</h2>
      <p class="desc">
        Completa los campos para añadir un nuevo artículo a la tienda.
      </p>

      <!-- Componente reutilizable ProductoForm con eventos emitidos -->
      <ProductoForm
        :es-edicion="false"
        @guardar="manejarGuardar"
        @cancelar="manejarCancelar"
      />
    </div>
  </div>
</template>

<style scoped>
.crear-producto-container {
  max-width: 650px;
  margin: 0 auto;
}

.breadcrumb {
  margin-bottom: 1.5rem;
}

.breadcrumb a {
  color: #0284c7;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.form-wrapper h2 {
  margin: 0 0 0.5rem 0;
  color: #0f172a;
}

.desc {
  margin: 0 0 1.5rem 0;
  color: #64748b;
}
</style>
