<template>
  <div id="app">
    <NavBar :links="[{'label':'Boutique', 'to':'/Shop'}, {'label':'Banque', 'to':'/bank'}]">
      <template v-slot:button-Boutique="{ label }">
        <span style="font-weight: bold;">{{ label }}</span>
      </template>
      <template v-slot:button-Banque>
        <img src="@/assets/bank.png" alt="Logo" style="height: 30px;" />
      </template>
    </NavBar>
    <router-view>

    </router-view>

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
