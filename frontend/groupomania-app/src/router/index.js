import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../views/auth.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'auth',
        component: auth
    },
    {
        path: '/singIn',
        name: 'singIn',
        // route level code-splitting
        // this generates a separate chunk (singIn.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "singIn" */ '../views/signIn.vue')
    },

]

const router = new VueRouter({
    routes
})

export default router