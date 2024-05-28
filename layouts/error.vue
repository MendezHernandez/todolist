<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      Página no encontrada. Por favor, vuelva al inicio
    </h1>
    <h1 v-else>
      Ha ocurrido un error inesperado. Por favor, vuelva al inicio.
    </h1>
    <div class="ctn-link-home">
      <NuxtLink class="link-home" to="/">Volver a inicio</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style scoped>
.ctn-link-home {
  margin-top: 4rem;
  text-align: center;
}

.link-home {
  text-align: center;
  font-size: x-large;
}
</style>
