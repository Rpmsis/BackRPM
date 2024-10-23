const mysql = require('../database/index');
const motivo ="NA";
const horafin = "NA";
function insertar (idusuario,timerecord,horainicio, estatus, callback){
    mysql.query(`Insert into asistencia (idusuario, fecha, horainicio, horafin, estatus, motivo) values ("${idusuario}", "${timerecord}", "${horainicio}","${horafin}", "${estatus}", "${motivo}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  respuesta.protocol41//'Datos guardados con el id => ' + respuesta.protocol41
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
