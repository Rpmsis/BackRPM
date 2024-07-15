const mysql = require('../database/index');

function insertar (folioMant, falta, fabricacion, tipoAct,  modelo, capacidad, clasificacion, nmotor, tipocontmate, especificacion, marca, descripadi,descripgen,idubicacion, callback){
    mysql.query(`Insert into mantenimiento (folioMant, falta, fabricacion, tipoAct,  modelo, capacidad, clasificacion, nmotor, tipocontmate, especificacion, marca, descripadi,descripgen,idubicacion)
         values ("${folioMant}", "${falta}", "${fabricacion}", "${tipoAct}","${modelo}","${capacidad}","${clasificacion}","${nmotor}","${tipocontmate}","${especificacion}","${marca}","${descripadi}","${descripgen}","${idubicacion}")`, function(error,respuesta){
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje: folioMant //'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
