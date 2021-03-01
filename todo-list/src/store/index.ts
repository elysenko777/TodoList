import { createStore } from 'vuex'
import { Task } from '../models'
import { state } from './state'
import mutations from './mutations'

const getList = (state = { taskList: [{} as Task] }, status: boolean) => {
  let taskList: object[] = []
  if (state.taskList.length) {
    if (typeof (state.taskList[0].id) === 'number') {
      taskList = state.taskList.filter((task: Task) => task.status === status)
    }
  }
  return taskList
}

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
  modules: {
  },
  getters: {
    toDoList (state) {
      return getList(state, false)
    },
    doneList (state) {
      return getList(state, true)
    }
  }
})
