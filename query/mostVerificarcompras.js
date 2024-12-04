const mysql = require('../database/index');

function mostrar (callback){
    mysql.query(`Select * from compras WHERE validado="false" && estatus="true";`, function(error,respuesta){
        
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

