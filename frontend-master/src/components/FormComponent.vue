<template>
  <div>
    <div class="card vld-parent mb-3">
      <loading :active.sync="isLoadingOverlay" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :height="height"
        :width="width"
        :color="color"
        :background-color="bgColor"
        :is-full-page="fullPage">
      </loading>
    </div>
    <h3 style="text-align: left;margin-bottom: 20px;margin-top: 10px;">{{$t('common.form.title')}}</h3>
    <b-alert :show="dismissCountDown" dismissible variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged">{{$t('common.respons.200')}}</b-alert>
    <form @submit.prevent="onSubmit" v-if="show" autocomplete="false" name="form" @reset="onReset">
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('common.form.input.name')}}</label>
        <div class="col-sm-10">
          <b-form-input class="form-control col-sm-6" name="name" v-model="name" v-validate="{required: true, min:3, max:10, regex:/[^\p{L}\s_]+$/i }" autocomplete="false"></b-form-input>
          <p v-if="errors.has('name')" class="help is-danger">{{$t('common.form.messages.name_required')}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('common.form.input.age')}}</label>
        <div class="col-sm-10">
          <b-form-input class="form-control col-sm-6" type="number" v-model="age" v-validate="{regex:/(1[5-9]|[2-9][0-9]|1[0-4][0-9]|150)/i}" name="age"></b-form-input>
          <p v-if="errors.has('age')" class="help is-danger">{{$t('common.form.messages.age_required')}}</p>
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('common.form.input.comment')}}</label>
        <div class="col-sm-10">
          <b-form-textarea id="textarea1" v-model="comment" name="comment" :rows="2" :max-rows="4"></b-form-textarea>
        </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-5" style="text-align: right">
          <b-button v-b-modal.modalsm variant="primary" size="sm"
            :disabled="(this.name !='' && this.age >=15 && this.age<=150) ? false : true"
            style="margin-right:5px">{{$t('common.form.buttons.add')}}</b-button>
          <b-button style="margin-right: -10px;" size="sm" class="btn" type="reset"
            value="Reset">{{$t('common.form.buttons.cancel')}}</b-button>
        </div>
      </div>
    </form>
    <b-modal id="modalsm" size="sm" v-bind:ok-title="$t('common.dialog.oke')" v-bind:cancel-title="$t('common.dialog.cancel')"
      @hidden="handleHidden()"
      v-bind:title="$t('common.dialog.title_confirm')"
      @ok="handleOk()"></b-modal>
    <hr>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { ValidationObserver } from "vee-validate";
import { State, Getter, Action, Mutation } from "vuex-class";
import { PersonFormState } from "@/store/modules/person/PersonFormState";
import { Person } from "@/models/Person";
import { MyHttpResponse } from "@/models/http/Response";
import { FormResponse } from "@/models/http/FormResponse";
import { AppConf } from "@/config/AppConfig";
//import { LoadingConfig } from "@/config/LoadingConfig";
import { Security } from "@/unit/Security";
import axios from "axios";
import { __values } from "tslib";
import { isNumber } from "util";
const namespace: string = "personForm";
    // Import component
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

@Component({
  components: { ValidationObserver, Loading}
})
export default class FormComponent extends Vue {
  public show = true;
  @State(state => state.personForm.isProcessing) public isLoading?: boolean;
  /*  Form person*/
  public age: number = 0;
  public comment: string = AppConf.Empty;

  /* Alert */
  private dismissSecs = parseInt(AppConf.DismissSecs.toString());
  private dismissCountDown = 0;

  get name() {
    return this.$store.state.personForm.form.name;
  }
  set name(val: string) {
    this.$store.commit("setName", val);
  }
  //public show = false
  public label= 'Loading...'
  public handleHidden() {
    this.name = AppConf.Empty;
    this.age = 0;
    this.comment = AppConf.Empty;
    this.$validator.reset();
  }
  public handleOk() {
    this.loadingOverlay();
  }
  /* Submit  form */
  public onSubmit() {
    this.$validator.validateAll().then(result => {
      if (result) {
        this.$store
          .dispatch(
            "save",
            new Person(
              this.name,
              this.age || 15,
              new Security().escapeOutput(this.comment)
            )
          )
          .then(
            (success: FormResponse) => {
              this.name = AppConf.Empty;
              this.age = 0;
              this.comment = AppConf.Empty;
              this.$validator.reset();
            },
            (error: MyHttpResponse) => {}
          )
          .finally(() => {
            this.dismissCountDown = this.dismissSecs;
          });
      }
    });
  }
  /* Reset form */
  public onReset(evt: any) {
    evt.preventDefault();
    /* Reset our form values */
    this.name = AppConf.Empty;
    this.age = 0;
    this.comment = AppConf.Empty;
    /* Trick to reset/clear native browser form validation state */
    this.$validator.reset();
    this.$nextTick(() => {
      this.show = true;
    });
  }
  /* Alert */
  public countDownChanged(dismissCountDown: any) {
    this.dismissCountDown = dismissCountDown;
  }

  // Loading
    private isLoadingOverlay = false
    private fullPage= true
    private canCancel= false
    private useSlot= false
    private color= '#007bff'
    private bgColor= '#ffffff'
    private height= 60
    private width= 60
    private timeout= 1000//ms

  private loadingOverlay() {
      this.isLoadingOverlay = true;
        // call save
          this.onSubmit()
      setTimeout(() => {
        this.isLoadingOverlay = false
      },this.timeout)
  }
}
</script>