const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')

module.exports.login = async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'User is not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password. Try again' })
    }

    const token = jwt.sign(
      { userId: user.id },
      keys.jwt,
      { expiresIn: '1d' }
    )

    res.json({ token, userId: user.id })

  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
}

module.exports.register = async (req, res) => {
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
      return res.status(400).json({ message: 'This user already exists' })
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

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    errorHandler(res, error, 'Something went wrong. Try again')
  }
}
