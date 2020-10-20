<template>
  <div class="no-data">
    <div class="no-data-icon"><NoData /></div>
  </div>
</template>

<script>
import NoData from '@/assets/svg/noData.svg'

export default {
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  height: 79vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
