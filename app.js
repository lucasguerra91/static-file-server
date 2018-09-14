// Solicita los modulos necesarios
const express = require('express')
const morgan = require('morgan')
const path = require('path')
var apiRouter = require('./routes/api_router')
// const fs = require('fs') lo usabamos para nuestra rutina de servir archivo

// Crea una aplicacion express y la pone dentro de la variable app
const app = express()

app.use(morgan('short'))

const staticPath = path.join(__dirname, 'static') // cargamos la direccion en una variable
app.use(express.static(staticPath)) // utilizamos express.static para servir los archivos

// Manejo de 404 not found
app.use((req, res) => {
  res.status(404)
  res.send('No se ha encontrado el archivo!')
})

app.use('/api', apiRouter)

app.use((err, req, res, next) => { // incluimos el parametro error
  console.error(err) // logueamos el error
  next(err) //  se lo mandamos al proximo middleware de manejo de errores
})

// Respuesta del error
app.use((_err, req, res, next) => {
  res.status(500)
  res.send('Internal server error.')
})

// Inicia la app en el puerto 3000
app.listen(3000, () => {
  console.log('Server started on port: 3000')
})

/* Log all incoming request,
app.use((req, res, next) => {
  console.log('Request IP: ' + req.url)
  console.log('Request date: ' + new Date())
  next() // sin esto se queda colgado porque no sabe que hacer
})
Lo vamos a reemplazar por el morgan
*/

/*
app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'static', req.url) // usa .join para encontar la direccion del archivo
  fs.stat(filePath, (err, fileInfo) => { // usa fs.stat para obtener data de la direccion que le pasamos
    if (err) { // si no encuentra data de la direccion, no existe, continua al proximo middleware
      next()
      return
    }

    if (fileInfo.isFile()) {
      res.sendFile(filePath) // si existe el archivo llama a res.sendFile
    } else {
      next() // si no existe pasa de md
    }
  })
})
*/
