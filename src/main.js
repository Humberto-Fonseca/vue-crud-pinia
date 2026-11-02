import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'

// Creación de la instancia de la aplicación Vue
const app = createApp(App)

// Inicialización de Pinia (Estado Global)
const pinia = createPinia()
app.use(pinia)

// Inicialización de Vue Router (Navegación SPA)
app.use(router)

// Montaje de la aplicación en el elemento contenedor
app.mount('#app')
