const {Schema, model} = require('mongoose')

const todoSchema = new Schema({
  date: {
    type: String,
  },
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  items: [
    {
      title: {
        type: String,
      },
      completed:{
        type: Boolean,
      },
      date: {
        type: String,
      },
    }
  ],
})

module.exports = model('Todo', todoSchema)
