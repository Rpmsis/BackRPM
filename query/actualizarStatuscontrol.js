const mysql = require('../database/index');

function actualizar (idcontrolactivi, timestandar, status, callback){

    mysql.query(`Update controlactivi  set timestandar = '${timestandar}', status = '${status}'  WHERE idcontrolactivi = '${idcontrolactivi}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Actividad '+ status  //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar