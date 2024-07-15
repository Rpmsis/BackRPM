const mysql = require('../database/index');

function actualizar (folioInsumos,descrip, callback){
    mysql.query(`Update insumos  set descrip = '${descrip}' WHERE folioInsumos = '${folioInsumos}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje:  'Excelente datos guardados'
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar