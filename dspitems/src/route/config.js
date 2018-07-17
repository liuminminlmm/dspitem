import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import Home from '@/page/home';
// import Plan from '@/page/plan';
// import Idea from '@/page/idea';
// import Uint from '@/page/uint';
// import Tool from '@/page/tool';
import Account from '@/page/account';
import Customer from '@/page/customer';
import Index from '@/page/index/index.jsx';
import DynimicComp from '@/route/dynimic.js';
import Login from '@/page/login/login.jsx';
let router = {
    routes: [
        {
            path: '/',
            exact: true,
            component: (() => <Redirect from="/" to="/index/home" />)
        },
        {
            path: '/login',
            component: Login,
            exact: true
        },
        {
            path: '/index',
            component: Index,
            children: [
                {
                    path: '/index/home',
                    component: DynimicComp(() =>import(/*webpackChunkName:'home'*/'@/page/home/home.jsx'))
                }, {
                    path: '/index/plan',
                    component: DynimicComp(() =>import(/*webpackChunkName:'plan'*/'@/page/plan/plan.jsx'))
                }, {
                    path: '/index/idea',
                    component: DynimicComp(() =>import(/*webpackChunkName:'idea'*/'@/page/idea.jsx'))
                }, {
                    path: '/index/uint',
                    component: DynimicComp(() =>import(/*webpackChunkName:'uint'*/'@/page/uint.jsx'))
                }, {
                    path: '/index/tool',
                    component: DynimicComp(() =>import(/*webpackChunkName:'tool'*/'@/page/tool.jsx')),
                children:[
                    {
                        path: 'index/tool/account',
                        component: Account
                    }, {
                        path: 'index/tool/customer',
                        component: Customer
                    }]
                }]

}
    ]
}
let { routes } = router;
export { routes };
export default router;