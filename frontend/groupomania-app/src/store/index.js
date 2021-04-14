import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("Token"),
        articleId: localStorage.getItem("articleId")



    },
    getters: {

    },
    mutations: {

    },
    actions: {},
    modules: {}
})