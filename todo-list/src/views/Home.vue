<template>
  <div class="home">
    <div class="task-page">
      <taskInput @onAddTask="addTask" @emptyTask="isEmpty"></taskInput>
      <ul class="task-list my-list">
        <li v-for="item in taskList" :key="item.id">
          <taskCard @onDone="setDoneTask(item.id)" @onRemove="removeTask(item.id)"  :model="item"></taskCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import taskInput from '../components/taskInput.vue'
import taskCard from '../components/taskCard.vue'
import TaskData from '../models/taskData'
import { ref } from 'vue'
import store from '../store'

export default {
  name: 'App',
  components: {
    taskInput,
    taskCard
  },
  setup () {
    const taskList = ref()
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
      const isEmpty = (title === '' && description === '') || false
      if (!isEmpty) {
        const taskInfo = taskData({ title, description })
        store.commit('setTask', taskInfo)
        taskList.value = store.state.taskList
      }
    }
    const setDoneTask = (id: number) => {
      store.commit('doneTask', id)
      taskList.value = store.state.taskList
    }
    const removeTask = (id: number) => {
      store.commit('removeTask', id)
      taskList.value = store.state.taskList
    }
    return {
      taskList,
      addTask,
      removeTask,
      setDoneTask
    }
  }
}
</script>

<style scoped>
  .task-list {
    list-style: none;
    margin-top: 20px;
  }
</style>
