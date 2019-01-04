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
        store.dispatch('search');
    })
    .finally(() => {
        store.commit('setProcessing', false);
    });
}
export function updateAge(store: ActionContext<PersonFormState, any>, age: number) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
}
export default {
    save,
    updateAge,
} as ActionTree<PersonFormState, any>;
