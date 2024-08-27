const mysql = require('../database/index');

function mostrar (fechainicio, callback){
    mysql.query(`Select * from menusemana where fechainicio= '${fechainicio}'`, function(error,respuesta){
        
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

