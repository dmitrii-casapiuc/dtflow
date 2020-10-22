<template>
  <el-row class="navbar">
    <el-col :span="12" class="left-nabar">
      <a href="#" @click.prevent="$emit('click')">
        <i class="el-icon-s-operation" />
      </a>
      <span class="date-time">{{ date | date('datetime') }}</span>
    </el-col>
    <el-col :span="12" class="right-nabar">
      <el-dropdown class="languages">
        <span class="el-dropdown-link">
          {{ langName }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown" class="wrapper-laguages">
          <el-dropdown-item
            v-for="(language, index) in languages"
            :key="index"
            @click.native="changeLanguage(language.code)"
          >
            <component :is="language.image" />
            <span class="lang-name">{{ language.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="settings">
        <div class="el-dropdown-link wrapper-avatar">
          <el-avatar
            class="avatar-image"
            :size="40"
            :src="info.avatarUrl"
            :alt="info.name"
          />
          <div class="avatar-name">{{ info.name }}</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-user"
            @click.native="profile"
          >
            {{ $t("menu.profile") }}
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-switch-button"
            @click.native="logout"
          >
            {{ $t("menu.logOut") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FlagEnglish from '@/assets/svg/englishFlag.svg'
import FlagRussian from '@/assets/svg/russianFlag.svg'

function switchLanguageName(lang) {
  if (lang === 'en') {
    return 'English'
  }

  return 'Русский'
}

export default {
  components: {
    FlagEnglish,
    FlagRussian
  },
  data: () => ({
    date: new Date(),
    interval: null,
    langName: 'Русский',
    languages: [
      {
        name: 'English',
        code: 'en',
        image: 'FlagEnglish',
        divided: false
      },
      {
        name: 'Русский',
        code: 'ru',
        image: 'FlagRussian',
        divided: true
      }
    ]
  }),
  computed: mapGetters(['info', 'language']),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.langName = switchLanguageName(this.language)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions(['updateLanguage']),
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    profile() {
      this.$router.push('/profile')
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      this.langName = switchLanguageName(lang)
      this.updateLanguage(lang)
    }
  }
}
</script>

<style lang="scss">
.navbar {
  background: $blue;
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);

  i {
    font-size: 25px;
    color: $white;
  }

  .left-nabar {
    display: flex;
    align-items: center;

    .date-time {
      margin-left: 20px;
      color: $white;
    }
  }

  .right-nabar {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .el-dropdown-link {
      cursor: pointer;
      color: $white;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

    .languages {
      margin-right: 20px;
    }

    .wrapper-avatar {
      display: flex;
      align-items: center;

      .avatar-image {
        margin-right: 10px;
      }
    }
  }
}

.wrapper-laguages {
  width: 120px;

  .el-dropdown-menu__item {
    display: flex;
    padding: 0 10px;
    line-height: 30px;

    svg {
      width: 20px;
      margin-right: 7px;
    }

    &.el-dropdown-menu__item--divided:before {
      margin: 0;
    }
  }
}
</style>
