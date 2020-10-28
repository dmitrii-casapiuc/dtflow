const {Router} = require('express')
const controller = require('../controllers/user')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')

const router = Router()

router.get('/info', auth, controller.info)
router.patch('/', auth, upload.single('avatar'), controller.update)

module.exports = router
