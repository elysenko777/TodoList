<template>
  <div class="home">
    <div class="task-page">
      <taskInput @onAddTask="addTask"></taskInput>
      <ul class="task-list my-list">
        <li v-for="item in taskList" v-bind:key="item.id">
          <taskCard @onDone="setDoneTask(item.id)" @onRemove="removeTask(item.id)"  :model="item"></taskCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import taskInput from '../components/taskInput.vue'
import taskCard from '../components/taskCard.vue'
import { ref } from 'vue'

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export default {
  name: 'App',
  components: {
    taskInput,
    taskCard
  },
  setup () {
    const taskList = ref()
    let hasList = false
    const addTask = ({ title = '', description = '' }) => {
      if (!hasList) {
        taskList.value = [{ id: 0, title, description, status: false }]
        hasList = true
      } else {
        taskList.value = [...taskList.value, { id: taskList.value.length + 1, title, description, status: false }]
      }
    }
    const setDoneTask = (id: number) => {
      taskList.value = taskList.value.map((item: Task) => {
        if (item.id === id) {
          item.status = true
        }
        return item
      })
    }
    const removeTask = (id: number) => {
      taskList.value = taskList.value.filter((item: Task) => item.id !== id)
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
