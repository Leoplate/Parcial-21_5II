const express = require('express')

const productos = require('../datos/productos.json')

const tipo = require('../datos/tipoProductos.json')

const rutaProductos = express.Router()


rutaProductos.get('/', (req, res) => {
    res.status(200).json(productos)
})


rutaProductos.get('/:id', (req, res) => {
     const idx = req.params.id

     const indice = productos.findIndex(dato=> dato.idProducto == idx)
     
     if(indice>=0){
        res.status(200).json(productos[indice])

     }else{
        res.status(404).json({"Mensaje":"No existe codigo "+idx})
     }
})



rutaProductos.post('/', (req, res) => {
      const cuerpo = req.body

      const tabla = productos.map(dato=>dato.idProducto)

      const maximo = tabla.length>0 ? Math.max(...tabla) + 1: 1

      const idx = tipo.findIndex(data=>data.idTipoProducto==cuerpo.idTipoProducto && data.enabled)
           
            if(idx>=0){
                const final = {
                idProducto: maximo,
                descripcion: cuerpo.descripcion,
                stock: 0,
                idTipoProducto: cuerpo.idTipoProducto
                }
                   
               
                productos.push(final)
                   res.status(201).json({"Mensaje":"Nuevo producto codigo "+maximo+" ingresado"})
            }else{
                res.status(400).json({"Mensaje": "No existe codigo tipo producto "+cuerpo.idTipoProducto})
            }


})



rutaProductos.delete('/:id', (req, res)=> {
       const id = req.params.id
       const idx = productos.findIndex(data=>data.idProducto == id)

          if(idx>=0){
              productos.splice(idx,1)
              res.status(200).json({"Mensaje":"Producto de codigo "+id+" eliminado"})
          }else{
              res.status(404).json({"Mensaje":"Codigo de producto "+id+" inexistente"})
          }
})



rutaProductos.put('/:id', (req, res) => {
       const id = req.params.id
       const cuerpo = req.body
       const idx = productos.findIndex(data=>data.idProducto == id)
       const idxt = tipo.findIndex(data=>data.idTipoProducto==cuerpo.idTipoProducto)
          
          if(idx>=0){
              if(tipo[idxt].enabled && idxt >=0){
                 productos[idx].descripcion = cuerpo.descripcion
                 productos[idx].stock = cuerpo.stock
                 productos[idx].idTipoProducto = cuerpo.idTipoProducto
                 res.status(201).json({"Mensaje":"Producto codigo "+id+" modificado"})
              }   
              else{
                 res.status(404).json({"Mensaje":"tipo de producto desactivado"})
              }   
          }else{
             res.status(404).json({"Mensaje":"El producto de codigo "+id+" no existe"})
          }
     
})



module.exports = rutaProductos