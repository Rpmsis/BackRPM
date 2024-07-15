const mysql1 = require('../database/index');
const mysql2 = require('../database/index');

function insertar(folioInsumos, F_creacion, tipoAct, F_alta, descrip, proveedor, folioOC, monto, F_adqui, Numserie
    , callback) {
    mysql1.query(`Insert into insumos (folioInsumos, F_creacion,tipoAct, F_alta, descrip, proveedor, folioOC, monto, F_adqui, Numserie) values 
        ("${folioInsumos}","${F_creacion}", "${tipoAct}", "${F_alta}", "${descrip}", "${proveedor}", "${folioOC}", "${monto}", "${F_adqui}", "${Numserie}")`, function (error, respuesta) {

        if (error) {
            return callback(error);
        } else {
            // Insertar en la segunda tabla solo si la primera inserción fue exitosa
            instAct(folioInsumos, F_creacion, (error, respuestaAct) => {
                if (error) {
                    return callback(error);
                } else {
                    callback(null, {
                        mensaje: folioInsumos /* 'Datos guardados con los ids => ' + respuesta.insertId + ' y ' + respuestaAct.insertId, */
                    });
                }
            });
        }
        console.log(respuesta);
    });

}


function instAct(folio, fcreacion, callback) {
    mysql2.query(`Insert into activosfijos (folioActivo, Fcreacion) values 
        ("${folio}","${fcreacion}"  )`, function (error, respuesta) {

        if (error) {
            return callback(error);
        } else {
            callback(null, respuesta);
        }
        console.log(respuesta);
    });
}


module.exports = insertar

