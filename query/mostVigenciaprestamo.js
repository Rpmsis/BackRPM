const mysql = require('../database/index');

function mostrar (fecha,callback){
    mysql.query(`SELECT * FROM prestamo WHERE fechavigencia<="${fecha}" && estatus!="ENTREGADO";`, function(error,respuesta){
        
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

