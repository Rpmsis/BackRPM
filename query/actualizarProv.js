const mysql = require('../database/index');

function actualizar (idproveedor, nombre, email, movil, tel, rsocial, rfc,
                    rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio, 
                    ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco, 
                    clabe, cuenta, refpago, credito, cdias, callback){
    mysql.query(`Update proveedores  set nombre = '${nombre}', email = '${email}', movil = '${movil}', tel = '${tel}', rsocial = '${rsocial}',
                 rfc = '${rfc}', rfiscal = '${rfiscal}', cfdi = '${cfdi}', fpago = '${fpago}', calle = '${calle}', next = '${next}'
                 , colonia = '${colonia}', ninten = '${ninten}', municipio = '${municipio}', ciudad = '${ciudad}', cpostal = '${cpostal}', cnombre = '${cnombre}',
                 cemail = '${cemail}',cmovil = '${cmovil}',ctel = '${ctel}',beneficiario = '${beneficiario}',nombanco = '${nombanco}',clabe = '${clabe}',cuenta = '${cuenta}',
                 refpago = '${refpago}',credito = '${credito}',cdias = '${cdias}'
                  WHERE idproveedor = '${idproveedor}' `, function(error,respuesta){
        
        if(error){
            callback(null,{
                mensaje:  error
            })
        }
        else{
            callback(null,{
                mensaje: 'Actividad actualizada' //'Pregunta actualizado con el id => ' + id
            })
        }
        console.log(respuesta);
      });

}
module.exports = actualizar