const mysql = require('../database/indexP');

function mostrar (callback){
    mysql.query(`Select * from Alta_Rh where Estatus="ACTIVO" && NombreCompleto != "ADMINISTRADOR ADMINISTRADOR ADMINISTRADOR";`, function(error,respuesta){
        
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

