const mysql = require('../database/index');

function mostrar (idcheck,callback){
    mysql.query(`SELECT NombreCompleto, idCheck, Area FROM Alta_Rh where Estatus="ACTIVO" && NombreCompleto != "ADMINISTRADOR ADMINISTRADOR ADMINISTRADOR" && idCheck="${idcheck}"`, function(error,respuesta){
        
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

