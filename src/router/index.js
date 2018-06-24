import Vue from 'vue'
import Router from 'vue-router';
import Shared from '@/components/Shared/Shared';
import Home from '@/components/Home';
import User from '@/components/User';
import Shop from '@/components/Shop';
import Money from '@/components/Money';
import Member from '@/components/Member';
import GoodsDetail from '@/components/GoodsDetail';
import Cart from '@/components/Cart';
import Collection from '@/components/Collection';
import Recommend from '@/components/Recommend';
import Login from '@/components/Login';

Vue.use(Router);

const routers = [{
        path: "/",
        name: "/",
        component: Shared,
        //嵌套路由
        children: [{
                path: "", //默认路由
                name: "home",
                component: Home
            },
            {
                path: "home",
                name: "home",
                component: Home
            },
            {
                path: "user",
                name: "user",
                component: User
            },
            {
                path: "shop",
                name: "shop",
                component: Shop
            },
            {
                path: "member",
                name: "member",
                component: Member
            }
        ]
    },
    {
        path: "/goodsDetail",
        name: "goodsDetail",
        component: GoodsDetail
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart
    },
    {
        path: "/recommend",
        name: "recommend",
        component: Recommend
    },
    {
        path: "/collection",
        name: "collection",
        component: Collection
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];

const router = new Router({
    mode: 'history',
    routes: routers
});

//路由守卫，登录验证
//Service.Auth.loginAuth(router, routers);

export default router;