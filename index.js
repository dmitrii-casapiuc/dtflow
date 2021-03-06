
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const keys = require('./config/keys')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const todoRoutes = require('./routes/todo.routes')
const analyticsRoutes = require('./routes/analytic.routes')

const app = express()

mongoose.set('useFindAndModify', false)

app.use(express.json({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(cors())

// register routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/analytics', analyticsRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()
