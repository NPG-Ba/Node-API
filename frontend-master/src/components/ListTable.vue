<template>
  <div class="container" style="margin-top:10px;">
     <loading :active.sync="isOverlayLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage">
    </loading>
    <p style="font-style:italic">{{$t('common.table.page.showing')}} {{this.currentPage}} {{$t('common.table.page.of')}} {{this.maxPage}} {{$t('common.table.page.page')}}</p>
    <b-table responsive :fixed="fixed"  :hover="hover" :items="items" :fields="fields1">
      <template slot="nameage" slot-scope="data">{{data.item.name}} ({{data.item.age}})</template>
      <pre slot="comment" slot-scope="data" v-html="data.value"></pre>
      <template slot="action" slot-scope="props">
        <b-button :disabled="(props.item.age >= 150)" size="sm" class="btn btn-primary btn-sm btn-addold" @click="upAge(props)" >+1</b-button>
        <b-button :disabled="(props.item.age <= 15)" size="sm" class="btn btn-primary btn-sm" @click="downAge(props)">-1</b-button>
        <b-button b-btn v-b-modal.modalPrevent  size="sm"  v-on:click="info(props.item, props.index)"  class="mr-1 btn btn-danger">{{$t('common.table.button.delete')}}</b-button>
      </template>
    </b-table>
    <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-5" style="text-align: right">
          <b-button  :disabled="isDisabled" style="margin-right: -10px;" size="sm" class="btn btn-warning" v-show="!isMore"  v-on:click="morePerson($event)" >{{$t('common.button.more')}}</b-button>
        </div>
      </div>
    <!--Modal-->
    <b-modal id="modalPrevent" size="lg" no-fade centered ref="modal"  v-bind:ok-title="$t('common.dialog.oke')" v-bind:title="$t('common.dialog.title_del')" v-bind:cancel-title="$t('common.dialog.cancel')"  @ok="handleOk(modalInfo.content,$event,modalInfo.title)"> 
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">{{$t('common.form.input.name')}}</th>
              <th scope="col">{{$t('common.form.input.age')}}</th>
              <th style="max-height: 500px; display: inline-block; overflow: auto;" scope="col">{{$t('common.form.input.comment')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ modalInfo.content.name }}</td>
              <td>{{ modalInfo.content.age }}</td>
              <td>{{ modalInfo.content.comment }}</td>
            </tr>
          </tbody>
        </table>
    </b-modal>
  </div>
</template>
<script lang='ts'>
import { PersonService } from "@/services/PersonService";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormResponse } from "@/models/http/FormResponse";
import { MyHttpResponse } from "@/models/http/Response";
import { AppConf } from "@/config/AppConfig";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import index from "@/store";
import i18n from "@/i18n";
const Loading:any = require('vue-loading-overlay');
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import { LoadingConfig } from '@/config/LoadingConfig';

@Component({
  components: { PulseLoader,Loading}
})
export default class ListTableComponent extends Vue {

  @State(state => state.listTable.isMore) public isMore?: boolean;
  /* Init  service */
  public personService = new PersonService();

  /* Modal begin */
  public modalInfo = { title: AppConf.Empty.toString(), content: AppConf.Empty.toString() };
 /* Setting table hover on rows */
  private hover = true;

  /* Auto fix  reponsive table */
  private fixed = true;

  /* Page Current */
  private currentPage = 0;

  /* Id Min  */
  private idMin = 1;

  /* Total page */
  private maxPage = 0;

  /* Status button */
  private isDisabled = false;

  /* Status state*/
  public saveStatue: boolean | null = null;

  public saveMessage: string = AppConf.Empty;

// Loading
  private fullPage = true
  private isOverlayLoading = false

  public resetModal() {
    this.$root.$emit(AppConf.hiddenModal.toString(), "modalInfo");
  }

  public info(item: any, index: any) {
    this.modalInfo.title = `${index}`;
    this.modalInfo.content = item;
    /* Show modal */
    this.$root.$emit(AppConf.showModal.toString(), "modalInfo");
  }

  public handleOk(data: any, evt: any, index: any) {
    /* Delete */
    this.isOverlayLoading = true;
    this.$store.dispatch("deletePerson", [data.id, parseInt(index)]);
    this.TimeOutLoading(LoadingConfig.TimeOut_Slow)
    /* Hide modal */
    this.$root.$emit(AppConf.hiddenModal.toString(), "modalInfo");
  }
  /* End modal */

  /* Get item table */
  get items() {
    /* Get page current */

    this.currentPage = this.$store.state.listTable.currentPage;

    /* get Min ID */
    this.idMin = this.$store.state.listTable.idMin;
 
    /* Get max page */
    this.maxPage = this.$store.state.listTable.totalPage;

    /* Get data table */
    return this.$store.state.listTable.items;
  }
  /* Setting state  loading*/
  get isProcessing() {
    return this.$store.state.listTable.isProcessing;
  }

  /* Setting header table */
  public fields1 = [
    { key: AppConf.Age_Name.toString(), label: AppConf.Empty.toString() },
    { key: AppConf.Comment.toString(), label: AppConf.Empty.toString() },
    { key: AppConf.Action.toString(), label: AppConf.Empty.toString(), class: "colum-age" }
  ];

  /* Init table  */
  public mounted() {
    this.isOverlayLoading = true;
    this.$store.dispatch("init");
    this.TimeOutLoading(LoadingConfig.TimeOut_Slow)
  }

  /* Method update age+ with id */
  public upAge(data: any) {
    this.isOverlayLoading = true;
    this.$store.dispatch("upAge", [data.item.id, data.index,]);
    this.TimeOutLoading(LoadingConfig.TimeOut_Slow)
  }

  /* Method update age- with id */
  public downAge(data: any) {
    this.isOverlayLoading = true;
    this.$store.dispatch("downAge", [data.item.id, data.index]);
    this.TimeOutLoading(LoadingConfig.TimeOut_Slow)
  }

  /* Get more data with id ang page */
  public morePerson(event: any) {
    this.isOverlayLoading = true;
    event.preventDefault();
    this.$store.dispatch("morePerson", this.idMin);
    this.TimeOutLoading(LoadingConfig.TimeOut_Slow)
  }
  private onCancel() {
    console.log('User cancelled the loader.')
  }
  private TimeOutLoading(Time :number){
    setTimeout(() => {
      this.isOverlayLoading = false
    },Time)
  }
}
</script>


