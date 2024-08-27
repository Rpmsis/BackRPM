const mysql = require('../database/index');

function insertar (fecha,fechainicio,diasemana,platoentrada,platofuerteA,platofuerteB,bebida, callback){
    mysql.query(`Insert into menusemana (fecha,fechainicio,diasemana,platoentrada,platofuerteA,platofuerteB,bebida) 
        values ("${fecha}", "${fechainicio}", "${diasemana}", "${platoentrada}", "${platofuerteA}", "${platofuerteB}","${bebida}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Se registro la comida"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
