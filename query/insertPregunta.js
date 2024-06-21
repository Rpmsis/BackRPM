const mysql = require('../database/index');

function insertar (responsable, preguntas, areas, periodo, activo, fecha, inconformidad,  estatus, callback){
    mysql.query(`Insert into forms (responsable, preguntas, areas, periodo, activo, fechaInicio, inconformidad, estatus) values ("${responsable}", "${preguntas}", "${areas}", "${periodo}","${activo}","${fecha}", "${inconformidad}", "${estatus}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  'Pregunta guardada con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar