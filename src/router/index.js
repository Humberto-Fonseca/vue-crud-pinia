import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ProductosView from '../views/ProductosView.vue'
import CrearProductoView from '../views/CrearProductoView.vue'
import EditarProductoView from '../views/EditarProductoView.vue'
import CarritoView from '../views/CarritoView.vue'
import { useProductosStore } from '../stores/productosStore.js'

/**
 * Configuración del Vue Router
 * NOTA TÉCNICA: Se utiliza createWebHashHistory (modo hash con #)
 * para garantizar la compatibilidad con GitHub Pages y evitar errores 404
 * al recargar rutas profundas en servidores estáticos sin reescritura de URLs.
 */
const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/productos',
    name: 'productos',
    component: ProductosView
  },
  /**
   * REGLA CRÍTICA DE ENRUTAMIENTO:
   * Declaramos '/productos/crear' ANTES de '/productos/:id'.
   * De lo contrario, Vue Router evaluaría 'crear' como un parámetro :id.
   */
  {
    path: '/productos/crear',
    name: 'crear-producto',
    component: CrearProductoView
  },
  {
    path: '/productos/:id',
    name: 'editar-producto',
    component: EditarProductoView,
    props: true,
    // Guardia de navegación para validar que el producto exista en el store
    beforeEnter: (to, from, next) => {
      const productosStore = useProductosStore()
      const existe = productosStore.productoPorId(to.params.id)
      if (!existe) {
        alert(`Aviso: El producto con ID ${to.params.id} no existe en el catálogo.`)
        next({ name: 'productos' })
      } else {
        next()
      }
    }
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CarritoView
  },
  // Redirección ante rutas no coincidentes
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
