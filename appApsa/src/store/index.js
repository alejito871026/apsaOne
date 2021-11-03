import Vue from 'vue'
import Vuex from 'vuex'
import Autenticacion from '../almacen/Autenticacion'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Autenticacion:Autenticacion
  }
})
