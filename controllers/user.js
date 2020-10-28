const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.info = async (req, res) => {
  try {
    const user = await User.find({_id: req.user.userId})

    res.status(200).json({
      email: user[0].email,
      name: user[0].name,
      gender: user[0].gender,
      avatarUrl: user[0].avatarUrl
    })
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
}

module.exports.update = async (req, res) => {
  const updated = {
    name: req.body.name
  }

  if (req.file) {
    updated.avatarUrl = req.file.path
  }

  try {
    const user = await User.findOneAndUpdate(
      {_id: req.user.userId,},
      {$set: updated},
      {new: true}
    )
      .select('name email gender avatarUrl')
      .exec()

    res.status(200).json(user)
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
}
