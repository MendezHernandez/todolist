<template>
  <div v-if="loading" class="ctn-loader">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.ctn-loader {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 1rem solid rgba(0, 0, 0, 0.1);
  position: relative;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border-left-color: var(--primary-color);

  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
