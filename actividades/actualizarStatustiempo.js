const mysql = require('../database/index');

function actualizar (idTiempos, horafin, timestandar,status, motivo, callback){

    mysql.query(`Update tiempo_actividades  set horafin = '${horafin}', timestandar = '${timestandar}', status = '${status}' , motivo = '${motivo}' WHERE idTiempos = '${idTiempos}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Actividad '+ status //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar