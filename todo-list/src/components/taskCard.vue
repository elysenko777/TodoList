<template>
    <div class="task-card my-style">
        <div>
            <h4>{{model.title}}</h4>
            <p>{{model.description}}</p>
        </div>
        <div class="task-card__btns">
            <button @click="onDone" v-if="!model.status" class="task-card__check"></button>
            <button @click="onRemove" v-else class="task-card__delete"></button>
        </div>
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
        title: 'Create video',
        description: 'Add upload on YouTube',
        status: false
      }
    }
  },
  setup (props, { emit }) {
    const onDone = () => {
      emit('onDone', {})
    }
    const onRemove = () => {
      emit('onRemove', {})
    }
    return {
      onDone,
      onRemove
    }
  }
}
</script>

<style scoped>
  .task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
