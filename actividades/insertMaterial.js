const mysql = require('../database/index');

function insertar (fecha,familia,producto, callback){

    mysql.query(`Insert into material_actividades (fecha,familia,producto) values ("${fecha}","${familia}", "${producto}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  'Guardado con exito'//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
