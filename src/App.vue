<script setup>
// Componente raíz de la aplicación
</script>

<template>
  <div id="app-container">
    <header>
      <h1>Proyecto Vue 3 - CRUD & Carrito</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
