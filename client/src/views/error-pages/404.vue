<template>
  <div class="error-404">
    <div class="error-icon"><Svg404 /></div>
    <div class="error-title">404</div>
    <div class="error-subtitle">{{ $t('errorPages.errorSubtitle') }}</div>
    <div class="error-extra">
      <el-button
        type="primary"
        @click.native="hadnlerHome"
      >
        {{ $t('errorPages.backHome') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Svg404 from '@/assets/svg/404.svg'

export default {
  name: 'Error404',
  components: {
    Svg404
  },
  methods: {
    hadnlerHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.error-404 {
  .error-icon {
    margin-bottom: 24px;
    text-align: center;
  }

  .error-title {
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }

  .error-subtitle {
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }

  .error-extra {
    margin-top: 32px;
    text-align: center;
  }
}
</style>
