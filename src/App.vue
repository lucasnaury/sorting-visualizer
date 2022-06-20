<script setup>
import Nav from './components/Nav.vue'
import Graph from './components/Graph.vue'
</script>

<template>
  <Nav />
  <div id="content">
    <Graph />
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

:root {
  --bg-color: #2C4251;
  --dark-color: #2A3D4A;

  --accent-color: #4DA7DB;
  --accent-color-light: #58AEDF;

  --graph-color: #5BC0BE;
  --graph-comparison-color: #FC6161;
  --graph-swap-color: rgb(237 155 59);
  --graph-sorted-color: rgb(59 237 127);
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}

* {
  color: white;
  font-family: 'Inter', 'Montserrat', sans-serif;
}





#content {
  width: 100vw;
  height: calc(100vh - 60px);
  display: grid;
  place-items: center;
}
</style>
