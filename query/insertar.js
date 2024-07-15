const mysql = require('../database/index');

function insertar (folio,fcreacion, callback){
    mysql.query(`Insert into activosfijos (folioActivo, Fcreacion) values ("${folio}", "${fcreacion}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  folio//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
