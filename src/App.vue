<template>
  <main>
    <Calculator />
  </main>
</template>

<script setup lang="ts">
import Calculator from './components/Calculator.vue'
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
}
</style>
