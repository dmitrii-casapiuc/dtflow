<template>
  <el-button
    v-loading.fullscreen.lock="loading"
    type="primary"
  />
</template>

<script>
export default {
  props: {
    loading: Boolean
  }
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  border: none;
}
</style>
