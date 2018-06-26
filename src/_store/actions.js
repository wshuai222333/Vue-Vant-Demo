import Vue from 'vue'
import MutationType from "./mutation-type";
/**
 * actions 异步操作、多个commit时
 * 和mutations类似。不过actions支持异步操作。
 * 第一个参数默认是和store具有相同参数属性的对象。外部调用方式：store.dispatch('nameAsyn')。
 */
export default {
    nameAsyn: ({
        commit
    }, {
        age,
        name
    }) => {
        commit(MutationType.SET_NAME, name);
        commit(MutationType.SET_AGE, age);
    },
    sidebarListAsyn: ({
        commit
    }) => {
        Vue.http.get('/static/data/sidebarList.json').then(response => {
            if (
                response.data &&
                response.data != '' &&
                response.data != undefined
            ) {
                commit(MutationType.SET_SIDEBAR, response.data);
            }
        });
    },
    cardAsyn: ({
        commit
    }, cards) => {
        commit(MutationType.SET_CARD, cards);
    }
}