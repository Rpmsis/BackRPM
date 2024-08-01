const mysql = require('../database/index');

function mostrar (folioActivo, callback){
    mysql.query(` SELECT * FROM movimientos WHERE folioActivo = "${folioActivo}" `, function(error,respuesta){
        
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
        //console.log("Qué sucede? " fecha, respuesta);
    });

}
module.exports = mostrar
