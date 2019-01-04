/**
 * Using for synchronous action
 */
import { MutationTree } from 'vuex';
import { ListTableState } from './ListTableState';

export function prepend(state: ListTableState, items: any[]) {
    state.items = [];
    state.items = items.concat(state.items);
    // console.log(state.items[0].id);
}

export function append(state: ListTableState, items: any[]) {
    state.items = state.items.concat(items);
}

export function setTableProcessing(state: ListTableState, isLoading: boolean) {
    state.isProcessing = isLoading;
}
export default {
    prepend,
    append,
    setTableProcessing,
} as MutationTree<ListTableState>;
