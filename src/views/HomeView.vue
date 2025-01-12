<template>
  <div class="home">
    Bienvenue chez Dr Mad
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  background-color: #EFF1F3; /* Fond clair */
  color: #223843; /* Texte sombre */
  font-size: 2rem;
  text-align: center;
  padding: 5rem;
  border-radius: 8px;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.home:hover {
  background-color: #DBD3D8; /* Fond légèrement gris clair au survol */
}
</style>

