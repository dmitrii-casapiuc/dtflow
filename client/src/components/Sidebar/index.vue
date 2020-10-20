<template>
  <div class="sidebar">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      :collapse="value"
    >
      <el-menu-item
        v-for="(link, index) in links"
        :key="index"
        :index="link.url"
        :class="link.url === currentUrl ? 'is-active router-link-active' : ''"
      >
        <router-link :to="link.url" :exact="link.exact">
          <i :class="link.icon" />
          <span>{{ $t(`menu.${link.title}`) }}</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      links: [
        { title: 'analytics', url: '/', icon: 'el-icon-menu' },
        { title: 'dailyPlanner', url: '/daily-planner', icon: 'el-icon-date' },
        { title: 'notes', url: '/notes', icon: 'el-icon-notebook-2' }
      ],
      isCollapse: true
    }
  },
  computed: {
    currentUrl() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding-top: 3px;
  max-width: 250px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);

  .el-menu {
    border-right: none;

    .el-menu-item a {
      color: $very-dark;
      text-decoration: none;
      display: block;
      height: 100%;
    }

    .el-menu-item.is-active a {
      color: $blue;
    }
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
}
</style>
