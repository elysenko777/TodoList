const mutationType = [
  'SET_TASK',
  'DONE_TASK',
  'REMOVE_TASK',
  'VALIDATE_TASK',
  'TOGGLE_VISIBLE_TASKLIST'
]

const typeList: {[key: string]: string} = {}

mutationType.forEach(type => {
  typeList[type] = type
})

export default typeList
