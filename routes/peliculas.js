// routes/peliculas.js
const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

// Definición de las rutas del recurso /peliculas
router.get('/', peliculaController.listar);
router.get('/ultimas', peliculaController.obtenerUltimasCinco); // Ojo: poner esta antes del :id
router.get('/:id', peliculaController.obtenerPorId);
router.post('/', peliculaController.agregar);
router.put('/:id', peliculaController.editar);
router.delete('/:id', peliculaController.eliminar);

module.exports = router;