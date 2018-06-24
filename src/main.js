import Vue from 'vue';
import App from './App.vue';
import router from './router'


import {
    NavBar,
    Tabbar,
    TabbarItem,
    Tab,
    Tabs,
    Panel,
    Row,
    Col,
    Button,
    Card,
    NoticeBar,
    Field,
    Picker,
    Toast,
    Cell,
    CellGroup,
    Swipe,
    SwipeItem,
    Actionsheet,
    Popup,
    Icon
} from 'vant';

Vue.use(NavBar).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Panel).use(Row).use(Col).use(Button).use(Card).use(NoticeBar).use(Field).use(Picker).use(Toast).use(Cell).use(CellGroup).use(Swipe).use(SwipeItem).use(Actionsheet).use(Popup).use(Icon);

var app = new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
    render: h => h(App)
});