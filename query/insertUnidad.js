const mysql = require('../database/index');

function insertar (folioActivo, Fcreacion, Falta, descrip, callback){
    mysql.query(`Insert into unidad (folioActivo, Fcreacion, Falta, nombre) values ("${folioActivo}", "${Fcreacion}", "${Falta}", "${descrip}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  'Unidad guardada con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar