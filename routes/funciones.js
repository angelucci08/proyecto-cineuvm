// routes/funciones.js
const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/funcionController');

// Endpoints para /funciones
router.get('/', funcionController.listar);
router.get('/rango/:fechaInicio/:fechaFin', funcionController.filtrarPorFechas); // Endpoint filtro de fecha
router.post('/', funcionController.agregar);
router.put('/:id', funcionController.editar);
router.delete('/:id', funcionController.eliminar);
router.delete('/:id/romper-pelicula', funcionController.eliminarRelacionPelicula); // Endpoint romper lazo

module.exports = router;

// Fin del archivo de rutas de funciones - UVM