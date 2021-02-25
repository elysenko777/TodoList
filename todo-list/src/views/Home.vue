<template>
  <div class="home">
    <div class="task-page">
      <taskInput @onAddTask="addTask"></taskInput>
      <div>
        <taskCardList task-type="todo" list-title="Список дел"></taskCardList>
        <taskCardList task-type="done" list-title="Выполнено"></taskCardList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import taskInput from '../components/taskInput.vue'
import taskCardList from '../components/taskCardList.vue'
import { TaskData } from '../models'
import store from '../store'

export default {
  name: 'App',
  components: {
    taskInput,
    taskCardList
  },
  setup () {
    let isEmpty = true
    const taskData = ({ title, description }: TaskData) => {
      let taskInfo = {
        title,
        description
      }
      if (!title && !!description) {
        taskInfo = {
          title: description,
          description: ''
        }
      }
      return taskInfo
    }
    const addTask = ({ title, description }: TaskData) => {
      isEmpty = (title === '' && description === '') || false
      if (!isEmpty) {
        const taskInfo = taskData({ title, description })
        store.dispatch('setTask', taskInfo)
      }
    }
    return {
      isEmpty,
      addTask
    }
  }
}
</script>

<style scoped>
</style>
