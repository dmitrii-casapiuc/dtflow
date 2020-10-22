import { login, fetchInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    fetchInfo({ commit }) {
      return new Promise((resolve, reject) => {
        fetchInfo().then(response => {
          commit('SET_INFO', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    login({ commit }, userInfo) {
      const { email, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ email, password }).then(response => {
          const { token } = response
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
