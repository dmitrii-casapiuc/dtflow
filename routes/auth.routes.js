const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const router = Router()

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ type: 'userNoFound' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ type: 'userWrongPassword' })
    }

    const token = jwt.sign(
      { userId: user.id },
      keys.jwt,
      { expiresIn: '1d' }
    )

    res.json({ token, userId: user.id })

  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      gender,
      avatarUrl
    } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ type: 'userHas' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      avatarUrl
    })

    await user.save()

    res.status(201).json({ type: 'userCreate' })
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

module.exports = router
