export default {
  state: {
    language: ''
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },
  actions: {
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
  }
}
