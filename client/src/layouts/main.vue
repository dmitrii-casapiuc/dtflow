<template>
  <div
    class="app-main-layout"
  >
    <Navbar @click="isOpen = !isOpen" />

    <div class="app-wrapper">
      <Sidebar
        v-model="isOpen"
      />

      <main
        class="app-content"
      >
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
    <RightPanel>
      <Settings />
    </RightPanel>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import RightPanel from '@/components/right-panel'
import Settings from '@/components/settings'

export default {
  name: 'MainLayout',
  components: {
    Navbar,
    Sidebar,
    RightPanel,
    Settings
  },
  data: () => ({
    isOpen: false
  })
}
</script>

<style lang="scss" scoped>
.app-main-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .app-wrapper {
    display: flex;
    flex-grow: 1;

    .app-content {
      padding: 50px 30px;
      width: 100%;
    }
  }
}
</style>
