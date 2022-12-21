const express = require('express')
const { createTable } = require('./config/createTable')
const { userLogin } = require('./controller/userLogin')
const { router } = require('./user.router')

const app = express()
app.use(express.json())

const dbOptions = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_name
  }
}
global.dbOptions = dbOptions

createTable()

app.post('/users/login', (req, res) => userLogin(req, res))
app.get('/', (req, res) => {
  res.status(200).send('Application is running !!')
})
app.use('/', router)

const port = process.env.port || 3000
app.listen(port, () => {
  console.log('listening to port 3000')
})

module.exports = {app}
