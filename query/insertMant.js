const mysql = require('../database/index');

function insertar (folio,fcreacion,falta,descrip,callback){
    mysql.query(`Insert into mantenimiento (folioMant, F_creacion, F_alta, descrip) values ("${folio}", "${fcreacion}", "${falta}", "${descrip}")`, function(error,respuesta){
        
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
