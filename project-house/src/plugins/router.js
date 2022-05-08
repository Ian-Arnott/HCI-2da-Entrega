import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';

import store from '@/plugins/store.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
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
            // const exists = store.state.rooms.find(room => room.name == to.params.name);  // Opcion 1
            const exists = store.getters.getRoomByName(to.params.name);                     // Opcion 2

            if (exists) next()
            else next({ name: 'NotFound' })
        }
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