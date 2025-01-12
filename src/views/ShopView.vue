<template>
  <div>
    <NavBar :links="navLinks">
      <template v-slot:button-Logout>
        <button style="background: none; border: none; color: red; cursor: pointer;">
          Logout
        </button>
      </template>
    </NavBar>

    <h1>Boutique</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/navbar.vue";

export default {
  name: "ShopView",
  components: { NavBar },
  computed: {
    ...mapState("shop", ["shopUser"]), // Récupération de shopUser depuis le module shop du store
    ...mapActions("shop", ["shopLogout"]), // Mutation pour déconnecter l'utilisateur
    isLoggedIn() {
      return this.shopUser !== null; // Vérifie si shopUser est non null
    },
    navLinks() {
      if (this.isLoggedIn) {
        return [
          { label: "Virus", to: "/shop/items" },
          { label: "Mes Commandes", to: "/shop/orders" },
          { label: "Acheter", to: "/shop/buy" },
          { label: "Payer", to: "/shop/pay" },
          { label: "Logout", to: "/shop/login" , action: this.handleLogout }, // Le slot personnalisera ce bouton
        ];
      } else {
        return [{ label: "Login", to: "/shop/login" }];
      }
    },
  },
  methods: {

    handleLogout() {
      this.shopLogout(); // Déconnexion via la mutation du store
    },
  },
};
</script>

<style scoped>
button {
  font-size: 16px;
}
</style>
