<template>
  <div class="drawer-container">
    <h2 class="drawer-title"><i class="el-icon-setting" /> Configuration</h2>

    <div class="drawer-section">
      <h5 class="subheading">Theme base</h5>
      <el-button
        class="dark-mode"
        type="primary"
        :icon="darkMode ? 'el-icon-check' : 'el-icon-close'"
        round
        @click="handlerDarkMode()"
      >
        Dark mode
      </el-button>
    </div>
  </div>
</template>

<script>
import { toggleClass } from '@/utils'

export default {
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    handlerDarkMode() {
      this.darkMode = !this.darkMode
      toggleClass(document.body, 'dark-theme')
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;

  .drawer-title {
    color: $black;
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    margin-bottom: 12px;
    margin-top: 0;

    i {
      margin-right: 7px;
    }
  }

  .drawer-section {
    border-bottom: 1px solid $light-grayish-blue;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .subheading {
      color: $very-dark;
      font-size: 13px;
      font-weight: 400;
      text-transform: uppercase;
      margin: 15px 0;
      letter-spacing: 0.5px;
    }

    .dark-mode {
      width: 100%;
      text-align: left;
      padding: 12px;
      font-size: 14px;
      text-transform: uppercase;
      background-color: $black;
      border-color: $black;

      &:hover {
        background-color: rgba($black, 0.9);
        border-color: rgba($black, 0.9);
      }
    }
  }
}
</style>
