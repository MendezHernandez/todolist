<template>
  <div class="modal-task-ctn" v-if="isVisible" @click.self="close">
    <!-- formulario para crear tarea nueva -->
    <form class="modal-task" @submit.prevent="addNewTask">
      <h1>Agregar tarea</h1>
      <input
        v-model="newTaskContent"
        type="text"
        placeholder="Nombre de la tarea"
        required
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Descripción"
        v-model="newTaskDescription"
      ></textarea>

      <!-- botones de acción -->
      <div class="ctn-btn-modal-task">
        <button class="btn-cancel" @click="close">Cancelar</button>
        <button class="btn-confirm">Agregar</button>
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
  },
  data() {
    return {
      newTaskContent: "",
      newTaskDescription: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async addNewTask() {
      if (this.newTaskContent) {
        try {
          const newTask = {
            content: this.newTaskContent,
            description: this.newTaskDescription,
            due_string: "tomorrow at 12:00", // ejemplo de fecha
            due_lang: "en",
          };
          await todolistService.addTask(newTask);

          // Actualizar tareas
          const updatedTasks = await todolistService.getTasks();
          this.$parent.tasks = updatedTasks;

          // Limpiar los campos de entrada
          this.newTaskContent = "";
          this.newTaskDescription = "";
          this.close();
        } catch (error) {
          console.error("Error al agregar la tarea:", error);
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
  background-color: var(--primary-color);
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 5px 5px 5px gray;
  width: 40vw;
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
