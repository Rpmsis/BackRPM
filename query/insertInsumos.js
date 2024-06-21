const mysql1 = require('../database/index');
const mysql2 = require('../database/index');

function insertar (folio,fcreacion,falta,descrip,prov, fDOS, monto, fadqui, numserie, callback){
    mysql1.query(`Insert into insumos (folioInsumos, F_creacion, F_alta, descrip, proveedor, folioDOS, monto, F_adqui, Numserie) values 
        ("${folio}","${fcreacion}", "${falta}", "${descrip}", "${prov}", "${fDOS}", "${monto}", "${fadqui}", "${numserie}")`, function(error,respuesta){
        
        if (error) {
            return callback(error);
        } else {
            // Insertar en la segunda tabla solo si la primera inserción fue exitosa
            instAct(folio,fcreacion, falta, descrip, (error, respuestaAct) => {
                if (error) {
                    return callback(error);
                } else {
                    callback(null, {
                        mensaje: 'Datos guardados con los ids => ' + respuesta.insertId + ' y ' + respuestaAct.insertId,
                    });
                }
            });
        }
        console.log(respuesta);
    });
    
}


function instAct(folio,fcreacion,falta,descrip, callback) {
    mysql2.query(`Insert into activosfijos (folioActivo, Fcreacion, Falta, descripcion) values 
        ("${folio}","${fcreacion}", "${falta}", "${descrip}"  )`, function(error,respuesta){
        
        if (error) {
            return callback(error);
        } else {
            callback(null, respuesta);
        }
        console.log(respuesta);
        });
}


module.exports = insertar

