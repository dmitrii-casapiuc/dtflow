const {Schema, model} = require('mongoose')

const noteSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
})

module.exports = model('Note', noteSchema)
