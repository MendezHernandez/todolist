<template>
  <div class="main-ctn">
    <div class="ctn-tasks">
      <h1>To-do list</h1>

      <!-- Buscador y boton para agregar tarea -->
      <div class="ctn-task-finder">
        <input
          type="text"
          v-model="searchTask"
          placeholder="Escribe para empezar a buscar tareas..."
        />
        <button class="btn-confirm" @click="showModal = true">
          Agregar tarea
        </button>
      </div>

      <!-- Lista de tareas -->
      <div class="table-tasks">
        <NoTasks v-if="filterTasks.length === 0" />
        <CardTask
          v-else
          v-for="task in filterTasks"
          :key="task.id"
          :task="task"
          @task-completed="handleTaskCompleted"
          @task-edit="handleTaskEdit"
          @task-deleted="handleTaskDelete"
        />
      </div>
    </div>

    <!-- Modales para agregar y editar tarea -->
    <ModalTask :isVisible="showModal" @close="showModal = false" />
    <ModalEditTask
      :initialTaskContent="taskToEdit.content"
      :initialTaskDescription="taskToEdit.description"
      :taskId="taskToEdit.id"
      :isVisible="showEditModal"
      @close="showEditModal = false"
    />
  </div>
</template>

<script>
import todolistService from "~/services/todolist";
import ModalTask from "~/components/ModalTask.vue";
import ModalEditTask from "../components/ModalEditTask.vue";

export default {
  components: {
    ModalTask,
    ModalEditTask,
  },
  // la función data almacena variables de estado, se puede acceder a ellas utilizamos "this"
  data() {
    return {
      showModal: false,
      showEditModal: false,
      taskToEdit: { id: null, content: "", description: "" },
      tasks: [],
      searchTask: "",
    };
  },

  // lo que este dentro de monted se ejecutara siempre que el componente sea montado.
  mounted() {
    this.fetchTasks();
  },

  //methods es un objeto donde podemos definir métodos que estarán disponibles para ser utilizados en el componente.
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await todolistService.getTasks();
      } catch (error) {
        console.log("Error al obtener las tareas", error);
      }
    },

    handleTaskEdit(task) {
      this.taskToEdit = {
        id: task.id,
        content: task.content,
        description: task.description,
      };
      this.showEditModal = true;
    },

    async handleTaskCompleted(id) {
      try {
        await todolistService.closeTask(id);
        const updatedTasks = await todolistService.getTasks();
        // Actualizar el estado local con las tareas actualizadas
        this.tasks = updatedTasks;
      } catch (error) {
        console.error("Error al completar la tarea", error);
      }
    },

    async handleTaskDelete(id) {
      try {
        await todolistService.deleteTask(id);
        const updatedTasks = await todolistService.getTasks();
        // Actualizar el estado local con las tareas actualizadas
        this.tasks = updatedTasks;
      } catch (error) {
        console.error("Error al completar la tarea", error);
      }
    },
  },

  // computed se encarga de computar o definir valores derivados de manera reactiva
  computed: {
    filterTasks() {
      return this.tasks.filter(
        (task) =>
          task.content.toLowerCase().includes(this.searchTask.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchTask.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.main-ctn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background);
}

.ctn-tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  background-color: var(--primary-color);
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem 5px gray;
}

.ctn-task-finder {
  display: flex;
  gap: 10px;
}

.ctn-task-finder input {
  flex: 1;
  padding: 5px;
}

.ctn-task-finder input,
.ctn-task-finder button {
  font-size: large;
  border-radius: 5px;
  border: none;
}

.table-tasks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 4px;
  padding: 10px;
  height: 60vh;
  background-color: var(--white);
  overflow-y: scroll;
}

@media (max-width: 900px) {
  .ctn-tasks {
    width: calc(70% - 4rem);
  }
}

@media (max-width: 500px) {
  .ctn-tasks {
    width: calc(90% - 4rem);
  }

  .ctn-task-finder {
    flex-direction: column-reverse;
  }
}
</style>
