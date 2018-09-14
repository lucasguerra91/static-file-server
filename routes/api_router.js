const express = require('express')

const ALLOWED_IPS = [
  '127.8.0.1',
  '123.456.7.89'
]

const api = express.Router()

api.use((req, res, next) => {
  const userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1
  if (!userIsAllowed) {
    res.status(401).send('No esta autorizado!')
  } else {
    console.log('acceso a api')
    next()
  }
})

api.get('/users', (req, res) => { res.send('Acceso usuarios.') })
api.post('/users', (req, res) => { res.send('Acceso usuarios.') })

api.get('/messages', (req, res) => { /* ... */ })
api.post('/messages', (req, res) => { /* ... */ })

module.exports = api
