const mysql = require('../database/index');

function mostrar (ubicacion,callback){
    mysql.query(`SELECT * FROM PDM where Ubicacion = "${ubicacion}";`, function(error,respuesta){
        
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

