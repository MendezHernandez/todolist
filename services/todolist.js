import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi(process.env.API_TOKEN);

export default {
  async getTasks() {
    try {
      const tasks = await api.getTasks();
      return tasks;
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      throw error;
    }
  },

  async addTask(task) {
    try {
      const newTask = await api.addTask(task);
      alert("Tarea agregada exitosamente");
      return newTask;
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      throw error;
    }
  },

  async updateTask(id, content, description) {
    try {
      const updateTask = await api.updateTask(id, {
        content: content,
        description: description,
      });
      alert("Tarea actualizada correctamente");
      return updateTask;
    } catch (error) {
      console.error("Error al actualizar tarea", error);
      throw error;
    }
  },

  async closeTask(id) {
    try {
      const closedTask = await api.closeTask(id);
      alert("Tarea completada exitosamente");
      const updatedTasks = await this.getTasks();
      return closedTask;
    } catch (error) {
      console.error("Error al finalizar la tarea", error);
      throw error;
    }
  },

  async deleteTask(id) {
    try {
      // Mostrar una confirmación al usuario
      const userConfirmed = confirm(
        "¿Estás seguro de que deseas eliminar esta tarea?"
      );

      if (userConfirmed) {
        // Eliminar la tarea
        await api.deleteTask(id);
        alert("Tarea eliminada correctamente");
      } else {
        // El usuario canceló la eliminación
        console.log("Eliminación cancelada por el usuario");
      }
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
      // Mostrar un mensaje de error al usuario si es necesario
      // this.showNotification("Error al eliminar la tarea", "error");
    }
  },
};
