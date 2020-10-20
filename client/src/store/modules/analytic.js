import axios from 'axios'

export default {
  actions: {
    async fetchAnalyticsTodo({ commit }, date) {
      try {
        const { data } = await axios.get('/api/analytics/todo', {
          params: {
            date
          }
        })

        return data
      } catch (error) {
        commit('SET_ERROR', error.response)
        throw error
      }
    }
  }
}
