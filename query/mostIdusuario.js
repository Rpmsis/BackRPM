const mysql = require('../database/index');

function mostrar (callback){
    mysql.query(`SELECT  NombreCompleto, idCheck FROM Alta_Rh where Estatus="ACTIVO" && NombreCompleto != "ADMINISTRADOR ADMINISTRADOR ADMINISTRADOR"`, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                respuesta
            })
        }
        //console.log(respuesta);
    });

}
module.exports = mostrar