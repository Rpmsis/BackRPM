const mysql = require('../database/index');

function insertar (folioActivo, fecha, area, estatus, utilitario, callback){
    mysql.query(`Insert into entregaAFI (folioActivo, fecha, area, estatus, utilitario) values ("${folioActivo}", "${fecha}", "${area}", "${estatus}", "${utilitario}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Entrega registrada"//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
