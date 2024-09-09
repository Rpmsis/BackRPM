const mysql = require('../database/index');

function mostrar (id, callback){
    /* "${empresa}"  */
    mysql.query(`SELECT foto FROM Alta_Rh where idCheck="${id}"`, function(error,respuesta){
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
        //console.log("Qué sucede? ",empresa, fecha, respuesta);
    });

}
module.exports = mostrar

