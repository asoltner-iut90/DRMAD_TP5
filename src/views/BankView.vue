<template>
  <div class="bank-view">
    <!-- Barre de navigation en haut -->
    <NavBar :links="navLinks">
      <template #nav-button="{ label }">
        <button>{{ label }}</button>
      </template>
    </NavBar>



      <!-- Affichage central des composants via router-view -->
      <div class="content">
        <router-view name="bankmain" />
      </div>
    </div>

</template>

<script>
import NavBar from "@/components/navbar.vue";
//import VerticalMenu from "@/components/VerticalMenu.vue";

export default {
  name: "BankView",
  components: {
    NavBar,
    //VerticalMenu,
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
