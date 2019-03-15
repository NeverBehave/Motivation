import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: 'Moderate',
    last_time: '',
    date: '',
    toggle: false
  },
  getters: {
    getToggle: state => {
      return state.toggle
    },
    // @TODO Welcome Back
    getLastTime: state => {
      return state.last_time === '' ? null : moment(state.last_time)
    },
    getDate: state => {
      return state.date === '' ? null : moment(state.date)
    },
    getLevel: state => {
      return state.level
    }
  },
  mutations: {
    updateTime (state, dateString) {
      state.date = dateString
    },
    updateLastTime (state, dateString) {
      state.last_time = dateString
    },
    updateLevel (state, level) {
      state.level = level
    },
    updateToggle (state) {
      state.toggle = !state.toggle
    }
  },
  actions: {
    updateTime ({ commit }, dateString) {
      if (moment(dateString).isValid()) {
        commit('updateTime', dateString)
        return true
      }
      return false
    },
    updateLastTime ({ commit }) {
      commit('updateLastTime', moment().format())
    },
    toggleModal ({ commit }) {
      commit('updateToggle')
    }
  },
  plugins: [createPersistedState()]
})
