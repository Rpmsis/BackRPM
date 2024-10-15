const mysql = require('../database/index');

function actualizar (idmenusemana,fechainicio,numsemana,diasemana,platoentrada,platofuerteA,platofuerteB,bebida,imagen1,imagen2,imagen3,imagen4, callback){

    mysql.query(`Update menusemana  set fechainicio = '${fechainicio}', numsemana = '${numsemana}', diasemana = '${diasemana}', platoentrada = '${platoentrada}', platofuerteA = '${platofuerteA}', 
                platofuerteB = '${platofuerteB}', bebida = '${bebida}', imagen1 = '${imagen1}', imagen2 = '${imagen2}', imagen3 = '${imagen3}', imagen4 = '${imagen4}' 
                WHERE idmenusemana = '${idmenusemana}' `, function(error,respuesta){
        
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