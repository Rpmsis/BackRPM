const mysql = require('../database/index');

/* `folioActivo`, `fecha`, `unidadmedida`, `cantidad`, `costo`, `tipo`, `descripcion`, `codigobarras` */

function insertar(folioActivo,fecha,unidadmedida,cantidad, costo, tipo,descripcion,codigobarras, minimo, callback) {
    mysql.query(`Insert into consumibles (folioActivo,fecha,unidadmedida,cantidad, costo, tipo,descripcion,codigobarras, minimo) 
        values ("${folioActivo}", "${fecha}", "${unidadmedida}", "${cantidad}","${costo}", "${tipo}","${descripcion}","${codigobarras}","${minimo}")`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: folioActivo//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar
