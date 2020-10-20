<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    class="form"
    autocomplete="on"
    label-position="left"
  >
    <div class="title-container">
      <span class="title">{{ $t("auth.signIn") }}</span>
    </div>

    <el-form-item prop="email">
      <el-input
        ref="email"
        v-model="loginForm.email"
        :placeholder="$t('auth.email')"
        name="email"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        ref="password"
        v-model="loginForm.password"
        type="password"
        :placeholder="$t('auth.password')"
        name="password"
        tabindex="2"
        autocomplete="on"
        show-password
        @keyup.enter.native="handleLogin('loginForm')"
      />
    </el-form-item>

    <el-button
      :loading="loading"
      type="success"
      @click.prevent="handleLogin('loginForm')"
    >
      {{ $t("auth.login") }}
    </el-button>

    <p class="center">
      {{ $t("auth.noAccount") }}?
      <router-link to="/register">{{ $t("auth.register") }}</router-link>
    </p>
  </el-form>
</template>

<script>
export default {
  name: 'Login',
  metaInfo() {
    return {
      title: this.$t('auth.login')
    }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, message: this.$t('authRules.enterEmail'), trigger: 'blur' },
          { type: 'email', message: this.$t('authRules.correctEmail'), trigger: ['blur'] }
        ],
        password: [
          { required: true, message: this.$t('authRules.enterPassword'), trigger: 'blur' },
          { min: 6, max: 10, message: this.$t('authRules.lengthPassword'), trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  mounted() {
    if (this.$route.query.message) {
      this.$message({
        message: this.$t(`errors.${this.$route.query.message}`),
        type: this.$route.query.type || 'error'
      })
    }
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true

          this.$store.dispatch('login', this.loginForm)
            .then(() => {
              this.$router.push('/')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  margin: 15px 0 0 0;

  a {
    text-decoration: none;
  }
}
</style>
