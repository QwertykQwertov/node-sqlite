require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const read = require('node-readability')
const cors = require('cors')


const User = require('./db').User

app.set('port', process.env.PORT || 3001)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/users', (req, res, next) => {
  User.all((err, users) => {
    if (err) return next(err)
    res.send(users)
  })
})

app.post('/users', (req, res, next) => {
  const user = req.body
  console.log(user)
  User.create(
    user, (err, user) => {
      if (err) {
        res.send(err)
        console.log('err', err)
        return next(err)
      }
      console.log('ok')
      res.send('ok')
    })
})

app.get('/users/:id', (req, res, next) => {
  const id = req.params.id
  User.find(id, (err, user) => {
    if (err) return next(err)
    res.send(user)
  })
})

app.delete('/users/:id', (req, res, next) => {
  const id = req / params.id
  User.delete(id, (err) => {
    if (err) return next(err)
    res.send({ message: 'Deleted' })
  })
})

app.listen(app.get('port'), () => {
  console.log(`Web app available at http://127.0.0.1:${app.get('port')}`)
})

module.exports = app