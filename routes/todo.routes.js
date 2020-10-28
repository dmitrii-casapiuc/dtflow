const {Router} = require('express')

const controller = require('../controllers/todo')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, controller.getAll)
router.get('/month', auth, controller.getByMonth)
router.post('/', auth, controller.create)
router.delete('/:id', auth, controller.delete)
router.get('/sort', auth, controller.sort)
router.patch('/:id', auth, controller.update)

module.exports = router
