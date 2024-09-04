const mysql = require('../database/index');

function insertar(folioActivo,fecha, costo, cantidad, reponsable, area, tipo, idcheck, callback) {
    mysql.query(`Insert into movimientos_consumible (folioActivo,fecha, costo, cantidad, responsable, area, tipo, idcheck) 
        values ("${folioActivo}", "${fecha}", "${costo}", "${cantidad}", "${reponsable}","${area}","${tipo}","${idcheck}")`, function (error, respuesta) {

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
