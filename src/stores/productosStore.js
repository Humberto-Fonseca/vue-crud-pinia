import { defineStore } from 'pinia'
import { useCarritoStore } from './carritoStore.js'

/**
 * Productos iniciales por defecto para el proyecto académico.
 * Cada producto cuenta con un ID único, nombre, precio y descripción.
 */
const PRODUCTOS_INICIALES = [
  {
    id: '1',
    nombre: 'Laptop Gamer ASUS ROG',
    precio: 1299.99,
    descripcion: 'Laptop de alto rendimiento con procesador AMD Ryzen 7 y tarjeta gráfica RTX 4060.'
  },
  {
    id: '2',
    nombre: 'Auriculares Sony WH-1000XM5',
    precio: 349.50,
    descripcion: 'Auriculares inalámbricos con cancelación de ruido activa de primer nivel.'
  },
  {
    id: '3',
    nombre: 'Teclado Mecánico Keychron K2',
    precio: 89.00,
    descripcion: 'Teclado inalámbrico compacto con interruptores mecánicos y luces RGB.'
  },
  {
    id: '4',
    nombre: 'Mouse Logitech MX Master 3S',
    precio: 99.99,
    descripcion: 'Mouse ergonómico para productividad con sensor óptico de alta precisión.'
  },
  {
    id: '5',
    nombre: 'Monitor Dell UltraSharp 27"',
    precio: 419.00,
    descripcion: 'Monitor profesional 4K UHD con panel IPS y excelente reproducción de color.'
  }
]

/**
 * Store de Pinia para Productos
 * Identificador único: 'productos'
 * Contiene toda la lógica de negocio CRUD para el catálogo de productos.
 */
export const useProductosStore = defineStore('productos', {
  state: () => {
    // Persistencia en localStorage: carga datos existentes o los valores iniciales
    const guardados = localStorage.getItem('productos_catalogo')
    return {
      productos: guardados ? JSON.parse(guardados) : [...PRODUCTOS_INICIALES]
    }
  },

  getters: {
    /**
     * Getter: Retorna el número total de productos registrados en el catálogo.
     */
    totalProductos: (state) => {
      return state.productos.length
    },

    /**
     * Getter dinámico: Retorna una función para buscar un producto por su ID.
     * @param {string|number} id - ID del producto a buscar
     * @returns {Object|undefined} Producto encontrado o undefined
     */
    productoPorId: (state) => {
      return (id) => state.productos.find((p) => String(p.id) === String(id))
    }
  },

  actions: {
    /**
     * Sincroniza la lista de productos con el almacenamiento del navegador (localStorage).
     */
    guardarEnStorage() {
      try {
        localStorage.setItem('productos_catalogo', JSON.stringify(this.productos))
      } catch (error) {
        console.error('Error al guardar productos en localStorage:', error)
      }
    },

    /**
     * Acción CRUD: Agregar nuevo producto al catálogo.
     * Valida que el nombre no esté vacío y el precio sea estrictamente mayor a 0.
     * Genera un identificador único basado en timestamp.
     * @param {Object} datos - { nombre, precio, descripcion }
     * @returns {Object} El producto creado
     */
    agregarProducto(datos) {
      const nombreLimpio = datos.nombre ? datos.nombre.trim() : ''
      const precioNumerico = Number(datos.precio)

      if (!nombreLimpio) {
        throw new Error('El nombre del producto no puede estar vacío.')
      }

      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        throw new Error('El precio del producto debe ser un número mayor a 0.')
      }

      const nuevoProducto = {
        id: Date.now().toString(),
        nombre: nombreLimpio,
        precio: precioNumerico,
        descripcion: datos.descripcion ? datos.descripcion.trim() : ''
      }

      this.productos.push(nuevoProducto)
      this.guardarEnStorage()
      return nuevoProducto
    },

    /**
     * Acción CRUD: Actualizar producto existente por su ID.
     * @param {string|number} id - Identificador del producto
     * @param {Object} datos - Nuevos datos { nombre, precio, descripcion }
     */
    actualizarProducto(id, datos) {
      const index = this.productos.findIndex((p) => String(p.id) === String(id))
      if (index === -1) {
        throw new Error(`Producto con ID ${id} no encontrado.`)
      }

      const nombreLimpio = datos.nombre ? datos.nombre.trim() : ''
      const precioNumerico = Number(datos.precio)

      if (!nombreLimpio) {
        throw new Error('El nombre del producto no puede estar vacío.')
      }

      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        throw new Error('El precio del producto debe ser un número mayor a 0.')
      }

      this.productos[index] = {
        id: String(id),
        nombre: nombreLimpio,
        precio: precioNumerico,
        descripcion: datos.descripcion ? datos.descripcion.trim() : ''
      }

      this.guardarEnStorage()
      return this.productos[index]
    },

    /**
     * Acción CRUD: Eliminar producto del catálogo.
     * REGLA DE NEGOCIO: Al eliminar un producto, también se retira del carrito de compras.
     * @param {string|number} id - Identificador del producto a eliminar
     */
    eliminarProducto(id) {
      // 1. Elimina del catálogo de productos
      this.productos = this.productos.filter((p) => String(p.id) !== String(id))
      this.guardarEnStorage()

      // 2. Elimina también del carrito de compras para mantener consistencia
      const carritoStore = useCarritoStore()
      carritoStore.eliminarDelCarrito(id)
    }
  }
})
