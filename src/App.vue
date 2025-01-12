<template>
  <div id="app" class="app-container">
    <NavBar :links="[{'label':'Boutique', 'to':'/Shop'}, {'label':'Banque', 'to':'/bank'}]">
      <template v-slot:button-Boutique="{ label }">
        <span class="nav-button-boutique">{{ label }}</span>
      </template>
      <template v-slot:button-Banque>
        <img src="@/assets/bank.png" alt="Logo" class="nav-logo" />
      </template>
    </NavBar>
    <router-view />
  </div>
</template>

<script>

import {mapActions} from 'vuex'
import NavBar from "@/components/navbar.vue";

export default {
  name: 'App',
  components: {NavBar},
  methods: {
    ...mapActions('shop',['getAllViruses'])
  },
  mounted() {
    this.getAllViruses();
  }
};
</script>

<style scoped>
.app-container {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #000000;
  margin: 0;
  padding: 0;
}

.nav-button-boutique {
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-button-boutique:hover {
  color: #D77A61;
}

.nav-logo {
  height: 30px;
  width: auto;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.1);
}
</style>