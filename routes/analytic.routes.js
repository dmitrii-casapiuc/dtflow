const {Router} = require('express')
const controller = require('../controllers/analytic')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/todo', auth, controller.getAllTodo)

module.exports = router
