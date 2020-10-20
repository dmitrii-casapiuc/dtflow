<template>
  <el-form
    ref="registerForm"
    :model="registerForm"
    :rules="rules"
    class="form"
    label-position="top"
  >
    <div class="title-container">
      <span class="title">{{ $t("auth.createAccount") }}</span>
    </div>

    <el-form-item prop="name">
      <el-input
        v-model="registerForm.name"
        :placeholder="$t('auth.name')"
        name="name"
        type="text"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        ref="email"
        v-model="registerForm.email"
        :placeholder="$t('auth.email')"
        name="email"
        type="text"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item prop="pass">
      <el-input
        v-model="registerForm.pass"
        type="password"
        :placeholder="$t('auth.password')"
        autocomplete="off"
        show-password
      />
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input
        v-model="registerForm.checkPass"
        type="password"
        :placeholder="$t('auth.confirmPassword')"
        autocomplete="off"
        show-password
      />
    </el-form-item>
    <el-form-item class="gender">
      <el-radio-group v-model="registerForm.gender">
        <el-radio :label="'male'">{{ $t('auth.male') }}</el-radio>
        <el-radio :label="'female'">{{ $t('auth.female') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="success"
        @click="handleRegister('registerForm')"
      >
        {{ $t("auth.submit") }}
      </el-button>
    </el-form-item>

    <p class="center">
      {{ $t("auth.account") }}?
      <router-link to="/login">{{ $t("auth.login") }}</router-link>
    </p>
  </el-form>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$t('auth.register')
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('authRules.enterPassword')))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('authRules.enterPasswordAgain')))
      } else if (value !== this.registerForm.pass) {
        callback(new Error(this.$t('authRules.matchPassword')))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        email: '',
        pass: '',
        checkPass: '',
        gender: 'male'
      },
      rules: {
        name: [
          { required: true, message: this.$t('authRules.enterName'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('authRules.enterEmail'), trigger: 'blur' },
          { type: 'email', message: this.$t('authRules.correctEmail'), trigger: ['blur'] }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 10, message: this.$t('authRules.lengthPassword'), trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    handleRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true

          let avatarUrl = '/images/avatar/avatar-man.png'

          if (this.registerForm.gender === 'female') {
            avatarUrl = '/images/avatar/avatar-woman.png'
          }

          const formData = {
            name: this.registerForm.name,
            email: this.registerForm.email,
            password: this.registerForm.checkPass,
            gender: this.registerForm.gender,
            avatarUrl
          }

          this.$store.dispatch('register', formData)
            .then(() => {
              this.$router.push('/login?message=success-register&type=success')
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
