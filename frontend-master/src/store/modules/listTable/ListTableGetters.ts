import { Getter, GetterTree } from 'vuex';
import { ListTableState } from './ListTableState';

/** Should remove, because we can not change directly properties on form state */
export function getItems(state: ListTableState) {
    return state.items;
}
export function getCurrentPage(state: ListTableState) {
    return state.currentPage;
}

export function getTotalPage(state: ListTableState) {
    return state.totalPage;
}

export function isTableProcessing(state: ListTableState) {
    return state.isProcessing;
}
export function getIdMin(state: ListTableState) {
    return state.idMin;
}
export default {
    getItems,
    isTableProcessing,
    getTotalPage,
    getCurrentPage,
    getIdMin,
} as GetterTree<ListTableState, any>;
