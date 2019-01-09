import Vue from 'vue';
import Vuex from 'vuex';
import { PersonFormModule } from './modules/person/PersonFormModule';
import { ListTableModule } from './modules/listTable/ListTableModule';
import { state, mutations, actions } from './lang/mutations'
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        personForm: new PersonFormModule(),
        listTable: new ListTableModule(),
    },
});
