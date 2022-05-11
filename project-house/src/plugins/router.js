import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';

import store from '@/plugins/store.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: { name: 'Rooms' }, // default view
        name: 'Home',
        component: HomePage,
        children: [
            {
                path: 'rooms',
                name: 'Rooms',
                component: () => import(/* webpackChunkName: "rooms" */"@/views/RoomsPage")
            },
            {
                path: 'routines',
                name: 'Routines',
                component: () => import(/* webpackChunkName: "routines" */"@/views/RoutinesPage")
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },

    // rutas dinamicas para rooms y routines
    {
        path: '/rooms/:name',
        name: 'RoomDetails',
        component: () => import(/* webpackChunkName: "room-details" */"@/views/RoomDetails"),
        props: true,
        beforeEnter: (to, from, next) => {
            // Opcion 1 incorrecta - solo acceder al state directamente si no se desea filtrar o transformar la info
            // const exists = store.state.rooms.find(room => room.name == to.params.name);

            // Opcion 2 correcta
            const exists = store.getters.getRoomByName(to.params.name);

            // console.log(from);

            if (exists) next()
            else next({ name: 'NotFound' })
        }
    },

    {
        path: '/devices/:slug',
        name: 'DeviceDetails',
        component: () => import(/* webpackChunkName: "device-details" */"@/views/DeviceDetails"),
        props: true,
    },

    // Default route (not found)
    {
        path: '/404',
        alias: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "404" */"@/views/404NotFound"),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const isAuthenticated = true;

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
})

export default router