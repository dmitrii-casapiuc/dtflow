<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout'
}
</script>

<style lang="scss">
.empty-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

