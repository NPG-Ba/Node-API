import { Store, ActionTree, ActionContext } from 'vuex';
import { PersonFormState } from './PersonFormState';
import { Person } from '@/models/Person';
import { PersonService } from '@/services/PersonService';
import { MyHttpResponse } from '@/models/http/Response';
import index from '@/router';
import { Script } from 'vm';

export function save(store: ActionContext<PersonFormState, any>,
                     formData: Person) {
   store.commit('setProcessing', true);
    return new PersonService().save(formData)
    .then((resp) => {
        // Add new record
       if(resp.status===200)
       {
        reloadPerson(store)
       }
       if(resp.status === 501)
       {
           // Yêu cầu nhập lại dữ liệu
       }
    }).catch(e => {
        // Nếu sinh lỗi 
        index.push('/server-error')
    }).finally(()=>{
        store.commit('setProcessing', false);
    })
}
export function upAge(store: ActionContext<PersonFormState, any>, params?: any) {
        // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
        return new PersonService().up(params).then((resp) => {
            // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
            if(resp.status===200){
                store.commit('setTableUpAge', params[1]);
            }
            if(resp.status === 501)
               {
                   // Yêu cầu nhập lại dữ liệu
               }
        }).catch(e => {
            // Nếu sinh lỗi 
            index.push('/server-not-found')
        }).finally(()=>{
            console.log('upAge')
        })
}

export function downAge(store: ActionContext<PersonFormState, any>, params?: any) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
    return new PersonService().down(params).then((resp) => {
        // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
        if(resp.status===200){
            store.commit('setTableDownAge', params[1]);
        }
        if(resp.status===501){
             // Yêu cầu nhập lại dữ liệu
        }
    }).catch(e => {
        // Nếu sinh lỗi 
        index.push('/server-not-found')
    }).finally(()=>{
        console.log('dowAge')
    })
}


export function deletePerson(store: ActionContext<PersonFormState, any>, params?: any) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
    return new PersonService().delete(params).then((resp) => {
        // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
        if(resp.status===200){
            reloadPerson(store);
        }
        if(resp.status===501){
             // Yêu cầu nhập lại dữ liệu
        }
    }).catch(e => {
        // Nếu sinh lỗi 
        index.push('/server-not-found')
    }).finally(()=>{
        console.log('delete')
    })
}
export function reloadPerson(store: ActionContext<PersonFormState, any>){
    new PersonService().init('')
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
export default {
    save,
    upAge,
    downAge,
    deletePerson,
} as ActionTree<PersonFormState, any>;
