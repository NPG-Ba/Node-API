import { Store, ActionTree, ActionContext } from 'vuex';
import { PersonFormState } from './PersonFormState';
import { Person } from '@/models/Person';
import { PersonService } from '@/services/PersonService';
import { MyHttpResponse } from '@/models/http/Response';

export function save(store: ActionContext<PersonFormState, any>,
                     formData: Person) {
    store.commit('setProcessing', true);
    return new PersonService().save(formData)
    .then((resp) => {
        // Thêm mới thành công thì sẽ làm TODO
        store.commit('add', resp.data.data);
    })
    .finally(() => {
        store.commit('setProcessing', false);
    });
}
export function updateAge(store: ActionContext<PersonFormState, any>, params?: any) {
        // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
        return new PersonService().up(params).then((resp) => {
            // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
            store.commit('agePerson', params[1]);
        }).finally(() => {
            console.log('Delete susccess !');
        });
}
export function deletePerson(store: ActionContext<PersonFormState, any>, params?: any) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
    return new PersonService().delete(params).then((resp) => {
        // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
        store.commit('deletePerson', params[1]);
    }).finally(() => {
        console.log('Delete susccess !');
    });
}
export default {
    save,
    updateAge,
    deletePerson,
} as ActionTree<PersonFormState, any>;
