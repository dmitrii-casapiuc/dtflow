import axios from 'axios'

export default {
  state: {
    info: {},
    language: ''
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
    },
    CLEAR_INFO: state => {
      state.info = {}
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },
  actions: {
    fetchInfo({ commit }) {
      axios.get('/api/users/info')
        .then(response => {
          commit('SET_INFO', response.data)
        })
        .catch(error => {
          commit('SET_ERROR', error.response)
        })
    },
    updateProfile({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/users', data)
          .then(response => {
            commit('SET_INFO', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    updateLanguage({ commit }, lang) {
      localStorage.setItem('currentLanguage', lang)
      commit('SET_LANGUAGE', lang)
    },
    autoLanguage({ commit }) {
      const currentLanguage = localStorage.getItem('currentLanguage')

      if (currentLanguage) {
        commit('SET_LANGUAGE', currentLanguage)
      } else {
        commit('SET_LANGUAGE', 'ru')
      }
    }
  },
  getters: {
    info: state => state.info,
    language: state => state.language
  }
}
