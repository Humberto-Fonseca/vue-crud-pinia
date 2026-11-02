import { defineStore } from 'pinia'

/**
 * Store de Pinia para el Carrito de Compras
 * Identificador único: 'carrito'
 * Maneja el estado global del carrito de compras y su persistencia en localStorage.
 */
export const useCarritoStore = defineStore('carrito', {
  state: () => {
    // Carga inicial desde localStorage si existe, o inicializa vacío
    const itemsGuardados = localStorage.getItem('carrito_items')
    return {
      items: itemsGuardados ? JSON.parse(itemsGuardados) : []
    }
  },

  getters: {
    /**
     * Calcula la cantidad total de unidades de productos en el carrito.
     */
    totalItems: (state) => {
      return state.items.reduce((acumulado, item) => acumulado + item.cantidad, 0)
    },

    /**
     * Calcula el monto total acumulado de la compra (precio * cantidad).
     */
    totalAcumulado: (state) => {
      return state.items.reduce((acumulado, item) => acumulado + (item.precio * item.cantidad), 0)
    },

    /**
     * Determina de forma reactiva si el carrito no tiene elementos.
     */
    estaVacio: (state) => {
      return state.items.length === 0
    }
  },

  actions: {
    /**
     * Guarda el estado actual de los items en el almacenamiento local del navegador.
     */
    guardarEnStorage() {
      try {
        localStorage.setItem('carrito_items', JSON.stringify(this.items))
      } catch (error) {
        console.error('Error al guardar el carrito en localStorage:', error)
      }
    },

    /**
     * Agrega un producto al carrito.
     * Si el producto ya se encuentra en el carrito, incrementa su cantidad.
     * @param {Object} producto - Producto a agregar { id, nombre, precio, ... }
     */
    agregarAlCarrito(producto) {
      if (!producto || !producto.id) return

      const itemExistente = this.items.find(item => String(item.id) === String(producto.id))

      if (itemExistente) {
        itemExistente.cantidad += 1
      } else {
        this.items.push({
          id: String(producto.id),
          nombre: producto.nombre,
          precio: Number(producto.precio),
          cantidad: 1
        })
      }

      this.guardarEnStorage()
    },

    /**
     * Disminuye en 1 la cantidad de un producto en el carrito.
     * Si la cantidad llega a 0, lo elimina del carrito.
     * @param {string|number} id - Identificador del producto
     */
    decrementarCantidad(id) {
      const item = this.items.find(item => String(item.id) === String(id))
      if (!item) return

      if (item.cantidad > 1) {
        item.cantidad -= 1
        this.guardarEnStorage()
      } else {
        this.eliminarDelCarrito(id)
      }
    },

    /**
     * Elimina un producto específico del carrito por su ID.
     * @param {string|number} id - Identificador del producto
     */
    eliminarDelCarrito(id) {
      this.items = this.items.filter(item => String(item.id) !== String(id))
      this.guardarEnStorage()
    },

    /**
     * Vacia todos los productos del carrito.
     */
    vaciarCarrito() {
      this.items = []
      this.guardarEnStorage()
    }
  }
})
