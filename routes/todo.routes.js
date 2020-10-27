const {Router} = require('express')
const moment = require('moment')
const _ = require('lodash')

const Todo = require('../models/Todo')
const errorHandler = require('../utils/errorHandler')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    let todos
    const items = await Todo.find({
      userId: req.user.userId,
      date: req.query.date,
    })
      .select('date items')
      .exec()

    if (items.length > 0) {
      todos = items[0]
    } else {
      todos = []
    }

    res.status(200).json(todos)
  } catch(error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
})

router.get('/month', auth, async (req, res) => {
  const startOfMonth = moment(req.query.date).startOf('month').format('YYYY-MM-DD')
  const endOfMonth   = moment(req.query.date).endOf('month').format('YYYY-MM-DD')

  try {
    const todos = await Todo.find({
      userId: req.user.userId,
      date: {
        "$gte": startOfMonth,
        "$lte": endOfMonth,
      }
    })

    res.status(200).json(todos)
  } catch(error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
})

router.post('/', auth, async (req, res) => {
  try {
    let todo
    const todos = await Todo.find({
      userId: req.user.userId,
      date: req.query.date,
    })

    if (todos.length > 0) {
      const item = {
        title: req.body.title,
        completed: req.body.completed,
        date: req.query.date
      }

      const todos = await Todo.findOneAndUpdate(
        {
          userId: req.user.userId,
          date: req.query.date
        },
        {$push: {items: item}},
        {new: true},
      )

      todo = _.last(todos.items)

      res.status(200).json(todo)
    } else {
      todo = new Todo({
        date: req.query.date,
        userId: req.user.userId,
        items: [
          {
            title: req.body.title,
            completed: req.body.completed,
            date: req.query.date
          }
        ]
      })

      await todo.save()
      res.status(201).json(todo.items[0])
    }
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      {
        date: req.body.date,
        userId: req.user.userId,
      },
      {$pull: {'items': {_id: req.params.id }}}
    )
    res.status(200).json()
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
})

router.patch('/sort', auth, async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      {
        date: req.body.date,
        userId: req.user.userId,
      },
      {$set: {
        items: [],
        items: req.body.todos 
      }},
      {new: true}
    )

    res.status(200).json({})
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
})

router.patch('/:id', auth, async (req, res) => {
  try {
    const {
      todo,
      calendarDate
    } = req.body

    if (todo.hasOwnProperty('date') && todo.date !== calendarDate) {
      await Todo.findOneAndUpdate(
        {
          date: calendarDate,
          userId: req.user.userId,
        },
        {$pull: {'items': {_id: req.params.id }}}
      )

      const todos = await Todo.find({
        userId: req.user.userId,
        date: todo.date,
      })

      if (todos.length > 0) {
        const item = {
          title: todo.title,
          completed: todo.completed,
          date: todo.date,
        }

        await Todo.findOneAndUpdate(
          {
            userId: req.user.userId,
            date: todo.date
          },
          {$push: {items: item}},
          {new: true},
        )

        res.status(200).json({status: 'move'})
      } else {
        const moveTodo = new Todo({
          date: todo.date,
          userId: req.user.userId,
          items: [
            {
              title: todo.title,
              completed: todo.completed,
              date: todo.date,
            }
          ]
        })

        await moveTodo.save()
        res.status(201).json({status: 'move'})
      }
    } else {
      await Todo.findOneAndUpdate(
        {
          date: calendarDate,
          userId: req.user.userId,
          "items._id": todo._id
        },
        {$set: {
          "items.$.title": todo.title,
          "items.$.completed": todo.completed,
          "items.$.date": todo.date || calendarDate,
        }},
        {new: true}
      )

      res.status(200).json({status: 'update'})
    }
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
})

module.exports = router
