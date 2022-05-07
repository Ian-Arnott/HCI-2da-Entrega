import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';

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
        path: '/rooms/:id',
        name: 'RoomDetails',
        component: () => import(/* webpackChunkName: "room-details" */"@/views/RoomDetails"),
        props: true
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