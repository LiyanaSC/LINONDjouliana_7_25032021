import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate" //to keep store info after refresh
//import * as Cookies from 'js-cookie'


Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({ //to keep store info after refresh

        storage: window.sessionStorage,
    })],
    state: {
        token: null,
        refreshToken: null,
        userId: null,
        admin: null


    },
    getters: {

    },
    mutations: {
        CHANGE_THE_TOKEN(state, newToken) { //after connexion
            state.token = newToken
        },
        CLEAR_STORE(state) { //after disconnexion
            state.userId = null
            state.admin = null
            state.token = null
            state.refreshToken = null
        }


    },
    actions: {
        refreshMyToken({ commit, state }) { //api call
            console.log('am starded')
            let tokenInterval = setInterval(function() {
                axios.post('http://localhost:8080/api/auth/token', {
                        userId: state.userId,
                        admin: state.admin,
                        refreshToken: state.refreshToken,

                    }, {
                        headers: {
                            'Authorization': `bearer ${state.token}`

                        }
                    }).then(res => {
                        console.log("réponse", res.data.response.token, state.userId, state.admin)
                        commit('CHANGE_THE_TOKEN', res.data.response.token)

                    })
                    .catch(error => {
                        clearInterval(tokenInterval)
                        console.log(error)

                    })


            }, 10000); //after 10 seconde for the tests
        }
    },
    modules: {},

})

export default store