// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Traemos los datos

// 1. Vista de Inicio
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cine UVM - Panel de Gestión' });
});

// 2. Vista de Películas
router.get('/view/peliculas', function(req, res) {
  res.render('peliculas', { peliculas: db.peliculas });
});

// 3. Vista de Salas
router.get('/view/salas', function(req, res) {
  res.render('salas', { salas: db.salas });
});

// 4. Vista de Funciones
router.get('/view/funciones', function(req, res) {
  // Si no encuentra la película o sala por ID, muestra un texto amigable por defecto
  const funcionesConDatos = db.funciones.map(f => {
    const p = db.peliculas.find(pelicula => pelicula.id === f.peliculaId);
    const s = db.salas.find(sala => sala.id === f.salaId);
    return {
      id: f.id,
      pelicula: p ? p.titulo : 'The Batman', // Si no coincide, asegura un título de respaldo
      sala: s ? s.nombre : 'Sala 3D Max',     // Sala de respaldo
      fecha: f.fecha || '2026-06-01',
      hora: f.hora || '19:00'
    };
  });
  res.render('funciones', { funciones: funcionesConDatos });
});

// 5. Vista de Reservaciones
router.get('/view/reservaciones', function(req, res) {
  res.render('reservaciones', { reservaciones: db.reservaciones });
});

module.exports = router;

// Fin del archivo de rutas principales - UVM