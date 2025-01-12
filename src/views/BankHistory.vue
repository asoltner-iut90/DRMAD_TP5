
<template>
  <div class="bank-history">
    <h2><slot name="title">Operations passées</slot></h2>
    <input type="checkbox" name="filter-checkbox" v-model="filter" />
    <label for="filter-checkbox">Filtrer par période</label>
    <div v-if="filter">
      <label for="filter-date-from">Du</label>
      <input type="date" name="filter-date-from" v-model="from"/>
      <label for="filter-date-to">Au</label>
      <input type="date" name="filter-date-to" v-model="to"/>
    </div>

    <DataTable>

    </DataTable>

  </div>
</template>

<script>
  import DataTable from "@/components/DataTable.vue";

  export default {
    name: "BankHistory",
    components: {DataTable},
    data() {
      return {
        filter: false,
        from:"",
        to:"",
      }
    }
  }
</script>

<style scoped>

</style>