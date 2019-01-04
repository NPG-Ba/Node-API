<template>
  <div class="col-12">
    <b-table class="mt-4" :items="items" :fields="fields1">
      <template slot="Action" slot-scope="props">
        <b-button variant="primary" size="sm" class="mr-2" v-on:click="onClick(edititem(props))">+1</b-button>
        <b-button size="sm" class="mr-2" v-on:click="onClick(deleteitem(props))">Delete</b-button>
      </template>
    </b-table>
    <p v-if="isProcessing">Loading...</p>
  </div>
</template>


<script lang='ts'>
import { PersonService } from '@/services/PersonService';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListTableComponent extends Vue {
  public fields1 = ['name', 'age', 'comment', 'Action'];
  public personService = new PersonService();

  get items() {
    return this.$store.state.listTable.items;
  }

  get isProcessing() {
    return this.$store.state.listTable.isProcessing;
  }

  public mounted() {
    this.$store.dispatch('search');
  }
  public edititem(data:any){
    console.log(data.item.id);
  }
}
</script>
<style lang="scss">
  table{
    text-align: center;
  }
</style>

