<template>
  <div class="card-task">
    <!-- Datos de la tarea -->
    <div class="ctn-data-task">
      <h2>{{ task.content }}</h2>
      <p>{{ task.description }}</p>
    </div>

    <!-- Boton para marcar tarea como terminada -->
    <button
      class="btn-complete-task"
      title="Completar tarea"
      @click="completeTask(task.id)"
    />

    <!-- Imagenes que funcionan como botones para editar y eliminar tarea -->
    <div class="ctn-options-task">
      <img
        @click="editTask(task)"
        title="Editar tarea"
        src="/icons/editar.png"
        alt="icon-editar"
        class="icon-task"
      />
      <img
        @click="deleteTask(task.id)"
        title="Eliminar tarea"
        class="icon-task"
        src="/icons/basura.png"
        alt="icon-basura"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    completeTask(id) {
      this.$emit("task-completed", id);
    },
    editTask(task) {
      this.$emit("task-edit", task);
    },
    deleteTask(id) {
      this.$emit("task-deleted", id);
    },
  },
};
</script>

<style scoped>
.card-task {
  display: flex;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--background);
  align-items: center;
  gap: 1rem;
}

.ctn-data-task {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.btn-complete-task {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  transition: 0.2s ease-in-out;
}

.btn-complete-task:hover {
  cursor: pointer;
  background-color: var(--primary-color);
}

.icon-task {
  height: 2rem;
}

.icon-task:hover {
  cursor: pointer;
}

.ctn-options-task {
  display: flex;
  gap: 1rem;
  background-color: var(--white);
  padding: 1rem;
  border-radius: 2rem;
}
</style>
