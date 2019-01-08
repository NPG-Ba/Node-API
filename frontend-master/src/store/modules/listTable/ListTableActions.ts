import { Store, ActionTree, ActionContext } from 'vuex';
import { ListTableState } from './ListTableState';
import { PersonService } from '@/services/PersonService';

export function init(store: ActionContext<ListTableState, any>,
                       params?: any) {
    store.commit('setTableProcessing', true);
    return new PersonService().init(params)
        .then((resp) => {
            store.commit('append', resp.data.data);
            store.commit('setTotalPage',resp.data.pages);
            store.commit('setCurrentPage',1);
            store.commit('setIdMin', resp.data.data[resp.data.data.length-1].id);
        })
        .finally(() => {
            store.commit('setTableProcessing', false);
        });
}

export function morePerson(store: ActionContext<ListTableState, any>,
    params?: any) {

            store.commit('setTableProcessing', true);
            return new PersonService().more(params)
            .then((resp) => {
            store.commit('prepend', resp.data.data);
            store.commit('setTotalRows',resp.data.length);
            store.commit('setCurrentPage',params[0]);
            store.commit('setIdMin', resp.data.data[resp.data.data.length-1].id);
            })
            .finally(() => {
            store.commit('setTableProcessing', false);
            });
}

export default {
    init,
    morePerson
} as ActionTree<ListTableState, any>;
