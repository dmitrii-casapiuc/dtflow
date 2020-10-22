import request from '@/utils/request'

export function fetchAnalyticsTodo(query) {
  return request({
    url: '/api/analytics/todo',
    method: 'get',
    params: query
  })
}
