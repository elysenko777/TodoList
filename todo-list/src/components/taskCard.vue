<template>
    <div class="task-card my-style">
        <input :id="checkboxId()" type="checkbox" @change="onDone">
        <label :for="checkboxId()" class="task-card__check task-card__btns"></label>
        <div class="task-card__info">
            <h4>{{model.data.title}}</h4>
            <p v-if="model.data.description">{{model.data.description}}</p>
        </div>
        <span @click="onRemove" v-if="model.status" class="task-card__delete task-card__btns"></span>
    </div>
</template>

<script>
export default {
  emits: ['onDone', 'onRemove'],
  props: {
    model: {
      requered: true,
      default: {
        id: 0,
        data: {
          title: 'task',
          description: 'just do it'
        },
        status: false
      }
    }
  },
  setup (props, { emit }) {
    const checkboxId = () => {
      const component = 'task-card'
      return `${component}__${props.model.id}`
    }
    const onDone = () => {
      emit('onDone', {})
    }
    const onRemove = () => {
      emit('onRemove', {})
    }
    return {
      checkboxId,
      onDone,
      onRemove
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/taskCard.scss'
</style>
