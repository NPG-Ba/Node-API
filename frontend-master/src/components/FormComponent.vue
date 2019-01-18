<template>
  <div>
    <h2  style="text-align: left;margin-bottom: 30px;margin-top: 15px;">{{$t('form.title')}}</h2>
      <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        {{$t('message.save')}}
      </b-alert>
    <form @submit.prevent="onSubmit" v-if="show" autocomplete="false" name="form" @reset="onReset" @change="someHandler">
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('form.input.name')}}</label>
         <div class="col-sm-10">
        <b-form-input class="form-control col-sm-6" name="name" v-model="name" v-validate="{required: true, min:3, max:10, regex:/[^\p{L}\s_]+$/i }" data-vv-validate-on="change|custom" autocomplete="false"></b-form-input>
        <p v-if='errors.has("name")' class="help is-danger">{{$t('form.messages.name_required')}}</p>
         </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('form.input.age')}}</label>
         <div class="col-sm-10">
            <b-form-input class="form-control col-sm-6" data-vv-name="age" type="text" v-model="age" v-validate="'between:15,150'" name="age"></b-form-input>
            <p  v-if='errors.has("age")' class="help is-danger">{{$t('form.messages.age_required')}}</p>
         </div>
      </div>
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label">{{$t('form.input.comment')}}</label>
         <div class="col-sm-10">
        <b-form-textarea id="textarea1" v-model="comment" name="comment"  :rows="3" :max-rows="6"></b-form-textarea>
        <p v-if='errors.has("comment")' class="help is-danger">{{$t('form.messages.comment_required')}}</p>
         </div>
      </div>
      {{this.age}}
      <div class="form-group row">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-5" style="text-align: right">
           <b-button v-b-modal.modalsm variant="primary" style="margin-right:5px" :disabled="isAdd">{{$t('form.buttons.add')}}</b-button>
          <button class="btn btn-warning" type="button" v-on:click="addEmp()" disabled v-show="isLoading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          <b-button style="margin-right: -10px;" class="btn" type="reset" value="Reset">{{$t('form.buttons.cancel')}}</b-button>
        </div>
      </div>
    </form>
      <b-modal id="modalsm" size="sm" title="Bạn có muốn save!">
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
import axios from "axios";
import { __values } from "tslib";
import { isNumber } from 'util';
const namespace: string = "personForm";

@Component({
  components: { ValidationObserver }
})
export default class FormComponent extends Vue {
  public show = true;

  @State(state => state.personForm.isProcessing) public isLoading?: boolean;
  /*  Form */
  private isAdd = true;
  public age: number | null = null;
  public comment: string = "";
  get name() {
    return this.$store.state.personForm.form.name;
  }
  set name(val: string) {
    this.$store.commit("setName", val);
  }

  /* Alert */
    private dismissSecs = 2
    private  dismissCountDown = 0

 public someHandler(){
   this.$validator.validateAll().then(result => {
      if ((result) && (isNumber(this.age))) {
        this.isAdd = false;
      }
    });
    
 }
  /* Submit  form */
  public onSubmit() {

    this.$validator.validateAll().then(result => {
      if (result) {
        this.$store.dispatch("save",new Person(this.name,this.age || 15,this.escapeOutput(this.comment)))
          .then(
            (success: FormResponse) => {
              // reset id min */
              this.$store.state.listTable.idMin = this.$store.state.listTable.idMin + 1;
              this.name = "";
              this.age = 0;
              this.comment = "";
              this.$validator.reset();
            },
            (error: MyHttpResponse) => {
            }
          ).finally(()=>{
             this.dismissCountDown = this.dismissSecs
          });
      }
    });
    
  }
  /* Reset form */
  public onReset(evt: any) {
    evt.preventDefault();
    /* Reset our form values */
    this.name = "";
    this.age = 0;
    this.comment = "";
    /* Trick to reset/clear native browser form validation state */
    this.$validator.reset();
     this.$nextTick(() => {
      this.show = true;
    });
  }

  /* check XSS */
  public escapeOutput(toOutput: any) {
    return toOutput
      .replace(/\&/g, "&amp;")
      .replace(/\</g, "&lt;")
      .replace(/\>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/\'/g, "&#x27")
      .replace(/\//g, "&#x2F");
  }
  /* Alert */

  public countDownChanged (dismissCountDown :any) {
      this.dismissCountDown = dismissCountDown
    }
}
</script>
<style lang="scss">
.pre {
  font-size: 1rem !important;
}
.btn-primary {
  background-color: #007bff !important;
}
@media (min-width: 768px) {
  .input-small {
    width: 60% !important;
  }
}
label {
    font-weight: bold;
    /* font-size: 19px; */
}
.col-form-label {
    font-size: 21px  !important;
}
@media (min-width: 576px){
.col-sm-2 {
    -ms-flex: 0 0 16.666667%;
    -webkit-box-flex: 0;
    flex: 0 0 16.666667%;
    max-width: 11.666667% !important;
  }
}
.row {
    margin-right: -40px !important;
}
input:valid {
  border-color: green;
}
input:invalid {
  border-color: red;
}
</style>