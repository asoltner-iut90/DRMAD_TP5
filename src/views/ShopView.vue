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
.shop-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f9; /* Couleur de fond douce */
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  text-align: center;
}

.shop-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.logout-button {
  background-color: transparent;
  border: none;
  color: #e74c3c;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-button:hover {
  color: #c0392b; /* Rouge plus foncé lors du survol */
}


.navbar {
  background-color: #3498db; /* Bleu pour la barre de navigation */
  padding: 10px 20px;
}

.navbar button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
  transition: color 0.3s ease;
}

.navbar button:hover {
  color: #2980b9; /* Couleur de survol */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

