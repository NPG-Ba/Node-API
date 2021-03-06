import { Store, ActionTree, ActionContext } from 'vuex';
import { ListTableState } from './ListTableState';
import { PersonService } from '@/services/PersonService';
import index from '@/router';

export function init(store: ActionContext<ListTableState, any>,
    params?: any) {
    return new PersonService().init(params)
        .then((resp) => {
           if(resp.status ===200){
                if((parseInt(resp.data.pages) <=1)){
                    store.commit('setMore', true);
                }else{
                    store.commit('append', resp.data.data);
                    store.commit('setTotalPage', resp.data.pages);
                    store.commit('setCurrentPage', 1);
                    store.commit('setIdMin', resp.data.data[resp.data.data.length - 1].id);
                }
           }
           if(resp.status===204){
            // No data
           }
        }).catch(e => {
            // Redirect Url Error 500
            index.push('/server-error')
            
        }).finally(() => {
            store.commit('setProcessing', false);
        })
}
export function morePerson(store: ActionContext<ListTableState, any>,
    params?: any) {
    return new PersonService().more(params)
        .then((resp) => {
            if(resp.status === 200){
                store.commit('prepend', resp.data.data);
                store.commit('setCurrentPage', store.state.currentPage + 1);
                store.commit('setIdMin', resp.data.data[resp.data.data.length - 1].id);
                
                if(store.state.currentPage == store.state.totalPage)
                {
                    store.commit('setMore', true);
                }
            }
            if(resp.status===204){
                // No data
               }
        }).catch(e => {
            // Redirect Url Error 
            index.push('/server-error')
        }).finally(() => {
            store.commit('setProcessing', false);
        })
}
export default {
    init,
    morePerson,
} as ActionTree<ListTableState, any>;
