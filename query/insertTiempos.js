const mysql = require('../database/index');

function insertar (fecha, horainicio,horafin, timestandar, status, motivo, idcontrolactivi, callback){
    mysql.query(`Insert into tiempo_actividades (fecha, horainicio,horafin, timestandar, status, motivo, idcontrolactivi) 
        values ("${fecha}", "${horainicio}","${horafin}", "${timestandar}", "${status}", "${motivo}", "${idcontrolactivi}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Inicia la actividad"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
