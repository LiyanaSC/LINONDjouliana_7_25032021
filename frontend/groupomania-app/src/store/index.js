import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tokenList: [],
        token: "",
        refreshToken: "",
        userId: Number,
        admin: Boolean,


    },
    getters: {

    },
    mutations: {
        refreshMyToken(state) {
            console.log('am starded')
            setInterval(function() {
                axios.post('http://localhost:8080/api/auth/token', {
                        userId: state.userId,
                        admin: state.admin,
                        refreshToken: state.refreshToken,
                        tokenList: state.tokenList,

                    }, {
                        headers: {
                            'Authorization': `bearer ${state.token}`

                        }
                    }).then(res => {
                        console.log("réponse", res.data.response.token)
                        state.token = res.data.response.token
                    })
                    .catch(error => {
                        console.log(error)
                    })


            }, 30000);
        }


    },
    actions: {

    },
    modules: {}
})