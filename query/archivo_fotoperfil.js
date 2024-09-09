function cargarArchivo(req, res, callback) {
    if (!req.files || Object.keys(req.files).length === 0) {
        // No se proporcionaron archivos
        callback(null, 'Parece que existen campos vacíos, válida la información nuevamente');
    }
    else {
        const archivo = req.files.archivo; // 'archivo' debe coincidir con el nombre del campo en tu formulario de carga
        const nombre = Date.now() + '-' + archivo.name;
        const rutaGuardar = `fotoperfil/${nombre}`;

        // Guardar el archivo en el sistema de archivos
        archivo.mv(rutaGuardar, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, nombre);
        });
    }

}

module.exports = cargarArchivo;