<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
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

