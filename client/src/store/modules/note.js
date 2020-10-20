import axios from 'axios'

export default {
  state: {
    notes: []
  },
  mutations: {
    ADD_NOTE: (state, note) => {
      state.notes = [...state.notes, note]
    },
    FETCH_NOTES: (state, notes) => {
      state.notes = notes
    },
    EDIT_NOTE: (state, currentNote) => {
      const cloneNotes = [...state.notes]
      const objIndex = cloneNotes.findIndex(note => note._id === currentNote._id)

      cloneNotes[objIndex] = currentNote
      state.notes = cloneNotes
    },
    DELETE_NOTE: (state, noteId) => {
      state.notes = state.notes.filter(note => note._id !== noteId)
    }
  },
  getters: {
    notes: state => state.notes
  },
  actions: {
    addNote({ commit }, note) {
      return new Promise((resolve, reject) => {
        axios.post('/api/notes', note)
          .then(response => {
            commit('ADD_NOTE', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    editNote({ commit }, note) {
      return new Promise((resolve, reject) => {
        axios.patch(`/api/notes/${note._id}`, note)
          .then(response => {
            commit('EDIT_NOTE', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    deleteNote({ commit }, note) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/notes/${note._id}`)
          .then(() => {
            commit('DELETE_NOTE', note._id)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    fetchNotes({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/notes')
          .then(response => {
            commit('FETCH_NOTES', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    }
  }
}
