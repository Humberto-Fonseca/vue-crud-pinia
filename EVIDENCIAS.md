# Documento Guía para el PDF de Evidencias
**Proyecto:** SPA con Vue 3, Pinia y Vue Router — CRUD de Productos y Carrito de Compras  
**Estudiante:** Humberto Fonseca  
**Repositorio GitHub:** [https://github.com/Humberto-Fonseca/vue-crud-pinia](https://github.com/Humberto-Fonseca/vue-crud-pinia)  
**Sitio en Producción (GitHub Pages):** [https://humberto-fonseca.github.io/vue-crud-pinia/](https://humberto-fonseca.github.io/vue-crud-pinia/)  

> **Nota para la maquetación del PDF:** Cada página del reporte contendrá como máximo **una captura grande y legible** acompañada de su respectiva ficha técnica y justificación en primera persona.

---

## 1. Cumple: Repositorio en GitHub (código y commits)

- **Archivos y líneas de código a capturar:**
  - Salida de la terminal: comando `git log --oneline` mostrando los 12 commits progresivos en español y comando `git status` limpio en la rama `main`.
- **Pantalla / ruta a capturar y estado:**
  - Página principal del repositorio en GitHub (`https://github.com/Humberto-Fonseca/vue-crud-pinia`), mostrando la rama `main`, la estructura de archivos del proyecto y el historial con los 12 commits.
- **Distribución de capturas para el PDF:**
  - 1 captura de código/consola (terminal con `git log --oneline`).
  - 1 captura de interfaz (interfaz web de GitHub con el repositorio público y commits).
- **Justificación:**
  He inicializado el repositorio de control de versiones con Git configurando la rama principal como `main` y vinculándolo al remoto oficial de GitHub. Para garantizar una trazabilidad profesional y académica del desarrollo, realicé 12 commits atómicos y ordenados cronológicamente con mensajes descriptivos en español, cubriendo desde la inicialización de Vite, Router y Pinia, hasta la integración de estilos y flujos de automatización CI/CD.
  
  Todo el árbol de trabajo se encuentra limpio y sincronizado con el repositorio remoto, asegurando que el código fuente completo esté respaldado y disponible para revisión académica y auditoría de cambios.

---

## 2. Cumple: Publicación en GitHub Pages

- **Archivos y líneas de código a capturar:**
  - `vite.config.js`, líneas 5-14 (definición de `base: '/vue-crud-pinia/'`).
  - `.github/workflows/deploy.yml`, líneas 1-49 (configuración del pipeline de GitHub Actions con Node 20, permisos de Pages, `upload-pages-artifact` y `deploy-pages`).
- **Pantalla / ruta a capturar y estado:**
  - Navegador web cargando la URL pública en producción `https://humberto-fonseca.github.io/vue-crud-pinia/`, mostrando la vista de Inicio con todos los recursos (CSS, JS, iconos) cargando con código HTTP 200 sin errores 404 en la consola DevTools.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`vite.config.js` y `.github/workflows/deploy.yml`).
  - 1 captura de interfaz (sitio web en vivo en GitHub Pages con DevTools visible).
- **Justificación:**
  He configurado el despliegue automatizado hacia GitHub Pages estableciendo la propiedad `base: '/vue-crud-pinia/'` en la configuración de Vite, lo cual asegura que las referencias relativas a scripts y hojas de estilo resuelvan correctamente bajo el subdirectorio del repositorio. Asimismo, diseñé un workflow de integración y despliegue continuo (CI/CD) en GitHub Actions que compila la aplicación con Node.js 20 ante cada push a la rama `main`.
  
  La aplicación se encuentra publicada y plenamente funcional en la nube, permitiendo navegar entre vistas y persistir información de manera estática y sin necesidad de un servidor backend dedicado.

---

## 3. Cumple: Navegación con Vue Router (5 rutas)

- **Archivos y líneas de código a capturar:**
  - `src/router/index.js`, líneas 1-70 (definición de `createWebHashHistory`, el arreglo de rutas con las 5 vistas requeridas, declaración prioritaria de `/productos/crear` antes de `/productos/:id`, y la guardia de navegación `beforeEnter`).
- **Pantalla / ruta a capturar y estado:**
  - Barra de direcciones del navegador en modo hash navegando hacia una de las vistas (ej. `/#/productos/crear`), o intentando acceder a una ruta inexistente como `/#/productos/999` evidenciando la alerta emergente y la redirección automática hacia `/#/productos`.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/router/index.js`).
  - 1 captura de interfaz (navegador con la URL en modo hash y/o mensaje de redirección de guardia).
- **Justificación:**
  He configurado Vue Router utilizando `createWebHashHistory()` en lugar del historial HTML5 convencional, garantizando que al recargar páginas o acceder a rutas profundas en servidores estáticos como GitHub Pages no se produzcan errores 404. El enrutador declara las 5 vistas solicitadas: `/` (Inicio), `/productos` (Catálogo), `/productos/crear` (Alta), `/productos/:id` (Edición) y `/carrito` (Resumen).
  
  Para prevenir colisiones de enrutamiento, declaré la ruta estática `/productos/crear` antes del parámetro dinámico `/productos/:id`. Adicionalmente, implementé una guardia de navegación `beforeEnter` en la ruta de edición que consulta al store y, si el ID del producto no existe, notifica al usuario mediante un aviso y lo redirige de inmediato al catálogo.

---

## 4. Cumple: Pinia: store de productos

- **Archivos y líneas de código a capturar:**
  - `src/stores/productosStore.js`, líneas 46-70 (estado inicial con 5 productos y persistencia en `localStorage`, getters `totalProductos` y `productoPorId`) y líneas 86-163 (acciones `agregarProducto`, `actualizarProducto` y `eliminarProducto`).
- **Pantalla / ruta a capturar y estado:**
  - Pestaña de Pinia en las herramientas de desarrollo (Vue DevTools) o panel de Almacenamiento local (Application > Local Storage en el navegador), mostrando la clave `productos_catalogo` con los 5 productos predeterminados cargados con sus respectivos IDs, nombres, precios y descripciones.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/stores/productosStore.js`).
  - 1 captura de interfaz (Vue DevTools inspeccionando el estado reactivo del store `productos`).
- **Justificación:**
  He implementado el store centralizado `useProductosStore` con el identificador `'productos'` mediante `defineStore` de Pinia. Su estado reactivo inicializa con 5 artículos muestra dotados de identificadores únicos y se sincroniza automáticamente con el `localStorage` del navegador mediante serialización JSON nativa, garantizando persistencia sin librerías externas.
  
  El store expone getters calculados como `totalProductos` y la función buscadora `productoPorId(id)`, además de concentrar todas las acciones de mutación: `agregarProducto` (con validación de campos y generación de ID por timestamp), `actualizarProducto` y `eliminarProducto`.

---

## 5. Cumple: Pinia: store del carrito

- **Archivos y líneas de código a capturar:**
  - `src/stores/carritoStore.js`, líneas 8-38 (state reactivo `items` con persistencia en `localStorage`, getters `totalItems`, `totalAcumulado`, `estaVacio`) y líneas 53-109 (acciones `agregarAlCarrito`, `decrementarCantidad`, `eliminarDelCarrito` y `vaciarCarrito`).
- **Pantalla / ruta a capturar y estado:**
  - Herramienta Vue DevTools mostrando el store `carrito` con 2 o más productos agregados, reflejando reactivamente la cantidad de cada uno, el cálculo del `totalAcumulado` y `totalItems`.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/stores/carritoStore.js`).
  - 1 captura de interfaz (Vue DevTools con el store `carrito` abierto y sus getters calculados).
- **Justificación:**
  He creado el store `useCarritoStore` bajo el ID `'carrito'` en Pinia para administrar el estado global de compras. Cada elemento del carrito preserva el ID original, nombre, precio unitario y cantidad adquirida, persistiendo dichos datos en la clave `carrito_items` de `localStorage` para tolerar recargas de página.
  
  Diseñé getters computados que calculan de manera reactiva el total de artículos (`totalItems`), el monto monetario a pagar (`totalAcumulado`) y una bandera booleana (`estaVacio`). Sus acciones permiten incorporar productos incrementando cantidades existentes, disminuirlas, eliminar un artículo en particular o vaciar la totalidad del carrito con un solo llamado.

---

## 6. Cumple: Lógica de datos concentrada en los stores

- **Archivos y líneas de código a capturar:**
  - `src/stores/productosStore.js`, líneas 154-162 (acción `eliminarProducto` que limpia el producto del catálogo y luego invoca `carritoStore.eliminarDelCarrito(id)`).
  - `src/views/CrearProductoView.vue`, líneas 18-28 (el componente solo despacha `productosStore.agregarProducto(datosProducto)` y gestiona la navegación con `router.push`).
- **Pantalla / ruta a capturar y estado:**
  - Vista del carrito y catálogo tras haber eliminado un producto desde la vista de productos: evidenciar cómo el producto desapareció del catálogo y simultáneamente el contador del carrito y el monto total se ajustaron sin requerir código duplicado en los componentes.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`productosStore.js` y `CrearProductoView.vue`).
  - 1 captura de interfaz (catálogo de productos reflejando la actualización del estado tras invocar la acción del store).
- **Justificación:**
  He respetado estrictamente el principio de arquitectura desacoplada: ningún componente Vue altera, muta o manipula directamente las propiedades del estado global. Toda la validación de negocio, asignación de identificadores, cálculos matemáticos y sincronización con el almacenamiento local reside exclusivamente en los stores de Pinia.
  
  Los componentes se limitan a leer el estado a través de getters y emitir llamadas a las acciones correspondientes. Como prueba de esta integración, al ejecutar la acción `eliminarProducto` en `productosStore`, esta consume internamente `useCarritoStore()` para remover el artículo también del carrito de compras, manteniendo la integridad referencial de los datos de manera transparente.

---

## 7. Cumple: Uso de directivas de Vue

- **Archivos y líneas de código a capturar:**
  - `src/views/ProductosView.vue`, líneas 83-86 (`v-show="mostrarNotificacion"`), líneas 88-95 (`v-if="productosStore.totalProductos > 0"` y `v-for="producto in productosStore.productos" :key="producto.id"`), líneas 99 (`v-bind`), líneas 113, 122, 131 (`@click`).
  - `src/components/ProductoForm.vue`, líneas 93 (`@submit.prevent`), 98-138 (`v-model` en nombre, precio y descripción) y 106-128 (`v-if` para mensajes de validación).
- **Pantalla / ruta a capturar y estado:**
  - Vista `/#/productos` en el momento exacto en que se presiona "🛒 Al carrito", mostrando en la parte superior el mensaje flotante azul generado mediante la directiva `v-show` ("¡Producto agregado al carrito con éxito!") y las tarjetas renderizadas mediante `v-for`.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/views/ProductosView.vue` con comentarios explícitos de directivas).
  - 1 captura de interfaz (notificación temporal visible en pantalla activada con `v-show`).
- **Justificación:**
  He implementado de forma clara y comentada las directivas centrales del ecosistema Vue 3. La directiva `v-for` se encarga de renderizar la lista de productos y elementos del carrito asociando siempre una clave única obligatoria (`:key="item.id"`), evitando el uso de índices. Se utilizaron `v-if` y `v-else` para gestionar el renderizado condicional de mensajes de error y estados vacíos.
  
  Asimismo, apliqué `v-model` para el enlace bidireccional reactivo en los formularios, `v-bind` (`:`) para enlazar atributos dinámicos como clases CSS de error, y `v-on` (`@click`, `@submit.prevent`) para interceptar eventos de usuario. Finalmente, integré `v-show` para gobernar la visibilidad de una notificación flotante temporal que confirma las operaciones sin desmontar el elemento del DOM.

---

## 8. Cumple: Menú de navegación con router-link

- **Archivos y líneas de código a capturar:**
  - `src/App.vue`, líneas 24-46 (barra de navegación `<nav class="nav-links">` con `<router-link>` hacia Inicio, Productos, Crear producto y Carrito, con `active-class="active-link"`, y badge reactivo con `v-if`).
- **Pantalla / ruta a capturar y estado:**
  - Barra de navegación superior fija en la ruta `/#/productos`, mostrando el enlace "Productos" resaltado en color azul distintivo (`active-link`), y el enlace "🛒 Carrito" mostrando la insignia roja con el número de artículos agregados (por ejemplo, con valor "2").
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/App.vue`).
  - 1 captura de interfaz (navbar superior mostrando el enlace activo resaltado y el badge del carrito).
- **Justificación:**
  He construido una barra de navegación fija y responsiva en el componente raíz `App.vue` utilizando exclusivamente etiquetas `<router-link>`, evitando el uso de etiquetas `<a href>` y previniendo recargas innecesarias del navegador para preservar la naturaleza de Single Page Application (SPA).
  
  La barra incorpora estilos reactivos a través de la propiedad `active-class="active-link"`, destacando visualmente la sección activa en la que se encuentra el usuario. Además, se enlaza directamente con el store del carrito para renderizar una insignia numérica dinámica (`cart-badge`) que refleja en tiempo real la cantidad acumulada de productos.

---

## 9. Cumple: Lista de productos (nombre, precio, editar, eliminar, agregar al carrito)

- **Archivos y líneas de código a capturar:**
  - `src/views/ProductosView.vue`, líneas 91-137 (plantilla de la tarjeta con nombre, precio formateado con `$`, descripción, botones de acción con `@click`) y líneas 34-58 (funciones de componente `agregarAlCarrito` y `confirmarEliminacion`).
- **Pantalla / ruta a capturar y estado:**
  - Vista `/#/productos` completa, mostrando las tarjetas de los artículos en formato cuadrícula responsiva, cada una con su nombre, precio destacado en verde, descripción y los tres botones: "✏️ Editar", "🗑️ Eliminar" y "🛒 Al carrito".
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/views/ProductosView.vue`).
  - 1 captura de interfaz (catálogo completo de productos con sus tarjetas y botones de acción).
- **Justificación:**
  He diseñado la vista `ProductosView.vue` para presentar el inventario disponible de manera ordenada mediante tarjetas visuales adaptables. Cada tarjeta exhibe con claridad el nombre del producto, su precio formateado con dos decimales, una insignia distintiva y su descripción detallada.
  
  Cada elemento cuenta con tres botones de acción fundamentales: "Editar" (que redirige mediante Vue Router a la vista de edición correspondiente al ID del producto), "Eliminar" (que solicita confirmación interactiva al usuario con `window.confirm()` antes de despachar la acción del store) y "Al carrito" (que suma el artículo al estado global de compras y activa una alerta visual).

---

## 10. Cumple: Formulario para crear producto

- **Archivos y líneas de código a capturar:**
  - `src/views/CrearProductoView.vue`, líneas 1-38 (vista contenedora que consume el formulario y gestiona el evento `@guardar`).
  - `src/components/ProductoForm.vue`, líneas 50-70 (función de validación `validarFormulario`) y líneas 93-162 (campos con `v-model`, mensajes de error condicionales con `v-if` y botón submit).
- **Pantalla / ruta a capturar y estado:**
  - Vista `/#/productos/crear` con el formulario de alta en pantalla, mostrando los mensajes de validación en color rojo ("⚠️ El nombre del producto es obligatorio." y "⚠️ El precio debe ser un número mayor a 0.") tras haber intentado presionar el botón de crear sin llenar los campos.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/components/ProductoForm.vue` y `src/views/CrearProductoView.vue`).
  - 1 captura de interfaz (formulario de creación mostrando las alertas de validación activas).
- **Justificación:**
  He implementado la vista `CrearProductoView.vue` apoyándome en el componente reutilizable `ProductoForm.vue`. El formulario vincula bidireccionalmente los campos de nombre, precio y descripción a un estado reactivo mediante `v-model` e intercepta el envío con `@submit.prevent="handleSubmit"`.
  
  Antes de procesar la solicitud, el componente ejecuta una validación estricta que comprueba que el nombre no contenga únicamente espacios en blanco y que el valor numérico del precio sea estrictamente superior a cero, proyectando advertencias visuales con `v-if`. Al ser válido, emite los datos hacia la vista padre, la cual invoca `productosStore.agregarProducto()` y redirige automáticamente hacia el catálogo.

---

## 11. Cumple: Formulario para editar producto

- **Archivos y líneas de código a capturar:**
  - `src/views/EditarProductoView.vue`, líneas 1-52 (lectura de `route.params.id`, cómputo del producto actual mediante `productoPorId`, verificación en `onMounted` y despacho a `actualizarProducto`).
- **Pantalla / ruta a capturar y estado:**
  - Vista `/#/productos/1` mostrando el título "Modificar Producto #1" y el formulario pre-cargado con los datos del artículo existente (ej. "Laptop Gamer ASUS ROG", precio "1299.99" y descripción), junto al botón "💾 Guardar Cambios".
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/views/EditarProductoView.vue`).
  - 1 captura de interfaz (formulario de edición pre-cargado con los datos actuales del producto).
- **Justificación:**
  He estructurado la vista `EditarProductoView.vue` para permitir la modificación de cualquier producto existente. La vista extrae el parámetro dinámico `:id` de la ruta y recupera la información actual invocando al getter `productoPorId` del store de productos, inyectando dichos datos al formulario reutilizable mediante la prop reactiva `:producto-inicial`.
  
  Si el usuario intenta ingresar manualmente un identificador que no existe en el catálogo, el ciclo de vida `onMounted` y la guardia del router disparan un aviso y devuelven al usuario a `/productos`. Al completar la edición y pulsar "Guardar Cambios", se invoca la acción `actualizarProducto` del store y se retorna de inmediato al listado actualizado.

---

## 12. Cumple: Vista del carrito (lista, precios, total, eliminar, vaciar)

- **Archivos y líneas de código a capturar:**
  - `src/views/CarritoView.vue`, líneas 58-150 (cabecera con botón de vaciar condicional, tabla responsiva iterada con `v-for`, controles de cantidad `+` y `-`, subtotal por fila, botón de eliminar `✕` y tarjeta resumen con total acumulado a pagar).
- **Pantalla / ruta a capturar y estado:**
  - Vista `/#/carrito` con al menos dos productos cargados (ej. 2 unidades de Laptop y 1 unidad de Auriculares), mostrando la tabla con sus cantidades, precios unitarios, subtotales, la tarjeta con el "Total a pagar: $2949.48" y el botón "🗑️ Vaciar Carrito".
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/views/CarritoView.vue`).
  - 1 captura de interfaz (tabla detallada del carrito con múltiples productos y total acumulado).
- **Justificación:**
  He desarrollado la vista `CarritoView.vue` ofreciendo una experiencia de compra completa. Si el carrito contiene artículos, presenta una tabla organizada con el nombre del producto, precio unitario, botones interactivos `+` y `-` para modificar la cantidad sobre la marcha, subtotal calculado por fila y un botón individual de eliminación (`✕`).
  
  En el lateral inferior derecho se despliega una tarjeta de resumen que exhibe la sumatoria global de unidades y el monto monetario total acumulado a pagar. Asimismo, la vista incorpora el botón "Vaciar Carrito" con confirmación previa y, en caso de no contener productos, conmuta automáticamente mediante `v-else` a una vista de carrito vacío con acceso directo para retornar al catálogo.

---

## 13. Cumple: Estilos legibles y ordenados

- **Archivos y líneas de código a capturar:**
  - `src/style.css`, líneas 1-62 (definición del sistema de diseño en `:root` con paleta de colores, tipografía sans-serif de sistema, reseteo de márgenes y reglas responsivas en `@media (max-width: 768px)`).
- **Pantalla / ruta a capturar y estado:**
  - Vista del catálogo de productos o carrito tanto en vista de escritorio como en vista móvil reducida (modo dispositivo móvil en DevTools a 375px o 768px), demostrando cómo los elementos se reorganizan en una sola columna legible sin desbordamientos horizontales.
- **Distribución de capturas para el PDF:**
  - 1 captura de código (`src/style.css`).
  - 1 captura de interfaz (vista responsiva en dispositivo móvil o tableta).
- **Justificación:**
  He diseñado una interfaz limpia, moderna y estética empleando exclusivamente CSS puro sin necesidad de bibliotecas o dependencias externas pesadas. El archivo `style.css` establece variables globales en `:root` para asegurar coherencia visual en tonalidades primarias, estados de éxito, advertencia, peligro y fondos de superficie.
  
  El diseño utiliza un modelo de caja consistente (`box-sizing: border-box`), tipografías nativas de alta legibilidad y una disposición flexible mediante CSS Grid y Flexbox. Gracias a las media queries implementadas, todos los componentes, botones, tablas y formularios se adaptan de forma fluida a pantallas de teléfonos móviles, tabletas y monitores de escritorio.

---

### Resumen General de Capturas para el PDF

| Sección | Capturas de Código | Capturas de Interfaz | Total Páginas Estimadas |
| :--- | :---: | :---: | :---: |
| 1. Repositorio en GitHub | 1 | 1 | 2 |
| 2. Publicación en GitHub Pages | 1 | 1 | 2 |
| 3. Navegación con Vue Router | 1 | 1 | 2 |
| 4. Pinia: store de productos | 1 | 1 | 2 |
| 5. Pinia: store del carrito | 1 | 1 | 2 |
| 6. Lógica de datos en stores | 1 | 1 | 2 |
| 7. Uso de directivas de Vue | 1 | 1 | 2 |
| 8. Menú con router-link | 1 | 1 | 2 |
| 9. Lista de productos | 1 | 1 | 2 |
| 10. Formulario para crear producto | 1 | 1 | 2 |
| 11. Formulario para editar producto | 1 | 1 | 2 |
| 12. Vista del carrito | 1 | 1 | 2 |
| 13. Estilos legibles y ordenados | 1 | 1 | 2 |
| **Totales** | **13 capturas** | **13 capturas** | **26 páginas** |
