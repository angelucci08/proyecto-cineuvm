// controllers/funcionController.js
const db = require('../database');

class FuncionController {
    
    // 1. GET: Listar todas las funciones
    listar(req, res) {
        try {
            return res.status(200).json(db.funciones);
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al obtener funciones", error });
        }
    }

    // 2. GET: Filtrar funciones por rango de fechas (Requisito de la tarea)
    // Se usará pasando las fechas en la URL, ej: /funciones/rango/2026-06-01/2026-06-02
    filtrarPorFechas(req, res) {
        try {
            const { fechaInicio, fechaFin } = req.params;
            
            const funcionesFiltradas = db.funciones.filter(f => {
                return f.fecha >= fechaInicio && f.fecha <= fechaFin;
            });

            return res.status(200).json(funcionesFiltradas);
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al filtrar fechas", error });
        }
    }

    // 3. POST: Crear una nueva función (Relaciona Película y Sala)
    agregar(req, res) {
        try {
            const { peliculaId, salaId, fecha, hora } = req.body;

            if (!peliculaId || !salaId || !fecha || !hora) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const nuevaFuncion = {
                id: db.funciones.length + 1,
                peliculaId: parseInt(peliculaId),
                salaId: parseInt(salaId),
                fecha,
                hora
            };

            db.funciones.push(nuevaFuncion);
            return res.status(201).json({ mensaje: "Función creada con éxito", data: nuevaFuncion });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al crear la función", error });
        }
    }

    // 4. PUT: Modificar una función
    editar(req, res) {
        try {
            const { id } = req.params;
            const { peliculaId, salaId, fecha, hora } = req.body;

            const index = db.funciones.findIndex(f => f.id === parseInt(id));
            if (index === -1) {
                return res.status(404).json({ mensaje: "Función no encontrada" });
            }

            db.funciones[index].peliculaId = peliculaId ? parseInt(peliculaId) : db.funciones[index].peliculaId;
            db.funciones[index].salaId = salaId ? parseInt(salaId) : db.funciones[index].salaId;
            db.funciones[index].fecha = fecha || db.funciones[index].fecha;
            db.funciones[index].hora = hora || db.funciones[index].hora;

            return res.status(200).json({ mensaje: "Función modificada con éxito", data: db.funciones[index] });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al editar la función", error });
        }
    }

    // 5. DELETE: Eliminar una función por completo
    eliminar(req, res) {
        try {
            const { id } = req.params;
            const index = db.funciones.findIndex(f => f.id === parseInt(id));

            if (index === -1) {
                return res.status(404).json({ mensaje: "Función no encontrada" });
            }

            const eliminada = db.funciones.splice(index, 1);
            return res.status(200).json({ mensaje: "Función eliminada con éxito", data: eliminada[0] });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al eliminar la función", error });
        }
    }

    // 6. DELETE: Romper la relación entre entidades (Requisito de la tarea)
    // Ponemos la película de esa función en "0" o null, rompiendo el enlace sin borrar la función completa.
    eliminarRelacionPelicula(req, res) {
        try {
            const { id } = req.params; // ID de la función
            const index = db.funciones.findIndex(f => f.id === parseInt(id));

            if (index === -1) {
                return res.status(404).json({ mensaje: "Función no encontrada" });
            }

            // Rompemos el lazo asignando null al ID de la película asociada
            db.funciones[index].peliculaId = null;

            return res.status(200).json({ 
                mensaje: "Relación eliminada: La película ha sido removida de esta función", 
                data: db.funciones[index] 
            });
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al romper la relación", error });
        }
    }
}

module.exports = new FuncionController();