<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div id="app-wrapper">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <FooterBar />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #1B3A6B;
  --primary-dark: #0D1F3C;
  --accent: #E8A020;
  --accent-hover: #c9881a;
  --light: #F5F7FA;
  --white: #ffffff;
  --text: #1a1a2e;
  --text-muted: #5a6a80;
  --border: #dce3ed;
  --shadow: 0 4px 20px rgba(27, 58, 107, 0.12);
}

body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: var(--white);
  color: var(--text);
  line-height: 1.6;
  display: block;
  min-height: 100vh;
}

#app {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}

#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
}
</style>
