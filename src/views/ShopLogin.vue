<template>
  <div class="login-container">
    <h1>Login</h1>
    <div class="input-group">
      <label for="login">Login</label>
      <input id="login" v-model="login" type="text" />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" />
    </div>
    <button @click="logIn({login, password})">Login</button>
    <p v-if="shopUser">{{ shopUser }}</p>
    <p v-if="loginError" class="error">{{ loginError }}</p>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import router from "@/router";

export default {
  name: 'ShopLoginView',
  data: () => ({
    login: '',
    password:'',
    error: ''
  }),
  computed: {
    ...mapState("shop",['shopUser', "loginError"])
  },
  methods: {
    ...mapActions("shop",['shopLogin']),
    logIn(params){
      this.shopLogin(params);
      if(this.shopUser){
        router.push("/shop/buy");
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #EFF1F3;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #223843;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #223843;
}

input {
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #DBD3D8;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #D77A61;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #D8B4A0;
}

.error {
  color: #D77A61;
  font-size: 0.9rem;
  text-align: center;
}
</style>