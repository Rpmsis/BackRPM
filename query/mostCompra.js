const mysql = require('../database/index');

function mostrar (folioActivo,callback){
    mysql.query(`Select * from compras WHERE folioActivo="${folioActivo}"`, function(error,respuesta){
        
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

