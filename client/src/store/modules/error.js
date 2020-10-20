export default {
  state: {
    error: null
  },
  mutations: {
    SET_ERROR: (state, error) => {
      state.error = error
    },
    CLEAR_ERROR: state => {
      state.error = null
    }
  },
  getters: {
    error: state => state.error
  }
}
