import MutationType from "./mutation-type";
/** 
 * mutations
 * 提交状态修改。也就是set、get中的set，这是vuex中唯一修改state的方式，但不支持异步操作。
 * 第一个参数默认是state。外部调用方式：store.commit('SET_AGE', 18)。和vue中的methods类似。
 */
export default {
    [MutationType.SET_NAME]: (state, name) => {
        state.name = name;
    },
    [MutationType.SET_AGE]: (state, age) => {
        state.age = age;
    },
    [MutationType.SET_SIDEBAR]: (state, list) => {
        state.sidebarList = list;
    },
    [MutationType.SET_CARD]: (state, cards) => {
        state.cards = cards;
    }
}