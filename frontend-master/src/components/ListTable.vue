<template>

  <div class="container" style="margin-top:20px;">
  <b-table  responsive
            :fixed="fixed"
            :hover="hover"
            :items="items" 
            :fields="fields1"
            :current-page="currentPage"
            :per-page="perPage"
            >
      <span slot="comment" slot-scope="data" v-html="data.value">     
      </span>
      <template slot="Action" slot-scope="props">
        <b-button style="margin-top: 5px;" variant="primary" size="sm" v-on:click="updateAgePerson(props)">+1</b-button>
        <b-button style="margin-left: 5px;margin-top: 5px;" size="sm" v-on:click="deletePersonById(props)">Delete</b-button>
      </template>
    </b-table>
    <p v-if="isProcessing">Loading...</p>
    <div class="more">
          <b-button  variant="secondary" size="sm" v-on:click="morePerson(currentPage,$event)">More</b-button>
    </div>
  </div>
</template>


<script lang='ts'>
import { PersonService } from '@/services/PersonService';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FormResponse } from '@/models/http/FormResponse';
import { MyHttpResponse } from '@/models/http/Response';
import index from '@/store';

@Component
export default class ListTableComponent extends Vue {
  private hover = true;
  private fixed = true;

  public saveStatue: boolean | null = null;
  
  public saveMessage: string = '';
  public fields1 = [{ key: 'name',label: 'Tên'},
                    { key: 'age',label: 'Tuổi'},
                    { key: 'comment',label: 'Comment'},
                    { key:'Action',label: 'Hành động'}
                    ];
   private currentPage= 1;
   private perPage= 5;
   private totalRows= this.fields1.length;
   
   private pageOptions = [ 5, 10, 15 ];
  public personService = new PersonService();

  get items() {
    console.log(this.totalRows);
    return this.$store.state.listTable.items;
  }

  get isProcessing() {
    return this.$store.state.listTable.isProcessing;
  }

  public mounted() {
    this.$store.dispatch('search',2);
  }
  public updateAgePerson(data:any){
    console.log(data.item.id);
  }

  public deletePersonById(data:any){
    let id = data.item.id;
    this.$store.dispatch('deletePerson',
                          {
                          id:id
                          }).then(
                                    (success: FormResponse) => {
                                    // gọi lại hàm load
                                    console.log('oke');
                                    },
                                    (error: MyHttpResponse) => {
                                      console.log('failed');
                                    },
                                  );
  }
  public morePerson(currentPage: any,event : any){
    event.preventDefault()
    console.log(currentPage);
  }
}
</script>
<style lang="scss">
  table{
    text-align: center;
  }
  .more {
    text-align: center;
  }
  .btn-secondary {
    margin-right: 20px;
}
</style>

