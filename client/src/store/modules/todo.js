import axios from 'axios'

export default {
  state: {
    todos: [],
    todosByMonth: []
  },
  mutations: {
    ADD_TODO: (state, todo) => {
      state.todos = [...state.todos, todo]
    },
    FETCH_TODOS: (state, todos) => {
      // eslint-disable-next-line no-prototype-builtins
      state.todos = todos.hasOwnProperty('items') ? todos.items : []
    },
    FETCH_TODOS_BY_MONTH: (state, todos) => {
      state.todosByMonth = todos
    },
    DELETE_TODO: (state, todoId) => {
      state.todos = state.todos.filter(todo => todo._id !== todoId)
    },
    CLEAR_TODOS: (state) => {
      state.todos = []
    },
    UPDATE_TODO: (state, { data, currentTodo }) => {
      let cloneTodos = [...state.todos]

      if (data.status === 'update') {
        const objIndex = cloneTodos.findIndex(todo => todo._id === currentTodo._id)
        cloneTodos[objIndex] = currentTodo
      } else if (data.status === 'move') {
        cloneTodos = cloneTodos.filter(todo => todo._id !== currentTodo._id)
      }

      state.todos = cloneTodos
    },
    DRAG_AND_DROP_TODOS: (state, todos) => {
      state.todos = todos
    }
  },
  getters: {
    todos: state => state.todos,
    todosByMonth: state => state.todosByMonth
  },
  actions: {
    addTodo({ commit }, { todo, date }) {
      return new Promise((resolve, reject) => {
        axios.post('/api/todos', todo, {
          params: {
            date
          }
        })
          .then(response => {
            commit('ADD_TODO', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    fetchTodos({ commit }, date) {
      return new Promise((resolve, reject) => {
        axios.get('/api/todos', {
          params: {
            date
          }
        })
          .then(response => {
            commit('FETCH_TODOS', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    fetchTodosByMonth({ commit }, date) {
      return new Promise((resolve, reject) => {
        axios.get('/api/todos/month', {
          params: {
            date
          }
        })
          .then(response => {
            commit('FETCH_TODOS_BY_MONTH', response.data)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    deleteTodo({ commit }, { todo, date }) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/todos/${todo._id}`, {
          data: {
            date
          }
        })
          .then(() => {
            commit('DELETE_TODO', todo._id)
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    updateTodo({ commit }, { todo, calendarDate }) {
      return new Promise((resolve, reject) => {
        axios.patch(`/api/todos/${todo._id}`, {
          todo,
          calendarDate
        })
          .then(response => {
            commit('UPDATE_TODO', {
              data: response.data,
              currentTodo: todo
            })
            resolve()
          })
          .catch(error => {
            commit('SET_ERROR', error.response)
            reject(error)
          })
      })
    },
    dragAndDropTodos({ commit }, { todos, date }) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/todos/sort', {
          todos,
          date
        })
          .then(() => {
            commit('DRAG_AND_DROP_TODOS', todos)
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
