const mysql = require('../database/index');

function insertar (fecha, descrip, area, callback){
    mysql.query(`Insert into ubicacion (fecha, descrip, area) values ("${fecha}", "${descrip}", "${area}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  'Ubicación guardada'//'Ubicación guardada con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar