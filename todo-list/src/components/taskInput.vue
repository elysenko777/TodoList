<template>
  <div class="task-form">
    <div class="task-input__list my-list">
      <div>
        <input class="task-input__item" @focus="removeError" @keyup.enter="onAddTask" v-model="title" placeholder="Тема" type="text"/>
        <input class="task-input__item" @focus="removeError" @keyup.enter="onAddTask" v-model="description" placeholder="Описание" type="text"/>
      </div>
      <button id="add-task" @click="onAddTask" title="Добавить задачу" alt="Добавить задачу"></button>
    </div>
    <span class="task-empty-error" v-if="emptyTask">Опишите задачу!</span>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import store from '../store'

export default {
  emits: ['onAddTask', 'onValidate'],
  setup (props, { emit }) {
    const emptyTask = ref('')
    const title = ref('')
    const description = ref('')
    emptyTask.value = store.state.emptyTask
    watchEffect(() => {
      emptyTask.value = store.state.emptyTask
    })
    const removeError = () => {
      store.dispatch('validateTask', false)
    }
    const onAddTask = () => {
      emit('onAddTask', {
        title: String(title.value),
        description: String(description.value)
      })
      title.value = ''
      description.value = ''
    }
    return {
      title,
      description,
      onAddTask,
      emptyTask,
      removeError
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/taskInput.scss'
</style>
