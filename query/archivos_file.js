const fileUpload = require('express-fileupload');


function cargarArchivo(req, res, callback) {
    if (!req.files || Object.keys(req.files).length === 0) {
        // No se proporcionaron archivos
        console.log(" No se proporcionaron archivos")
        callback(null, '');
    }
else{
    const archivo = req.files.archivo; // 'archivo' debe coincidir con el nombre del campo en tu formulario de carga
    console.log(archivo)
    const nombre = Date.now() + '-' + archivo.name;
    const rutaGuardar = `uploads/${nombre}`;

    // Guardar el archivo en el sistema de archivos
    archivo.mv(rutaGuardar, (err) => {
        if (err) {
            return callback(err);
        }
        callback(null, nombre);
    });
}
}

module.exports = cargarArchivo