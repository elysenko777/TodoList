<template>
  <div v-if="hasTask">
    <p class="task-list__title">{{listTitle}} <span class="task-list__number">({{numberOfTask}})</span></p>
    <ul class="task-list my-list">
      <li v-for="item in taskList" :key="item.id" :data-done-task="item.status">
        <taskCard @onDone="setDoneTask(item.id)" @onRemove="removeTask(item.id)"  :model="item"></taskCard>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import taskCard from '../components/taskCard.vue'
import store from '../store'
import { ref, watchEffect } from 'vue'
import { TaskType } from '../models'

export default {
  components: {
    taskCard
  },
  props: {
    taskType: String,
    listTitle: String
  },
  setup (props: TaskType) {
    const hasTask = ref()
    const numberOfTask = ref()
    const taskList = ref()
    const changeList = () => {
      const list = props.taskType === 'done' ? store.getters.doneList : store.getters.toDoList
      const listLength = list.length
      taskList.value = list
      numberOfTask.value = listLength
      hasTask.value = Boolean(listLength)
    }
    watchEffect(() => {
      changeList()
    })
    changeList()
    const removeError = () => {
      store.dispatch('validateTask', false)
    }
    const setDoneTask = (id: number) => {
      store.dispatch('doneTask', id)
      removeError()
    }
    const removeTask = (id: number) => {
      store.dispatch('removeTask', id)
      removeError()
    }
    return {
      setDoneTask,
      removeTask,
      removeError,
      taskList,
      hasTask,
      numberOfTask
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/taskCardList.scss'
</style>
