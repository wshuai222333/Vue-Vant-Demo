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
import Submit from '@/components/Submit';
import PayBack from '@/components/PayBack';
import Registered from '@/components/Registered';
import Integral from '@/components/Integral';
import Trade from '@/components/Trade';
import Password from '@/components/Password';
import Propaganda from '@/components/Propaganda';
import Advice from '@/components/Advice';
import Forward from '@/components/Forward'
import Problem from '@/components/Problem'
import ProblemDetail from '@/components/ProblemDetail'
import Qrcode from '@/components/Qrcode'
import Installment from '@/components/Installment'
import CardList from '@/components/CardList'
import AddCard from '@/components/AddCard'

import Service from "@/components/_common/index";

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
                path: "propaganda",
                name: "propaganda",
                component: Propaganda
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
    },
    {
        path: "/collection",
        name: "collection",
        component: Submit
    },
    {
        path: "/submit",
        name: "submit",
        component: Submit
    },
    {
        path: "/payBack",
        name: "payBack",
        component: PayBack
    },
    {
        path: "/registered",
        name: "registered",
        component: Registered
    },
    {
        path: "/integral",
        name: "integral",
        component: Integral
    },
    {
        path: "/trade",
        name: "trade",
        component: Trade
    },
    {
        path: "/password",
        name: "password",
        component: Password
    },
    {
        path: "/advice",
        name: "advice",
        component: Advice
    },
    {
        path: "/forward",
        name: "forward",
        component: Forward
    },
    {
        path: "/problem",
        name: "problem",
        component: Problem
    },
    {
        path: "/problemDetail",
        name: "problemDetail",
        component: ProblemDetail
    },
    {
        path: "/qrcode",
        name: "qrcode",
        component: Qrcode
    },
    {
        path: "/installment",
        name: "installment",
        component: Installment

    },
    {
        path: "/cardList",
        name: "cardList",
        component: CardList

    },
    {
        path: "/addCard",
        name: "addCard",
        component: AddCard

    },
    {
        path: "/member",
        name: "member",
        component: Member

    }
];

const router = new Router({
    mode: 'history',
    routes: routers
});
//路由守卫，登录验证
Service.Auth.loginAuth(router, routers);

export default router;