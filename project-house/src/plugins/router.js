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

    // rutas dinamicas para devices, rooms y routines
    {
        path: '/rooms/:id',
        name: 'RoomDetails',
        component: () => import(/*room details*/"@/views/RoomDetails")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router