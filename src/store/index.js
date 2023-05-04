import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null,
    email: null,
    rol: null
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    },
    setEmail(state, email) {
      state.email = email
    },
    setRol(state, rol) {
      state.rol = rol
    }
  },
  actions: {
    guardarToken({commit}, token){
      const decoded = jwt_decode(token)
      commit("setToken", token)
      // commit("setUsuario", decode(response.data.token))
      commit('setEmail', decode(token))
      commit('setRol', decode(token))
      localStorage.setItem("token", token)
      this.$store.commit('setUsuario', "10");

    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
        commit("setEmail", decode(token));
        commit("setRol", decode(token));
      }
      router.push({name: 'cpp'});
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({name: 'login'});
    }
  }
  // ,
  // getters: {
  //   isAuthenticated: state => !!state.token,
  //   getEmail: state => state.email,
  // }
})
