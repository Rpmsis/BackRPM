const mysql = require('../database/index');

function insertar (folioActivo, fecha, responsable, area, cantidad, costo, estatus, callback){
    mysql.query(`Insert into asignacion (folioActivo, fecha, responsable, area, cantidad, costo, estatus) values ("${folioActivo}", "${fecha}", "${responsable}", "${area}", "${cantidad}", "${costo}", "${estatus}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Asignación registrada"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
