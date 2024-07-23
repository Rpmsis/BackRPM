const mysql = require('../database/index');

function insertar (foliorpm, fecha, nombre, email, movil, tel, rsocial, rfc,
                   rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio, 
                   ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco, 
                   clabe, cuenta, refpago, credito, cdias, callback){
    mysql.query(`Insert into usuarioprov (foliorpm, fecha, nombre, email, movil, tel, rsocial, rfc,rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio, ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco, clabe, cuenta, refpago, credito, cdias) 
                               values ("${foliorpm}","${fecha}", "${nombre}", "${email}", "${movil}", "${tel}", "${rsocial}", "${rfc}", "${rfiscal}", "${cfdi}", "${fpago}", "${calle}", "${next}", "${colonia}", "${ninten}", "${municipio}", "${ciudad}", "${cpostal}", "${cnombre}", "${cemail}", "${cmovil}", "${ctel}", "${beneficiario}" , "${nombanco}", "${clabe}", "${cuenta}", "${refpago}", "${credito}", "${cdias}")`, function(error,respuesta){
        
        if(error){
            callback(null,{
                  mensaje:  error
              })
        }
        else{
            callback(null,{
                mensaje:  foliorpm//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
      });
    
}
module.exports = insertar
