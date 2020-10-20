import axios from 'axios'

export default {
  state: {
    token: localStorage.getItem('user-token') || ''
  },
  mutations: {
    UPDATE_TOKEN: (state, token) => {
      state.token = token
    },
    LOGOUT: (state) => {
      state.token = null
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', {
          email,
          password
        })
          .then(response => {
            localStorage.setItem('user-token', response.data.token)
            commit('UPDATE_TOKEN', response.data.token)
            resolve()
          })
          .catch(error => {
            localStorage.removeItem('user-token')
            commit('LOGOUT')
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    register({ commit }, newUser) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/register', newUser)
          .then(() => {
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    fetchToken({ commit }) {
      commit('UPDATE_TOKEN', localStorage.getItem('user-token'))
    },
    logout({ commit }) {
      commit('LOGOUT')
      localStorage.removeItem('user-token')
    }
  }
}
