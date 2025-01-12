<template>
  <div>
    <button v-for="(link, index) in links" :key="index" @click="goTo(link.to)">
      <slot :name="'button-'.concat(link.label)" :label="link.label" >{{link.label}}</slot>
    </button>
  </div>
</template>

<script>


export default {
  name: 'NavBar',
  methods: {
    goTo(path){
      this.$router.replace(path);
    }
  },
  props: { links: Array },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>