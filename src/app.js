const express = require('express')
const rutaProductos = require('./demo.routes/productosRoutes')
const rutaTipo = require('./demo.routes/tipoRoutes')

const app = express()

app.use(express.json())

const PORT = process.env.PORT | 5000

app.listen(PORT, ()=>console.log("WE ARE USING PORT "+PORT))

app.use('/produ', rutaProductos)

app.use('/tipo', rutaTipo)