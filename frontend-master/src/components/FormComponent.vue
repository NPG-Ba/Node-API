<template>
  <div>
    <h1>Person Form</h1>
    <div
      class='alert'
      v-bind:class='{ "alert-success": saveStatue, "alert-warning": !saveStatue }'
      role='alert'
      v-show='saveStatue !== null'
    >{{saveMessage}}</div>
    <form @submit.prevent='onSubmit' autocomplete='false' name="form">
      <div class='form-group'>
        <label>Name</label>
        <input
          class='form-control'
          name='name'
          type='text'
          v-model='name'
          v-validate='{ required: true, max: 10 }'
          autocomplete='false'
        >
        <p v-if='errors.has("name")'>{{ errors.first("name") }}</p>
      </div>
      <b-form-group label='Age'>
        <b-input type='number' 
        v-model='age' 
       v-validate='{ required: true }'
       min='18'
       max='120'
        name='age'
        />
        <p v-if='errors.has("age")'>{{ errors.first('age') }}</p>
      </b-form-group>

       <b-form-group  label='Comment'>
                  <b-form-textarea id="textarea1"
                        v-model='comment'
                        placeholder="Enter something"
                        :rows="3"
                        :max-rows="6"
                        v-validate='"required"' name='comment'>
        </b-form-textarea>
        <p v-if='errors.has("comment")'>{{ errors.first("comment") }}</p>
      </b-form-group >
    
      	<div class="justify-content-center">
						<div class="col mt-2">
							 <b-button type='submit' :disabled='errors.any()' v-show='!isLoading'>Submit</b-button>
                  <button class='btn btn-primary' type='button' v-on:click="addEmp()" disabled v-show='isLoading'>
                    <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
                    Loading...
                  </button>
							  <b-button variant="danger" type='reset' value='Reset'>Cancel</b-button>
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

const namespace: string = 'personForm';

@Component({
  components: { ValidationObserver },
})
export default class FormComponent extends Vue {
  public foods = ['apple', 'orange'];
  public saveStatue: boolean | null = null;
  public saveMessage: string = '';
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
              this.saveStatue = true;
              this.saveMessage = 'Save success ' + success.id;
            },
            (error: MyHttpResponse) => {
              this.saveStatue = true;
              this.saveMessage = 'Save fail ' + error.error.code;
            },
          );
      }
    });
  }
}
</script>