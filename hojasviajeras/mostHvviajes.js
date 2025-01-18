const mysql = require('../database/indexP');

function mostrar (callback){
    mysql.query(`SELECT * FROM Viajes WHERE DATE(Fecha) >= CURDATE() - INTERVAL 2 DAY && Estatus != "CANCELADO";`, function(error,respuesta){
        
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

