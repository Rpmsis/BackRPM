const mysql = require('../database/index');

function insertar(unidadneg, fecha, folio, socio, gasto, compra, material, rsocial, rfc, tipopers, regimen, cfdi
    , cortemes, forpago, diapago, colonia, noext, noint, municipio, estado, cpostal, departm, nomv
    , emailv, telv, movilv, nomcon, emailcon, telcon, movilcon, beneficiario, banco, clabe, cuenta
    , sucursal, referencia, credito, diascred, autorizacion, idenoficial, curp, arespeciales
    , constitutiva, poderlegal, identificacion, cerconst, cervigexit, tin, nif, cif, domicilio
    , fotosemp, refprocli) {
    mysql.query(`Insert into activosfijos (unidadneg,fecha,folio,socio,gasto,compra,material,rsocial,rfc,tipopers,regimen,cfdi
                ,cortemes,forpago,diapago,colonia,noext,noint,municipio,estado,cpostal,departm,nomv
                ,emailv,telv,movilv,nomcon,emailcon,telcon,movilcon,beneficiario,banco,clabe,cuenta
                ,sucursal,referencia,credito,diascred,autorizacion,idenoficial,curp,arespeciales
                ,constitutiva,poderlegal,identificacion,cerconst,cervigexit,tin,nif,cif,domicilio
                ,fotosemp,refprocli) values ("${unidadneg}", "${fecha}", "${folio}", "${socio}", "${gasto}", "${compra}", "${material}"
                , "${rsocial}", "${rfc}", "${tipopers}", "${regimen}", "${cfdi}", "${cortemes}", "${forpago}", "${diapago}", "${colonia}", "${noext}"
                , "${noint}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}"
                , "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}", "${gasto}")`, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                mensaje: 'Datos guardados con el id => ' + respuesta.insertId
            })

        }
        console.log(respuesta);
    });

}
module.exports = insertar