import { createStore } from 'vuex'
import Task from '../models/task'

export default createStore({
  state: {
    taskList: [{} as Task]
  },
  mutations: {
    setTask (state, taskData) {
      let newTaskList = state.taskList
      const firstTask = { id: 0, data: taskData, status: false } as Task
      const newTask = { id: state.taskList.length, data: taskData, status: false } as Task
      if (newTaskList.length) {
        const hasTask = typeof (state.taskList[0].id) === 'number'
        newTaskList = hasTask ? [...state.taskList, newTask] : [firstTask]
      } else {
        newTaskList = [firstTask]
      }
      state.taskList = newTaskList
    },
    doneTask (state, id: number) {
      const newTaskList = state.taskList.map((item) => {
        if (item.id === id) {
          if (item.status) {
            item.status = false
          } else {
            item.status = true
          }
        }
        return item
      })
      state.taskList = newTaskList
    },
    removeTask (state, id: number) {
      const newTaskList = state.taskList.filter((item: Task) => {
        return item.id !== id
      }).map((item, index) => {
        item.id = index
        return item
      })
      state.taskList = newTaskList
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
