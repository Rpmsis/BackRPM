const mysql = require('../database/indexP');

function actualizar (id, puesto, ubicacion, estatus,  callback){
    mysql.query(`Update PDM  set Puesto = '${puesto}', Ubicacion = '${ubicacion}', estatus = '${estatus}' WHERE idPDM = '${id}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Datos actualizados.' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar