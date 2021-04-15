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
    {
        path: '/home',
        name: 'home',
        children: [{
                path: '/user/',
                name: 'user',
                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/user.vue'),

            }, {
                path: '/articles/',
                name: 'articles',

                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/result.vue'),

                /*  beforeEnter(route, redirecte, next) {
                      let confirm = window.confirm('work?')
                      if (confirm) {
                          next()
                      } else { redirecte('/') }
                  }*/
            }, {

                path: '/articles/:id(\\d+)',
                name: 'article',

                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/Article.vue')

                //before enter


            }, {
                path: '/delete/',
                name: 'delete',
                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/deleteuser.vue'),

                //before enter
            }, {
                path: '/exemple1/',
                name: 'exemple1',
                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../exemple/confidentialité.vue'),

                //before enter
            },
            {
                path: '/exemple2/',
                name: 'exemple2',
                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../exemple/about.vue'),

                //before enter
            },
        ],
        // route level code-splitting
        // this generates a separate chunk (singIn.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/home.vue')


        //before enter

    },


    //the end
    {
        path: '*',
        name: 'notFound',
        // route level code-splitting
        // this generates a separate chunk (singIn.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "singIn" */ '../views/notFound.vue'),

        //before enter

    }


]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router