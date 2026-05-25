const database = {
    peliculas: [
        { id: 1, titulo: "Inception", duracion: 148, genero: "Sci-Fi", fechaEstreno: "2010-07-16" },
        { id: 2, titulo: "Interstellar", duracion: 169, genero: "Sci-Fi", fechaEstreno: "2014-11-07" },
        { id: 3, titulo: "The Dark Knight", duracion: 152, genero: "Accion", fechaEstreno: "2008-07-18" },
        { id: 4, titulo: "Avatar", duracion: 162, genero: "Ficcion", fechaEstreno: "2009-12-18" },
        { id: 5, titulo: "Gladiator", duracion: 155, genero: "Drama", fechaEstreno: "2000-05-05" },
        { id: 6, titulo: "Matrix", duracion: 136, genero: "Sci-Fi", fechaEstreno: "1999-03-31" },
        { id: 7, titulo: "The Batman", duracion: 176, genero: "Accion", fechaEstreno: "2022-03-04" } // <-- Nueva película
    ],
    salas: [
        { id: 1, nombre: "Sala VIP 1", capacidad: 50 },
        { id: 2, nombre: "Sala 2D General", capacidad: 150 },
        { id: 3, nombre: "Sala 3D Max", capacidad: 100 } // <-- Nueva sala
    ],
    funciones: [
        { id: 1, peliculaId: 1, salaId: 1, fecha: "2026-06-01", hora: "18:00" },
        { id: 2, peliculaId: 2, salaId: 2, fecha: "2026-06-02", hora: "21:00" },
        { id: 3, peliculaId: 7, salaId: 3, fecha: "2026-06-03", hora: "19:30" } // <-- Nueva función conectando la nueva película y sala
    ],
    tickets: [],
    reservaciones: [
        { id: 1, funcionId: 1, cliente: "Angel Graterol", cantidadAsientos: 2, fechaReservacion: "2026-05-25" },
        { id: 2, funcionId: 3, cliente: "Diego Perdomo", cantidadAsientos: 3, fechaReservacion: "2026-05-25" } // <-- Nueva reservación para Diego
    ]
};

module.exports = database;