const mysql = require('../database/index');

function actualizar (id, estatus, callback){
    mysql.query(`Update menusemana  set estatus = '${estatus}' WHERE idmenusemana = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: "Menú habilitado" //'actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar