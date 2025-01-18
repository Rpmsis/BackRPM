const mysql = require('../database/index');

function actualizar (id, fecha, adjunto, estatus, callback){
    mysql.query(`Update hojas_viajeras  set fecha_revision = '${fecha}', adjunto = '${adjunto}', estatus = '${estatus}' WHERE idhojas_viajeras = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Hoja viagera revisada' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar