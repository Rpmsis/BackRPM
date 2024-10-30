const mysql = require('../database/indexP');

function mostrar (callback){
    mysql.query(`SELECT * FROM Viajes WHERE DATE(Fecha) = CURDATE() OR DATE(Fecha) = DATE_ADD(CURDATE(), INTERVAL 1 DAY) and Estatus != "TERMINADO";`, function(error,respuesta){
        
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

