const {Router} = require('express')
const Note = require('../models/Note')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')
const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.userId
    })
      .select('title description color')
      .exec()

    res.status(200).json(notes)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({
      userId: req.user.userId,
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    })

    await note.save()
    res.status(201).json(note)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.patch('/:id', auth, async (req, res) => {
  const updated = {
    title: req.body.title,
    description: req.body.description,
    color: req.body.color,
  }

  try {
    const note = await Note.findOneAndUpdate(
      {_id: req.body._id},
      {$set: updated},
      {new: true}
    )

    res.status(200).json(note)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.deleteOne({_id: req.params.id})
    
    res.status(200).json()
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

module.exports = router
