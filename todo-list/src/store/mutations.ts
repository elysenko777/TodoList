import mutationTypes from './mutation-types'
import { TaskData, Task, State } from '../models'

const {
  SET_TASK,
  DONE_TASK,
  REMOVE_TASK,
  VALIDATE_TASK,
  TOGGLE_VISIBLE_TASKLIST
} = mutationTypes

export default {
  [SET_TASK] (state: State, taskData: TaskData) {
    let newTaskList = state.taskList
    const firstTask = { id: 0, data: taskData, status: false } as Task
    const newTask = { id: state.taskList.length, data: taskData, status: false } as Task
    if (newTaskList.length) {
      const hasTask = typeof (state.taskList[0].id) === 'number'
      newTaskList = hasTask ? [newTask, ...state.taskList] : [firstTask]
    } else {
      newTaskList = [firstTask]
    }
    state.taskList = newTaskList
  },
  [DONE_TASK] (state: State, id: number) {
    const newTaskList = state.taskList.map((item) => {
      if (item.id === id) {
        item.status = item.status ? Boolean(0) : Boolean(1)
      }
      return item
    })
    state.taskList = newTaskList
  },
  [REMOVE_TASK] (state: State, id: number) {
    const newTaskList = state.taskList.filter((item: Task) => item.id !== id)
      .map((item, index) => {
        item.id = index
        return item
      })
    state.taskList = newTaskList
  },
  [VALIDATE_TASK] (state: State, emptyTask: boolean) {
    state.emptyTask = emptyTask
  },
  [TOGGLE_VISIBLE_TASKLIST] (state: State, showDoneTask: boolean) {
    state.showDoneTask = showDoneTask
  }
}
