const mysql = require('../database/index');

function mostrar (codigobarras, callback){
    mysql.query(`SELECT * FROM consumibles WHERE codigobarras = "${codigobarras}"`, function(error,respuesta){
        
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

