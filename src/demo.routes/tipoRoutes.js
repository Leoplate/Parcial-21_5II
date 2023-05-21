const express = require('express')

const tipo = require('../datos/tipoProductos.json')


const rutaTipo = express.Router()


rutaTipo.get('/', (req, res) => {
      res.status(200).json(tipo)
})






module.exports = rutaTipo