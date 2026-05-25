// controllers/peliculaController.js
const db = require('../database');

class PeliculaController {
    
    // 1. GET: Listar todas las películas
    listar(req, res) {
        try {
            return res.status(200).json(db.peliculas);
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al obtener las películas", error });
        }
    }

    // 2. GET: Mostrar un elemento por su ID
    obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const pelicula = db.peliculas.find(p => p.id === parseInt(id));
            
            if (!pelicula) {
                return res.status(404).json({ mensaje: "Película no encontrada" });
            }
            return res.status(200).json(pelicula);
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al buscar la película", error });
        }
    }

    // 3. GET: Mostrar las últimas 5 películas (Criterio: Orden ID descendente)
    obtenerUltimasCinco(req, res) {
        try {
            // Clonamos el array original con [...] para no desordenar la base de datos principal
            const ultimas = [...db.peliculas]
                .sort((a, b) => b.id - a.id) // Ordena de mayor a menor según el ID
                .slice(0, 5);               // Toma solo los primeros 5 elementos
            
            return res.status(200).json(ultimas);
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al obtener las últimas películas", error });
        }
    }

    // 4. POST: Agregar una película
    agregar(req, res) {
        try {
            const { titulo, duracion, genero, fechaEstreno } = req.body;

            if (!titulo || !duracion) {
                return res.status(400).json({ mensaje: "El título y la duración son obligatorios" });
            }

            const nuevaPelicula = {
                id: db.peliculas.length + 1,
                titulo,
                duracion: parseInt(duracion),
                genero: genero || "Sin género",
                fechaEstreno: fechaEstreno || new Date().toISOString().split('T')[0]
            };

            db.peliculas.push(nuevaPelicula);
            return res.status(201).json({ mensaje: "Película agregada con éxito", data: nuevaPelicula });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al agregar la película", error });
        }
    }

    // 5. PUT: Modificar datos de una película
    editar(req, res) {
        try {
            const { id } = req.params;
            const { titulo, duracion, genero, fechaEstreno } = req.body;
            
            const index = db.peliculas.findIndex(p => p.id === parseInt(id));

            if (index === -1) {
                return res.status(404).json({ mensaje: "Película no encontrada" });
            }

            // Editamos los campos viejos con los que vienen en el body (si no vienen, dejamos los que estaban)
            db.peliculas[index].titulo = titulo || db.peliculas[index].titulo;
            db.peliculas[index].duracion = duracion ? parseInt(duracion) : db.peliculas[index].duracion;
            db.peliculas[index].genero = genero || db.peliculas[index].genero;
            db.peliculas[index].fechaEstreno = fechaEstreno || db.peliculas[index].fechaEstreno;
            
            return res.status(200).json({ mensaje: "Película modificada con éxito", data: db.peliculas[index] });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al editar la película", error });
        }
    }

    // 6. DELETE: Eliminar una película de la lista
    eliminar(req, res) {
        try {
            const { id } = req.params;
            const index = db.peliculas.findIndex(p => p.id === parseInt(id));

            if (index === -1) {
                return res.status(404).json({ mensaje: "Película no encontrada" });
            }

            // Removemos el elemento del array
            const eliminada = db.peliculas.splice(index, 1);
            
            return res.status(200).json({ mensaje: "Película eliminada con éxito", data: eliminada[0] });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al eliminar la película", error });
        }
    }
}

module.exports = new PeliculaController();

// Fin del archivo de controlador de peliculas - UVM 