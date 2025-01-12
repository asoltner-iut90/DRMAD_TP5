<template>
  <div class="bank-view">
    <!-- Barre de navigation en haut -->
    <NavBar :links="navLinks">
      <template #nav-button="{ label }">
        <button>{{ label }}</button>
      </template>
    </NavBar>

    <div class="main-content">
      <!-- Menu vertical à gauche -->
      <VerticalMenu :items="menuItems">
        <!-- Scoped slot pour les titres -->
        <template #menu-title="{ label }">
          <p class="menu-title">{{ label }}</p>
        </template>
        <template v-slot:menu-link="{ label }">
          <button class="menu-button" :disabled="!currentAccount">{{ label }}</button>
        </template>
      </VerticalMenu>

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
import VerticalMenu from "@/components/VerticalMenu.vue";
import {mapState} from "vuex";

export default {
  name: "BankView",
  components: {
    NavBar,
    VerticalMenu,
  },
  computed: {
    ...mapState("bank", ["currentAccount"]),
  },
  data() {
    return {
      // Liens de la barre de navigation
      navLinks: [
        { label: "Mon compte", to: "/bank/account" },
      ],
      // Items du menu vertical
      menuItems: [
        { type: "title", label: "Opérations" },
        { type: "link", label: "Solde", to: "/bank/amount" },
        { type: "link", label: "Débit/Virement", to: "/bank/operation" },
        { type: "title", label: "États" },
        { type: "link", label: "Historique", to: "/bank/history" },
      ],
    };
  },
};
</script>

<style scoped>
.bank-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

VerticalMenu {
  width: 20%;
  border-right: 1px solid #ccc;
  padding: 10px;
}

.content {
  flex: 1;
  padding: 20px;
}

.menu-title {
  font-weight: bold;
  text-decoration: underline;
  margin: 10px 0;
}
</style>
