<template>
  <div class="ctn-no-task">
    <p class="text-no-task">¡Vaya!, no se encontró ninguna tarea</p>
    <img class="img-no-task" src="/caja-vacia.png" alt="" />
  </div>
</template>

<style scoped>
.ctn-no-task {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 2rem;
  text-align: center;
}

.text-no-task {
  font-size: x-large;
}

.img-no-task {
  height: 20rem;
}
</style>
