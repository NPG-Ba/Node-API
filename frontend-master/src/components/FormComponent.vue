<template>
  <div class="row justify-content-md-center">
    <div class="col-12 col-sm-6 col-md-8">
      <h1 style="text-align: center;">Person From </h1>
        <p class='alert'
              v-bind:class='{ "alert-success": saveStatue, "alert-warning": !saveStatue }'
              role='alert'
              v-show='saveStatue !== null'>
              {{saveMessage}}
        </p>
        <form @submit.prevent='onSubmit' 
                autocomplete='false' 
                name="form"
                @reset="onReset"
                v-if="show">
              <div class="row justify-content-md-left">
                <div class="col-6">
                <b-form-group label='Name'>
                  <b-input type='text'
                                name ='name'
                                v-model='name'
                                v-validate="{required: true,  regex:/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/i }"
                                autocomplete='false'
                    />
                  <p v-if='errors.has("name")'>{{ errors.first("name") }}</p>
                </b-form-group>
                <b-form-group label='Age'>
                  <b-input type='number' 
                                data-vv-name="age"
                                v-model='age' 
                                v-validate='{ required: true }'
                                min='18'
                                max='120'
                                name='age'
                    />
                  <p v-if='errors.has("age")'>{{ errors.first('age') }}</p>
                </b-form-group>
                </div>
              </div>
          <b-form-group  label='Comment'>
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
          </b-form-group >
          <div class="row justify-content-md-left">
                <div class="col-6 col-sm-12 col-md-6 col-xs-12" style="text-align: right;">
                  <b-button type='submit' :disabled='errors.any()' v-show='!isLoading'>Submit</b-button>
                      <button class="btn btn-warning" type='button' v-on:click="addEmp()" disabled v-show='isLoading'>
                        <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
                        Loading...
                      </button>
                    <b-button class="btn btn-danger" type='reset' value='Reset'>Cancel</b-button>
                </div>
            </div>
        </form>
      </div>
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

const namespace: string = 'personForm';

@Component({
  components: { ValidationObserver },
})
export default class FormComponent extends Vue {

  public saveStatue: boolean | null = null;
  public saveMessage: string = '';
  public show = true;

  @State((state) => state.personForm.isProcessing) public isLoading?: boolean;

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
  public onReset (evt :any) {
      evt.preventDefault();
      /* Reset our form values */
      this.name = '';
      this.age = 0;
      this.comment = '';
      /* Trick to reset/clear native browser form validation state */
       //this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
</script>
