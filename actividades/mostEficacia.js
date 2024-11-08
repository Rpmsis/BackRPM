const mysql = require('../database/index');

function mostrar (callback){
    /* "${empresa}"  */
    mysql.query(`SELECT * FROM asigactivi inner join actividades on actividades.idactividades=asigactivi.idactividad where asigactivi.status!="INACTIVO";`, function(error,respuesta){
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
