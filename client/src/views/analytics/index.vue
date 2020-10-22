<template>
  <div class="wrapper-analytics">
    <div class="title">{{ $t("menu.analytics") }}</div>
    <Chart
      :key="isLanguageChanged"
      title-chart="analytics.numberTasks"
    />
  </div>
</template>

<script>
import Chart from '@/components/chart'

export default {
  name: 'Analytics',
  components: {
    Chart
  },
  metaInfo() {
    return {
      title: this.$t('menu.analytics')
    }
  },
  data() {
    return {
      isLanguageChanged: 1
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  watch: {
    language(value) {
      this.isLanguageChanged++
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-analytics {
  .title {
    font-size: 30px;
    margin-bottom: 30px;
  }
}
</style>
