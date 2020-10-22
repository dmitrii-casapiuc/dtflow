<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/empty'
import MainLayout from '@/layouts/main'
import AuthLayout from '@/layouts/auth'

export default {
  components: {
    AuthLayout,
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  }
}
</script>
