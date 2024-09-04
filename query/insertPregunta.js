const mysql = require('../database/index');

function insertar (responsable, preguntas,  periodo, folioActivo,  fecha,  inconformidad,  estatus, callback){
    mysql.query(`Insert into forms (responsable, preguntas, periodo, folioActivo, Fcreacion, fechaInicio, inconformidad, estatus) values ("${responsable}", "${preguntas}", "${periodo}","${folioActivo}","${fecha}","${fecha}", "${inconformidad}", "${estatus}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje: 'Datos guardados'  //'Pregunta guardada con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar