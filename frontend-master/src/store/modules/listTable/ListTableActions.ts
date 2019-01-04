import { Store, ActionTree, ActionContext } from 'vuex';
import { ListTableState } from './ListTableState';
import { PersonService } from '@/services/PersonService';

export function search(store: ActionContext<ListTableState, any>,
                       params?: any) {
    store.commit('setTableProcessing', true);
    return new PersonService().search(params)
        .then((resp) => {
            store.commit('prepend', resp.data.data);
        })
        .finally(() => {
            store.commit('setTableProcessing', false);
        });
}

export default {
    search,
} as ActionTree<ListTableState, any>;
