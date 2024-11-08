const mysql = require('../database/index');

function mostrar (callback){
    /* "${empresa}"  */
    mysql.query(`SELECT * FROM actividades inner join asigactivi on actividades.idactividades=asigactivi.idactividad where actividades.kg!=0 && asigactivi.status="TERMINADO" && asigactivi.kgControl=0`, function(error,respuesta){
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

