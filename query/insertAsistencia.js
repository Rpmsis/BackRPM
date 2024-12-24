const mysql = require('../database/index');
function insertar (idcheck,timerecord,horainicio,horafin, estatus, motivo, callback){
    mysql.query(`Insert into asistencia (idcheck, fecha, horainicio, horafin, estatus, motivo) values ("${idcheck}", "${timerecord}", "${horainicio}","${horafin}", "${estatus}", "${motivo}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Entrada registrada!"//'Datos guardados con el id => ' + respuesta.protocol41
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
