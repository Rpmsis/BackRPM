const mysql = require('../database/index');

function insertar(idviajes, folio, fecha_registro,callback) {
    mysql.query(`Insert into hojas_viajeras (idviajes, folio, fecha_registro) 
        values ("${idviajes}", "${folio}","${fecha_registro}")`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: 'Folio registrado'//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar
