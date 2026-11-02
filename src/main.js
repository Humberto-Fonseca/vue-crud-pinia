import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Creación de la aplicación de Vue
const app = createApp(App)

// Configuración de Pinia para el estado global
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
