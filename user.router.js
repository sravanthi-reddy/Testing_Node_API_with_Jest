const express = require('express')
const { getUsers, getUserById } = require('./controller/getUsers')
const { addUser } = require('./controller/insertUsers')
const { errorMiddleware } = require('./middleware/errorMiddleware')
const { routerMiddleware } = require('./middleware/routerMiddleware')
const router = express.Router()

router.use(routerMiddleware)

router.get('/users', (req, res) => getUsers(req, res))
router.get('/users/:id', (req, res) => getUserById(req, res))
router.post('/users', errorMiddleware, (req, res) => addUser(req, res))

module.exports = { router }
