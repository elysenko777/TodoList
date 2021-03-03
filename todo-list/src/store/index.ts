import { createStore } from 'vuex'
import { state } from './state'
import mutations from './mutations'
import getters from './getters'
import modules from './modules'

export default createStore({
  state,
  mutations,
  actions: {
    setTask ({ commit }, taskData) {
      commit('SET_TASK', taskData)
    },
    doneTask ({ commit }, id) {
      setTimeout(() => {
        commit('DONE_TASK', id)
      }, 300)
    },
    removeTask ({ commit }, id) {
      commit('REMOVE_TASK', id)
    },
    validateTask ({ commit }, emptyTask) {
      commit('VALIDATE_TASK', emptyTask)
    },
    toogleTaskList ({ commit }, showDoneTask) {
      commit('TOGGLE_VISIBLE_TASKLIST', showDoneTask)
    }
  },
  modules,
  getters
})
