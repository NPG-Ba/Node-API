import { Getter, GetterTree } from 'vuex';
import { ListTableState } from './ListTableState';

/** Should remove, because we can not change directly properties on form state */
export function getItems(state: ListTableState) {
    return state.items;
}
export function isTableProcessing(state: ListTableState) {
    return state.isProcessing;
}
export default {
    getItems,
    isTableProcessing,
} as GetterTree<ListTableState, any>;
