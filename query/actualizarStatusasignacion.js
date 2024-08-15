const mysql = require('../database/index');

function actualizar (idasigactivi, status, timestandar, kg, callback){

    mysql.query(`Update asigactivi  set status = '${status}', timeControl = '${timestandar}', kgControl = '${kg}'  WHERE idasigactivi = '${idasigactivi}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: "Fin de la actividad" //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar