import axios from 'axios'
import router from '@/router'

export default {
  setupInterceptors: store => {
    axios.defaults.baseURL = process.env.BASE_URL || process.env.VUE_APP_BASE_API

    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('user-token')

        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token
        }

        return config
      },
      error => {
        Promise.reject(error)
      })

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401 && window.location.href.indexOf('login') === -1) {
          store.dispatch('logout')
          router.push('/login?message=no-authorization&type=error')
        }

        return Promise.reject(error)
      },
    )
  }
}
