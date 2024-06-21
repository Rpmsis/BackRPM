const mysql = require('../database/index');

function mostrar (callback){
    mysql.query(`Select * from forms`, function(error,respuesta){
        
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
        console.log(respuesta);
    });

}
module.exports = mostrar

