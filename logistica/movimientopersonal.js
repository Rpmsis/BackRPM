const mysql = require('../database/indexP');

function mostrar (callback){
    mysql.query(`SELECT * FROM Alta_Rh where Estatus = "ACTIVO" AND Nombre != "ADMINISTRADOR" AND Sexo="MASCULINO";`, function(error,respuesta){
        
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

