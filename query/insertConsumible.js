const mysql = require('../database/index');

function insertar(folioActivo, fecha, unidadmedida, enteros, fracciones, canestandar, tipo, descripcion, oc, proveedor, costo, callback) {
    mysql.query(`Insert into consumibles (folioActivo,fecha,unidadmedida,enteros,fracciones,canestandar,tipo,descripcion, oc, proveedor, costo) 
        values ("${folioActivo}", "${fecha}", "${unidadmedida}", "${enteros}", "${fracciones}", "${canestandar}", "${tipo}", "${descripcion}", "${oc}", "${proveedor}", "${costo}")`, function (error, respuesta) {

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
