const mysql = require('../database/index');
//NSERT INTO `STEELPROP`.`evidencia_act` (`idcontrolactivi`, `idasigactivi`, `responsable`, `fecha`, `hora`, `archivo`) VALUES ('0', '0', '0', '0', '0', '0');
function insertar ( idcontrolactivi,idasigactivi,responsable,fecha, hora, archivo, callback){
    mysql.query(`Insert into evidencia_act (idcontrolactivi,idasigactivi,responsable,fecha, hora, archivo) values 
        ("${idcontrolactivi}","${idasigactivi}", "${responsable}", "${fecha}", "${hora}", "${archivo}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  "Evidencia guardada" //'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        //console.log(respuesta);
      });
    
}
module.exports = insertar
