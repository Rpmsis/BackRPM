const mysql = require('../database/index');

function actualizar (id, estatus, callback){
    mysql.query(`Update Permisos  set Form_comida = '${estatus}' WHERE Id_Permisos = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: "Estatus actualizado" //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar