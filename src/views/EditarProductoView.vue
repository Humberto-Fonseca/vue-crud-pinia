<script setup>
/**
 * Vista de Editar Producto (EditarProductoView.vue)
 * Permite modificar los datos de un producto existente.
 * Carga los datos actuales desde el store y valida su existencia.
 */
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productosStore.js'
import ProductoForm from '../components/ProductoForm.vue'

const route = useRoute()
const router = useRouter()
const productosStore = useProductosStore()

// Obtenemos el ID de los parámetros de la ruta
const productoId = computed(() => route.params.id)

// Buscamos el producto en el store de Pinia a través del getter productoPorId
const productoActual = computed(() => productosStore.productoPorId(productoId.value))

// Verificación de existencia del producto al montar el componente
onMounted(() => {
  if (!productoActual.value) {
    alert(`El producto con ID "${productoId.value}" no existe o fue eliminado.`)
    router.push('/productos')
  }
})

/**
 * Maneja la acción de guardar los datos actualizados
 * @param {Object} datosActualizados - { nombre, precio, descripcion }
 */
const manejarActualizar = (datosActualizados) => {
  try {
    // TODA la lógica de actualización vive en el store
    productosStore.actualizarProducto(productoId.value, datosActualizados)
    router.push('/productos')
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}

/**
 * Cancela la edición y regresa al catálogo
 */
const manejarCancelar = () => {
  router.push('/productos')
}
</script>

<template>
  <div class="editar-producto-container">
    <div class="breadcrumb">
      <!-- Directiva v-bind implícita en to="/productos" -->
      <router-link to="/productos">← Volver al Catálogo</router-link>
    </div>

    <!-- Directiva v-if para renderizar el formulario solo si el producto existe -->
    <div v-if="productoActual" class="form-wrapper">
      <h2>Modificar Producto #{{ productoId }}</h2>
      <p class="desc">
        Actualiza la información del producto seleccionado.
      </p>

      <!-- Componente reutilizable ProductoForm pre-poblado con los datos actuales -->
      <ProductoForm
        :producto-inicial="productoActual"
        :es-edicion="true"
        @guardar="manejarActualizar"
        @cancelar="manejarCancelar"
      />
    </div>

    <!-- Mensaje alternativo mientras se procesa la redirección -->
    <div v-else class="not-found-message">
      <p>Cargando información o producto no encontrado...</p>
    </div>
  </div>
</template>

<style scoped>
.editar-producto-container {
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

.not-found-message {
  text-align: center;
  padding: 2rem;
  color: #64748b;
}
</style>
