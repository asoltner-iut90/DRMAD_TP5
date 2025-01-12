<template>
  <div class="vertical-menu">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <slot v-if="item.type ==='title'" name="menu-title" :label="item.label">{{ item.label }}</slot>
        <span v-else-if="item.type==='link'" @click="goTo(item.to)">
          <slot name="menu-link" :label="item.label">
            <button>{{ item.label }}</button>
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
        this.$router.push(path).catch(()=>{}) ;
      }
    },
    props: { items: Array },

  }
</script>

<style scoped>
.vertical-menu {
  background-color: #223843; /* Fond bleu foncé */
  width: 200px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.vertical-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vertical-menu li {
  margin-bottom: 16px;
}

.vertical-menu li:last-child {
  margin-bottom: 0;
}

.vertical-menu button {
  background-color: transparent;
  border: 2px solid #EFF1F3; /* Bordure claire */
  color: #EFF1F3; /* Texte clair */
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.vertical-menu button:hover {
  background-color: #DBD3D8; /* Fond gris clair au survol */
  color: #223843; /* Texte bleu foncé au survol */
  border-color: #D77A61; /* Bordure orange au survol */
}

.vertical-menu span {
  display: block;
}

.vertical-menu li[slot="menu-title"] {
  font-size: 18px;
  font-weight: bold;
  color: #DBD3D8; /* Gris clair pour le titre */
  margin-bottom: 12px;
}

.vertical-menu li[slot="menu-link"] button {
  font-size: 16px;
}
</style>