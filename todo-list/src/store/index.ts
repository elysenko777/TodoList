import { createStore } from 'vuex'
import { Task } from '../models'
import { SET_TASK, DONE_TASK, REMOVE_TASK, VALIDATE_TASK } from './mutation-types'

const getList = (state = { taskList: [{} as Task] }, status: boolean) => {
  let taskList: any[] = []
  if (state.taskList.length) {
    if (typeof (state.taskList[0].id) === 'number') {
      taskList = state.taskList.filter((task: Task) => task.status === status)
    }
  }
  return taskList
}

export default createStore({
  state: {
    emptyTask: false,
    taskList: [{} as Task]
  },
  mutations: {
    [SET_TASK] (state, taskData) {
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
    [DONE_TASK] (state, id: number) {
      const newTaskList = state.taskList.map((item) => {
        if (item.id === id) {
          item.status = item.status ? Boolean(0) : Boolean(1)
        }
        return item
      })
      state.taskList = newTaskList
    },
    [REMOVE_TASK] (state, id: number) {
      const newTaskList = state.taskList.filter((item: Task) => item.id !== id)
        .map((item, index) => {
          item.id = index
          return item
        })
      state.taskList = newTaskList
    },
    [VALIDATE_TASK] (state, emptyTask) {
      state.emptyTask = emptyTask
    }
  },
  actions: {
    setTask (context, taskData) {
      context.commit('SET_TASK', taskData)
    },
    doneTask (context, id) {
      context.commit('DONE_TASK', id)
    },
    removeTask (context, id) {
      context.commit('REMOVE_TASK', id)
    },
    validateTask (context, emptyTask) {
      context.commit('VALIDATE_TASK', emptyTask)
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
