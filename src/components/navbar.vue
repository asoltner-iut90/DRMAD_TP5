<template>
  <div class="navbar">
    <button
        v-for="(link, index) in links"
        :key="index"
        @click="goTo(link.to)"
        class="navbar-button">
      <slot :name="'button-'.concat(link.label)" :label="link.label">{{ link.label }}</slot>
    </button>
  </div>
</template>

<script>


export default {
  name: 'NavBar',
  methods: {
    goTo(path){
      this.$router.push(path).catch(()=>{});
    }
  },
  props: { links: Array },


}
</script>

<template>
  <div class="navbar">
    <button
        v-for="(link, index) in links"
        :key="index"
        @click="goTo(link.to)"
        class="navbar-button">
      <slot :name="'button-'.concat(link.label)" :label="link.label">{{ link.label }}</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    goTo(path) {
      this.$router.push(path).catch(() => {});
    }
  },
  props: {
    links: Array
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  background-color: #223843; /* Fond principal bleu foncé */
  padding: 12px 24px;
  border-radius: 8px; /* Bords arrondis pour un look doux */
}

.navbar-button {
  background-color: transparent;
  border: 2px solid #EFF1F3; /* Bordure claire pour contraste */
  color: #EFF1F3; /* Texte clair */
  font-size: 16px;
  cursor: pointer;
  margin: 0 18px;
  padding: 10px 22px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  border-radius: 5px; /* Bords arrondis */
}

.navbar-button:hover {
  background-color: #DBD3D8; /* Couleur de fond au survol (gris clair) */
  color: #223843; /* Texte bleu foncé au survol */
  border-color: #D77A61; /* Bordure orange clair au survol */
}

.navbar-button:focus {
  outline: none; /* Pas de contour au focus */
}
</style>