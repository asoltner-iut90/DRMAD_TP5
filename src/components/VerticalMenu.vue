<template>
  <div class="vertical-menu">
    <ul>
      <li v-for="(item, index) in items" :key="index" >
        <slot v-if="item.type ==='title'" name="menu-title" :label="item.label">{{item.label}}</slot>
        <span v-else-if="item.type==='link'" @click="goTo(item.to)">
          <slot name="menu-link" :label="item.label">
              <button>{{item.label}}</button>
          </slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'VerticalMenu',
    methods: {
      goTo(path){
        this.$router.push(path);
      }
    },
    props: { items: Array },

  }
</script>

<style scoped>

</style>