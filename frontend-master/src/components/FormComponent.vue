<template>
  <div>
    <loading :active.sync="isOverlayLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage">
    </loading>
    <br>
    <br>
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
          <b-form-textarea id="textarea1" v-model="comment" name="comment" :rows="3" :max-rows="6"></b-form-textarea>
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
    <b-modal id="modalsm" size="lg" no-fade centered v-bind:ok-title="$t('common.dialog.oke')" v-bind:cancel-title="$t('common.dialog.cancel')"
      @hidden="handleHidden()"
      v-bind:title="$t('common.dialog.title_confirm')"
      @ok="handleOk()">
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
              <td>{{this.name}}</td>
              <td>{{this.age }}</td>
              <td>{{this.comment }}</td>
            </tr>
          </tbody>
        </table>
      </b-modal>
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
import { LoadingConfig } from "@/config/LoadingConfig";
import { Security } from "@/unit/Security";
const Loading:any = require('vue-loading-overlay');
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from "axios";
import { __values } from "tslib";
import { isNumber } from "util";
const namespace: string = "personForm";

@Component({
  components: { ValidationObserver,Loading}
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
// Loading
  private fullPage = true
  private isOverlayLoading = false

  get name() {
    return this.$store.state.personForm.form.name;
  }
  set name(val: string) {
    this.$store.commit("setName", val);
  }
  public handleHidden() {
    // cancel modal
  }
  // Ok modal
  public handleOk() {
    this.isOverlayLoading = true;
    this.savePerson();
    this.TimeOutLoading(LoadingConfig.TimeOut_Normal)
  }
  /* Save person */
  public savePerson() {
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
 // Loading  
 private TimeOutLoading(Time :number) {
      setTimeout(() => {
       this.isOverlayLoading = false
      },Time)
  }
  private onCancel() {
    console.log('User cancelled the loader.')
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
}
</script>