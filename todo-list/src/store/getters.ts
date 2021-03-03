import { Task, State } from '../models'

const getList = (state: State, status: boolean) => {
  let taskList: object[] = []
  if (state.taskList.length) {
    if (typeof (state.taskList[0].id) === 'number') {
      taskList = state.taskList.filter((task: Task) => task.status === status)
    }
  }
  return taskList
}

export default {
  toDoList: (state: State) => {
    return getList(state, false)
  },
  doneList: (state: State) => {
    return getList(state, true)
  }
}
