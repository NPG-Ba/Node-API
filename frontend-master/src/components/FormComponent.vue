<template>
  <div>
    <h1 class="text-center mt-3">{{$t('form.title')}}</h1>
        <h5>{{$t('common.select_lang')}}</h5>
    <template>
      <b-button id="lang" v-on:click="setLangUS()"><flag iso="us" /></b-button>
      <b-button id="lang" v-on:click="setLangJP()"><flag iso="jp" /></b-button>
    </template>
    <div
      class='alert mt-3'
      v-bind:class='{ "alert-success": saveStatue, "alert-warning": !saveStatue }'
      role='alert'
      v-show='saveStatue !== null'
    >{{saveMessage}}</div>
    <form @submit.prevent='onSubmit' v-if="show" autocomplete='false' name="form" @reset="onReset">
    <div class="form-group mt-3">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">{{$t('form.input.name')}}</label>
		    <b-form-input 
        class='form-control input-small'
        name ='name'
                                v-model='name'
                                v-validate="{required: true,  regex:/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/i }"
                                autocomplete='false'></b-form-input>
        <p v-if='errors.has("name")'>{{ errors.first("name") }}</p>
    </div>
      <div class="form-group">
         <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">{{$t('form.input.age')}}</label>
            <b-form-input 
            class='form-control input-small'
              data-vv-name="age"
                                v-model='age' 
                                v-validate='{ required: true }'
                                min='15'
                                max='150'
                                name='age'>
            </b-form-input>
        <p v-if='errors.has("age")'>{{ errors.first('age') }}</p>
    </div>
<div class="form-group">
        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">{{$t('form.input.comment')}}</label>
            <b-form-textarea id="textarea1"
                         v-model='comment'
                              name='comment'
                              placeholder="Enter something"
                              :rows="3"
                              :max-rows="6"
                              v-validate="{ required: true,regex:/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/i }"
                        >
        </b-form-textarea>
        <p v-if='errors.has("comment")'>{{ errors.first("comment") }}</p>
    </div>

      	<div class="justify-content-center">
						<div class="col mt-2 text-center">
							 <b-button class="btn btn-primary" type='submit' :disabled='errors.any()' v-show='!isLoading'>{{$t('form.buttons.add')}}</b-button>
                 <button class="btn btn-warning" type='button' v-on:click="addEmp()" disabled v-show='isLoading'>
                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
                        Loading...
                      </button>
							   <b-button class="btn btn-danger" type='reset' value='Reset'>{{$t('form.buttons.cancel')}}</b-button>
						</div>
				</div>
        
    </form>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';
import { State, Getter, Action, Mutation } from 'vuex-class';
import { PersonFormState } from '@/store/modules/person/PersonFormState';
import { Person } from '@/models/Person';
import { MyHttpResponse } from '@/models/http/Response';
import { FormResponse } from '@/models/http/FormResponse';
import axios from 'axios';
import { __values } from 'tslib';

const namespace: string = 'personForm';

@Component({
  components: { ValidationObserver },
})
export default class FormComponent extends Vue {

  public saveStatue: boolean | null = null;
  public saveMessage: string = '';
  public show = true;

  @State((state) => state.personForm.isProcessing) public isLoading?: boolean;

  // Lang
  private selected = null
  private optionsLang = [
        { value: null, text: 'Please select an language' },
        { value: 'en', text: 'English' },
        { value: 'ja', text: 'Japan' }
      ]

  public age: number | null = null;
  public comment: string = '';

  get name() {
    return this.$store.state.personForm.form.name;
  }

  set name(val: string) {
    this.$store.commit('setName', val);
  }

  public onSubmit() {
    this.saveStatue = null;
    this.$validator.validateAll().then((result) => {
      if (result) {
        this.$store
          .dispatch('save', new Person(this.name, this.age || 0, this.comment))
          .then(
            (success: FormResponse) => {
              // reset lại id min
              this.saveStatue = true;
              this.saveMessage = 'Save success ';
              this.$store.state.listTable.idMin = this.$store.state.listTable.idMin + 1;
              this.name = '';
              this.age = 0;
              this.comment = '';
            },
            (error: MyHttpResponse) => {
              this.saveStatue = true;
              this.saveMessage = 'Save fail ';
            },
          );
      }
    });
  }
  public setLangJP(){
     this.$store.dispatch('changeLang' ,'ja');
  }
   public setLangUS(){
  this.$store.dispatch('changeLang' ,'en');
  }
  public onReset(evt: any) {
      evt.preventDefault();
      /* Reset our form values */
      this.name = '';
      this.age = 0;
      this.comment = '';
      /* Trick to reset/clear native browser form validation state */
       // this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }
</script>
<style lang="scss">
.pre{
  font-size: 1rem!important;
}
.btn-primary{
  background-color: #007bff!important;
}
@media (min-width: 768px){
  .input-small{
    width: 60%!important;
  }
}
#lang {
    color: #fff;
    background-color: white !important;
    border-color: #6c757d;
}
</style>