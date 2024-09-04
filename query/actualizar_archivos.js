let id = Date.now();
function cargarArchivo(req, res, callback) {
    if (!req.files || Object.keys(req.files).length === 0) {
        callback(null, 'Faltanarchivos');
    } else {
        const archivos = [
            req.files.archivo,
            req.files.archivo2,
            req.files.archivo3,
            req.files.archivo4
        ];

        const nombresArchivos = [];
        let archivosGuardados = 0;
        const totalArchivos = archivos.length;
        const sinimagen = "productosinimagen.png";

        // Función para guardar un archivo
        const guardarArchivo = (archivo, index) => {
            if (!archivo) {
                const idunico = id + index;
                const nombreArchivo = `${idunico}-${sinimagen}`;

                nombresArchivos.push(nombreArchivo);
                archivosGuardados++;

                // Verificar si todos los archivos han sido guardados
                if (archivosGuardados === totalArchivos) {
                    callback(null, nombresArchivos); // Enviar los nombres de los archivos guardados
                }

            }
            else {
                // Generar un nombre único basado en la fecha actual
                const idunico = id + index;
                const nombreArchivo = `${idunico}-${archivo.name}`;
                const rutaGuardar = `uploads/${nombreArchivo}`;

                archivo.mv(rutaGuardar, (err) => {
                    if (err) {
                        return callback(err);
                    }
                    nombresArchivos.push(nombreArchivo);
                    archivosGuardados++;

                    // Verificar si todos los archivos han sido guardados
                    if (archivosGuardados === totalArchivos) {
                        callback(null, nombresArchivos); // Enviar los nombres de los archivos guardados
                    }
                });
            }
        };

        // Guardar todos los archivos
        archivos.forEach(guardarArchivo);

    }
}

module.exports = cargarArchivo