const mysql = require('../database/index');

function insertar (fechacreacion, responsable, fechainicio, empresa, idactividad, status, motivo, callback){

    mysql.query(`Insert into asigactivi (fechacreacion, responsable, fechainicio, empresa, idactividad, status, motivo) values ("${fechacreacion}", "${responsable}", "${fechainicio}","${empresa}","${idactividad}","${status}","${motivo}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Actividad asignada!"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
