<template>
  <div>
    <NavBar :links="navLinks">
      <template v-slot:button-Logout>
        <button  @click="handleLogout" style="background: none; border: none; color: red; cursor: pointer;">
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
    ...mapState("shop", ["shopUser"]),
    isLoggedIn() {
      return this.shopUser !== null;
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
    ...mapActions('shop', ['shopLogout']),
    handleLogout() {
      this.shopLogout();
    },
  },
};
</script>

<style scoped>
button {
  font-size: 16px;
}
</style>
