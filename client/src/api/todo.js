import request from '@/utils/request'

export function addTodo({ todo, date }) {
  return request({
    url: '/api/todos',
    method: 'post',
    data: todo,
    params: { date }
  })
}

export function fetchTodos(query) {
  return request({
    url: '/api/todos',
    method: 'get',
    params: query
  })
}

export function fetchTodosByMonth(query) {
  return request({
    url: '/api/todos/month',
    method: 'get',
    params: query
  })
}

export function deleteTodo({ todo, date }) {
  return request({
    url: `/api/todos/${todo._id}`,
    method: 'delete',
    data: {
      date
    }
  })
}

export function updateTodo({ todo, calendarDate }) {
  return request({
    url: `/api/todos/${todo._id}`,
    method: 'patch',
    data: {
      todo,
      calendarDate
    }
  })
}

export function dragAndDropTodos(data) {
  return request({
    url: '/api/todos/sort',
    method: 'patch',
    data
  })
}
