<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AuthLayout',
  computed: mapGetters(['error']),
  watch: {
    error(error) {
      if (error && error.data && error.data.type) {
        this.$message.error(this.$t(`errorsBackend.${error.data.type}`))
      }
    }
  }
}
</script>

<style lang="scss">
.auth-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: $light-grayish-blue;
}
</style>

