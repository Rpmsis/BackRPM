const mysql = require('../database/index');

function insertar (idPregunta,folioActivo, fecha, resp, callback){
    mysql.query(`Insert into respuesta (idPregunta,folioActivo, fecha, resp) values ("${idPregunta}","${folioActivo}", "${fecha}", "${resp}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  'Respuesta guardada con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar