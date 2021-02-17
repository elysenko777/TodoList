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
import { ref } from 'vue'

interface TaskData {
  title: string;
  description: string;
}

interface Task {
  id: number;
  data: TaskData;
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
    let isEmpty = true
    const vaidateTask = ({ title, description }: TaskData) => {
      isEmpty = (title === '' && description === '') || false
    }
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
      vaidateTask({ title, description })
      if (!isEmpty) {
        const taskInfo = taskData({ title, description })
        if (!hasList) {
          taskList.value = [{ id: 0, data: taskInfo, status: false }]
          hasList = true
        } else {
          taskList.value = [...taskList.value, { id: taskList.value.length + 1, data: taskInfo, status: false }]
        }
      }
    }
    const setDoneTask = (id: number) => {
      taskList.value = taskList.value.map((item: Task) => {
        if (item.id === id) {
          if (item.status) {
            item.status = false
          } else {
            item.status = true
          }
        }
        return item
      })
    }
    const removeTask = (id: number) => {
      taskList.value = taskList.value.filter((item: Task) => item.id !== id)
    }
    return {
      taskList,
      isEmpty,
      vaidateTask,
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
