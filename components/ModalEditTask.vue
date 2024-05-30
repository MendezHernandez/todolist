<template>
  <div class="modal-task-ctn" v-if="isVisible" @click.self="close">
    <form class="modal-task" @submit.prevent="editTask">
      <h1>Editar tarea</h1>
      <input
        v-model="taskContent"
        type="text"
        placeholder="Nombre de la tarea"
        required
      />
      <textarea
        rows="10"
        placeholder="Descripción"
        v-model="taskDescription"
      ></textarea>
      <div class="ctn-btn-modal-task">
        <button class="btn-cancel" @click="close">Cancelar</button>
        <button class="btn-confirm">Editar</button>
      </div>
    </form>
  </div>
</template>

<script>
import todolistService from "~/services/todolist";

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    initialTaskContent: {
      type: String,
      default: "",
    },
    initialTaskDescription: {
      type: String,
      default: "",
    },
    taskId: {
      type: String,
    },
  },

  data() {
    return {
      taskContent: this.initialTaskContent,
      taskDescription: this.initialTaskDescription,
    };
  },

  // watch se encarge de revisar si las props initialTaskContent y initialTaskDescription cambian, si es asi, actualiza las variables de estados taskContent y taskDescription
  watch: {
    initialTaskContent(newVal) {
      this.taskContent = newVal;
    },
    initialTaskDescription(newVal) {
      this.taskDescription = newVal;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    async editTask() {
      if (this.taskContent.trim()) {
        try {
          await todolistService.updateTask(
            this.taskId,
            this.taskContent,
            this.taskDescription
          );

          // Limpiamos los inputs
          this.taskContent = "";
          this.taskDescription = "";

          // Actulizamos la lista de tareas
          const updatedTasks = await todolistService.getTasks();
          this.$parent.tasks = updatedTasks;

          this.close();
        } catch (error) {
          console.error("Error al actualizar la tarea:", error);
        }
      } else {
        alert("Por favor, ingresa datos en la tarea");
      }
    },
  },
};
</script>

<style scoped>
.modal-task-ctn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--modal-background);
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.modal-task {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--tertiary-color);
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 5px 5px 5px gray;
  width: 40vw;
}

.modal-task h1 {
  background-color: var(--dark-tertiary-color);
}

.modal-task input,
.modal-task textarea,
.modal-task button {
  font-size: large;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
}

.modal-task textarea {
  resize: none;
}

.modal-task button {
  flex: 1;
}

.ctn-btn-modal-task {
  display: flex;
  gap: 1rem;
}

@media (max-width: 900px) {
  .modal-task {
    width: 70vw;
  }
}
</style>
