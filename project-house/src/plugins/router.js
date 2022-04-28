import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';

Vue.use(VueRouter);

const routes = [

    // TODO encontrar la forma de redireccionar / a /home si ya esta logeado
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router