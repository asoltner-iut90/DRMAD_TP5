<template>
  <div class="shop-view">
    <NavBar :links="navLinks">
      <template v-slot:button-Logout>
        <button @click="handleLogout" class="logout-button">
          Logout
        </button>
      </template>
    </NavBar>

    <h1 class="shop-title">Boutique</h1>
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
          { label: "Logout", to: "/shop/login", action: this.handleLogout},
        ];
      } else {
        return [{ label: "Login", to: "/shop/login" }];
      }
    },
  },
  methods: {
    ...mapActions('shop', ['shopLogout']),
    async handleLogout() {
      await this.shopLogout();
      this.$router.push("/shop/login").catch(() => {});
    },
  },
};
</script>

<style scoped>
.shop-view {
  font-family: 'Arial', sans-serif;
  background-color: #EFF1F3;
  color: #223843;
}

.shop-title {
  color: #D77A61;
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
}

.logout-button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
}

.logout-button:hover {
  color: #D77A61;
}
</style>