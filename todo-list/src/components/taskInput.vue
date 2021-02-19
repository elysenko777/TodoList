<template>
    <div class="task-input__list my-list">
        <input class="task-input__item" v-model="title" placeholder="Тема" type="text"/>
        <input class="task-input__item" v-model="description" placeholder="Описание" type="text"/>
        <button @click="onAddTask">Добавить</button>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['onAddTask', 'onValidate'],
  setup (props, { emit }) {
    const title = ref('')
    const description = ref('')
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
      onAddTask
    }
  }
}
</script>

<style scoped>
.task-input__item {
    margin-bottom: 10px;
}
</style>
