const mysql = require('../database/index');

function actualizar (idmenusemana,fechainicio,diasemana,platoentrada,platofuerteA,platofuerteB,bebida, callback){

    mysql.query(`Update menusemana  set fechainicio = '${fechainicio}', diasemana = '${diasemana}', platoentrada = '${platoentrada}', platofuerteA = '${platofuerteA}', platofuerteB = '${platofuerteB}', bebida = '${bebida}' WHERE idmenusemana = '${idmenusemana}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  'Comida actualizada'
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar