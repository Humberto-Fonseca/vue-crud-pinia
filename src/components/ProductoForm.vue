<script setup>
/**
 * Componente reutilizable ProductoForm.vue
 * Utilizado tanto para la creación como para la edición de productos.
 * Implementa v-model en los campos, validación reactiva y emisión de eventos.
 */
import { reactive, watch } from 'vue'

const props = defineProps({
  // Objeto con datos iniciales del producto (en caso de edición)
  productoInicial: {
    type: Object,
    default: () => ({
      nombre: '',
      precio: '',
      descripcion: ''
    })
  },
  // Indica si estamos en modo edición o creación
  esEdicion: {
    type: Boolean,
    default: false
  }
})

// Emite el evento con los datos validados hacia el componente padre
const emit = defineEmits(['guardar', 'cancelar'])

// Estado reactivo del formulario vinculado con v-model
const formulario = reactive({
  nombre: props.productoInicial.nombre || '',
  precio: props.productoInicial.precio !== undefined ? props.productoInicial.precio : '',
  descripcion: props.productoInicial.descripcion || ''
})

// Estado reactivo para mensajes de error de validación
const errores = reactive({
  nombre: '',
  precio: ''
})

// Si el productoInicial cambia, sincronizamos el formulario
watch(
  () => props.productoInicial,
  (nuevo) => {
    if (nuevo) {
      formulario.nombre = nuevo.nombre || ''
      formulario.precio = nuevo.precio !== undefined ? nuevo.precio : ''
      formulario.descripcion = nuevo.descripcion || ''
    }
  },
  { deep: true, immediate: true }
)

/**
 * Valida los campos obligatorios del formulario
 * @returns {boolean} true si es válido, false de lo contrario
 */
const validarFormulario = () => {
  let valido = true
  errores.nombre = ''
  errores.precio = ''

  if (!formulario.nombre.trim()) {
    errores.nombre = 'El nombre del producto es obligatorio.'
    valido = false
  }

  const precioNum = Number(formulario.precio)
  if (formulario.precio === '' || isNaN(precioNum) || precioNum <= 0) {
    errores.precio = 'El precio debe ser un número mayor a 0.'
    valido = false
  }

  return valido
}

/**
 * Manejador del envío del formulario prevenido con directiva @submit.prevent
 */
const handleSubmit = () => {
  if (!validarFormulario()) return

  emit('guardar', {
    nombre: formulario.nombre.trim(),
    precio: Number(formulario.precio),
    descripcion: formulario.descripcion.trim()
  })
}
</script>

<template>
  <form class="producto-formulario" @submit.prevent="handleSubmit">
    <!-- Campo: Nombre del Producto -->
    <div class="form-group">
      <label for="campo-nombre" class="form-label">Nombre del Producto *</label>
      <!-- Directiva v-model para enlace bidireccional -->
      <input
        id="campo-nombre"
        v-model="formulario.nombre"
        type="text"
        placeholder="Ej. Teclado Mecánico Inalámbrico"
        class="form-control"
        :class="{ 'input-error': errores.nombre }"
      />
      <!-- Directiva v-if para mostrar mensaje de error si la validación falla -->
      <span v-if="errores.nombre" class="error-msg">
        ⚠️ {{ errores.nombre }}
      </span>
    </div>

    <!-- Campo: Precio del Producto -->
    <div class="form-group">
      <label for="campo-precio" class="form-label">Precio ($) *</label>
      <!-- Directiva v-model para enlace de precio -->
      <input
        id="campo-precio"
        v-model="formulario.precio"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Ej. 99.99"
        class="form-control"
        :class="{ 'input-error': errores.precio }"
      />
      <!-- Directiva v-if para mostrar error de precio -->
      <span v-if="errores.precio" class="error-msg">
        ⚠️ {{ errores.precio }}
      </span>
    </div>

    <!-- Campo: Descripción del Producto -->
    <div class="form-group">
      <label for="campo-desc" class="form-label">Descripción</label>
      <!-- Directiva v-model para enlace del texto de descripción -->
      <textarea
        id="campo-desc"
        v-model="formulario.descripcion"
        rows="3"
        placeholder="Breve detalle sobre especificaciones, modelo o características..."
        class="form-control"
      ></textarea>
    </div>

    <!-- Botones de Acción del Formulario -->
    <div class="form-actions">
      <!-- Directiva v-on (@click) para cancelar y volver atrás -->
      <button
        type="button"
        class="btn btn-secondary"
        @click="$emit('cancelar')"
      >
        Cancelar
      </button>

      <!-- Botón de Envío: Texto condicional con v-if / v-else -->
      <button type="submit" class="btn btn-primary">
        <span v-if="esEdicion">💾 Guardar Cambios</span>
        <span v-else>➕ Crear Producto</span>
      </button>
    </div>
  </form>
</template>

<style scoped>
.producto-formulario {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
}

.form-control:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.error-msg {
  color: #dc2626;
  font-size: 0.85rem;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1.25rem;
}

.btn {
  padding: 0.65rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
  transition: all 0.15s ease-in-out;
}

.btn-primary {
  background-color: #0284c7;
  color: #ffffff;
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
</style>
