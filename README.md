# Tienda Vue 3 — CRUD de Productos y Carrito de Compras con Pinia

Proyecto académico de una Single Page Application (SPA) desarrollada con **Vue 3**, que implementa un sistema CRUD (Crear, Leer, Actualizar y Eliminar) de productos y un carrito de compras interactivo con persistencia local, navegación con **Vue Router** en modo hash y gestión de estado centralizada con **Pinia**.

- **URL de Producción (GitHub Pages):** [https://humberto-fonseca.github.io/vue-crud-pinia/](https://humberto-fonseca.github.io/vue-crud-pinia/)
- **Autor / Estudiante:** Humberto Fonseca ([@Humberto-Fonseca](https://github.com/Humberto-Fonseca))
- **Repositorio:** [https://github.com/Humberto-Fonseca/vue-crud-pinia.git](https://github.com/Humberto-Fonseca/vue-crud-pinia.git)

---

## 🚀 Tecnologías Utilizadas

- **[Vue 3](https://vuejs.org/)** (v3.5+) — Framework reactivo progresivo usando **Composition API** y sintaxis `<script setup>`.
- **[Vite](https://vitejs.dev/)** (v6+) — Herramienta de construcción y entorno de desarrollo ultra-rápido.
- **[Pinia](https://pinia.vuejs.org/)** (v2+) — Store oficial de estado global para Vue (stores: `productos` y `carrito`).
- **[Vue Router](https://router.vuejs.org/)** (v4+) — Enrutador SPA configurado con `createWebHashHistory` para compatibilidad completa con GitHub Pages.
- **HTML5 & CSS3 puro** — Diseño responsivo y moderno sin frameworks CSS externos ni dependencias pesadas.
- **GitHub Actions** — Pipeline CI/CD automatizado para compilar y desplegar en GitHub Pages al hacer push a la rama `main`.

---

## 📁 Estructura del Proyecto

```text
vue-crud-pinia/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Flujo de CI/CD para GitHub Pages (Node 20 + Vite build)
├── public/
│   └── vite.svg                # Favicon e isotipo de la aplicación
├── src/
│   ├── components/
│   │   └── ProductoForm.vue    # Formulario reutilizable (Crear / Editar) con validación reactiva
│   ├── router/
│   │   └── index.js            # Enrutamiento con createWebHashHistory y guardias de validación
│   ├── stores/
│   │   ├── productosStore.js   # Estado global del catálogo: CRUD, validaciones y persistencia
│   │   └── carritoStore.js     # Estado global del carrito: totales acumulados, cantidades y vaciado
│   ├── views/
│   │   ├── InicioView.vue         # Ruta '/': Bienvenida, métricas y resumen del sistema
│   │   ├── ProductosView.vue      # Ruta '/productos': Catálogo, eliminar, editar y añadir al carrito
│   │   ├── CrearProductoView.vue  # Ruta '/productos/crear': Formulario de alta
│   │   ├── EditarProductoView.vue # Ruta '/productos/:id': Formulario de edición con precarga
│   │   └── CarritoView.vue        # Ruta '/carrito': Resumen del pedido, cantidades y vaciado
│   ├── App.vue                 # Componente raíz: Navegación fija con router-link y badge del carrito
│   ├── main.js                 # Punto de entrada de la aplicación: registro de Pinia y Router
│   └── style.css               # Estilos globales y variables de diseño responsivo
├── index.html                  # Plantilla HTML base
├── package.json                # Dependencias y scripts de ejecución
├── vite.config.js              # Configuración de base path (/vue-crud-pinia/) y alias
└── README.md                   # Documentación completa del proyecto
```

---

## 🛠️ Rutas y Navegación SPA

El proyecto implementa navegación libre de recargas con `createWebHashHistory()` para evitar errores 404 en GitHub Pages:

| Ruta | Componente | Descripción |
| :--- | :--- | :--- |
| `/#/` | `InicioView.vue` | Vista de bienvenida con estadísticas en tiempo real y accesos rápidos. |
| `/#/productos` | `ProductosView.vue` | Listado completo de productos con opciones de editar, eliminar y agregar al carrito. |
| `/#/productos/crear` | `CrearProductoView.vue` | Formulario para dar de alta un nuevo producto. *(Declarada antes de :id para evitar colisiones de ruta)*. |
| `/#/productos/:id` | `EditarProductoView.vue` | Formulario de modificación pre-cargado. Incluye guardia de navegación que redirige si el ID no existe. |
| `/#/carrito` | `CarritoView.vue` | Resumen de compra con subtotales, total acumulado, ajuste de cantidades y vaciado. |

---

## 🧠 Arquitectura de Estado Global (Pinia)

Toda la lógica de manipulación y mutación de datos está encapsulada estrictamente en los **Stores de Pinia**; los componentes únicamente consumen `state`/`getters` y disparan `actions`:

### 1. `productosStore.js` (Store `'productos'`)
- **State:** Lista reactiva de productos (`id`, `nombre`, `precio`, `descripcion`), inicializada con 5 productos muestra y sincronizada con `localStorage`.
- **Getters:**
  - `totalProductos`: Total de artículos registrados en el catálogo.
  - `productoPorId(id)`: Búsqueda dinámica de un producto por su clave única.
- **Actions:**
  - `agregarProducto(datos)`: Valida nombre no vacío, precio > 0, genera ID único y persiste en `localStorage`.
  - `actualizarProducto(id, datos)`: Valida y actualiza los campos del producto seleccionado.
  - `eliminarProducto(id)`: Retira el producto del catálogo y **lo elimina automáticamente del carrito de compras** para asegurar integridad referencial.

### 2. `carritoStore.js` (Store `'carrito'`)
- **State:** Lista de artículos en el carrito (`id`, `nombre`, `precio`, `cantidad`) sincronizada con `localStorage`.
- **Getters:**
  - `totalItems`: Suma total de unidades en el carrito.
  - `totalAcumulado`: Monto acumulado total (`Σ precio * cantidad`).
  - `estaVacio`: Booleano reactivo que indica si el carrito no tiene productos.
- **Actions:**
  - `agregarAlCarrito(producto)`: Si el producto ya existe incrementa la cantidad; si no, lo registra con cantidad 1.
  - `decrementarCantidad(id)`: Reduce la cantidad o lo remueve si llega a 0.
  - `eliminarDelCarrito(id)`: Elimina el ítem del carrito.
  - `vaciarCarrito()`: Limpia todos los artículos del carrito.

---

## 🏷️ Directivas de Vue 3 Empleadas

En los componentes y vistas se han aplicado y documentado las directivas fundamentales de Vue 3:

1. **`v-for`**: Renderizado de listas iterando productos y elementos del carrito, siempre utilizando `:key="item.id"` (nunca el índice del array).
2. **`v-if` / `v-else`**: Renderizado condicional según estado (por ejemplo, catálogo vacío vs. con productos, o carrito vacío con enlace alternativo).
3. **`v-model`**: Enlace bidireccional reactivo en campos de texto, números y áreas de descripción de formularios.
4. **`v-bind` (`:`)**: Enlace de atributos dinámicos (`:class`, `:key`, `:to`, `:disabled`).
5. **`v-on` (`@`)**: Captura de eventos del usuario (`@click`, `@submit.prevent`).
6. **`v-show`**: Mensaje flotante de notificación temporal tras agregar o modificar un producto (manteniendo el elemento en el DOM).

---

## 💻 Instrucciones para Ejecución Local

### Prerrequisitos
- **Node.js** v20 o superior
- **npm** v10 o superior

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Humberto-Fonseca/vue-crud-pinia.git
   cd vue-crud-pinia
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173/vue-crud-pinia/`

4. Probar la compilación para producción:
   ```bash
   npm run build
   ```

5. Previsualizar la compilación de producción:
   ```bash
   npm run preview
   ```

---

## ⚙️ Configuración para GitHub Pages

El proyecto incluye el archivo `.github/workflows/deploy.yml` configurado para GitHub Actions con Node.js 20 y `upload-pages-artifact`.

### Pasos Manuales en GitHub:
1. Dirígete a tu repositorio en GitHub: [https://github.com/Humberto-Fonseca/vue-crud-pinia](https://github.com/Humberto-Fonseca/vue-crud-pinia)
2. Ve a la pestaña **Settings** (Configuración) → **Pages**.
3. En la sección **Build and deployment** > **Source**, selecciona:
   - **`GitHub Actions`** (en lugar de `Deploy from a branch`).
4. Al hacer push a la rama `main`, la GitHub Action compilará y publicará el sitio automáticamente en:
   - `https://humberto-fonseca.github.io/vue-crud-pinia/`
