const moment = require('moment')
const _ = require('lodash')

const Todo = require('../models/Todo')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllTodo = async (req, res) => {
  try {
    const startOfMonth = moment(req.query.date).startOf('month').format('YYYY-MM-DD')
    const endOfMonth   = moment(req.query.date).endOf('month').format('YYYY-MM-DD')
    const monthDate = moment(req.query.date).startOf('month')
    let daysInMonth = []
    let labels = []

    const todosByMonth = await Todo.find({
      userId: req.user.userId,
      date: {
        "$gte": startOfMonth,
        "$lte": endOfMonth,
      }
    })

    _.times(monthDate.daysInMonth(), () => {
      daysInMonth.push(monthDate.format('YYYY-MM-DD'))
      labels.push(monthDate.format('DD'))
      monthDate.add(1, 'day')
    })

    let data = []

    daysInMonth.forEach(day => {
      if (todosByMonth.length > 0) {
        const findItem = todosByMonth.find(item => item.date === day)

        if (findItem) {
          data.push(findItem.items.length)
        } else {
          data.push(0)
        }
      } else {
        data.push(0)
      }
    })

    const analyticsTodo = {
      labels,
      data
    }

    res.status(200).json(analyticsTodo)
  } catch(error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
}
