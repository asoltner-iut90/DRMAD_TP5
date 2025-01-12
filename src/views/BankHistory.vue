
<template>
  <div class="bank-history">
    <h2><slot name="title">Operations passées</slot></h2>
    <input type="checkbox" name="filter-checkbox" v-model="filter" />
    <label for="filter-checkbox">Filtrer par période</label>
    <div v-if="filter">
      <label for="filter-date-from">Du</label>
      <input type="date" name="filter-date-from" v-model="from" :max="to"/>
      <label for="filter-date-to">Au</label>
      <input type="date" name="filter-date-to" v-model="to" :min="from"/>
    </div>

    <DataTable :item-check="true" :headers="headers" :items="filtered" :item-button="true" :table-button="true" @itemClicked="showDetails" @tableClicked="showSelectedDetails">
      <template #item-button>
        Details
      </template>
      <template #table-button>
        Voir
      </template>
    </DataTable>

  </div>
</template>

<script>
  import DataTable from "@/components/DataTable.vue";
  import {mapActions, mapState} from "vuex";

  export default {
    name: "BankHistory",
    components: {DataTable},
    data() {
      return {
        filter: false,
        from:"",
        to:"",
        headers:[{"label":"Montant", "name":"amount"}, {"label":"date", "name":"formattedDate"}, {"label":"Source/Destinataire", "name":"direction"}],
      }
    },
    methods: {
      ...mapActions('bank', ['getAccountTransactions']),
      formattedDate(d) {
        const date = new Date(d);
        return date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
      },

      showSelectedDetails(transactions){
        let content = "";
        for(let transaction of transactions){
          content += transaction.uuid+"\n";
        }
        alert(content);
      },

      showDetails(transaction) {
        this.showSelectedDetails([transaction]);
      }

    },
    computed: {
      ...mapState('bank', ["accountTransactions", "currentAccount"]),

      filtered(){
        let result = [];
        for(let transaction of this.accountTransactions){
          result.push({amount:transaction.amount,
            date:transaction.date.$date,
            direction:transaction.amount < 0 ? 'S' : 'D',
            formattedDate: this.formattedDate(transaction.date.$date),
            uuid: transaction.uuid,
          });
        }
        if(this.filter){
            result = result.filter(transaction => {
              return (!this.from || transaction.date >= this.from) &&
                  (!this.to || transaction.date <= this.to);
            });
        }
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        return result;
      },
    },
    async mounted() {
      await this.getAccountTransactions(this.currentAccount.number);
    }
  }
</script>

<style scoped>

</style>