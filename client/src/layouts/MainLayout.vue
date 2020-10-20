<template>
  <div>
    <Loader v-if="loading" loading="loading" />
    <div
      v-else
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Loader from '@/components/Loader'
import RightPanel from '@/components/RightPanel'
import Settings from '@/components/RightPanel/Settings'

export default {
  name: 'MainLayout',
  components: {
    Navbar,
    Sidebar,
    Loader,
    RightPanel,
    Settings
  },
  data: () => ({
    isOpen: false,
    loading: true
  }),
  computed: mapGetters(['error']),
  watch: {
    error(error) {
      if (error && error.data && error.data.type) {
        this.$message.error(this.$t(`errorsBackend.${error.data.type}`))
      }
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  }
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
