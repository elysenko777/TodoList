<template>
    <div class="task-card my-style"  :data-done-task="model.status">
        <div class="task-card__info">
            <h4>{{model.data.title}}</h4>
            <p v-if="model.data.description">{{model.data.description}}</p>
        </div>
        <div class="task-card__btns">
            <input :id="checkboxId()" type="checkbox" @change="onDone">
            <label :for="checkboxId()" class="task-card__check"></label>
            <span @click="onRemove" v-if="model.status" class="task-card__delete"></span>
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

<style scoped>
  .task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-card[data-done-task="true"] {
    background: #f4f4f4;
  }

  .task-card[data-done-task="true"] .task-card__info {
    opacity: .5;
  }

  .task-card[data-done-task="true"] h4 {
    position: relative;
  }
  .task-card[data-done-task="true"] h4::after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
  }

  input[type="checkbox"] {
    opacity: 0;
    height: 0;
    width: 0;
  }

  .task-card__btns {
    display: flex;
    align-self: flex-start;
  }

  .task-card__info {
    width: 80%;
  }

  .task-card__info p {
    margin-top: 10px;
  }

  .task-card__check {
    cursor: pointer;
    display: block;
    width: 18px;
    height: 18px;
    border: 2.5px solid #61e1c0;
    border-radius: 4px;
  }

  .task-card__delete {
    cursor: pointer;
    margin-left: 5px;
    width: 23px;
    height: 23px;
    position: relative;
  }

  .task-card__delete::before,
  .task-card__delete::after {
    content: '';
    position: absolute;
    display: block;
    width: 2px;
    height: 20px;
    background: rgb(215 38 38 / 80%);
    top: 2px;
    left: 10px;
  }

  .task-card__delete::before {
    transform: rotate(-45deg);
  }

  .task-card__delete::after {
    transform: rotate(45deg);
  }

  .task-card[data-done-task="true"] input + .task-card__check {
    background: #61e1c0;
    position: relative;
  }

  .task-card[data-done-task="true"] input + .task-card__check::after{
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    left: 5px;
    width: 5px;
    height: 12px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
</style>
