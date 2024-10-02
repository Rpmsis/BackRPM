const mysql = require('../database/index');

function mostrar (id, callback){
    mysql.query(`SELECT * FROM asigactivi where idasigactivi=${id};`, function(error,respuesta){
        
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

