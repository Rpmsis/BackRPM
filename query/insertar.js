const mysql = require('../database/index');

function insertar (folio,fcreacion,falta,descrip, callback){
    mysql.query(`Insert into activosfijos (folioActivo, Fcreacion, Falta, descripcion) values ("${folio}", "${fcreacion}", "${falta}", "${descrip}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
