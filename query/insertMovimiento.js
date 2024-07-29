const mysql = require('../database/index');

function insertar(folioActivo,fecha, costo, cantidad, reponsable, area, tipo, callback) {
    mysql.query(`Insert into movimientos (folioActivo,fecha, costo, cantidad, responsable, area, tipo) 
        values ("${folioActivo}", "${fecha}", "${costo}", "${cantidad}", "${reponsable}","${area}","${tipo}")`, function (error, respuesta) {

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
