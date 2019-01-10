<template>
  <div class="container" style="margin-top:20px;">
        <b-table  responsive
                  :fixed="fixed"
                  :hover="hover"
                  :items="items" 
                  :fields="fields1"
                  @row-hovered="myRowClickHandler"
                  >
            <template slot="nameage" slot-scope="data">
              {{data.item.name}} ({{data.item.age}})
            </template>
            <span slot="comment" slot-scope="data" v-html="data.value">     
            </span>
              <template slot="action" slot-scope="props">
                <b-button v-if="props.value >= 119" :disabled="true" class="btn btn-primary btn-sm btn-addold"  v-on:click="updateAgePerson(props)">+1</b-button>
                <b-button v-else :disabled="false" class="btn btn-primary btn-sm btn-addold"  v-on:click="updateAgePerson(props)">+1</b-button>
                <b-button v-if="props.value <= 15" :disabled="true" class="btn btn-primary btn-sm"  v-on:click="updateAgePersonSub(props)">-1</b-button>
                <b-button v-else :disabled="false" class="btn btn-primary btn-sm"  v-on:click="updateAgePersonSub(props)">-1</b-button>
                <b-button b-btn v-b-modal.modalPrevent size="sm" v-on:click="info(props.item, props.index)" class="mr-1">{{$t('table.button.delete')}}</b-button>
              </template>
        </b-table>
        <p v-if="isProcessing">Loading...</p>
    <div class="row justify-content-md-left">
        <div class="col-6 col-sm-12 col-md-6" style="text-align: right;">
          <b-button :disabled= isDisabled variant="secondary" size="sm" v-on:click="morePerson($event)">{{$t('button.more')}}</b-button>
        </div>
    </div>
     <!--Modal-->
    <b-modal id="modalPrevent"
             ref="modal"
             title="Submit your name"
             @ok="handleOk(modalInfo.content,$event)">
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>
  </div>
</template>

<script lang='ts'>
import { PersonService } from '@/services/PersonService';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FormResponse } from '@/models/http/FormResponse';
import { MyHttpResponse } from '@/models/http/Response';
import index from '@/store';
import i18n from '@/i18n';

@Component
export default class ListTableComponent extends Vue {

  // modal begin
  public modalInfo = { title: "", content: "" };

  public resetModal() {
    this.modalInfo.title = "";
    this.modalInfo.content = "";
  }

  public info(item: any, index: any) {
    this.modalInfo.title = `Row index: ${index}`;
    this.modalInfo.content = item;
    this.$root.$emit("bv::show::modal", "modalInfo");
    }

     public handleOk (data:any, evt:any) {
      // Prevent modal from closing
      evt.preventDefault()
       console.log(`${data}`)
       //this.deletePerson(parseInt(data.id));
    }
  // End modal

  // get item cho table
  get items() {
    // Lấy page hiện tai
    this.currentPage = this.$store.state.listTable.currentPage;

    // Lấy id nhỏ nhất trong table
    this.idMin = this.$store.state.listTable.idMin;

     // Lấy max page
    this.maxPage = this.$store.state.listTable.totalPage;

    // Lấy data cho table
    return this.$store.state.listTable.items;
  }
  // setting trạng thái cho state
  get isProcessing() {
    return this.$store.state.listTable.isProcessing;
  }

  // Init đối tượng service
  public personService = new PersonService();

  // Trạng thái state
  public saveStatue: boolean | null = null;

  public saveMessage: string = '';
  
  // Setting header table
  public fields1 = [
                    { key: 'nameage', label: i18n.messages.ja.header.name_age },
                    { key: 'comment' ,label: i18n.messages.ja.header.comment },
                    { key: 'action' ,label: i18n.messages.ja.header.action , class: 'colum-age'}
                    ];
  // Setting table lúc hover vào rows
  private hover = true;

  // Auto fix  reponsive
  private fixed = true;

  // Trang hiên tai
  private currentPage = 0;

  // Id Min nhỏ nhất
  private idMin = 0;

  // số lượng page tối đa
  private maxPage = 0;

  // Chỉ số của row chọn
  private index = 0;

  // Trạng thái của button
  private isDisabled = false;

  public myRowClickHandler(recor   :any, index  :any) {
    this.index =index; // This will be the item data for the row
  }

  // Init table => dổ dữ liệu vào table
  public mounted() {
     this.$store.dispatch('init');
  }

  // Method update age+ with id
  public updateAgePerson(data  :any) {
    this.$store.dispatch('updateAge' ,[data.item.id ,data.index]);
  }

  // Method update age- with id
  public updateAgePersonSub(data  :any) {
    this.$store.dispatch('updateAgeSub' ,[data.item.id ,data.index]);
  }

  // Method delete person with id
  public deletePerson(data  :any) {
    this.$store.dispatch('deletePerson' ,[data.item.id ,data.index]);
  }

  // get more data with id ang page
  public morePerson(event : any){
    event.preventDefault()
    if((this.currentPage +1) <= this.maxPage)
    {
       this.isDisabled = false;
       this.$store.dispatch('morePerson',[this.currentPage + 1,this.idMin]);
    }else{
       this.isDisabled = true;
    }
  }
}
</script>
<style lang="scss">
  table{
    text-align: center;
  }
  .btn-secondary {
    margin-right: 20px;
}
.btn-addold{
  margin-left: 30px;
}

@media (min-width: 1200){
 .colum-age{
  width: 15%;
}
.action{
  width: 15%;
}
}
</style>

