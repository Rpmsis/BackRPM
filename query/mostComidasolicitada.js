const mysql = require('../database/index');

function mostrar (numsemana,callback){
    mysql.query(`Select * from comidas_solicitadas where numsemana=${numsemana}`, function(error,respuesta){
        
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

