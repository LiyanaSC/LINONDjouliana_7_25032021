import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../views/auth.vue'

Vue.use(VueRouter)

const routes = [{
        // ________________________________ CONNEXION VIEW (login)
        path: '/',
        name: 'auth',
        component: auth
    },
    { // ________________________________ SIGN UP VIEW 
        path: '/singIn',
        name: 'singIn',
        // route level code-splitting
        // this generates a separate chunk (singIn.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "singIn" */ '../views/signIn.vue')
    },
    { // ________________________________ RESULT VIEW
        path: '/home',
        name: 'home',
        children: [{
                // ________________________________ USER INFO VIEW
                path: '/user/',
                name: 'user',
                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/user.vue'),

            }, {
                // ________________________________ ALL ARTICLES VIEW
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
                // ________________________________ ONE ARTICLE VIEW
                path: '/articles/:id(\\d+)',
                name: 'article',

                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/Article.vue')

                //before enter


            }, {
                // ________________________________ DELETE ACCOUNT VIEW
                path: '/delete/',
                name: 'delete',
                // route level code-splitting
                // this generates a separate chunk (singIn.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "singIn" */ '../components/deleteuser.vue'),

                //before enter
            }, {
                // ________________________________ EXEMPLE VIEW
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
                // ________________________________ EXEMPLE VIEW
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
            import ( /* webpackChunkName: "home" */ '../views/Home.vue')


        //before enter

    },


    //the end
    {
        // ________________________________ 404 PAGE
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