// Solicita los modulos necesarios
const express = require('express')
const path = require('path')
const fs = require('fs')

// Crea una aplicacion express y la pone dentro de la variable app
const app = express()

// Log all incoming request,
app.use((req, res, next) => {
    console.log('Request IP: ' + req.url)
    console.log('Request date: ' + new Date())
    next(); // sin esto se queda colgado porque no sabe que hacer
});

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
    });
});

// Manejo de 404 not found
app.use((req, res) => {
    res.status(404)
    res.send('No se ha encontrado el archivo!')
});

// Inicia la app en el puerto 3000
app.listen(3000, () => {
    console.log('Server started on port: 3000');
});