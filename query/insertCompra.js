const mysql = require('../database/index');

function insertar(folioActivo, fecha, proveedor, cantidad, costo, costototal, oc,codigobarras,descrip, callback) {

    mysql.query(`INSERT INTO compras(folioActivo, fecha, proveedor, cantidad, costo, costototal,  oc, codigobarras,descrip) VALUES ("${folioActivo}","${fecha}","${proveedor}","${cantidad}","${costo}","${costototal}","${oc}","${codigobarras}","${descrip}")`, function (error, respuesta) {

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
