const mysql = require('../database/index');
/* fecha, nombre, `email`, `movil`, `tel`, `rsocial`, `rfc`, 
`rfiscal`, `cfdi`, `fpago`, `calle`, `next`, `colonia`, `ninten`, `municipio`, 
`ciudad`, `cpostal`, `cnombre`, `cemail`, `cmovil`, `ctel`, `beneficiario`, `nombanco`, 
`clabe`, `cuenta`, `refpago`, `credito`, `cdias`, `identifi`, `curp` */
function insertar(fecha, nombre, email, movil, tel, rsocial, rfc,
    rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio,
    ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco,
    clabe, cuenta, refpago, credito, cdias, identifi, curp, callback) {
    mysql.query(`Insert into proveedores (fecha, nombre, email, movil, tel, rsocial, rfc,
                    rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio, 
                    ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco, 
                    clabe, cuenta, refpago, credito, cdias, identifi, curp) 
                    values ("${fecha}", "${nombre}", "${email}", "${movil}", "${tel}", "${rsocial}", "${rfc}",
                    "${rfiscal}", "${cfdi}", "${fpago}", "${calle}", "${next}", "${colonia}", "${ninten}", "${municipio}", 
                    "${ciudad}", "${cpostal}", "${cnombre}", "${cemail}", "${cmovil}", "${ctel}", "${beneficiario}" , "${nombanco}", 
                    "${clabe}", "${cuenta}", "${refpago}", "${credito}", "${cdias}", "${identifi}", "${curp}")`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            console.log(respuesta);
            callback(null, {
                mensaje: "DATOS GUARDADOS CORRECTAMENTE."//'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar
