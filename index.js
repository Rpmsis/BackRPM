const mysql = require('./database/index');

const express = require('express')
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const https = require('https');
const path = require('path');
const jwt = require('jsonwebtoken');
//Lector de huella HID
const HID = require('node-hid');
const faceapi = require('face-api.js');



const cargar_archivo = require('./query/archivos_file');
const actualizar_archivo = require('./query/actualizar_archivos');
const actualizar_fotoperfil = require('./query/archivo_fotoperfil');
const most = require('./query/mostrar');
const mostPreg = require('./query/mostPreg');
const mostUnidad = require('./query/mostUnidad');
const mostRespuesta = require('./query/mostRespuesta');
const mostActmantt = require('./query/mostActmantt');
const mostmantt = require('./query/mostMantt');
const mostInsumos = require('./query/mostInsumos');
const mostubi = require('./query/mostUbi');
const mostActif = require('./query/mostActvif');
const mostConsumible = require('./query/mostConsumible');
const mostProveedores = require('./query/mostProveedores');
const mostUsuarioprov = require('./query/mostUsuarioprov');
const mostMaterial = require('./query/mostMaterial');
const mostAsignacion = require('./query/mostAsignactivi');
const mostMovimientos = require('./query/mostMovimientos');
const mostCompra = require('./query/mostCompra');
const mostCbarrasconsu = require('./query/mostCbarrasconsu');
const mostControlactivi = require('./query/mostControlactivi');
const mostControlasignados = require('./query/mostControlasig');
const mostAsigdiario = require('./query/mostAsigdiario');
const mostHistorialcb = require('./query/mostHistorialcb');
const mostPrestamo = require('./query/mostPrestamo');
const mostTiempoactivi = require('./query/mostTiempoactivi');
const mostStatusresponsable = require('./query/mostStatusresponsable');
const mostTiempocontrol = require('./query/mostTiempocontrol');
const mostEficienciakg = require('./query/mostEficienciakg');

const mostMenusemana = require('./query/mostMenusemana');
const mostMenudeldia = require('./query/mostMenudia');
const mostSemanamenu = require('./query/mostSemanamenu');
const mostPrincipalmenu = require('./query/mostSemanamenu');
const mostNumsemanamenu = require('./query/mostNumsemanamenu');

const mostIdusuarioPMateriales = require('./query/mostIdusuarioPMateriales');
const mostIdusuarioSRecoleccion = require('./query/mostIdusuarioSRecoleccion');
const mostIdusuario = require('./query/mostIdusuario');
const mostIdcheck = require('./query/mostIdcheck');
const mostControlresponsable = require('./query/mostControlresponsable');
const mostFotoperfil = require('./query/mostFotoperfil');
const mostPDM = require('./query/mostPDM');
const mostEntregaafi = require('./query/mostentregaafi');
const mostVigenciaprestamos = require('./query/mostVigenciaprestamo');
const mostMenulista = require('./query/mostMenulista');
const mostNumpersonas = require('./query/mostAsigactivinumpersonas');
const mostEficacia = require('./query/mostEficacia');
const mostAltas = require('./query/mostAltas'); //APUNTA A PRODUCCION
const mostComidasolicitada = require('./query/mostComidasolicitada');
const mostPermisos = require('./query/mostPermisos');
const mostAsistencia = require('./query/mostAsistencia');
const mostUserasistencia = require('./query/mostUserasistencia');
const mostEventosbio = require('./query/mostEventosbio');
const mostFaltas = require('./query/mostFaltas');
const mostTodoasistencia = require('./query/mostTodoasistencia');
const mostTablerologistica = require('./query/mosttablerologistica');
const mostTableromantt = require('./mantenimiento/mostTableromantt');
const mostVerificarcompras = require('./query/mostVerificarcompras');
const mostTicketestatus = require('./tickets/mostTikets');
const mostHvviajes = require('./hojasviajeras/mostHvviajes'); //APUNTA A PRODUCCION
const mostRegistrofolio = require('./hojasviajeras/mostRegistrofolio');
const mostAltarhmasculino = require('./logistica/movimientopersonal'); //APUNTA A PRODUCCION
const mostPersonalogistica = require('./logistica/mostPersonal_logistica');
const cargar_adjunto = require('./hojasviajeras/guardaradjunto');

const Folio = require('./query/folio');
const Folioconsumible = require('./query/folioconsumible');

const inserPre = require('./query/insertPregunta');
const inser = require('./query/insertar');
const inserMante = require('./query/insertMant');
const inserInsumos = require('./query/insertInsumos');
const inserUnidad = require('./query/insertUnidad');
const inserRespuesta = require('./query/insertrespuesta');
const inserUbi = require('./query/insertUbi');
const inserActif = require('./query/insertActif');
const inserConsumible = require('./query/insertConsumible');
const insertarProveedor = require('./query/insertProveedores');
const insertarUsuarioprov = require('./query/insertUsuarioprov');
const insertarMaterial = require('./query/insertMaterial');
const insertarAsigactivi = require('./query/insertAsigactivi');
const insertarCompra = require('./query/insertCompra');
const insertarMovimiento = require('./query/insertMovimiento');
const insertarControlactivi = require('./query/insertControlactivi');
const insertarTiempos = require('./query/insertTiempos');
const insertarInsumoasig = require('./query/insertAsignacion');
const insertarPrestamo = require('./query/insertPrestamo');
const insertarMenusemana = require('./query/insertMenusemana');
const insertarEntregaafi = require('./query/insertEntregaafi');
const insertarComidossolicitadas = require('./query/insertComidassolicitadas');
const insertarAsistencia = require('./query/insertAsistencia');
const insertarUserasistencia = require('./query/insertUserasistencia');
const insertarTicketrelacion = require('./tickets/insertticketrelacion');
const insertarRegistrofolio = require('./hojasviajeras/insertRegistrofolio');
const personalogistica = require('./logistica/insertPeronalogistica');

const editPreg = require('./query/actualizarPreg');
const editDesinsum = require('./query/actualizarDesinsum');
const editMantt = require('./query/actualizarmantt');
const editActi = require('./query/actualizarActi');
const editConsu = require('./query/actualizarConsu');
const editInsumos = require('./query/actualizarInsumos');
const editProv = require('./query/actualizarProv');
const editMaterial = require('./query/actualizarMate');
const editAsignacion = require('./query/actualizarAsigactivi');
const editPrestamo = require('./query/actualizarPrestamo');
const editCanconsumo = require('./query/actualizarCanconsumo');
const editControlstatus = require('./query/actualizarControlstatus');
const editStatustiempo = require('./query/actualizarStatustiempo');
const editStatuscontrol = require('./query/actualizarStatuscontrol');
const editStatusasignacion = require('./query/actualizarStatusasignacion');
const editStatusactividadesT = require('./query/actualizarStatusactividades');
const editStatusactividadesKg = require('./query/actualizarStatusactividadeskg');
const editMenusemana = require('./query/actualizarMenusemana');
const editFotoperfil = require('./query/actualizarFotoperfil');
const editNumpersonas = require('./query/actualizarNumpasignacion');
const editEficacia = require('./query/actualizarEficaciaasignacion');
const editAsistencia = require('./query/actualizarAsistenciastatus');
const editEstatusmenu = require('./query/actualizarestatusmenu');
const editPermisomenu = require('./query/actualizarPermisomenu');
const editCompra = require('./query/actualizarCompra');
const editProveedor = require('./query/actualizarProveedor');
const editUserasistencia = require('./reconocimientofa/editUser_asistencia');
const editRevisarfolio = require('./hojasviajeras/actRevisarfolio');
const editPersonalogistica = require('./logistica/editPersonalogistica');
const elim = require('./query/eliminar');

const privateKey = fs.readFileSync(path.resolve(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, 'mi_certificado.crt'), 'utf8');

const verificar_Token = require('./middleware/Valida_Token');
const app = express()
const port = 3001
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/fotoperfil', express.static(path.join(__dirname, 'fotoperfil')));
app.use(cors());
app.use(fileUpload());
const fecha = moment().format("YYYY-MM-DD");
const io = require("socket.io")(3003, {
    cors: {
        methods: ["GET", "POST"]
    }
});


// Ruta de los modelos
const MODEL_PATH = path.join(__dirname, 'models');
// Cargar los modelos
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    console.log('Modelos cargados');
}


// Lista los dispositivos HID conectados
/* const devices = HID.devices();

console.log(devices); */




/* ZKHLIB asistencias */
const ZKHLIB = require("zkh-lib");
let obj = new ZKHLIB("192.168.1.82", 4370, 5200, 5000);
//console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
/* inserta usuarios */
async function insertarUserasis(respuesta, res, req) {
    //console.log(respuesta);
    //console.log(respuesta.respuesta[0].idCheck);
    //console.log(respuesta.respuesta[0].NombreCompleto);
    const idcheck = respuesta.respuesta[0].idCheck;
    const nombre = respuesta.respuesta[0].NombreCompleto;
    const horainicio = req.body.horainicio;
    const horafin = req.body.horafin;
    const descanso = req.body.descanso;
    let horafinMD, horainicioMD;
    let turno;
    if (req.body.descanso.includes("Sábado") && req.body.descanso.includes("Domingo")) {
        horafinMD = "NA";
        horainicioMD = "NA";
    }
    else {
        horafinMD = req.body.horafinMD;
        horainicioMD = req.body.horainicioMD;
    }

    if (horafin < horainicio) {
        turno = "TERCERO";
    }
    else {
        turno = "PRIMERO";
    }


    //console.log(req.body);
    const idstring = String(respuesta.respuesta[0].idAlta);
    console.log(idstring);

    //console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
    try {
        await obj.createSocket();
        console.log(await obj.getInfo());
        const info = await obj.getInfo();
        // Get all logs in the machine
        //const logs = await obj.getAttendances();
        //const formattedDate = moment(recordTime).format('DD/MM/YYYY HH:mm:ss');
        //console.log(logs); 
        if (info) {
            io.emit('deshabilitar', "BloquearBTN");
            const id = null;
            const name = idstring;
            const password = '78638';
            const privilege = '0';
            const fingerprint = null;
            if (info.userCounts && info.userCounts > 0) {
                const users = await obj.getUsers();
                //console.log(users.data);
                const vexistencia = users.data.find((filtro) => filtro.userId === name);
                //console.log(vexistencia);
                if (!vexistencia) {
                    // Insertar el usuario
                    const result = await obj.setUser(id, name, password, privilege, fingerprint);
                    console.log('Usuario insertado:', result);
                    const users = await obj.getUsers();
                    console.log(users);
                    if (result != false) {
                        console.log("Puedes guardar los datos");
                        console.log(await obj.getInfo());
                        //idcheck, nombre, privilegios, contraseña, userid, 
                        mostUserasistencia(function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                const existe = respuesta.respuesta.find((filtro) => filtro.userid === name);
                                if (existe) {
                                    console.log("EL usuario ya existe");
                                    res.status(400).json({
                                        mensaje: "El usuario ya existe"
                                    });

                                }
                                else {

                                    insertarUserasistencia(idcheck, nombre, privilege, password, horainicio, horafin, descanso, horainicioMD, horafinMD, name, turno, (error, respuesta) => {
                                        if (error) {
                                            console.error('Error al insertar asistencia:', error.mensaje);
                                        } else {
                                            console.log(respuesta);
                                            io.emit('escuchando', respuesta);
                                            return res.status(200).json({ respuesta });
                                        }
                                    });
                                }
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Error al insertar usuario");
                        res.status(400).json({
                            mensaje: "Error al insertar usuario"
                        });

                    }
                }
                else {
                    console.log("EL usuario ya existe");
                    res.status(400).json({
                        mensaje: "El usuario ya existe"
                    });

                }
            }
            else {
                console.log("Agrega el usuario de administrador");
                res.status(400).json({
                    mensaje: "Agrega el usuario de administrador"
                });
            }


            await obj.disconnect();

        }
        else {
            console.log("No existe conexión con el biometrico");
            res.status(400).json({
                mensaje: "No existe conexión con el biometrico"
            });

        }
        await obj.disconnect();
    } catch (e) {
        console.log(e);
        res.status(404).json({
            mensaje: e
        })
    }
};

app.post('/insertarBiometrico', (req, res) => {
    if (req.body.idcheck && req.body.horainicio && req.body.horafin && req.body.descanso) {
        //console.log(req.body.descanso.includes("Sábado"));
        mostIdcheck(req.body.idcheck, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                if (req.body.descanso.includes("Sábado") && req.body.descanso.includes("Domingo")) {
                    console.log(respuesta);
                    if (respuesta.respuesta && respuesta.respuesta.length > 0) {
                        insertarUserasis(respuesta, res, req);
                    }
                    else {
                        console.log("El usuario no existe");
                        res.status(400).json({
                            mensaje: "El usuario no existe, verifique el ID"
                        });
                    }
                }
                else {
                    if (req.body.horainicioMD && req.body.horafinMD) {
                        console.log(respuesta);
                        if (respuesta.respuesta && respuesta.respuesta.length > 0) {
                            insertarUserasis(respuesta, res, req);
                        }
                        else {
                            console.log("El usuario no existe");
                            res.status(400).json({
                                mensaje: "El usuario no existe, verifique el ID"
                            });
                        }
                    }
                    else {
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                        });

                    }
                }
            }
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });

    }
});
/* fin de insertar usuarios */

/* Registrar asistencias del biometrico*/
async function registrarAsistencias() {
    const diasemana = moment().format("dddd");
    //console.log(diasemana);
    //console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
    try {
        await obj.createSocket();
        console.log(await obj.getInfo());
        const info = await obj.getInfo();
        //console.log(info.logCounts); 

        // Get all logs in the machine
        if (info && info.logCounts > 0) {
            const logs = await obj.getAttendances();
            //console.log("logs: ", logs.data);
            mostUserasistencia(function (error, respuestaUsuarios) {
                if (error) {
                    console.log(error);
                }
                else {
                    //console.log(respuestaUsuarios.respuesta);
                    const resUsuarios = respuestaUsuarios.respuesta;
                    mostEventosbio(fecha, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            //console.log("registrados:", respuesta.respuesta);
                            const registrados = respuesta.respuesta;
                            //console.log("logs: ", logs.data);
                            logs.data.forEach(log => {
                                const Datesinformat = log.recordTime;
                                const fechaMoment = moment(Datesinformat, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
                                const fechaForm = fechaMoment.format('YYYY-MM-DD');
                                const horaForm = fechaMoment.format('HH:mm:ss');
                                const horabio = fechaMoment.format('HH:mm');
                                //console.log(fechaForm);
                                //console.log(horaForm);
                                //console.log(idusuario); 

                                if (fechaForm === fecha) {
                                    if (registrados && registrados.length > 0) {
                                        //console.log("Si existen registros");
                                        const verificar = resUsuarios.find((filtro) => filtro.userid === log.deviceUserId);
                                        if (verificar) {
                                            if (diasemana === "Saturday" || "Sunday") {
                                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                //console.log("HORA SALIDA ", verificar.horasalida);
                                                if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                                    //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                    if (horabio > verificar.horaentradaMD) {
                                                        const estatus = "RETARDO";
                                                        //console.log("Estatus RETARDO");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }
                                                    else {
                                                        const estatus = "ENTRADA";
                                                        //console.log("estatus ENTRADA");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }
                                                } else {
                                                    const verificar2 = registrados.find((filtro) => filtro.idusuario === log.deviceUserId);
                                                    //console.log(verificar2);
                                                    //console.log("Se supone que aqui verificas la hora de salida");
                                                    if (verificar2.horafin != "NA") {
                                                        //console.log("NO NECESITAS GUARDARLO");
                                                    } else {
                                                        if (verificar2.estatus === "RETARDO" || "ENTRADA") {
                                                            if (horabio >= verificar.horasalidaMD) {
                                                                const estatus = "ASISTENCIA";
                                                                //console.log(horabio);
                                                                editAsistencia(verificar2.idasistencia, horaForm, estatus, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        //console.log(respuesta);
                                                                        io.emit('escuchando', respuesta);
                                                                    }
                                                                    //console.log(respuesta);
                                                                })
                                                            } else {
                                                                //console.log("NO TIENE HORA DE SALIDA");

                                                            }
                                                        } else {
                                                            //console.log("NO TIENE ESTATUS DE ENTRADA O RETARDO");

                                                        }
                                                    }
                                                }

                                            }
                                            else {
                                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                //console.log("HORA SALIDA ", verificar.horasalida);
                                                if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                                    //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                    if (horabio > verificar.horaentrada) {
                                                        const estatus = "RETARDO";
                                                        //console.log("Estatus RETARDO");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }
                                                    else {
                                                        const estatus = "ENTRADA";
                                                        //console.log("estatus ENTRADA");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                            if (error) {
                                                                console.error('Error al insertar asistencia:', error.mensaje);
                                                            } else {
                                                                //console.log(respuesta);
                                                                io.emit('escuchando', respuesta);

                                                            }
                                                        });
                                                    }
                                                } else {
                                                    const verificar2 = registrados.find((filtro) => filtro.idusuario === log.deviceUserId);
                                                    //console.log(verificar2);
                                                    //console.log("Se supone que aqui verificas la hora de salida");
                                                    if (verificar2.horafin != "NA") {
                                                        //console.log("NO NECESITAS GUARDARLO");
                                                    } else {
                                                        if (verificar2.estatus === "RETARDO" || "ENTRADA") {
                                                            if (horabio >= verificar.horasalida) {
                                                                const estatus = "ASISTENCIA";
                                                                //console.log(horabio);
                                                                editAsistencia(verificar2.idasistencia, horaForm, estatus, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error);
                                                                    }
                                                                    else {
                                                                        //console.log(respuesta);
                                                                        io.emit('escuchando', respuesta);
                                                                    }
                                                                    //console.log(respuesta);
                                                                })
                                                            } else {
                                                                //console.log("NO TIENE HORA DE SALIDA");

                                                            }
                                                        } else {
                                                            //console.log("NO TIENE ESTATUS DE ENTRADA O RETARDO");

                                                        }
                                                    }
                                                }

                                            }
                                        }
                                        else {
                                            console.log("No esta registrado como usuario");
                                            //console.log("userId: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);

                                        }
                                    }
                                    else {
                                        //console.log("no existen registros");
                                        const verificar = resUsuarios.find((filtro) => filtro.userid === log.deviceUserId);
                                        if (verificar) {
                                            if (diasemana === "Saturday" || "Sunday") {
                                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                //console.log("HORA SALIDA ", verificar.horasalida);

                                                if (horabio > verificar.horaentradaMD) {
                                                    const estatus = "RETARDO";
                                                    //console.log("Estatus RETARDO");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                        if (error) {
                                                            console.error('Error al insertar asistencia:', error.mensaje);
                                                        } else {
                                                            //console.log(respuesta);
                                                            io.emit('escuchando', respuesta);

                                                        }
                                                    });
                                                }
                                                else {
                                                    const estatus = "ENTRADA";
                                                    //console.log("estatus ENTRADA");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                        if (error) {
                                                            console.error('Error al insertar asistencia:', error.mensaje);
                                                        } else {
                                                            //console.log(respuesta);
                                                            io.emit('escuchando', respuesta);

                                                        }
                                                    });
                                                }


                                            }
                                            else {
                                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                //console.log("HORA SALIDA ", verificar.horasalida);
                                                if (horabio > verificar.horaentrada) {
                                                    const estatus = "RETARDO";
                                                    //console.log("Estatus RETARDO");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                        if (error) {
                                                            console.error('Error al insertar asistencia:', error.mensaje);
                                                        } else {
                                                            //console.log(respuesta);
                                                            io.emit('escuchando', respuesta);

                                                        }
                                                    });
                                                }
                                                else {
                                                    const estatus = "ENTRADA";
                                                    //console.log("estatus ENTRADA");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, estatus, (error, respuesta) => {
                                                        if (error) {
                                                            console.error('Error al insertar asistencia:', error.mensaje);
                                                        } else {
                                                            //console.log(respuesta);
                                                            io.emit('escuchando', respuesta);

                                                        }
                                                    });
                                                }


                                            }
                                        }
                                        else {
                                            console.log("No esta registrado como usuario", log.deviceUserId);
                                            //console.log("userId: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);

                                        }
                                    }

                                }
                            });

                        }
                        //console.log(respuesta);
                    })
                }
            }
            )


        } else {
            console.log('No se encontraron logs de asistencia');
        }

        await obj.disconnect();
    } catch (e) {
        console.log(e);
    }
};


app.get('/regisAsistencia', (req, res) => {
    registrarAsistencias();
});
//setInterval(registrarAsistencias, 2000);
/* fin de mostrar asistencias */

/* Fin de las asistencias */

/* Mostrar */
app.get('/activosFijos', (req, res) => {
    most(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/folio', (req, res) => {
    Folio(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/preguntas', (req, res) => {
    mostPreg(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/unidades', (req, res) => {
    mostUnidad(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/respuestas', (req, res) => {
    mostRespuesta(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/actmantt', (req, res) => {
    mostActmantt(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //onsole.log(respuesta);
    })
}
)
app.get('/mantenimiento', (req, res) => {
    mostmantt(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/insumos', (req, res) => {
    mostInsumos(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
/* Mustra la lista de ubicaciones de los formularios de actividades */
app.get('/ubicacion', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const puesto = usuario.puesto;
    console.log(puesto)
    /* Envia las ubicaciones con base al puesto */
    if (puesto === "COORDINADOR DE PRODUCCION") {
        mostubi(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const ubicacionesPDM = respuesta.respuesta.filter(filtro => filtro.area === puesto);
                //console.log("PDM", ubicacionesPDM);
                res.status(200).json({
                    ubicacionesPDM
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        if (puesto === "GERENTE DE SISTEMAS DE RECOLECCION") {
            mostubi(function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const ubicacionesPDM = respuesta.respuesta.filter(filtro => filtro.area === puesto);
                    //console.log("PDM", ubicacionesPDM);
                    res.status(200).json({
                        ubicacionesPDM
                    })
                }
                //console.log(respuesta);
            })
        }
    }
}
)
//muestra las actividades registradas
app.get('/actividades', (req, res) => {
    mostActif(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/folioconsumible', (req, res) => {
    const fechafolio = moment().format("YYMMDD");
    Folioconsumible(fechafolio, function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
//MOSTRAR EL STOCK DE TODAS LAS SUCURSALES
app.get('/consumibles/:sucursal', (req, res) => {
    //console.log(req.params.sucursal);
    const sucursal = req.params.sucursal;
    mostConsumible(function (error, respuestaconsumibles) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            let respuesta = [];
            //console.log(respuestaconsumibles.respuesta);
            if (sucursal === "CANOA") {
                respuesta = respuestaconsumibles.respuesta.map((datos) => {
                    return {
                        idconsumibles: datos.idconsumibles,
                        folioActivo: datos.folioActivo,
                        fecha: datos.fecha,
                        unidadmedida: datos.unidadmedida,
                        cantidad: datos.cantidad,
                        costo: datos.costo,
                        tipo: datos.tipo,
                        descripcion: datos.descripcion,
                        codigobarras: datos.codigobarras,
                        minimo: datos.minimo,
                        cantidad: datos.cantidad,
                        costo: datos.costo

                    }
                })
            }
            else {
                if (sucursal === "SAN LUIS POTOSI") {
                    respuesta = respuestaconsumibles.respuesta.map((datos) => {
                        return {
                            idconsumibles: datos.idconsumibles,
                            folioActivo: datos.folioActivo,
                            fecha: datos.fecha,
                            unidadmedida: datos.unidadmedida,
                            cantidad: datos.cantidad,
                            costo: datos.costo,
                            tipo: datos.tipo,
                            descripcion: datos.descripcion,
                            codigobarras: datos.codigobarras,
                            minimo: datos.minimo,
                            cantidad: datos.cantidadslp,
                            costo: datos.costoslp

                        }
                    })
                }
                else {
                    if (sucursal === "QUERETARO") {
                        respuesta = respuestaconsumibles.respuesta.map((datos) => {
                            return {
                                idconsumibles: datos.idconsumibles,
                                folioActivo: datos.folioActivo,
                                fecha: datos.fecha,
                                unidadmedida: datos.unidadmedida,
                                cantidad: datos.cantidad,
                                costo: datos.costo,
                                tipo: datos.tipo,
                                descripcion: datos.descripcion,
                                codigobarras: datos.codigobarras,
                                minimo: datos.minimo,
                                cantidad: datos.cantidadqro,
                                costo: datos.costoqro

                            }
                        })
                    }
                    else {
                        if (sucursal === "19 NTE") {
                            respuesta = respuestaconsumibles.respuesta.map((datos) => {
                                return {
                                    idconsumibles: datos.idconsumibles,
                                    folioActivo: datos.folioActivo,
                                    fecha: datos.fecha,
                                    unidadmedida: datos.unidadmedida,
                                    cantidad: datos.cantidad,
                                    costo: datos.costo,
                                    tipo: datos.tipo,
                                    descripcion: datos.descripcion,
                                    codigobarras: datos.codigobarras,
                                    minimo: datos.minimo,
                                    cantidad: datos.cantidad19nt,
                                    costo: datos.costo19nt

                                }
                            })
                        }
                        else {
                            if (sucursal === "VALSEQUILLO") {
                                respuesta = respuestaconsumibles.respuesta.map((datos) => {
                                    return {
                                        idconsumibles: datos.idconsumibles,
                                        folioActivo: datos.folioActivo,
                                        fecha: datos.fecha,
                                        unidadmedida: datos.unidadmedida,
                                        cantidad: datos.cantidad,
                                        costo: datos.costo,
                                        tipo: datos.tipo,
                                        descripcion: datos.descripcion,
                                        codigobarras: datos.codigobarras,
                                        minimo: datos.minimo,
                                        cantidad: datos.cantidadvsq,
                                        costo: datos.costovsq

                                    }
                                })
                            }
                        }
                    }
                }
            }
            //console.log(respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/proveedores', (req, res) => {
    mostProveedores(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Usuarioprov', (req, res) => {
    mostUsuarioprov(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/codigo_postal', async (req, res) => {
    /* EJEMPLO DE CONSULTA: `http://localhost:3001/codigo_postal?cp=${cp}` */
    const cp = req.query.cp;
    //console.log(cp)
    if (!cp || !/^\d{5}$/.test(cp)) {
        res.status(404).json({ mensaje: 'El código postal no es correcto' });
    }
    else {
        try {
            const response = await axios.get(`https://api.tau.com.mx/dipomex/v1/codigo_postal`, {
                params: { cp },
                headers: {
                    APIKEY: '7a20c08510d424b52e0e07809120c919163ba494', // Reemplaza con tu API Key
                },
            });
            const datosback = response.data;
            if (response.status === 500) {
                res.status(404).json({ error: 'Error interno en el servidor externo' });
            }
            res.status(200).json({
                datosback
            })
        } catch (error) {
            //console.error('Error al obtener el código postal:', error);
            //res.status(error.response ? error.response.status : 400).json({ error: 'Error al obtener el código postal' });
            return res.status(404).json({ error: 'El código postal no existe' });
        }

    }
})
//Inserta los materiales de la actividad
app.get('/material', (req, res) => {
    mostMaterial(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
//Muestra las actividades asignadas por el dueño del pproceso
app.get('/asignacion', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.nombre;
    //console.log(responsable)
    mostAsignacion(responsable, fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const nuevarespuesta = respuesta.respuesta.filter(filtro => filtro.status != "TERMINADO");
            //console.log(nuevarespuesta);
            res.status(200).json({
                nuevarespuesta
            })
        }
        //console.log(respuesta);
    })
})
app.get('/movimientos', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const id = usuario.id;
    const cb = req.query.cb;
    mostMovimientos(cb, function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
})
//Mostrar las comparas dependiendo de la sucursal.
app.get('/compras', (req, res) => {
    const compra = req.query.compra;
    const sucursal = req.query.sucursal;
    //console.log(compra);
    mostCompra(compra, function (error, respuestaCompra) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log("compras: ",respuestaCompra.respuesta);
            //console.log(sucursal);
            const respuesta = respuestaCompra.respuesta.filter(filtro => filtro.sucursal === sucursal);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/cbconsumibles', (req, res) => {
    mostCbarrasconsu(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Controlactividades', (req, res) => {
    //console.log(usuario)
    const empresa = "FISHER";
    //console.log(empresa, fecha)
    mostControlactivi(empresa, fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
})
//Muestra la tabla de control de las actividades que asigna el supervisor
app.get('/Controlasignados/:id', (req, res) => {
    var idcheck = req.params.id
    console
    mostControlasignados(idcheck, fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta);
            const uniqueControls = {};
            // Iterar sobre la respuesta
            respuesta.respuesta.forEach(item => {
                // Verificar si ya existe un registro con el mismo idcontrolactivi
                if (!uniqueControls[item.idcontrolactivi] || uniqueControls[item.idcontrolactivi].idtiempos < item.idtiempos) {
                    uniqueControls[item.idcontrolactivi] = item; // Guardar el registro con el idtiempos más alto
                }
            })
            // Convertir el objeto a un array
            const result = Object.values(uniqueControls);
            //console.log(result);
            res.status(200).json({
                result
            })
        }
        //console.log(respuesta);
    })
})
//muestra las actividades diarias del dueño del proceso
app.get('/actividiarias', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    //console.log(responsable);
    mostAsigdiario(fecha, responsable, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Historialcb', (req, res) => {
    const folioActivo = req.query.folioActivo;
    mostHistorialcb(folioActivo, function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Prestamo', (req, res) => {
    const responsable = req.query.responsable;
    mostPrestamo(responsable, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Tiempoactivi', (req, res) => {
    mostTiempoactivi(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Statusresponsables', (req, res) => {
    const idactividad = req.query.idactividad;
    const idasigactivi = req.query.idasigactivi;
    //console.log("Datos obtenidos: ", idactividad, idasigactivi);
    mostStatusresponsable(idactividad, fecha, idasigactivi, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Tiempocontrol', (req, res) => {
    const idactividades = req.query.idactividad;
    console.log(req.body)
    mostTiempocontrol(idactividades, fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
//Muestra las actividades que tienen kilogramos, y deben ingresar, una vez finalizada la actividad
app.get('/EficienciaKg', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    console.log(responsable);
    mostEficienciakg(function (error, respuestaEficienciakg) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaEficienciakg.respuesta);
            const respuesta = respuestaEficienciakg.respuesta.filter((filtro) => filtro.responsable === responsable);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Menusemana', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.id;

    mostMenusemana(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const nsemana1 = respuesta.respuesta.find((filtro) => filtro.estatus === "ACTIVO");
            var nsemana = "";
            if (nsemana1) {
                nsemana = nsemana1.numsemana;
            }
            else {
                nsemana = "NA";
            }

            mostPermisos(function (error, respuestaPermisos) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    //console.log(respuestaPermisos.respuesta);
                    const permisomenu1 = respuestaPermisos.respuesta.find((filtro) => filtro.Id_Permisos === responsable);

                    const permisomenu = permisomenu1.Form_comida;
                    console.log(permisomenu);

                    res.status(200).json({
                        respuesta,
                        nsemana,
                        permisomenu
                    })
                }
                //console.log(respuesta);
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Menudeldia', (req, res) => {
    mostMenudeldia(fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Semanamenu', (req, res) => {
    mostSemanamenu(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const encargado = "RPMhzte2e4rlfd1p8s3";
            mostPermisos(function (error, respuestaPermisos) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuestaPermisos.mensaje
                    })
                }
                else {
                    //console.log(respuestaPermisos.respuesta);
                    const datospermiso = respuestaPermisos.respuesta.find((filtro) => filtro.Id_Permisos === encargado);
                    const permiso = datospermiso.Form_comida;
                    res.status(200).json({
                        respuesta,
                        permiso
                    })
                }
                //console.log(respuesta);
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Principalmenu', (req, res) => {
    var fechainicio = "";
    var fechafinal = "";
    const diasemanamoment = moment(fecha).format('dddd');
    /* Guardar en español */
    switch (diasemanamoment) {
        case "Monday": fechainicio = fecha
            fechafinal = moment(fecha).add(4, 'days').format('YYYY-MM-DD');
            //console.log(fechainicio, fechafinal);
            break;
        case "Tuesday":
            fechainicio = moment(fecha).subtract(1, 'days').format('YYYY-MM-DD');
            fechafinal = moment(fecha).add(3, 'days').format('YYYY-MM-DD');
            //console.log(fechainicio, fechafinal);
            break;
        case "Wednesday":
            fechainicio = moment(fecha).subtract(2, 'days').format('YYYY-MM-DD');
            fechafinal = moment(fecha).add(3, 'days').format('YYYY-MM-DD');
            //console.log(fechainicio, fechafinal);
            break;
        case "Thursday":
            fechainicio = moment(fecha).subtract(3, 'days').format('YYYY-MM-DD');
            fechafinal = moment(fecha).add(1, 'days').format('YYYY-MM-DD');
            //console.log(fechainicio, fechafinal);
            break;
        case "Friday":
            fechainicio = moment(fecha).subtract(4, 'days').format('YYYY-MM-DD');
            fechafinal = fecha;
            console.log(fechainicio, fechafinal);
            break;
        case "Saturday":
            fechainicio = moment(fecha).subtract(5, 'days').format('YYYY-MM-DD');
            fechafinal = moment(fecha).subtract(1, 'days').format('YYYY-MM-DD');
            //console.log(fechainicio, fechafinal);
            break;
        case "Friday":
            fechainicio = moment(fecha).subtract(6, 'days').format('YYYY-MM-DD');
            fechafinal = moment(fecha).subtract(2, 'days').format('YYYY-MM-DD');
            //console.log(fechainicio, fechafinal);
            break;
    }
    mostSemanamenu(fechainicio, fechafinal, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Idusuario', (req, res) => {
    mostIdusuario(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/IdusuarioPMateriales', (req, res) => {
    const ubicacion = req.query.ubicacion;
    mostIdusuarioPMateriales(ubicacion, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Idcheck', (req, res) => {
    const responsable = req.query.idcheck;
    const numsemana = req.query.numsemana;

    //console.log(responsable, numsemana);
    mostIdcheck(responsable, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            if (respuesta.respuesta && respuesta.respuesta.length > 0) {
                mostComidasolicitada(numsemana, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuesta.respuesta);
                        const solicito = respuesta.respuesta.find((filtro) => filtro.idcheck === responsable && filtro.numsemana === numsemana);
                        //console.log(solicito);
                        if (solicito) {
                            //console.log("Ya solicito comida")
                            res.status(400).json({
                                mensaje: "Ya solicito comida"
                            })
                        }
                        else {
                            //console.log(respuesta.respuesta);
                            res.status(200).json({
                                respuesta
                            })
                        }

                    }
                    //console.log(respuesta);
                })
            }
            else {
                //console.log("No existe el usuario")
                res.status(400).json({
                    mensaje: "No existe el usuario"
                })
            }

        }
        //console.log(respuesta);
    })
}
)
app.get('/Controlresponsable', (req, res) => {
    //console.log(req.query.responsable);
    mostControlresponsable(fecha, req.query.responsable, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            console.log(respuesta);
            const uniqueControls = {};
            // Iterar sobre la respuesta
            respuesta.respuesta.forEach(item => {
                // Verificar si ya existe un registro con el mismo idcontrolactivi
                if (!uniqueControls[item.idcontrolactivi] || uniqueControls[item.idcontrolactivi].idtiempos < item.idtiempos) {
                    uniqueControls[item.idcontrolactivi] = item; // Guardar el registro con el idtiempos más alto para cerrarlo 
                }
            })
            // Convertir el objeto a un array
            const result = Object.values(uniqueControls);
            console.log(result);
            res.status(200).json({
                result
            })
        }
        //console.log(respuesta);
    })
})
app.get('/foto', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.id;
    //console.log(responsable);
    mostFotoperfil(responsable, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/PDM', (req, res) => {
    mostPDM(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            io.emit('escuchando', respuesta);
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
//Muestra la asignacion de actividades el supervisor en el aparto de control de actividades.
app.get('/buscar_Supervisor/:id', async (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    var idcheck = req.params.id
    //console.log(idcheck)
    mostIdcheck(idcheck, function (error, respuestaidCheck) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaidCheck);
            if (respuestaidCheck.respuesta && respuestaidCheck.respuesta.length > 0) {
                const responsable = respuestaidCheck.respuesta[0].NombreCompleto;
                console.log(responsable);

                mostPDM(function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(respuesta.respuesta);
                        const supervisor = respuesta.respuesta.find(filtro => filtro.Nombre === responsable && filtro.Puesto === "SUPERVISOR");
                        const resultadosupervisor = supervisor ? "es supervisor" : "no es supervisor";
                        //console.log(resultadosupervisor);
                        if (resultadosupervisor === "no es supervisor") {
                            res.status(400).json({
                                mensaje: "No tienes los permisos para esta actividad"
                            })
                        }
                        else {
                            const ayudantes = respuesta.respuesta.filter(filtro => filtro.Ubicacion === supervisor.Ubicacion);
                            //const resultado = Object.values(ayudantes);

                            //console.log(supervisor.Ubicacion);
                            //console.log(fecha);
                            //console.log(respuesta.respuesta);
                            mostControlactivi(supervisor.Ubicacion, fecha, function (error, respuestaActividades) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    //console.log("Actividades asignadas: ", respuestaActividades);
                                    mostIdusuarioPMateriales(supervisor.Ubicacion, function (error, respuestaMateriales) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            //console.log(respuesta.respuesta);
                                            res.status(200).json({
                                                actividades: respuestaActividades,
                                                responsables: respuestaMateriales
                                            })
                                        }
                                        //console.log(respuesta);
                                    })
                                }
                                //console.log(respuesta);
                            })
                        }


                    }
                    //console.log(respuesta);
                })
            } else {
                res.status(400).json({
                    mensaje: "No existe el usuario que intenta buscar"
                })
            }
        }
    })
})
app.get('/entregaAFI', (req, res) => {
    mostEntregaafi(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            io.emit('escuchando', respuesta);
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/idinsumos/:id', async (req, res) => {
    var idactivo = req.params.id;
    console.log(idactivo);
    mostInsumos(function (error, respuestaInsumos) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const respuesta = respuestaInsumos.respuesta.find(filtro => filtro.folioInsumos === idactivo);
            console.log(respuesta);
            if (respuesta) {
                res.status(200).json({
                    respuesta
                })
            }
            else {
                res.status(400).json({
                    mensaje: "No existe un activo fijo con ese ID."
                })
            }
        }
        //console.log(respuesta);
    })
}
)
//MODIFICAR LA INSERCIÓN DE PRESTAMO PARA MOSTRAR PRESTAMOS VENCIDOS
app.get('/vigenciaprestamo', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    mostVigenciaprestamos(fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/ubicacionMantt', (req, res) => {

    mostubi(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/MenuLista', async (req, res) => {
    var fechainicio = req.query.fechainicio;
    var fechafin = req.query.fechafin;

    const verificardia = moment(fechainicio).format("dddd");
    //console.log(verificardia);

    const aproxfin = moment(fechainicio).add(4, 'days').format('YYYY-MM-DD');
    //console.log(aproxfin);
    if (verificardia === "Monday" && fechafin === aproxfin) {
        mostMenulista(fechainicio, fechafin, async function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const platosentrada = respuesta.respuesta.map((filtro) => {
                    return {
                        platoentrada: filtro.imagen1
                    };
                });

                const bebida = respuesta.respuesta.map((filtro) => {
                    return {
                        bebida: filtro.imagen2
                    };
                });

                const platoa = respuesta.respuesta.map((filtro) => {
                    return {
                        platoa: filtro.imagen3
                    };
                });

                const platob = respuesta.respuesta.map((filtro) => {
                    return {
                        platob: filtro.imagen4
                    };
                });

                const convertirImagenesABase64S = async (platos) => {
                    const base64Images = [];

                    for (const plato of platos) {
                        const rutaImagen = "uploads/" + plato.platoentrada;
                        // Leer la imagen y convertirla a base64
                        try {
                            const data = await fs.promises.readFile(rutaImagen);
                            let base64Image = Buffer.from(data, 'binary').toString('base64');
                            const imagenFinal = "data:image/jpeg;base64," + base64Image; // Cambia 'jpeg' por el tipo adecuado si es necesario
                            base64Images.push(imagenFinal);
                        } catch (err) {
                            console.error(`Error al leer la imagen ${rutaImagen}:`, err);
                        }
                    }

                    return base64Images;
                };

                const convertirImagenesABase64PA = async (platos) => {
                    const base64Images = [];

                    for (const plato of platos) {
                        const rutaImagen = "uploads/" + plato.platoa;
                        // Leer la imagen y convertirla a base64
                        try {
                            const data = await fs.promises.readFile(rutaImagen);
                            let base64Image = Buffer.from(data, 'binary').toString('base64');
                            const imagenFinal = "data:image/jpeg;base64," + base64Image; // Cambia 'jpeg' por el tipo adecuado si es necesario
                            base64Images.push(imagenFinal);
                        } catch (err) {
                            console.error(`Error al leer la imagen ${rutaImagen}:`, err);
                        }
                    }

                    return base64Images;
                };

                const convertirImagenesABase64PB = async (platos) => {
                    const base64Images = [];

                    for (const plato of platos) {
                        const rutaImagen = "uploads/" + plato.platob;
                        // Leer la imagen y convertirla a base64
                        try {
                            const data = await fs.promises.readFile(rutaImagen);
                            let base64Image = Buffer.from(data, 'binary').toString('base64');
                            const imagenFinal = "data:image/jpeg;base64," + base64Image; // Cambia 'jpeg' por el tipo adecuado si es necesario
                            base64Images.push(imagenFinal);
                        } catch (err) {
                            console.error(`Error al leer la imagen ${rutaImagen}:`, err);
                        }
                    }

                    return base64Images;
                };

                const convertirImagenesABase64B = async (platos) => {
                    const base64Images = [];

                    for (const plato of platos) {
                        const rutaImagen = "uploads/" + plato.bebida;
                        // Leer la imagen y convertirla a base64
                        try {
                            const data = await fs.promises.readFile(rutaImagen);
                            let base64Image = Buffer.from(data, 'binary').toString('base64');
                            const imagenFinal = "data:image/jpeg;base64," + base64Image; // Cambia 'jpeg' por el tipo adecuado si es necesario
                            base64Images.push(imagenFinal);
                        } catch (err) {
                            console.error(`Error al leer la imagen ${rutaImagen}:`, err);
                        }
                    }

                    return base64Images;
                };

                // Llamada a la función
                try {
                    const sopas = await convertirImagenesABase64S(platosentrada);
                    const platofuertea = await convertirImagenesABase64PA(platoa);
                    const platofuerteb = await convertirImagenesABase64PB(platob);
                    const bebidas = await convertirImagenesABase64B(bebida);

                    res.status(200).json({
                        respuesta,
                        sopas,
                        platofuertea,
                        platofuerteb,
                        bebidas
                    });
                } catch (err) {
                    console.error("Error al convertir las imágenes a Base64:", err);
                    res.status(500).json({ mensaje: "Error interno del servidor" });
                }
            }
            //console.log(respuesta);
        })
    }
    else {
        console.log("Las fechas de la semana son incorrectas.")
        res.status(400).json({
            mensaje: "Las fechas de la semana son incorrectas."
        })
    }
    //console.log(fechainicio, fechafin);
}
)
app.get('/Eficacia', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    console.log(responsable);
    mostEficacia(function (error, respuestaEficacia) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaEficacia.respuesta);
            const respuesta = respuestaEficacia.respuesta.filter((filtro) => filtro.responsable === responsable);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/minimoconsumibles', (req, res) => {
    mostConsumible(function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const limite = respuesta.respuesta.filter((filtro) => filtro.cantidad <= filtro.minimo);
            //console.log(limite);
            res.status(200).json({
                limite
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/verificarpermiso', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.nombre;
    const repuesta = "";

    if (responsable === "LUIS REY HERNANDEZ ROMERO") {
        res.status(200).json({
            respuesta: "SI"
        })
    }
    else {
        res.status(400).json({
            respuesta: "NO"
        })
    }
}
)
app.get('/Altas', (req, res) => {

    mostAltas(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/globalstatus', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const nombre = usuario.nombre;
    //console.log(nombre); 

    mostEficacia(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const deldia = respuesta.respuesta.filter((filtro) => filtro.fechainicio === fecha && filtro.status != "INACTIVO" && filtro.responsable === nombre);
            const deldiatotal = deldia.length;
            //console.log("deldia", deldia.length);

            const terminadas = deldia.filter((filtro) => filtro.status === "TERMINADO");
            const terminadastotal = terminadas.length;
            //console.log("terminadas", terminadas.length);

            const promedio1 = terminadas.reduce((acumulador, filtro) => {
                return acumulador + filtro.eficienciasig;
            }, 0);
            const promedio = Math.round((promedio1 + Number.EPSILON) * 100) / 100;
            const promediototal1 = promedio / terminadas.length
            const promediototal = Math.round((promediototal1 + Number.EPSILON) * 100) / 100;
            //console.log(promediototal);


            const promedioasig = (terminadastotal * 100) / deldiatotal;
            const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
            //console.log(promedioasigtotal);

            res.status(200).json({
                deldiatotal,
                terminadastotal,
                promediototal,
                promedioasigtotal
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/comidasolicitadas', (req, res) => {
    const numsemana = req.query.numsemana;
    //console.log(numsemana);
    mostComidasolicitada(numsemana, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const lunesA = respuesta.respuesta.filter((filtro) => filtro.lunes === "A").length;
            //console.log(lunesA);
            const lunesB = respuesta.respuesta.filter((filtro) => filtro.lunes === "B").length;
            //console.log(lunesB);

            const martesA = respuesta.respuesta.filter((filtro) => filtro.martes === "A").length;
            //console.log(martesA);
            const martesB = respuesta.respuesta.filter((filtro) => filtro.martes === "B").length;
            //console.log(martesB);

            const miercolesA = respuesta.respuesta.filter((filtro) => filtro.miercoles === "A").length;
            //console.log(miercolesA);
            const miercolesB = respuesta.respuesta.filter((filtro) => filtro.miercoles === "B").length;
            //console.log(miercolesB);

            const juevesA = respuesta.respuesta.filter((filtro) => filtro.jueves === "A").length;
            //console.log(juevesA);
            const juevesB = respuesta.respuesta.filter((filtro) => filtro.jueves === "B").length;
            //console.log(juevesB);

            const viernesA = respuesta.respuesta.filter((filtro) => filtro.viernes === "A").length;
            //console.log(viernesA);
            const viernesB = respuesta.respuesta.filter((filtro) => filtro.viernes === "B").length;
            //console.log(viernesB);


            res.status(200).json({
                respuesta,
                lunesA,
                lunesB,
                martesA,
                martesB,
                miercolesA,
                miercolesB,
                juevesA,
                juevesB,
                viernesA,
                viernesB

            })

        }
        //console.log(respuesta);
    })

}
)
app.get('/permisos', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.id;
    //console.log(responsable);

    mostPermisos(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const persona = respuesta.respuesta.find((filtro) => filtro.Id_Permisos === responsable);
            //console.log(persona);
            if (persona && persona.Form_comida === "true") {
                res.status(200).json({
                    mensaje: "true"
                })
            }
            else {
                console.log("false");
                res.status(400).json({

                    mensaje: "false"
                })
            }
        }
        //console.log(respuesta);
    })
}
)
app.get('/pedidocomida', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    const responsable = usuario.id;
    console.log(responsable);
    const numsemana = req.query.numsemana;
    console.log(numsemana);

    mostComidasolicitada(numsemana, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const solicito = respuesta.respuesta.find((filtro) => filtro.idcheck === responsable);
            console.log(solicito);
            if (solicito) {
                res.status(200).json({
                    solicito
                })
            }
            else {
                console.log("false");
                res.status(400).json({
                    mensaje: "No pidio comida"
                })
            }
        }
        //console.log(respuesta);
    })
}
)
app.get('/userasistencia', (req, res) => {
    mostUserasistencia(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)

app.get('/tableroLogistica', (req, res) => {
    mostTablerologistica(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const deldiatotalSincanceladas = respuesta.respuesta.filter(datos => datos.Estatus != "CANCELADO");
            const deldiatotal = deldiatotalSincanceladas.length
            console.log("asignadas ", deldiatotal);

            const terminadas = respuesta.respuesta.filter((filtro) => filtro.Estatus === "TERMINADO");
            const terminadastotal = terminadas.length;
            //console.log("terminadas ", terminadas.length);


            const promedioasig = (terminadastotal * 100) / deldiatotal;
            const promedioasigtotal = Math.round((promedioasig + Number.EPSILON) * 100) / 100;
            //console.log("Promedio terminadas ", promedioasigtotal);

            res.status(200).json({
                deldiatotal,
                terminadastotal,
                promedioasigtotal
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/Numsemanamenu', (req, res) => {
    mostNumsemanamenu(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
})
app.get('/tableromantt/:mes', (req, res) => {
    console.log(req.params.mes)
    mostTableromantt(req.params.mes, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const confechacompromiso = respuesta.respuesta.length;
            //console.log(confechacompromiso);


            let atendidos1 = [];
            respuesta.respuesta.forEach((datos) => {
                if (datos.Fecha_Atencion <= datos.Fecha_Compromiso) {
                    atendidos1.push(datos);
                }
            })
            const atendidos = atendidos1.length;
            //console.log(atendidos);

            const promedioatendidos = (atendidos * 100) / confechacompromiso;
            const promedioatendidostotal = Math.round((promedioatendidos + Number.EPSILON) * 100) / 100;
            //console.log(promedioatendidostotal);

            res.status(200).json({
                confechacompromiso,
                atendidos,
                promedioatendidostotal
            })
        }
        //console.log(respuesta);
    })
})
//VERIFICAR LA SUCURSAL A LA CUAL PUEDE VERIFICAR
app.get('/verificarcompras', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario);
    mostAltas(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const verificador = respuesta.respuesta.find(filtro => filtro.idCheck === usuario.id);
            const sucursal = verificador.Sucursal;
            console.log(verificador.Sucursal);
            mostVerificarcompras(function (error, respuestaVerificarcompras) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const respuesta = respuestaVerificarcompras.respuesta.filter((datos) => datos.sucursal === sucursal);
                    res.status(200).json({
                        respuesta
                    })
                }
                //console.log(respuesta);
            })
        }
        //console.log(respuesta);
    })

})

/* Fin de mostrar */

/* Insertar */
app.post('/insertarForms', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    console.log(usuario)
    if (usuario.nombre && req.body.pregunta && req.body.periodo && req.body.activo && fecha && req.body.inconformidad && req.body.estatus) {
        console.log(req.body);
        inserPre(usuario.nombre, req.body.pregunta, req.body.periodo, req.body.activo, fecha, req.body.inconformidad, req.body.estatus, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.post('/insertarUnidad', (req, res) => {
    Folio(function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.Falta && req.body.descrip) {
                inserUnidad(folio, fecha, req.body.Falta, req.body.descrip, function (errorUnidad, respuestaUnidad) {
                    if (errorUnidad) {
                        console.error(errorUnidad);
                        return res.status(404).json({ mensaje: respuestaUnidad.mensaje });
                    } else {
                        inser(folio, fecha, function (errorInser, respuestaInser) {
                            if (errorInser) {
                                console.error(errorInser);
                                return res.status(404).json({ mensaje: respuestaInser.mensaje });
                            } else {
                                // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                res.status(200).json({
                                    mensaje: "Ambas inserciones realizadas con éxito",
                                    respuestaUnidad: respuestaUnidad,
                                    respuestaInser: respuestaInser
                                });
                            }
                        });

                    }
                });

            } else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }

        }
    })
})
app.post('/insertarRes', (req, res) => {
    if (req.body.idPregunta && req.body.folioActivo && fecha && req.body.resp) {
        inserRespuesta(req.body.idPregunta, req.body.folioActivo, fecha, req.body.resp, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
//MODIFICADO PARA ENVIAR LA FECHA AL FOLIO CAMBIOS DEL 12-12-2024
app.post('/insertarInsumos', (req, res) => {
    const fechafolio = moment().format("DDMMYY");
    Folio(fechafolio, function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.tipoAct && req.body.falta && req.body.descrip && req.body.proveedor && req.body.folioOC && req.body.monto && req.body.fadqui) {
                if (req.body.numserie) {
                    inserInsumos(folio, fecha, req.body.tipoAct, req.body.falta, req.body.descrip, req.body.proveedor, req.body.folioOC, req.body.monto, req.body.fadqui, req.body.numserie, function (error, respuesta) {

                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })
                }
                else {
                    const NAnumserie = "NA";
                    inserInsumos(folio, fecha, req.body.tipoAct, req.body.falta, req.body.descrip, req.body.proveedor, req.body.folioOC, req.body.monto, req.body.fadqui, NAnumserie, function (error, respuesta) {

                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })
                }
            } else {
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }

        }
    })

})
app.post('/insertarMante', (req, res) => {
    //console.log(req.body);
    const fecha = moment().format("YYYY-MM-DD");
    const fechafolio = moment().format("DDMMYY");
    Folio(fechafolio, function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            //console.log(folio)
            const tipo = req.body.tipoAct;
            //console.log("Tipo del activo", req.body.tipoAct);
            const noaplica = "NA";
            if (tipo) {
                if (tipo === "MONTACARGAS" || tipo === "EQUIPOS DE PRODUCCION" || tipo === "VEHÍCULOS" || tipo === "HERRAMIENTA") {
                    if (tipo === "MONTACARGAS") {
                        /* folioMant, falta, fabricacion, tipoAct,  modelo, capacidad, clasificacion, nmotor, tipocontmate, especificacion, marca, descripadi,descripgen,idubicacion, */
                        if (req.body.folioActivo && fecha && noaplica && req.body.tipoAct && req.body.modelo && req.body.capacidad && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica) {
                            inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, req.body.capacidad, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                if (errorMante) {
                                    console.error(errorMante);
                                    return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                }
                                else {
                                    // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                    res.status(200).json({
                                        mensaje: respuestaMante.mensaje,
                                    });
                                }
                            });
                        }
                        else {
                            //console.log("Existen datos vacíos");
                            res.status(400).json({
                                mensaje: "Existen datos vacíos"
                            });

                        }
                    }
                    else {
                        if (tipo === "EQUIPOS DE PRODUCCION") {
                            if (req.body.folioActivo) {
                                if (fecha && noaplica && req.body.tipoAct && req.body.modelo && req.body.capacidad && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica) {
                                    inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, req.body.capacidad, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                        if (errorMante) {
                                            console.error(errorMante);
                                            return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                        }
                                        else {
                                            // Si no hay errores envía una respuesta exitosa
                                            res.status(200).json({
                                                mensaje: respuestaMante.mensaje,
                                            });
                                        }
                                    });

                                }
                                else {
                                    //console.log("Existen datos vacíos");
                                    res.status(400).json({
                                        mensaje: "Existen datos vacíos"
                                    });

                                }

                            }
                            else {
                                if (folio && fecha && noaplica && req.body.tipoAct && req.body.modelo && req.body.capacidad && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica && noaplica) {
                                    inserMante(folio, fecha, noaplica, req.body.tipoAct, req.body.modelo, req.body.capacidad, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                        if (errorMante) {
                                            console.error(errorMante);
                                            return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                        }
                                        else {
                                            inser(folio, fecha, function (errorInser, respuestaInser) {
                                                if (errorInser) {
                                                    console.error(errorInser);
                                                    return res.status(404).json({ mensaje: respuestaInser.mensaje });
                                                } else {
                                                    // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                                    res.status(200).json({
                                                        mensaje: respuestaMante.mensaje,
                                                        /* respuestaMante: respuestaMante,
                                                        respuestaInser: respuestaInser */
                                                    });
                                                }
                                            });
                                        }
                                    });

                                }
                                else {
                                    //console.log("Existen datos vacíos");
                                    res.status(400).json({
                                        mensaje: "Existen datos vacíos"
                                    });

                                }
                            }
                        }
                        else {
                            if (tipo === "VEHÍCULOS") {
                                if (req.body.folioActivo && fecha && noaplica && req.body.tipoAct && req.body.modelo && noaplica && req.body.clasificacion && req.body.nmotor && noaplica && noaplica && noaplica && noaplica && noaplica) {
                                    inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, noaplica, req.body.clasificacion, req.body.nmotor, noaplica, noaplica, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                        if (errorMante) {
                                            console.error(errorMante);
                                            return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                        }
                                        else {
                                            // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                            res.status(200).json({
                                                mensaje: respuestaMante.mensaje,
                                            });
                                        }
                                    });
                                }
                                else {
                                    //console.log("Existen datos vacíos");
                                    res.status(400).json({
                                        mensaje: "Existen datos vacíos"
                                    });
                                }
                            } else {
                                if (tipo === "HERRAMIENTA") {
                                    if (req.body.folioActivo && fecha && noaplica && req.body.tipoAct && req.body.modelo && noaplica && noaplica && noaplica && noaplica && noaplica && req.body.marca && noaplica && noaplica && noaplica) {
                                        inserMante(req.body.folioActivo, fecha, noaplica, req.body.tipoAct, req.body.modelo, noaplica, noaplica, noaplica, noaplica, noaplica, req.body.marca, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                            if (errorMante) {
                                                console.error(errorMante);
                                                return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                            }
                                            else {
                                                // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                                res.status(200).json({
                                                    mensaje: respuestaMante.mensaje,
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        //console.log("Existen datos vacíos");
                                        res.status(400).json({
                                            mensaje: "Existen datos vacíos"
                                        });

                                    }


                                }
                            }
                        }


                    }

                } else {
                    if (tipo === "INFRAESTRUCTURA") {
                        if (folio && fecha && noaplica && req.body.tipoAct && noaplica && noaplica && req.body.clasificacion && noaplica && noaplica && noaplica && noaplica && req.body.descripadi && req.body.descripgen && req.body.idubicacion) {
                            inserMante(folio, fecha, noaplica, req.body.tipoAct, noaplica, noaplica, req.body.clasificacion, noaplica, noaplica, noaplica, noaplica, req.body.descripadi, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                if (errorMante) {
                                    console.error(errorMante);
                                    return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                } else {
                                    inser(folio, fecha, function (errorInser, respuestaInser) {
                                        if (errorInser) {
                                            console.error(errorInser);
                                            return res.status(404).json({ mensaje: respuestaInser.mensaje });
                                        } else {
                                            // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                            res.status(200).json({
                                                mensaje: respuestaMante.mensaje,
                                                /* respuestaMante: respuestaMante,
                                                respuestaInser: respuestaInser */
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            //console.log("Existen datos vacíos");
                            res.status(400).json({
                                mensaje: "Existen datos vacíos"
                            });
                        }


                    }
                    else {
                        if (tipo === "EQUIPOS DE CONTENCIÓN") {
                            if (folio && fecha && req.body.fabricacion && req.body.tipoAct && noaplica && req.body.capacidad && req.body.clasificacion && noaplica && req.body.tipocontmate && req.body.espeficicacion && noaplica && noaplica && req.body.descripgen && req.body.idubicacion) {
                                inserMante(folio, fecha, req.body.fabricacion, req.body.tipoAct, noaplica, req.body.capacidad, req.body.clasificacion, noaplica, req.body.tipocontmate, req.body.espeficicacion, noaplica, noaplica, req.body.descripgen, req.body.idubicacion, function (errorMante, respuestaMante) {
                                    if (errorMante) {
                                        console.error(errorMante);
                                        return res.status(404).json({ mensaje: respuestaMante.mensaje });
                                    } else {
                                        inser(folio, fecha, function (errorInser, respuestaInser) {
                                            if (errorInser) {
                                                console.error(errorInser);
                                                return res.status(404).json({ mensaje: respuestaInser.mensaje });
                                            } else {
                                                // Si no hay errores en ninguna de las inserciones, envía una respuesta exitosa
                                                res.status(200).json({
                                                    mensaje: respuestaMante.mensaje,
                                                    /* respuestaMante: respuestaMante,
                                                    respuestaInser: respuestaInser */
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                //console.log("Existen datos vacíos");
                                res.status(400).json({
                                    mensaje: "Existen datos vacíos"
                                });

                            }

                        }
                    }
                }
            }
            else {
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Existen datos vacíos"
                });
            }


        }
    })
})
app.post('/insertarUbi', (req, res) => {
    if (fecha && req.body.descrip && req.body.area) {
        inserUbi(fecha, req.body.descrip, req.body.area, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
//Inserta las actividades.
app.post('/insertarActif', (req, res) => {
    console.log(req.body);
    // timestandar,hora,minutos
    const fam = "NA";
    const proc = "NA";
    if (req.body.unidad && req.body.actividad && fecha && req.body.ubicacion && req.body.minutos) {
        if (req.body.unidad === "SI") {
            if (req.body.kg && req.body.familias && req.body.productos) {
                const minutos = parseFloat(req.body.minutos);
                if (req.body.hora) {
                    const hora = parseFloat(req.body.hora);
                    if (Number.isInteger(hora) && hora <= 24 && hora >= 1 && Number.isInteger(minutos) && minutos <= 55 && minutos >= 0) {
                        //console.log(req.body.hora, req.body.minutos)
                        var tiempoest = 0;
                        const kilos = req.body.kg;
                        const horaN = parseInt(req.body.hora) * 60;
                        tiempoest = horaN + parseInt(req.body.minutos);
                        const eficiencia1 = (60 * kilos) / tiempoest;
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        console.log(tiempoest);
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, tiempoest, hora, minutos, eficiencia, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de hora y minutos son incorrectos"
                        });

                    }

                }
                else {
                    if (Number.isInteger(minutos) && minutos <= 55 && minutos >= 1) {
                        const kilos = req.body.kg;
                        const hora = 0;
                        const eficiencia1 = (60 * kilos) / minutos;
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        inserActif(req.body.actividad, fecha, req.body.kg, req.body.familias, req.body.productos, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, eficiencia, function (error, respuesta) {

                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de minutos son incorrectos"
                        });

                    }
                }
            }
        }
        else {
            if (req.body.unidad === "NO") {
                const minutos = parseFloat(req.body.minutos);
                if (req.body.hora) {
                    const hora = parseFloat(req.body.hora);
                    if (Number.isInteger(hora) && req.body.hora <= 24 && req.body.hora >= 1 && Number.isInteger(minutos) && req.body.minutos <= 55 && req.body.minutos >= 0) {
                        //console.log(req.body.hora, req.body.minutos)
                        var tiempoest = 0;
                        const kilos = 0;
                        const horaN = parseInt(req.body.hora) * 60;
                        tiempoest = horaN + parseInt(req.body.minutos);
                        const eficiencia1 = 60 / tiempoest;
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        console.log(tiempoest);
                        inserActif(req.body.actividad, fecha, kilos, fam, proc, req.body.ubicacion, tiempoest, req.body.hora, req.body.minutos, eficiencia, function (error, respuesta) {

                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de hora y minutos son incorrectos"
                        });

                    }

                }
                else {
                    if (req.body.minutos <= 55 && req.body.minutos >= 1) {
                        const hora = 0;
                        const kilos = 0;
                        const eficiencia1 = 60 / parseInt(req.body.minutos);
                        const eficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                        inserActif(req.body.actividad, fecha, kilos, fam, proc, req.body.ubicacion, req.body.minutos, hora, req.body.minutos, eficiencia, function (error, respuesta) {

                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                io.emit('escuchando', respuesta.mensaje);
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        console.log("Algo esta mal en hora y minutos")
                        console.log("Existen datos vacíos");
                        res.status(400).json({
                            mensaje: "Los valores de minutos son incorrectos"
                        });

                    }
                }

            }
        }

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
//ENVIO DE FECHA PARA EL FOLIO, SE MODIFICA EL FOLIO Y SOLO SE OBTIENE LA FECHA INICIANDO POR EL AÑO. 2024-12-04
app.post('/insertarConsumibles', (req, res) => {
    const fechafolio = moment().format("YYMMDD");
    Folioconsumible(fechafolio, function (error, respuesta) {
        if (error) {
            console.log(error);
            res.status(500).json({
                mensaje: "Error al obtener el folio"
            });
        } else {
            // Una vez que tenemos el folio, procedemos con la inserción
            const folio = respuesta.folio;
            console.log("Folio obtenido: ", folio)
            if (folio && fecha && req.body.unidadmedida && req.body.tipo && req.body.descripcion && req.body.minimo) {
                const cantidad = 0;
                const codigobarras = "";
                const costo = 0;

                /* folioActivo,fecha,unidadmedida,cantidad,tipo,descripcion,codigobarras */
                inserConsumible(folio, fecha, req.body.unidadmedida, cantidad, costo, req.body.tipo, req.body.descripcion, codigobarras, req.body.minimo, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        io.emit('escuchando', respuesta);
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            } else {
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });
            }

        }
    })

})
//INSERTAR PROVEEDOR DESDE CANTABILIDAD 12/14/2024
app.post('/insertarProveedor', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* fecha, nombre, `email`, `movil`, `tel`, `rsocial`, `rfc`, 
    `rfiscal`, `cfdi`, `fpago`, `calle`, `next`, `colonia`, `ninten`, `municipio`, 
    `ciudad`, `cpostal`, `cnombre`, `cemail`, `cmovil`, `ctel`, `beneficiario`, `nombanco`, 
    `clabe`, `cuenta`, `refpago`, `credito`, `cdias`, `identifi`, `curp` */

    if (fecha && req.body.nombre && req.body.email && req.body.movil && req.body.tel && req.body.rsocial && req.body.rfc &&
        req.body.rfiscal && req.body.cfdi && req.body.fpago && req.body.calle && req.body.next && req.body.colonia && req.body.ninten && req.body.municipio &&
        req.body.ciudad && req.body.cpostal && req.body.cnombre && req.body.cemail && req.body.cmovil && req.body.ctel && req.body.beneficiario && req.body.nombanco &&
        req.body.clabe && req.body.cuenta && req.body.refpago && req.body.credito && req.body.curp) {
        insertarProveedor(fecha, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, req.body.identifi, req.body.curp, function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.post('/insertarUsuariprov', (req, res) => {
    const foliorpm = "FOLIORPM";
    if (foliorpm && fecha && req.body.nombre && req.body.email && req.body.movil && req.body.tel && req.body.rsocial && req.body.rfc &&
        req.body.rfiscal && req.body.cfdi && req.body.fpago && req.body.calle && req.body.next && req.body.colonia && req.body.ninten && req.body.municipio &&
        req.body.ciudad && req.body.cpostal && req.body.cnombre && req.body.cemail && req.body.cmovil && req.body.ctel && req.body.beneficiario && req.body.nombanco &&
        req.body.clabe && req.body.cuenta && req.body.refpago && req.body.credito) {
        insertarUsuarioprov(foliorpm, fecha, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
//Inserta los materiales de las actividades. 
app.post('/insertarMaterial', (req, res) => {
    if (fecha && req.body.fam && req.body.produc) {
        mostMaterial(function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //const materiales = respuesta.respuesta;
                //console.log(materiales);
                const nuevomaterial = respuesta.respuesta.find((filtro) => filtro.familia === req.body.fam && filtro.producto === req.body.produc);
                if (nuevomaterial) {
                    console.log("El material ya existe");
                    res.status(400).json({
                        mensaje: "El material ya existe"
                    });
                } else {
                    insertarMaterial(fecha, req.body.fam, req.body.produc, function (error, respuesta) {

                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })

                }
            }
            //console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
//MODIFICADO PARA CALCULAR LA EFICACIA
app.post('/insertarAsigactividad', verificar_Token, (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const usuario = req.usuario;
    //console.log(usuario)  
    const responsable = usuario.nombre;
    const kg = 0;
    const numpersonas = 0;
    const eficacia = 0;
    const eficienciasig = 0;
    //console.log(responsable)
    mostAsignacion(responsable, fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log("Asignación de actividades ",respuesta.respuesta);
            //console.log("Datos del formulario", req.body)
            if (fecha && usuario.nombre && req.body.fechainicio && req.body.empresa && req.body.idactividad) {
                const datos = respuesta.respuesta.find((filtro) => filtro.fechainicio === req.body.fechainicio && filtro.empresa === req.body.empresa && filtro.idactividad === req.body.idactividad);
                //console.log("Datos filtrados ", datos);
                if (datos) {
                    console.log("");
                    res.status(400).json({
                        mensaje: "La actividad ya existe.."
                    });
                }
                else {
                    console.log("No existe esta actividad");
                    const status = "INICIAR"
                    const timecontrol = 0;
                    insertarAsigactivi(fecha, usuario.nombre, req.body.fechainicio, req.body.empresa, req.body.idactividad, status, timecontrol, kg, numpersonas, eficacia, eficienciasig, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            io.emit('actividadiaria', respuesta.mensaje);
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })

                }
            }
            else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });
            }
        }
        //console.log(respuesta);
    })
})
//GUARDA LA COMPRA SIN ALTERAR EL CONTEO GLOBAL, 2024-12-04 *** GUARDA LA SUCURSAL QUE ESTA COMPRADOM LOS ACTIVOS
app.post('/insertarCompra', (req, res) => {
    console.log(req.body);
    const fecha = moment().format("YYYY-MM-DD");
    const valorinventario = 0;
    if (req.body.idconsumibles && req.body.folioActivo && fecha && req.body.proveedor && req.body.cantidad && req.body.costo && req.body.oc && req.body.descrip && req.body.sucursal) {
        // cantidad, preciounitario, costototal, valorinventario, oc
        const preciounitario1 = parseFloat(req.body.costo) / parseInt(req.body.cantidad);
        //console.log("Precio unitario con todos los decimales: ",preciounitario1);
        const preciounitario = Math.round((preciounitario1 + Number.EPSILON) * 100) / 100;
        //console.log("Precio unitario con dos decimales: ", preciounitario);

        if (req.body.codigobarras) {
            insertarCompra(req.body.folioActivo, fecha, req.body.proveedor, req.body.cantidad, preciounitario, req.body.costo, valorinventario, req.body.oc, req.body.codigobarras, req.body.descrip, req.body.sucursal, function (error, respuesta) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    io.emit('escuchando', respuesta.mensaje);
                    console.log("Se ejecuto pero no funciona el socket");
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
        }
        else {
            insertarCompra(req.body.folioActivo, fecha, req.body.proveedor, req.body.cantidad, preciounitario, req.body.costo, valorinventario, req.body.oc, req.body.folioActivo, req.body.descrip, req.body.sucursal, function (error, respuesta) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    io.emit('escuchando', respuesta.mensaje);
                    console.log("Se ejecuto, pero no funciona el socket");
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
        }

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }

})


/*  const totalCosto = respuestacompra.respuesta.reduce((acumulador, filtro) => {
                         return acumulador + filtro.costototal;
                     }, 0);
                     const sumacostos = totalCosto + parseFloat(req.body.costo); */
/* app.post('/insertarCompra', (req, res) => {
    console.log(req.body);
    mostConsumible(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const datos = respuesta.respuesta.find((filtro) => filtro.folioActivo === req.body.folioActivo);
            const ultimacantidad = datos.cantidad;
            const ultimovalorinventario = datos.costo;
            console.log("Ultima cantidad = ", ultimacantidad);
            console.log("Ultima valor inventario = ", ultimovalorinventario);
            if (ultimacantidad >= 0 && ultimovalorinventario >= 0) {
                if (req.body.idconsumibles && req.body.folioActivo && fecha && req.body.proveedor && req.body.cantidad && req.body.costo && req.body.oc && req.body.descrip) {
                    // cantidad, preciounitario, costototal, valorinventario, oc
                    const preciounitario1 = parseFloat(req.body.costo) / parseInt(req.body.cantidad);
                    //console.log("Precio unitario con todos los decimales: ",preciounitario1);
                    const preciounitario = Math.round((preciounitario1 + Number.EPSILON) * 100) / 100;
                    console.log("Precio unitario con dos decimales: ", preciounitario);

                    const existencias = ultimacantidad + parseInt(req.body.cantidad);
                    console.log("Existencias totales: ", existencias);
                    console.log("Costo total de la compra actual: ", parseFloat(req.body.costo));
                    const valorinventario1 = ((ultimacantidad * ultimovalorinventario) + parseFloat(req.body.costo)) / existencias;
                    const valorinventario = Math.round((valorinventario1 + Number.EPSILON) * 100) / 100;
                    console.log("Valor inventario con todos los decimales: ", valorinventario);

                    if (req.body.codigobarras) {
                        insertarCompra(req.body.folioActivo, fecha, req.body.proveedor, req.body.cantidad, preciounitario, req.body.costo, valorinventario, req.body.oc, req.body.codigobarras, req.body.descrip, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                    else {
                        insertarCompra(req.body.folioActivo, fecha, req.body.proveedor, req.body.cantidad, preciounitario, req.body.costo, valorinventario, req.body.oc, req.body.folioActivo, req.body.descrip, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                    }

                }
                else {
                    console.log("Existen datos vacíos");
                    res.status(400).json({
                        mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                    });
                }
            }
            else {
                console.log("No existe cantidad en consumibles y valor de inventario");
                res.status(400).json({
                    mensaje: "No existe cantidad en consumibles y valor de inventario"
                });
            }
        }

    })
}) */
app.post('/insertarMovimiento', (req, res) => {
    //console.log(req.body);
    mostConsumible(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            if (req.body.folioActivo && fecha && req.body.costo && req.body.cantidad && req.body.responsable && req.body.tipo) {
                //console.log(respuesta)
                const datos = respuesta.respuesta.find((filtro) => filtro.folioActivo === req.body.folioActivo);
                //console.log(datos);
                const ultimacantidad = datos.cantidad;
                console.log("Ultima cantidad = ", ultimacantidad);
                const cantidad = parseFloat(req.body.cantidad);
                if (Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= ultimacantidad) {
                    const cantidadactual = parseInt(ultimacantidad) - cantidad;

                    mostIdcheck(req.body.responsable, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            console.log("Datos el responsable: ", respuesta.respuesta[0].NombreCompleto);
                            const responsable = respuesta.respuesta[0].NombreCompleto;
                            const area = respuesta.respuesta[0].Area;
                            const idcheck = respuesta.respuesta[0].idCheck;
                            insertarMovimiento(req.body.folioActivo, fecha, req.body.costo, req.body.cantidad, responsable, area, req.body.tipo, idcheck, function (error, respuesta) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    editConsu(req.body.idconsumibles, cantidadactual, req.body.costo, req.body.codigobarras, function (error, respuesta) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            res.status(200).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        //console.log(respuesta);
                                    })
                                }
                                //console.log(respuesta);
                            })
                        }
                        //console.log(respuesta);
                    })

                }
                else {
                    res.status(400).json({
                        mensaje: "CANTIDAD INSUFICIENTE"
                    });
                }

            }
            else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });
            }
        }
        //console.log(respuesta);
    })
})
//MODIFICADO PARA CALCULAR LA EFICACIA
app.post('/insertarControl', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    if (req.body.idactividades && fecha && req.body.responsables && req.body.idasigactivi && req.body.idchecksupervisor) {
        const timestandar = 0;
        const kg = 0;
        const lon = 0;
        const lat = 0;
        const status = "INICIAR";
        //console.log(req.body);
        mostControlasignados(req.body.idchecksupervisor, fecha, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje

                })
            }
            else {
                //console.log(req.body)
                //console.log(respuesta.respuesta)
                const datosFil = respuesta.respuesta.find((filtro) => filtro.responsables === req.body.responsables);
                //console.log(datosFil);
                if (datosFil) {
                    console.log("El responsable esta asignado en otra actividad");
                    res.status(400).json({
                        mensaje: "El responsable esta asignado en otra actividad"
                    });

                } else {
                    //console.log(req.body.idasigactivi,);
                    mostIdusuario(function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            console.log(req.body.responsables);
                            const searchidcheck = respuesta.respuesta.find(filtro => filtro.NombreCompleto === req.body.responsables);
                            console.log(searchidcheck);
                            const idcheck = searchidcheck.idCheck;

                            console.log(idcheck);


                            insertarControlactivi(req.body.idactividades, fecha, req.body.responsables, timestandar, kg, lon, lat, status, req.body.idasigactivi, idcheck, req.body.idchecksupervisor, function (error, respuesta) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    mostNumpersonas(req.body.idasigactivi, function (error, respuesta) {
                                        if (error) {
                                            console.log(error)
                                            res.status(404).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                        else {
                                            console.log(respuesta.respuesta[0].numpersonas);
                                            const personastotales = respuesta.respuesta[0].numpersonas + 1;
                                            console.log(personastotales);
                                            editNumpersonas(req.body.idasigactivi, personastotales, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta.mensaje);
                                                    res.status(200).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                //console.log(respuesta);
                                            })
                                        }
                                        //console.log(respuesta);
                                    })

                                }
                                //console.log(respuesta);
                            })

                        }
                        //console.log(respuesta);
                    })
                }
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
//Inserta los movimientos de los operadores cuando inician la actividad y cuando reinician una pausa.  
app.post('/insertarTiempo', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    const horainicio = moment().format('HH:mm');
    const horafin = "NA";
    const timestandar = 0;
    const status = "EN PROCESO";
    const motivo = "NA"
    if (fecha && horainicio && req.body.idcontrolactivi) {
        insertarTiempos(fecha, horainicio, horafin, timestandar, status, motivo, req.body.idcontrolactivi, function (error, respuestaTiempo) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                editControlstatus(req.body.idcontrolactivi, status, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        mostTiempocontrol(req.body.idactividades, fecha, function (error, respuestaTiempocontrol) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuestaTiempocontrol.mensaje
                                })
                            }
                            else {
                                const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                    return acumulador + filtro.timestandar;
                                }, 0);

                                console.log("Tiempo asignacion: ", timeasignacion);
                                const kg = 0;
                                editStatusasignacion(req.body.idasigactivi, req.body.status, timeasignacion, kg, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        io.emit('escuchando', respuesta);
                                        res.status(200).json({
                                            mensaje: respuestaTiempo.mensaje
                                        })
                                    }
                                })
                            }
                        })
                        /* res.status(200).json({
                            mensaje: respuestaTiempo.mensaje
                        }) */
                    }
                    console.log(respuesta);
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.post('/insertarInsumoasig', (req, res) => {
    /* folioInsumos, fecha, responsable, area, cantidad, costo, */
    if (req.body.folioInsumos && req.body.responsable) {
        mostInsumos(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const nuevoInsumo = respuesta.respuesta.find((filtro) => filtro.folioInsumos === req.body.folioInsumos);
                const cantidad = 0;
                const area = "TECNOLOGÍAS DE LA INFORMACIÓN";
                const estatus = "ASIGNACIÓN";
                console.log(nuevoInsumo.monto);
                insertarInsumoasig(req.body.folioInsumos, fecha, req.body.responsable, area, cantidad, nuevoInsumo.monto, estatus, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            }
            //console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
app.post('/insertarprestamo', (req, res) => {
    /* folioInsumos, fecha, responsable, area, cantidad, costo */
    //console.log(req.body);
    console.log(req.body);
    mostConsumible(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            if (req.body.idconsumibles && req.body.folioActivo && req.body.responsable && req.body.costo && req.body.codigobarras) {
                //console.log(respuesta)
                const datos = respuesta.respuesta.find((filtro) => filtro.folioActivo === req.body.folioActivo);
                //console.log(datos);
                const ultimacantidad = datos.cantidad;
                console.log("Ultima cantidad = ", ultimacantidad);
                const cantidad = parseFloat(req.body.cantidad);
                if (Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= ultimacantidad) {
                    const estatus = "PRESTAMO";
                    const cantidadactual = parseInt(ultimacantidad) - cantidad;
                    insertarPrestamo(req.body.folioInsumos, fecha, req.body.responsable, req.body.area, cantidad, req.body.costo, estatus, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            editCanconsumo(req.body.folioActivo, cantidadactual, function (error, respuesta) {
                                if (error) {
                                    console.log(error)
                                    res.status(404).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                else {
                                    res.status(200).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                                //console.log(respuesta);
                            })
                        }
                        //console.log(respuesta);
                    })
                }
                else {
                    res.status(400).json({
                        mensaje: "CANTIDAD INSUFICIENTE"
                    });
                }

            }
            else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });
            }
        }
        //console.log(respuesta);
    })
})
app.post('/insertarComida', (req, res) => {
    cargar_archivo(req, res, (err, archivo) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al cargar el archivo');
        } else {
            //console.log("Respuesta img guardadas ", archivo);
            const ordenado = archivo.sort((a, b) => {
                // Extraer el número al principio de cada cadena
                const numeroA = parseInt(a.split('-')[0]);
                const numeroB = parseInt(b.split('-')[0]);

                // Comparar los números
                return numeroA - numeroB;
            });

            console.log(req.body);
            console.log("Ordenados: ", ordenado);
        }
    })
})
app.post('/insertarMenu', (req, res) => {
    //console.log(req.body)
    var diasemana = "";
    const estatus = "INACTIVO"
    /* fecha, fechainicio, diasemana, platoentrada, platofuerteA, platofuerteB, bebida, */

    if (fecha && req.body.fechainicio && req.body.numsemana && req.body.platoentrada && req.body.platofuerteA || req.body.platofuerteB && req.body.bebida) {
        const diasemanamoment = moment(req.body.fechainicio).format('dddd');
        /* Guardar en español */
        switch (diasemanamoment) {
            case "Monday": diasemana = "Lunes"; //console.log(diasemana);
                break;
            case "Tuesday": diasemana = "Martes"; //console.log(diasemana);
                break;
            case "Wednesday": diasemana = "Miercoles"; //console.log(diasemana);
                break;
            case "Thursday": diasemana = "Jueves"; //console.log(diasemana);
                break;
            case "Friday": diasemana = "Viernes"; //console.log(diasemana);
                break;
        }
        mostMenusemana(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const existe = respuesta.respuesta.find((filtro) => filtro.fechainicio === req.body.fechainicio);
                //console.log(datosFil);
                if (existe) {
                    console.log("Ya existe menú para esta fecha");
                    res.status(400).json({
                        mensaje: "Ya existe menú para esta fecha"
                    });
                }
                else {
                    if (diasemana) {
                        cargar_archivo(req, res, (err, archivo) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send('Error al cargar el archivo');
                            } else {
                                //console.log("Respuesta img guardadas ", archivo);
                                if (archivo === "Faltanarchivos") {
                                    console.log("Agrega al menos una imagen.");
                                    res.status(400).json({
                                        mensaje: "Agrega al menos una imagen"
                                    });
                                } else {
                                    const ordenado = archivo.sort((a, b) => {
                                        // Extraer el número al principio de cada cadena
                                        const numeroA = parseInt(a.split('-')[0]);
                                        const numeroB = parseInt(b.split('-')[0]);

                                        // Comparar los números
                                        return numeroA - numeroB;
                                    });
                                    console.log("Ordenados: ", ordenado);
                                    let a = '', b = '', c = '', d = '';
                                    // Iterar sobre los datos y asignar los valores a las variables
                                    ordenado.forEach((item, index) => {
                                        // Determinar el texto a guardar
                                        const text = item.includes('productosinimagen.png') ? 'productosinimagen.png' : item;

                                        // Asignar a las variables
                                        if (index === 0) {
                                            a = text;
                                        } else if (index === 1) {
                                            b = text;
                                        } else if (index === 2) {
                                            c = text;
                                        } else if (index === 3) {
                                            d = text;
                                        }
                                    });

                                    // Mostrar resultados
                                    /* console.log('a:', a);
                                    console.log('b:', b);
                                    console.log('c:', c);
                                    console.log('d:', d); */
                                    //console.log(req.body);
                                    //console.log(diasemanamoment);
                                    if (fecha && req.body.fechainicio && req.body.numsemana && req.body.platoentrada && req.body.platofuerteA || req.body.platofuerteB && req.body.bebida) {
                                        insertarMenusemana(fecha, req.body.fechainicio, req.body.numsemana, estatus, diasemana, req.body.platoentrada, req.body.platofuerteA, req.body.platofuerteB, req.body.bebida, a, b, c, d, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                res.status(200).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            //console.log(respuesta);
                                        })
                                    }
                                    else {
                                        res.status(400).json({
                                            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                                        });
                                    }

                                }
                            }
                        })
                    }
                    else {
                        console.log("No existe menú para el fin de semana.");
                        res.status(400).json({
                            mensaje: "No existe menú para el fin de semana"
                        });
                    }
                }
            }
            //console.log(respuesta);
        })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.post('/insertarentregaAFI', (req, res) => {
    const estatus = "ENTREGADO";
    const fecha = moment().format("YYYY-MM-DD");
    if (req.body.folioActivo && fecha) {
        //console.log(req.body);

        mostInsumos(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const activofijo = respuesta.respuesta.find(filtro => filtro.folioInsumos === req.body.folioActivo);
                console.log(activofijo.tipoAct);
                if (activofijo) {
                    mostEntregaafi(function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            const entregado = respuesta.respuesta.find(filtro => filtro.folioActivo === req.body.folioActivo);
                            //console.log(entregado);
                            if (entregado) {
                                res.status(400).json({
                                    mensaje: "El activo ya fue entregado."
                                });
                            }
                            else {
                                if (activofijo.tipoAct === "LLANTAS" || activofijo.tipoAct === "BATERIA") {
                                    const area = "null"
                                    if (req.body.utilitario) {
                                        insertarEntregaafi(req.body.folioActivo, fecha, area, estatus, req.body.utilitario, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                res.status(200).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            //console.log(respuesta);
                                        })
                                    }
                                    else {
                                        console.log("Existen datos vacíos");
                                        res.status(400).json({
                                            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                                        });
                                    }
                                }
                                else {
                                    if (req.body.idcheck) {
                                        mostIdcheck(req.body.idcheck, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                //console.log(respuesta.respuesta[0].Area);
                                                const area = respuesta.respuesta[0].Area;
                                                const utilitario = "null";
                                                insertarEntregaafi(req.body.folioActivo, fecha, area, estatus, utilitario, function (error, respuesta) {
                                                    if (error) {
                                                        console.log(error)
                                                        res.status(404).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    else {
                                                        res.status(200).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    //console.log(respuesta);
                                                })
                                            }
                                        })
                                    }
                                    else {
                                        console.log("Existen datos vacíos");
                                        res.status(400).json({
                                            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                                        });
                                    }

                                }

                            }

                        }
                        //console.log(respuesta);
                    })


                }
                else {
                    res.status(400).json({
                        mensaje: "El activo no esta registrado."
                    });
                }

            }
            //console.log(respuesta);
        })



    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.post('/insertarSolicitudcomida', (req, res) => {
    console.log(req.body);


    //fechacreacion,lunes, martes, miercoles, jueves, viernes, nombre, idcheck, numsemana
    if (req.body.lunes || req.body.martes || req.body.miercoles || req.body.jueves || req.body.viernes && req.body.idcheck && req.body.numsemana) {
        //console.log(req.body);
        const lunes = req.body.lunes || 'NA';
        const martes = req.body.martes || 'NA';
        const miercoles = req.body.miercoles || 'NA';
        const jueves = req.body.jueves || 'NA';
        const viernes = req.body.viernes || 'NA';
        mostIdcheck(req.body.idcheck, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                console.log(respuesta.respuesta);
                if (respuesta.respuesta && respuesta.respuesta.length > 0) {
                    const nombre = respuesta.respuesta[0].NombreCompleto;
                    insertarComidossolicitadas(fecha, lunes, martes, miercoles, jueves, viernes, nombre, req.body.idcheck, req.body.numsemana, function (error, respuesta) {

                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            io.emit('escuchando', respuesta.mensaje);
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })

                }
            }
            //console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
//CAMBIOS DEL 14/12/2024
app.post('/insertarProveedorinsumos', (req, res) => {
    console.log(req.body);
    const fecha = moment().format("YYYY-MM-DD");
    const rfc = "NA";
    const rfiscal = "NA";
    const cfdi = "NA";
    const fpago = "NA";
    const calle = "NA";
    const next = "NA";
    const colonia = "NA";
    const ninten = "NA";
    const municipio = "NA";
    const ciudad = "NA";
    const cpostal = 0;
    const cnombre = "NA";
    const cemail = "NA";
    const cmovil = "NA";
    const ctel = "NA";
    const beneficiario = "NA";
    const nombanco = "NA";
    const clabe = "NA";
    const cuenta = "NA";
    const refpago = "NA";
    const credito = "NA";
    const cdias = 0;
    const identifi = "NA";
    const curp = "NA";

    if (req.body.rsocial) {
        insertarProveedor(fecha, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, rfc,
            rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio,
            ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco,
            clabe, cuenta, refpago, credito, cdias, identifi, curp, function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    console.log(respuesta);
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
/* Fin de insertar */


//Enviar los datos de un solo id para mostrar, actualizar o eliminar
/* app.put('/personas/:id', (req, res) => {
   console.log(req.params)
   }
)  */


/* Actualizar */
app.put('/actualizarPreg', (req, res) => {
    if (req.body.idForms && req.body.preguntas && req.body.estatus) {
        editPreg(req.body.idForms, req.body.preguntas, req.body.estatus, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarDesinsum', (req, res) => {
    if (req.body.folioActivo && req.body.descripgen) {
        //console.log(req.body)
        editDesinsum(req.body.folioActivo, req.body.descripgen, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarmantt', (req, res) => {
    if (req.body.id && req.body.idubicacion) {
        //console.log(req.body)
        editMantt(req.body.id, req.body.idubicacion, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizaractivi', (req, res) => {
    console.log(req.body)
    if (req.body.idactividades && req.body.actividad && req.body.minutos) {
        if (req.body.hora) {
            //console.log(req.body);
            if (req.body.hora <= 24 && req.body.hora >= 1 && req.body.minutos <= 55 && req.body.minutos >= 1) {
                //console.log(req.body.hora, req.body.minutos)
                var tiempoest = 0;
                const horaN = parseInt(req.body.hora) * 60;
                tiempoest = horaN + parseInt(req.body.minutos);
                console.log(tiempoest);
                editActi(req.body.idactividades, req.body.actividad, tiempoest, req.body.hora, req.body.minutos, function (error, respuesta) {

                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            }
            else {
                console.log("Algo esta mal en hora y minutos")
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Los valores de hora y minutos son incorrectos"
                });

            }

        }
        else {
            if (req.body.minutos <= 55 && req.body.minutos >= 1) {
                //console.log(req.body);
                const hora = 0;
                editActi(req.body.idactividades, req.body.actividad, req.body.minutos, hora, req.body.minutos, function (error, respuesta) {

                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            }
            else {
                console.log("Algo esta mal en hora y minutos")
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Los valores de minutos son incorrectos"
                });

            }
        }

    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarconsu', (req, res) => {
    if (req.body.idconsumibles && req.body.unidadmedida && req.body.tipo && req.body.descripcion) {
        editConsu(req.body.idconsumibles, req.body.unidadmedida, req.body.tipo, req.body.descripcion, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            //console.log(respuesta);
        })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarInsumos', (req, res) => {
    if (req.body.IdInsumos && req.body.proveedor && req.body.monto && req.body.folioOC) {
        editInsumos(req.body.IdInsumos, req.body.proveedor, req.body.monto, req.body.Numserie, req.body.folioOC, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarProv', (req, res) => {
    if (req.body.idproveedor && req.body.nombre && req.body.email && req.body.movil && req.body.tel && req.body.rsocial && req.body.rfc &&
        req.body.rfiscal && req.body.cfdi && req.body.fpago && req.body.calle && req.body.next && req.body.colonia && req.body.ninten && req.body.municipio &&
        req.body.ciudad && req.body.cpostal && req.body.cnombre && req.body.cemail && req.body.cmovil && req.body.ctel && req.body.beneficiario && req.body.nombanco &&
        req.body.clabe && req.body.cuenta && req.body.refpago && req.body.credito) {
        editProv(req.body.idproveedor, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, function (error, respuesta) {

                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarPreg', (req, res) => {
    if (req.body.idmaterial && req.body.familia && req.body.producto) {
        editMaterial(req.body.idmaterial, req.body.familia, req.body.producto, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarAsig', (req, res) => {
    /* idasigactivi, fechainicio, empresa,idactividad,status */
    const status = "INACTIVO";
    if (req.body.motivo) {
        editAsignacion(req.body.idasigactivi, status, req.body.motivo, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                io.emit('escuchando', respuesta.mensaje);
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
app.put('/actualizarPrestamo', (req, res) => {
    /* id, cantidad, estatus, */
    if (req.body.folioActivo && req.body.idprestamo && req.body.cantidad && req.body.responsable) {
        mostConsumible(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const datos = respuesta.respuesta.find((filtro) => filtro.folioActivo === req.body.folioActivo);
                const ultimacantidad = parseInt(datos.cantidad);
                console.log("Ultima cantidad = ", ultimacantidad);
                mostPrestamo(req.body.responsable, function (error, resPrestamo) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        //console.log(resPrestamo.respuesta[0].cantidad);
                        const canprestamo = resPrestamo.respuesta.find((filtro) => filtro.idprestamo === req.body.idprestamo);
                        const canprestamototal = parseInt(canprestamo.cantidad);
                        //console.log(cantidadprestamo.cantidad);
                        const cantidad = parseFloat(req.body.cantidad);
                        if (Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= canprestamototal) {
                            const cantidadactual = ultimacantidad + cantidad;
                            const nuevacantidad = canprestamototal - cantidad;
                            console.log(cantidadactual, " ", nuevacantidad);

                            if (nuevacantidad === 0) {
                                const estatus = "ENTREGADO";
                                editPrestamo(req.body.idprestamo, nuevacantidad, estatus, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        editCanconsumo(req.body.folioActivo, cantidadactual, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                res.status(200).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            //console.log(respuesta);
                                        })
                                    }
                                    console.log(respuesta);
                                })
                            }
                            else {
                                const estatus = "PRESTAMO";
                                editPrestamo(req.body.idprestamo, nuevacantidad, estatus, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        editCanconsumo(req.body.folioActivo, cantidadactual, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                res.status(200).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            //console.log(respuesta);
                                        })
                                    }
                                    console.log(respuesta);
                                })
                            }
                        }
                        else {
                            res.status(400).json({
                                mensaje: "CANTIDAD INSUFICIENTE"
                            });
                        }

                    }
                    //console.log(respuesta);
                })
            }
        })
    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
app.put('/actualizarControlstatus', (req, res) => {
    /* id, estatus, */
    if (req.body.idcontrolactivi && req.body.status) {
        editControlstatus(req.body.idcontrolactivi, req.body.status, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })

    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
//MODIFICADO PARA CALULAR LA EFICACIA
app.put('/actualizarTimefin', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* id, estatus, */
    const horafin = moment().format('HH:mm');
    const status = "TERMINADO";
    const motivo = "NA";
    var timestandar = 0;
    //console.log(req.body);
    if (req.body.idcontrolactivi) {
        console.log(req.body.idcontrolactivi);
        mostTiempoactivi(function (error, respuestaTiempo) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuestaTiempo.mensaje
                })
            }
            else {
                const idcontrol = parseInt(req.body.idcontrolactivi);
                const tiemponuevo = respuestaTiempo.respuesta.filter(filtro => filtro.idcontrolactivi === idcontrol);
                const datosOrdenados = tiemponuevo.sort((a, b) => b.idtiempos - a.idtiempos);
                // Obtén el último dato (el que tiene el mayor idtiempos)
                const ultimoDato = datosOrdenados[0];
                const idTiempos = ultimoDato.idtiempos;
                const hinicio = ultimoDato.horainicio;
                var desde = hinicio.split(":");
                var hasta = horafin.split(":");
                var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                //console.log("Minutos hora inicio ", minutosDesde)
                var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                if (minutosHasta < minutosDesde) {
                    minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                }
                //console.log("Mintos de hora final ", minutosHasta)
                var diferenciaMinutos = minutosHasta - minutosDesde;
                timestandar = diferenciaMinutos;
                console.log("Timestandar ", timestandar);

                editStatustiempo(idTiempos, horafin, timestandar, status, motivo, function (error, respuestaStatustiempo) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuestaStatustiempo.mensaje
                        })
                    }
                    else {
                        const totalTiempo = tiemponuevo.reduce((acumulador, filtro) => {
                            return acumulador + filtro.timestandar;
                        }, 0);
                        console.log("Tiempos guardados= ", totalTiempo)
                        const timecontrol = timestandar + totalTiempo;
                        console.log("Tiempo total estandar= ", timecontrol)
                        editStatuscontrol(idcontrol, timecontrol, status, function (error, respuestaStatuscontrol) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuestaStatuscontrol.mensaje
                                })
                            }
                            else {
                                mostTiempocontrol(req.body.idactividades, fecha, function (error, respuestaTiempocontrol) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuestaTiempocontrol.mensaje
                                        })
                                    }
                                    else {
                                        const todosTerminado = respuestaTiempocontrol.respuesta.every(item => item.status === "TERMINADO");
                                        console.log(todosTerminado);
                                        // Generar la respuesta si existen datos sin el status TERMINADO es false y se envia un "sinrespuesta", en caso de todos esten en estatus TERMINADO envia un ...

                                        const resultado = todosTerminado ? "todosterminados" : "sinrespuesta";
                                        if (resultado === "sinrespuesta") {
                                            console.log("No todos estan terminados ", resultado);
                                            //console.log(respuestaTiempocontrol.respuesta);

                                            const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.timestandar;
                                            }, 0);

                                            console.log("Tiempo asignacion: ", timeasignacion);
                                            const kg = 0;
                                            editStatusasignacion(req.body.idasigactivi, req.body.status, timeasignacion, kg, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta);
                                                    res.status(200).json({
                                                        mensaje: "El responsable finalizó su actividad"
                                                    })
                                                }
                                            })

                                        }
                                        else {
                                            /* res.status(200).json({
                                                mensaje: respuesta.mensaje
                                            }) */
                                            const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                                return acumulador + filtro.timestandar;
                                            }, 0);

                                            console.log("Tiempo asignacion: ", timeasignacion);
                                            const kg = 0;
                                            const status = "TERMINADO"
                                            editStatusasignacion(req.body.idasigactivi, status, timeasignacion, kg, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error)
                                                    res.status(404).json({
                                                        mensaje: respuesta.mensaje
                                                    })
                                                }
                                                else {
                                                    io.emit('escuchando', respuesta);
                                                    mostActif(function (error, respuesta) {
                                                        if (error) {
                                                            console.log(error)
                                                            res.status(404).json({
                                                                mensaje: respuesta.mensaje
                                                            })
                                                        }
                                                        else {
                                                            //console.log(req.body);
                                                            const actividadRealizada = respuesta.respuesta.find((filtro) => filtro.idactividades === req.body.idactividades);
                                                            //console.log(actividadRealizada);
                                                            //console.log(actividadRealizada.kg);
                                                            if (actividadRealizada.kg === 0) {
                                                                /* Calculo de la eficaciona de la actividad */
                                                                const tiemporecord = actividadRealizada.timestandar;
                                                                mostNumpersonas(req.body.idasigactivi, function (error, respuesta) {
                                                                    if (error) {
                                                                        console.log(error)
                                                                        res.status(404).json({
                                                                            mensaje: respuesta.mensaje
                                                                        })
                                                                    }
                                                                    else {
                                                                        /* Calculo del tiempo esperado */
                                                                        const numpersonas = respuesta.respuesta[0].numpersonas;
                                                                        const tiempoesperado = tiemporecord / numpersonas;
                                                                        console.log(tiempoesperado);

                                                                        /* Calculo de la eficacia de la actividad */
                                                                        const eficacia1 = (tiempoesperado / timeasignacion) * 100;
                                                                        console.log(eficacia1);

                                                                        const eficacia = Math.round((eficacia1 + Number.EPSILON) * 100) / 100;
                                                                        console.log(eficacia);

                                                                        const eficienciasig1 = (tiemporecord / timeasignacion) * 100;
                                                                        const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                                                        console.log(eficienciatotal);


                                                                        editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, function (error, respuesta) {
                                                                            if (error) {
                                                                                console.log(error)
                                                                                res.status(404).json({
                                                                                    mensaje: respuesta.mensaje
                                                                                })
                                                                            }
                                                                            else {
                                                                                io.emit('escuchando', respuesta.mensaje);
                                                                                if (actividadRealizada.timestandar > timeasignacion) {
                                                                                    console.log(timeasignacion);
                                                                                    if (timeasignacion <= 59) {
                                                                                        const horafinal = 0;
                                                                                        const eficienciafinal1 = 60 / timeasignacion;
                                                                                        const eficienciafinal = Math.round((eficienciafinal1 + Number.EPSILON) * 100) / 100;
                                                                                        editStatusactividadesT(req.body.idactividades, horafinal, timeasignacion, timeasignacion, eficienciafinal, function (error, respuestaStatusactividadesT) {
                                                                                            if (error) {
                                                                                                console.log(error)
                                                                                                res.status(404).json({
                                                                                                    mensaje: respuesta.mensaje
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                io.emit('escuchando', respuestaStatusactividadesT.mensaje);
                                                                                                res.status(200).json({
                                                                                                    mensaje: respuestaStatusactividadesT.mensaje
                                                                                                })
                                                                                            }
                                                                                            console.log(respuestaStatusactividadesT);
                                                                                        })
                                                                                    }
                                                                                    else {
                                                                                        console.log("convertir el tiempo asignacion en horas y minutos");
                                                                                        const eficienciafinal1 = 60 / timeasignacion;
                                                                                        const eficienciafinal = Math.round((eficienciafinal1 + Number.EPSILON) * 100) / 100;

                                                                                        const horas = Math.floor(timeasignacion / 60);
                                                                                        const minutos = timeasignacion % 60;
                                                                                        editStatusactividadesT(req.body.idactividades, horas, minutos, timeasignacion, eficienciafinal, function (error, respuestaStatusactividadesT) {
                                                                                            if (error) {
                                                                                                console.log(error)
                                                                                                res.status(404).json({
                                                                                                    mensaje: respuesta.mensaje
                                                                                                })
                                                                                            }
                                                                                            else {
                                                                                                io.emit('escuchando', respuestaStatusactividadesT.mensaje);
                                                                                                res.status(200).json({
                                                                                                    mensaje: respuestaStatusactividadesT.mensaje
                                                                                                })
                                                                                            }
                                                                                            console.log(respuestaStatusactividadesT);
                                                                                        })
                                                                                    }

                                                                                } else {
                                                                                    res.status(200).json({
                                                                                        mensaje: "Excedieron el tiempo de la actividad.."
                                                                                    })
                                                                                }
                                                                            }
                                                                            //console.log(respuesta);
                                                                        })
                                                                    }
                                                                    //console.log(respuesta);
                                                                })

                                                            }
                                                            else {
                                                                res.status(200).json({
                                                                    mensaje: "No olvides! validar los kilogramos"
                                                                })
                                                            }
                                                        }
                                                        //console.log(respuesta);
                                                    })
                                                }
                                            })

                                        }
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
app.put('/actualizarTimepausa', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* id, estatus, */
    console.log(req.body);
    const horafin = moment().format('HH:mm');
    const status = "EN PAUSA";
    var timestandar = 0;
    if (req.body.idcontrolactivi && req.body.motivoselec && req.body.motivodes) {
        console.log(req.body.idcontrolactivi);
        const motivo = "Motivo: " + req.body.motivoselec + ", Descripción: " + req.body.motivodes;
        mostTiempoactivi(function (error, respuestaTiempo) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                const idcontrol = parseInt(req.body.idcontrolactivi);
                const tiemponuevo = respuestaTiempo.respuesta.filter(filtro => filtro.idcontrolactivi === idcontrol);
                const datosOrdenados = tiemponuevo.sort((a, b) => b.idtiempos - a.idtiempos);
                // Obtén el último dato (el que tiene el mayor idtiempos)
                const ultimoDato = datosOrdenados[0];
                const idTiempos = ultimoDato.idtiempos;
                const hinicio = ultimoDato.horainicio;
                var desde = hinicio.split(":");
                var hasta = horafin.split(":");
                var minutosDesde = parseInt(desde[0]) * 60 + parseInt(desde[1]);
                console.log("Minutos hora inicio ", minutosDesde)
                var minutosHasta = parseInt(hasta[0]) * 60 + parseInt(hasta[1]);
                if (minutosHasta < minutosDesde) {
                    minutosHasta += 24 * 60;  // Sumamos 24 horas en minutos
                }
                console.log("Mintos de hora final ", minutosHasta)
                var diferenciaMinutos = minutosHasta - minutosDesde;
                timestandar = diferenciaMinutos;
                console.log("Timestandar ", timestandar);

                editStatustiempo(idTiempos, horafin, timestandar, status, motivo, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        editStatuscontrol(idcontrol, timestandar, status, function (error, respuestaStatuscontrol) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                mostTiempocontrol(req.body.idactividades, fecha, function (error, respuestaTiempocontrol) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuestaTiempocontrol.mensaje
                                        })
                                    }
                                    else {
                                        const timeasignacion = respuestaTiempocontrol.respuesta.reduce((acumulador, filtro) => {
                                            return acumulador + filtro.timestandar;
                                        }, 0);

                                        console.log("Tiempo asignacion: ", timeasignacion);
                                        const kg = 0;
                                        editStatusasignacion(req.body.idasigactivi, status, timeasignacion, kg, function (error, respuesta) {
                                            if (error) {
                                                console.log(error)
                                                res.status(404).json({
                                                    mensaje: respuesta.mensaje
                                                })
                                            }
                                            else {
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    mensaje: respuestaStatuscontrol.mensaje
                                                })
                                            }
                                        })
                                    }
                                })

                                /* res.status(200).json({
                                    mensaje: respuestaStatuscontrol.mensaje
                                }) */
                            }
                            //console.log(respuesta);
                        })
                    }
                    console.log(respuesta);
                })
            }
            //console.log(respuesta);
        })


        /*  */
    }
    else {
        console.log("Existen datos vacíos")
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        })
    }
})
//MODIFICADO PARA CALCULAR LA EFICACIA
app.put('/actualizarAsignacionkg', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    /* idasigactivi, status, timestandar, kg */
    const status = "TERMINADO";
    if (req.body.idasigactivi && req.body.kg) {
        mostEficienciakg(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                console.log(req.body);
                const idasigactivi = parseInt(req.body.idasigactivi);
                const asignacion = respuesta.respuesta.find(filtro => filtro.idasigactivi === idasigactivi);
                //console.log(asignacion);
                const idactividades = asignacion.idactividades;
                const kilos = parseInt(req.body.kg);
                const actividadkg = parseInt(asignacion.kg);
                const timecontrol = parseInt(asignacion.timeControl);
                editStatusasignacion(req.body.idasigactivi, status, timecontrol, kilos, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        io.emit('escuchando', respuesta);
                        mostNumpersonas(req.body.idasigactivi, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                const tiemporecord = asignacion.timestandar;
                                const cargateorica = (asignacion.kg / tiemporecord) * timecontrol;

                                /* Calculo del tiempo esperado */
                                const numpersonas = respuesta.respuesta[0].numpersonas;
                                const resesperados = cargateorica * numpersonas;
                                console.log(resesperados);

                                const eficacia1 = (kilos / resesperados) * 100;
                                console.log(eficacia1);

                                const eficacia = Math.round((eficacia1 + Number.EPSILON) * 100) / 100;
                                console.log(eficacia);

                                const porhora = (kilos / timecontrol) * 60;
                                const eficienciasig1 = (porhora * 100) / asignacion.kg;
                                const eficienciatotal = Math.round((eficienciasig1 + Number.EPSILON) * 100) / 100;
                                console.log(eficienciatotal);

                                editEficacia(req.body.idasigactivi, eficacia, eficienciatotal, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        io.emit('escuchando', respuesta.mensaje);
                                        if (timecontrol <= asignacion.timestandar && kilos > asignacion.kg && eficacia > 100) {
                                            const eficiencia1 = (60 * kilos) / timecontrol;
                                            const nuevaeficiencia = Math.round((eficiencia1 + Number.EPSILON) * 100) / 100;
                                            console.log(nuevaeficiencia);
                                            if (timecontrol <= 59) {
                                                const horas = 0;
                                                editStatusactividadesKg(idactividades, kilos, horas, timecontrol, timecontrol, nuevaeficiencia, function (error, respuesta) {
                                                    if (error) {
                                                        console.log(error)
                                                        res.status(404).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    else {
                                                        io.emit('escuchando', respuesta.mensaje);
                                                        res.status(200).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    console.log(respuesta);
                                                })
                                            }
                                            else {
                                                const horas = Math.floor(timecontrol / 60);
                                                const minutos = timecontrol % 60;
                                                editStatusactividadesKg(idactividades, kilos, horas, minutos, timecontrol, nuevaeficiencia, function (error, respuesta) {
                                                    if (error) {
                                                        console.log(error)
                                                        res.status(404).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    else {
                                                        io.emit('escuchando', respuesta.mensaje);
                                                        res.status(200).json({
                                                            mensaje: respuesta.mensaje
                                                        })
                                                    }
                                                    console.log(respuesta);
                                                })
                                            }
                                        }
                                        else {
                                            res.status(200).json({
                                                mensaje: "Actividad terminada"
                                            });
                                        }
                                    }
                                })
                            }
                        }
                        )

                    }
                    //console.log(respuesta);
                })
            }
            //console.log(respuesta);
        })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarMenusemana', (req, res) => {

    console.log(req.body)
    var diasemana = "";

    if (req.body.idmenusemana && req.body.fechainicio && req.body.numsemana && req.body.platoentrada && req.body.platofuerteA || req.body.platofuerteB && req.body.bebida) {
        const diasemanamoment = moment(req.body.fechainicio).format('dddd');
        /* Guardar en español */
        switch (diasemanamoment) {
            case "Monday": diasemana = "Lunes"; //console.log(diasemana);
                break;
            case "Tuesday": diasemana = "Martes"; //console.log(diasemana);
                break;
            case "Wednesday": diasemana = "Miercoles"; //console.log(diasemana);
                break;
            case "Thursday": diasemana = "Jueves"; //console.log(diasemana);
                break;
            case "Friday": diasemana = "Viernes"; //console.log(diasemana);
                break;
        }
        mostMenusemana(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(req.body.idmenusemana);
                const id = parseInt(req.body.idmenusemana)
                const nuevosdatos = respuesta.respuesta.filter((filtro) => filtro.idmenusemana === id);
                //console.log(nuevosdatos);

                const archivos = [
                    nuevosdatos[0].imagen1,
                    nuevosdatos[0].imagen2,
                    nuevosdatos[0].imagen3,
                    nuevosdatos[0].imagen4
                ];
                //console.log("ARCHIVOS GUARDADOS: ", archivos);
                //let a = '', b = '', c = '', d = '';

                if (!req.files || Object.keys(req.files).length === 0) {
                    editMenusemana(req.body.idmenusemana, req.body.fechainicio, req.body.numsemana, diasemana, req.body.platoentrada, req.body.platofuerteA, req.body.platofuerteB, req.body.bebida,
                        nuevosdatos[0].imagen1, nuevosdatos[0].imagen2, nuevosdatos[0].imagen3, nuevosdatos[0].imagen4, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                res.status(200).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            //console.log(respuesta);
                        })
                } else {
                    actualizar_archivo(req, res, (err, archivo) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error al cargar el archivo');
                        } else {
                            console.log("Respuesta img guardadas ", archivo);
                            const ordenado = archivo.sort((a, b) => {
                                // Extraer el número al principio de cada cadena
                                const numeroA = parseInt(a.split('-')[0]);
                                const numeroB = parseInt(b.split('-')[0]);

                                // Comparar los números
                                return numeroA - numeroB;
                            });
                            //console.log("ordenado: ", ordenado);
                            let a = '', b = '', c = '', d = '';
                            ordenado.forEach((item, index) => {
                                // Determinar el texto a guardar
                                const text = item.includes('productosinimagen.png') ? 'productosinimagen.png' : item;

                                // Asignar a las variables
                                if (index === 0) {
                                    a = text;
                                } else if (index === 1) {
                                    b = text;
                                } else if (index === 2) {
                                    c = text;
                                } else if (index === 3) {
                                    d = text;
                                }
                            });
                            //console.log("archivos: ", archivos);

                            // Crear una copia de archivos para modificación
                            const nuevoArchivos = [...archivos];
                            // Iterar sobre el arreglo ordenado
                            ordenado.forEach((item, index) => {
                                // Verificar si el item en ordenado no termina en 'productosinimagen.png'
                                if (!item.endsWith('productosinimagen.png')) {
                                    // Asegurarse de que el índice esté dentro del rango de nuevoArchivos
                                    if (index < nuevoArchivos.length) {
                                        nuevoArchivos[index] = item;
                                    }
                                }
                            });

                            // Mostrar el resultado final
                            /* console.log("entrada 1",nuevoArchivos[0]);
                            console.log("bebida 2",nuevoArchivos[1]);
                            console.log("platoA 3",nuevoArchivos[2]);
                            console.log("platoB 4",nuevoArchivos[3]); */
                            editMenusemana(req.body.idmenusemana, req.body.fechainicio, req.body.numsemana, diasemana, req.body.platoentrada, req.body.platofuerteA, req.body.platofuerteB, req.body.bebida,
                                nuevoArchivos[0], nuevoArchivos[1], nuevoArchivos[2], nuevoArchivos[3], function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        res.status(200).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    //console.log(respuesta);
                                })
                        }
                    })
                }


            }
            //console.log(respuesta);
        })
    } else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarFotoperfil', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.id;
    //console.log(responsable)

    if (!req.files || Object.keys(req.files).length === 0) {
        // No se proporcionaron archivos
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
    else {
        actualizar_fotoperfil(req, res, (err, archivo) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al cargar el archivo');
            } else {
                console.log("Respuesta img guardadas ", archivo);
                editFotoperfil(responsable, archivo, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })
            }
        })
    }
})
app.put('/actualizarestatusmenutrue', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.id;
    console.log(req.body);
    if (req.body.numsemana) {
        mostMenusemana(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const datos = respuesta.respuesta.filter((filtro) => filtro.numsemana === req.body.numsemana);

                const todosdatos = datos.length - 1;
                const estatus = "ACTIVO"
                //console.log(todosdatos);

                datos.forEach((data, index) => {
                    //id, estatus,
                    //console.log(index);
                    //console.log(data.idmenusemana);
                    editEstatusmenu(data.idmenusemana, estatus, function (error, respuesta) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            //console.log(respuesta);
                            if (todosdatos === index) {
                                const modulo = "true";
                                editPermisomenu(responsable, modulo, function (error, respuesta) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        //console.log(respuesta);
                                        res.status(200).json({
                                            respuesta
                                        });
                                    }
                                    //console.log(respuesta);
                                })
                            }
                            else {
                                console.log("Aun no");
                            }
                        }
                        //console.log(respuesta);
                    })

                })
            }
            //console.log(respuesta);
        })
    }
    else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }

})
app.put('/actualizarestatusmenuFalse', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const responsable = usuario.id;
    console.log(req.body);
    if (req.body.numsemana) {
        mostMenusemana(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const datos = respuesta.respuesta.filter((filtro) => filtro.numsemana === req.body.numsemana);

                const todosdatos = datos.length - 1;
                const estatus = "INACTIVO"
                //console.log(todosdatos);

                datos.forEach((data, index) => {
                    //id, estatus,
                    //console.log(index);
                    //console.log(data.idmenusemana);
                    editEstatusmenu(data.idmenusemana, estatus, function (error, respuesta) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            //console.log(respuesta);
                            if (todosdatos === index) {
                                const modulo = "false";
                                editPermisomenu(responsable, modulo, function (error, respuesta) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        //console.log(respuesta);
                                        res.status(200).json({
                                            respuesta
                                        });
                                    }
                                    //console.log(respuesta);
                                })
                            }
                            else {
                                console.log("Aun no");
                            }
                        }
                        //console.log(respuesta);
                    })

                })
            }
            //console.log(respuesta);
        })
    }
    else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }

})
//EDITA LA COMPRA QUE REGISTRAN INTERNAMENTE 2024-12-04
app.put('/actualizarcompra', (req, res) => {
    //console.log(req.body);
    const estatus = "true";
    const motivo = "";
    const validado = "false";
    let costotal = 0;
    if (req.body.cantidad && req.body.cantidad > 0 && req.body.idconsumibles && req.body.idcompras) {
        mostCompra(req.body.idconsumibles, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const datos = respuesta.respuesta.findIndex((filtro) => filtro.idcompras === req.body.idcompras);
                console.log(datos);
                if (datos >= 1) {
                    const valorinventario = 0;
                    //console.log("Ultimo valor de inventario= ", ultimovalorinventario);
                    const compramodificar = respuesta.respuesta.find(filtro => filtro.idcompras === req.body.idcompras);
                    //console.log("Cantidad a modificar= ", cantidadmodificar);
                    //console.log("Costo total = ", compramodificar.costototal);

                    const costodecimal = req.body.cantidad * compramodificar.preciounitario;
                    costotal = Math.round((costodecimal + Number.EPSILON) * 100) / 100;

                    const preciounitario1 = costotal / parseInt(req.body.cantidad);
                    //console.log("Precio unitario con todos los decimales: ",preciounitario1);
                    const preciounitario = Math.round((preciounitario1 + Number.EPSILON) * 100) / 100;
                    //console.log("Precio unitario con dos decimales: ", preciounitario);

                    editCompra(req.body.idcompras, req.body.cantidad, preciounitario, costotal, valorinventario, estatus, motivo, validado, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            io.emit('escuchando', respuesta);
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })

                }
                else {
                    //console.log("no es mayor a 1");
                    const valorinventario = 0;
                    //console.log("Ultimo valor de inventario= ", ultimovalorinventario);
                    const compramodificar = respuesta.respuesta.find(filtro => filtro.idcompras === req.body.idcompras);
                    //console.log("Cantidad a modificar= ", cantidadmodificar);
                    //console.log("Costo total = ", compramodificar.costototal);

                    const costodecimal = req.body.cantidad * compramodificar.preciounitario;
                    costotal = Math.round((costodecimal + Number.EPSILON) * 100) / 100;

                    const preciounitario1 = compramodificar.costototal / parseInt(req.body.cantidad);
                    //console.log("Precio unitario con todos los decimales: ",preciounitario1);
                    const preciounitario = Math.round((preciounitario1 + Number.EPSILON) * 100) / 100;
                    //console.log("Precio unitario con dos decimales: ", preciounitario);

                    editCompra(req.body.idcompras, req.body.cantidad, preciounitario, costotal, valorinventario, estatus, motivo, validado, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            io.emit('escuchando', respuesta);
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })
                }


            }
        })


    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/eliminarcompra', (req, res) => {
    //console.log(req.body);
    if (req.body.idcompras && req.body.motivo && req.body.idconsumibles) {
        mostCompra(req.body.idconsumibles, function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const datos = respuesta.respuesta.find((filtro) => filtro.idcompras === req.body.idcompras);
                //console.log(datos);
                const estatus = "false";
                const validado = "false";
                editCompra(req.body.idcompras, datos.cantidad, datos.preciounitario, datos.costototal, datos.valorinventario, estatus, req.body.motivo, validado, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        io.emit('escuchando', respuesta);
                        res.status(200).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    //console.log(respuesta);
                })

            }
        })


    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})
app.put('/actualizarproveedor', (req, res) => {
    const verificado = "true";
    console.log(req.body);
    /* id,nombre, email, movil, tel, rsocial, rfc,
        rfiscal, cfdi, fpago, calle, next, colonia, ninten, municipio, 
        ciudad, cpostal, cnombre, cemail, cmovil, ctel, beneficiario, nombanco, 
        clabe, cuenta, refpago, credito, cdias, identifi, curp, */
    if (req.body.idproveedor) {
        editProveedor(req.body.idproveedor, req.body.nombre, req.body.email, req.body.movil, req.body.tel, req.body.rsocial, req.body.rfc,
            req.body.rfiscal, req.body.cfdi, req.body.fpago, req.body.calle, req.body.next, req.body.colonia, req.body.ninten, req.body.municipio,
            req.body.ciudad, req.body.cpostal, req.body.cnombre, req.body.cemail, req.body.cmovil, req.body.ctel, req.body.beneficiario, req.body.nombanco,
            req.body.clabe, req.body.cuenta, req.body.refpago, req.body.credito, req.body.cdias, req.body.identifi, req.body.curp, verificado, function (error, respuesta) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    res.status(200).json({
                        mensaje: respuesta.mensaje
                    })
                }
                //console.log(respuesta);
            })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})

//actualizado para 
async function editcompraglobal(consumible, compra) {
    if (consumible && compra) {
        console.log(consumible, compra);
        const validado = "true";
        mostConsumible(function (error, respuesta) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                //console.log(respuesta.respuesta);
                const datos = respuesta.respuesta.find((filtro) => filtro.folioActivo === consumible);
                const idconsumible = datos.idconsumibles;
                console.log("ID del consumible = ", idconsumible);
                console.log("Todos los datos", datos);

                mostCompra(consumible, function (error, respuesta) {
                    if (error) {
                        console.log(error)
                        res.status(404).json({
                            mensaje: respuesta.mensaje
                        })
                    }
                    else {
                        const datoscompra = respuesta.respuesta.find((filtro) => filtro.idcompras === compra);
                        //console.log(datoscompra);

                        let ultimacantidad = 0;
                        let ultimovalorinventario = 0;
                        let cancanoa = 0;
                        let costocanoa = 0;
                        let canslp = 0;
                        let costoslp = 0;
                        let canqro = 0;
                        let costoqro = 0;
                        let can19nt = 0;
                        let costo19nt = 0;
                        let canvsq = 0;
                        let costovsq = 0;
                        let valorinventario = 0;
                        switch (datoscompra.sucursal) {
                            case "CANOA":
                                ultimacantidad = datos.cantidad;
                                ultimovalorinventario = datos.costo;

                                cancanoa = ultimacantidad + parseInt(datoscompra.cantidad);
                                //console.log("Costo total de la compra actual: ", parseFloat(datoscompra.costototal));
                                const valorinventario1 = ((ultimacantidad * ultimovalorinventario) + parseFloat(datoscompra.costototal)) / cancanoa;
                                costocanoa = Math.round((valorinventario1 + Number.EPSILON) * 100) / 100;
                                valorinventario = costocanoa;
                                //console.log("Valor inventario con todos los decimales: ", valorinventario);
                                canslp = datos.cantidadslp;
                                costoslp = datos.costoslp;
                                canqro = datos.cantidadqro;
                                costoqro = datos.costoqro;
                                can19nt = datos.cantidad19nt;
                                costo19nt = datos.costo19nt;
                                canvsq = datos.cantidadvsq;
                                costovsq = datos.costovsq;
                                break;
                            case "SAN LUIS POTOSI":
                                ultimacantidad = datos.cantidadslp;
                                ultimovalorinventario = datos.costoslp;

                                canslp = ultimacantidad + parseInt(datoscompra.cantidad);
                                //console.log("Existencias totales: ", existencias);
                                //console.log("Costo total de la compra actual: ", parseFloat(datoscompra.costototal));
                                const valorinventario2 = ((ultimacantidad * ultimovalorinventario) + parseFloat(datoscompra.costototal)) / canslp;
                                costoslp = Math.round((valorinventario2 + Number.EPSILON) * 100) / 100;
                                valorinventario = costoslp;
                                //console.log("Valor inventario con todos los decimales: ", valorinventario);
                                cancanoa = datos.cantidad;
                                costocanoa = datos.costo;
                                canqro = datos.cantidadqro;
                                costoqro = datos.costoqro;
                                can19nt = datos.cantidad19nt;
                                costo19nt = datos.costo19nt;
                                canvsq = datos.cantidadvsq;
                                costovsq = datos.costovsq;
                                break;
                            case "QUERETARO":
                                ultimacantidad = datos.cantidadqro;
                                ultimovalorinventario = datos.costoqro;

                                canqro = ultimacantidad + parseInt(datoscompra.cantidad);
                                //console.log("Existencias totales: ", existencias);
                                //console.log("Costo total de la compra actual: ", parseFloat(datoscompra.costototal));
                                const valorinventario3 = ((ultimacantidad * ultimovalorinventario) + parseFloat(datoscompra.costototal)) / canqro;
                                costoqro = Math.round((valorinventario3 + Number.EPSILON) * 100) / 100;
                                valorinventario = costoqro;
                                //console.log("Valor inventario con todos los decimales: ", valorinventario);
                                cancanoa = datos.cantidad;
                                costocanoa = datos.costo;
                                canslp = datos.cantidadslp;
                                costoslp = datos.costoslp;
                                can19nt = datos.cantidad19nt;
                                costo19nt = datos.costo19nt;
                                canvsq = datos.cantidadvsq;
                                costovsq = datos.costovsq;
                                break;
                            case "19 NTE":
                                ultimacantidad = datos.cantidad19nt;
                                ultimovalorinventario = datos.costo19nt;

                                can19nt = ultimacantidad + parseInt(datoscompra.cantidad);
                                //console.log("Costo total de la compra actual: ", parseFloat(datoscompra.costototal));
                                const valorinventario4 = ((ultimacantidad * ultimovalorinventario) + parseFloat(datoscompra.costototal)) / can19nt;
                                costo19nt = Math.round((valorinventario4 + Number.EPSILON) * 100) / 100;
                                valorinventario = costo19nt;
                                //console.log("Valor inventario con todos los decimales: ", valorinventario);
                                cancanoa = datos.cantidad;
                                costocanoa = datos.costo;
                                canslp = datos.cantidadslp;
                                costoslp = datos.costoslp;
                                canqro = datos.cantidadqro;
                                costoqro = datos.costoqro;
                                canvsq = datos.cantidadvsq;
                                costovsq = datos.costovsq;
                                break;
                            case "VALSEQUILLO":
                                ultimacantidad = datos.cantidadvsq;
                                ultimovalorinventario = datos.costovsq;

                                canvsq = ultimacantidad + parseInt(datoscompra.cantidad);
                                //console.log("Existencias totales: ", existencias);
                                //console.log("Costo total de la compra actual: ", parseFloat(datoscompra.costototal));
                                const valorinventario5 = ((ultimacantidad * ultimovalorinventario) + parseFloat(datoscompra.costototal)) / canvsq;
                                costovsq = Math.round((valorinventario5 + Number.EPSILON) * 100) / 100;
                                valorinventario = costovsq;
                                //console.log("Valor inventario con todos los decimales: ", valorinventario);
                                cancanoa = datos.cantidad;
                                costocanoa = datos.costo;
                                canslp = datos.cantidadslp;
                                costoslp = datos.costoslp;
                                canqro = datos.cantidadqro;
                                costoqro = datos.costoqro;
                                can19nt = datos.cantidad19nt;
                                costo19nt = datos.costo19nt;
                                break;
                        }

                        console.log("Ultima cantidad = ", ultimacantidad);
                        console.log("Ultima valor inventario = ", ultimovalorinventario);



                        //id, cantidad, costo, codigobarras, cantidadslp, costoslp, cantidadqro, costoqro, cantidadvsq, costovsq, cantidad19nt, costo19nt

                        editConsu(idconsumible, cancanoa, costocanoa, datoscompra.codigobarras, canslp, costoslp, canqro, costoqro, canvsq, costovsq, can19nt, costo19nt, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                //io.emit('escuchando', respuesta);
                                editCompra(compra, datoscompra.cantidad, datoscompra.preciounitario, datoscompra.costototal, valorinventario, datoscompra.estatus, datoscompra.motivo, validado, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        io.emit('verificado', consumible);
                                        console.log("Se tiene que  habilitar el socket verificado");
                                    }
                                    //console.log(respuesta);
                                })
                            }
                            //console.log(respuesta);
                        })
                    }
                })

            }

        })
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
}
app.put('/actualizarcompraglobal', (req, res) => {
    //console.log(req.body.idconsumibles, req.body.idcompras);
    editcompraglobal(req.body.idconsumibles, req.body.idcompras);
})



/* Borrar */
app.delete('/eliminar', (req, res) => {
    if (req.body.id) {
        elim(req.body.id, function (error, respuesta) {

            if (error) {
                console.log(error)
                res.status(404).json({
                    mensaje: respuesta.mensaje
                })
            }
            else {
                res.status(200).json({
                    mensaje: respuesta.mensaje
                })
            }
            console.log(respuesta);
        })
    } else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Existen datos vacíos"
        });
    }
})
/* Fin de borrar */



/* Explicacion de socket ---------------------------------- */
/* Instala socket.io para manejar respuestas en tiempo real npm i socket.io  */
/* Importa la libreria al inicio colocando el puerto de salida:
    const io = require("socket.io")(3003, {
        cors: {
            methods: ["GET", "POST"]
        }
    });
  */
/* Envia la respuesta que necesites en el siguiente código:
   io.emit('escuchando', respuesta);
 */
app.get("/Brisa", (req, res) => {
    io.emit('escuchando', "HOLAA MUNDO");
})

//Que hace esta funcion?
io.on('connection', (socket) => {

})
/* Fin de explicacion de socket -------------------------- */


/* https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port, () => {
    console.log(`Port => ${port}`);
    console.log(`Fecha => ${fecha}`);
    console.log(`Servidor HTTPS corriendo en https://192.168.1.97:${port}`);
}); */


//RECONOMIENTO FACIAL +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/* HOJA DE user_registro */
app.post('/registrarUserasistencia', (req, res) => {
    //console.log(req.body);
    //console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        // No se proporcionaron archivos
        res.status(400).json({
            mensaje: "Agrega una fotografia"
        });
    }
    else {
        actualizar_fotoperfil(req, res, (err, archivo) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al cargar el archivo');
            }
            else {
                if (req.body.idcheck && req.body.horainicio && req.body.horafin && req.body.descanso && req.body.turno && req.body.descrip) {
                    mostIdcheck(req.body.idcheck, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            //console.log(respuesta);
                            if (respuesta.respuesta && respuesta.respuesta.length > 0) {
                                const nombre = respuesta.respuesta[0].NombreCompleto;
                                //console.log(nombre);
                                if (req.body.descanso.includes("Sábado") && req.body.descanso.includes("Domingo")) {
                                    const horainicioMD = "NA";
                                    const horafinMD = "NA";
                                    //idcheck, nombre, horainicio, horafin, descanso, horainioMD, horafinMD,  turno,descrip,foto,
                                    insertarUserasistencia(req.body.idcheck, nombre, req.body.horainicio, req.body.horafin, req.body.descanso, horainicioMD, horafinMD, req.body.turno, req.body.descrip, archivo, (error, respuesta) => {
                                        if (error) {
                                            console.error('Error al insertar asistencia:', error.mensaje);
                                        } else {
                                            console.log(respuesta);
                                            io.emit('escuchando', respuesta);
                                            return res.status(200).json({ respuesta });
                                        }
                                    });
                                }
                                else {
                                    if (req.body.horainicioMD && req.body.horafinMD) {
                                        //idcheck, nombre, horainicio, horafin, descanso, horainioMD, horafinMD,  turno,descrip,foto,
                                        insertarUserasistencia(req.body.idcheck, nombre, req.body.horainicio, req.body.horafin, req.body.descanso, req.body.horainicioMD, req.body.horafinMD, req.body.turno, req.body.descrip, archivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                return res.status(200).json({ respuesta });
                                            }
                                        });
                                    }
                                    else {
                                        console.log("Existen datos vacíos");
                                        res.status(400).json({
                                            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                                        });

                                    }
                                }
                            }
                            else {
                                console.log("El usuario no existe");
                                res.status(400).json({
                                    mensaje: "El usuario no existe, verifique el ID"
                                });
                            }
                        }
                    })

                }
                else {
                    console.log("Existen datos vacíos");
                    res.status(400).json({
                        mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                    });

                }
            }
        })
    }
});


/* HOJA DE reconocimiento-facil */
app.post('/compararcaras', (req, res) => {
    //console.log(req.body.idcheck);
    const fecha = moment().format("YYYY-MM-DD");
    const hora = moment().format("HH:mm");
    const horasave = moment().format('HH:mm:ss');
    const diasemana = moment().format("dddd");
    //console.log(req.query.foto);
    let comparacion = "";
    let fotoArray = req.body.captura.split(",").map((num) => parseFloat(num));
    //console.log(fotoArray.length);
    let fotoFloatasistencia = new Float32Array(fotoArray);
    //console.log(fotoFloatasistencia);

    mostUserasistencia(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const verificar = respuesta.respuesta.find((des) => des.idcheck === req.body.idcheck);
            //console.log(verificar);
            if (verificar) {
                //console.log(diasemana);
                //console.log(verificar.descrip);
                let fotosave = verificar.descrip.split(",").map((num) => parseFloat(num));
                //console.log(des.descrip);
                let saveFloatArray = new Float32Array(fotosave);
                //console.log(saveFloatArray);
                const distance = faceapi.euclideanDistance(saveFloatArray, fotoFloatasistencia);
                //console.log(verificar.nombre + " " + distance);
                if (distance < 0.57) {
                    //console.log("Distancia entre rostros: ", distance);
                    mostEventosbio(fecha, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            const registrados = respuesta.respuesta.find(reg => reg.idcheck === req.body.idcheck);
                            //console.log("registrados: ", registrados);
                            //console.log(verificar.turno);
                            if (registrados) {
                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                    //console.log("algo esta mal");
                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                    //console.log("HORA SALIDA ", verificar.horasalida);

                                    if (registrados.horasalidaMD != "NA") {
                                        res.status(400).json({
                                            mensaje: "Ya estás registrad@ en la lista de asistencia."
                                        });
                                    }
                                    else {
                                        if (hora >= verificar.horasalidaMD) {
                                            const estatus = "ASISTENCIA";
                                            const motivo = "NA";
                                            //console.log("Estatus RETARDO");
                                            editAsistencia(registrados.idasistencia, horasave, estatus, motivo, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);
                                                    res.status(200).json({
                                                        titulo: respuesta.mensaje,
                                                        mensaje: comparacion
                                                    });
                                                }
                                                //console.log(respuesta);
                                            })
                                        }
                                        else {
                                            res.status(400).json({
                                                mensaje: "Espera tu hora de salida!!"
                                            });
                                        }
                                    }
                                } else {
                                    if (registrados.horasalidaMD != "NA") {
                                        res.status(400).json({
                                            mensaje: "Ya estás registrad@ en la lista de asistencia."
                                        });
                                    }
                                    else {
                                        if (hora >= verificar.horasalida) {
                                            const estatus = "ASISTENCIA";
                                            const motivo = "NA";
                                            //console.log("Estatus RETARDO");
                                            editAsistencia(registrados.idasistencia, horasave, estatus, motivo, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);
                                                    res.status(200).json({
                                                        titulo: respuesta.mensaje,
                                                        mensaje: comparacion
                                                    });
                                                }
                                                //console.log(respuesta);
                                            })
                                        }
                                        else {
                                            res.status(400).json({
                                                mensaje: "Espera tu hora de salida!!"
                                            })
                                        }
                                    }
                                }

                            }
                            else {
                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                    //console.log("algo esta mal");
                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                    //console.log("HORA SALIDA ", verificar.horasalida);

                                    if (hora > verificar.horaentradaMD) {
                                        const estatus = "RETARDO";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("Estatus RETARDO");
                                        insertarAsistencia(verificar.idcheck, fecha, hora, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                    else {
                                        const estatus = "ENTRADA";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("estatus ENTRADA");
                                        insertarAsistencia(verificar.idcheck, fecha, hora, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                } else {
                                    if (hora > verificar.horaentrada) {
                                        const estatus = "RETARDO";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("Estatus RETARDO");
                                        insertarAsistencia(verificar.idcheck, fecha, horasave, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                    else {
                                        const estatus = "ENTRADA";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("estatus ENTRADA");
                                        insertarAsistencia(verificar.idcheck, fecha, horasave, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                }


                            }
                        }
                    })
                } else {
                    console.log("Los rostros no coinciden.");
                    const mensaje = "Mira a la cámara con la cara descubierta!";
                    res.status(400).json({
                        mensaje
                    });
                }
            }
            else {
                console.log("No esta registrado como usuario");
                res.status(400).json({
                    mensaje: "No esta registrado como usuario"
                })
            }



            /* const rostroCoincidente = existeRegistro
            if (des.idcheck === req.body.idcheck) {
                    let fotosave = des.descrip.split(",").map((num) => parseFloat(num));
                    //console.log(des.descrip);
                    let saveFloatArray = new Float32Array(fotosave);
                    //console.log(saveFloatArray);
                    const distance = faceapi.euclideanDistance(saveFloatArray, fotoFloatasistencia);
                    //console.log(des.nombre + " " + distance);
                    if (distance < 0.57) {
                        //console.log("Distancia entre rostros: ", distance);
                        // Si la distancia es menor, devolvemos el nombre del rostro coincidente
                        return true; // Esto detendrá la búsqueda
                    }
                    return "distancia";
                }
                return "sinregistro"; */
            /* if (rostroCoincidente) {
                console.log("Rostro coincidente encontrado: ", rostroCoincidente.nombre);
                comparacion = rostroCoincidente.nombre;
                io.emit('capcomparacion', comparacion);
                const resUsuarios = respuesta.respuesta;
                //console.log("resUsuarios: ", resUsuarios);
                const verificar = resUsuarios.find((filtro) => filtro.nombre === comparacion);
                //console.log(verificar);
                if (verificar) {
                    //console.log(diasemana);
                    mostEventosbio(fecha, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            const registrados = respuesta.respuesta.find(reg => reg.idcheck === req.body.idcheck);
                            //console.log("registrados: ", registrados);
                            //console.log(verificar.turno);
                            if (registrados) {

                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                    //console.log("algo esta mal");
                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                    //console.log("HORA SALIDA ", verificar.horasalida);

                                    if (registrados.horasalidaMD != "NA") {
                                        res.status(400).json({
                                            mensaje: "Ya estás registrad@ en la lista de asistencia."
                                        });
                                    }
                                    else {
                                        if (hora >= verificar.horasalidaMD) {
                                            const estatus = "ASISTENCIA";
                                            const motivo = "NA";
                                            //console.log("Estatus RETARDO");
                                            editAsistencia(registrados.idasistencia, horasave, estatus, motivo, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);
                                                    res.status(200).json({
                                                        titulo: respuesta.mensaje,
                                                        mensaje: comparacion
                                                    });
                                                }
                                                //console.log(respuesta);
                                            })
                                        }
                                        else {
                                            res.status(400).json({
                                                mensaje: "Espera tu hora de salida!!"
                                            });
                                        }
                                    }
                                } else {
                                    if (registrados.horasalidaMD != "NA") {
                                        res.status(400).json({
                                            mensaje: "Ya estás registrad@ en la lista de asistencia."
                                        });
                                    }
                                    else {
                                        if (hora >= verificar.horasalida) {
                                            const estatus = "ASISTENCIA";
                                            const motivo = "NA";
                                            //console.log("Estatus RETARDO");
                                            editAsistencia(registrados.idasistencia, horasave, estatus, motivo, function (error, respuesta) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                else {
                                                    //console.log(respuesta);
                                                    io.emit('escuchando', respuesta);
                                                    res.status(200).json({
                                                        titulo: respuesta.mensaje,
                                                        mensaje: comparacion
                                                    });
                                                }
                                                //console.log(respuesta);
                                            })
                                        }
                                        else {
                                            res.status(400).json({
                                                mensaje: "Espera tu hora de salida!!"
                                            })
                                        }
                                    }
                                }

                            }
                            else {
                                if (diasemana === "Saturday" || diasemana === "Sunday") {
                                    //console.log("algo esta mal");
                                    //console.log("HORA ENTRADA ", verificar.horaentrada);
                                    //console.log("HORA SALIDA ", verificar.horasalida);

                                    if (hora > verificar.horaentradaMD) {
                                        const estatus = "RETARDO";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("Estatus RETARDO");
                                        insertarAsistencia(verificar.idcheck, fecha, hora, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                    else {
                                        const estatus = "ENTRADA";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("estatus ENTRADA");
                                        insertarAsistencia(verificar.idcheck, fecha, hora, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                } else {
                                    if (hora > verificar.horaentrada) {
                                        const estatus = "RETARDO";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("Estatus RETARDO");
                                        insertarAsistencia(verificar.idcheck, fecha, horasave, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                    else {
                                        const estatus = "ENTRADA";
                                        const motivo = "NA";
                                        const horafin = "NA";
                                        //console.log("estatus ENTRADA");
                                        insertarAsistencia(verificar.idcheck, fecha, horasave, horafin, estatus, motivo, (error, respuesta) => {
                                            if (error) {
                                                console.error('Error al insertar asistencia:', error.mensaje);
                                            } else {
                                                //console.log(respuesta);
                                                io.emit('escuchando', respuesta);
                                                res.status(200).json({
                                                    titulo: respuesta.mensaje,
                                                    mensaje: comparacion
                                                })

                                            }
                                        });
                                    }
                                }


                            }
                        }
                    })
                }
                else {
                    console.log("No esta registrado como usuario");
                    res.status(400).json({
                        mensaje: "No esta registrado como usuario"
                    })

                }
            } else {
                console.log("Los rostros no coinciden.");
                const mensaje = "No estas registrado!";
                res.status(400).json({
                    mensaje
                })
            } */
        }
        //console.log(respuesta);
    })
})
app.put('/edituserasistencia', (req, res) => {
    //console.log(req.body);
    if (!req.files || Object.keys(req.files).length === 0) {
        // No se proporcionaron archivos
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
    else {
        if (req.body.id && req.body.descrip) {
            actualizar_fotoperfil(req, res, (err, archivo) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error al cargar el archivo');
                } else {
                    //console.log("Respuesta img guardadas ", archivo);
                    //console.log("Respuesta descrip ", req.body.descrip);
                    //console.log("Respuesta id", req.body.id);
                    editUserasistencia(req.body.id, req.body.descrip, archivo, function (error, respuesta) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            res.status(200).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        //console.log(respuesta);
                    })
                }
            })
        }
        else {
            console.log("Existen datos vacíos");
            res.status(400).json({
                mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
            });
        }
    }
})
/* FIN DE HOJA DE reconocimiento-facil */

/* HOJA DE asistencia*/
app.get('/asistencias', (req, res) => {
    const fecha = moment().format("YYYY-MM-DD");
    mostAsistencia(fecha, function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta);
            res.status(200).json({
                respuesta
            })
        }
    })
}
)
app.get('/faltas', (req, res) => {
    const dia = moment().format('dddd');
    var diaes = "";

    /* Guardar en español */
    switch (dia) {
        case "Monday":
            diaes = "Lunes";
            //console.log(diaes);
            break;
        case "Tuesday":
            diaes = "Martes";
            //console.log(diaes);
            break;
        case "Wednesday":
            diaes = "Miercoles";
            //console.log(diaes);
            break;
        case "Thursday":
            diaes = "Jueves";
            //console.log(diaes);
            break;
        case "Friday":
            diaes = "Viernes";
            //console.log(diaes);
            break;
        case "Saturday":
            diaes = "Sábado";
            //console.log(diaes);
            break;
        case "Sunday":
            diaes = "Domingo";
            //console.log(diaes);
            break;
    }
    mostFaltas(diaes, function (error, respuestaFaltas) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log("respuestaFaltas",respuestaFaltas.respuesta);
            mostEventosbio(fecha, function (error, respuestaEventosbio) {
                if (error) {
                    console.log(error)
                }
                else {
                    //console.log("respuestaEventosbio",respuestaEventosbio.respuesta);
                    const respuesta = [];
                    respuestaFaltas.respuesta.forEach((filtro) => {
                        const verificar = respuestaEventosbio.respuesta.find((filtro2) => filtro2.idcheck === filtro.idcheck);
                        //console.log("Verificando: ",verificar);
                        if (verificar) {
                            //console.log("ya se registro");
                        }
                        else {
                            respuesta.push(filtro);
                            //console.log(filtro.nombre, filtro.userid );
                        }
                    })

                    //console.log(respuesta);

                    res.status(200).json({
                        respuesta
                    })
                }
            })

        }
        //console.log(respuesta);
    })
}
)
app.put('/actualizarAsistencia', (req, res) => {
    console.log(req.body);
    const hora = moment().format('HH:mm:ss');
    if (req.body.idasistencia && req.body.estatus && req.body.hora) {
        if (req.body.estatus === "SALIR TEMPRANO") {
            if (req.body.motivo) {
                editAsistencia(req.body.idasistencia, hora, req.body.estatus, req.body.motivo, function (error, respuesta) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        //console.log(respuesta);
                        io.emit('escuchando', respuesta);
                        res.status(200).json({
                            respuesta
                        });
                    }
                    //console.log(respuesta);
                })
            }
            else {
                //console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });

            }
        }
        else {
            const motivo = "NA";
            editAsistencia(req.body.idasistencia, req.body.hora, req.body.estatus, motivo, function (error, respuesta) {
                if (error) {
                    console.log(error);
                }
                else {
                    //console.log(respuesta);
                    io.emit('escuchando', respuesta);
                    res.status(200).json({
                        respuesta
                    });
                }
                //console.log(respuesta);
            })
        }
    }
    else {
        //console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }

})
app.post('/insertarAsistencia', (req, res) => {
    console.log(req.body);

    //idusuario, fecha, horainicio, horafin, estatus, motivo
    const horainicio = "00:00:00";
    const horafin = "00:00:00";
    if (req.body.userid && req.body.estatus) {
        if (req.body.estatus === "JUSTIFICAR") {
            if (req.body.motivo) {
                const estatus = "JUSTIFICADO";
                insertarAsistencia(req.body.userid, fecha, horainicio, horafin, estatus, req.body.motivo, (error, respuesta) => {
                    if (error) {
                        console.error('Error al insertar asistencia:', error.mensaje);
                    } else {
                        //console.log(respuesta);
                        io.emit('escuchando', respuesta);
                        res.status(200).json({
                            respuesta
                        });

                    }
                });
            } else {
                console.log("Existen datos vacíos");
                res.status(400).json({
                    mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
                });
            }
        } else {
            const motivo = "NA";
            insertarAsistencia(req.body.userid, fecha, horainicio, horafin, req.body.estatus, motivo, (error, respuesta) => {
                if (error) {
                    console.error('Error al insertar asistencia:', error.mensaje);
                } else {
                    //console.log(respuesta);
                    io.emit('escuchando', respuesta);
                    res.status(200).json({
                        respuesta
                    });

                }
            });

        }


    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})

/* HOJA de todoasistencia */
app.get('/todoasistencia', (req, res) => {
    mostTodoasistencia(function (error, respuesta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)

//FIN RECONOMIENTO FACIAL +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//PROCESO DE RELACION DE TICKETS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/vertickets', (req, res) => {
    const estatus = "EN PROCESO";
    mostTicketestatus(estatus, function (error, respuesta) {

        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta);
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.post('/ticketrelacion', (req, res) => {
    console.log(req.body);
    const fecha = moment().format("YYYY-MM-DD");

    /* if (req.body.userid && req.body.estatus) {
        //Creado_Por, Id_Creado, Area, Proceso_Interno, Fecha_Creada, Hora_Creada, Descripcion, Area_Final, Estatus, Folio_de_relacion,
        insertarTicketrelacion(req.body.userid, fecha, horainicio, horafin, estatus, req.body.motivo, (error, respuesta) => {
            if (error) {
                console.error('Error al insertar asistencia:', error.mensaje);
            } else {
                //console.log(respuesta);
                io.emit('escuchando', respuesta);
                res.status(200).json({
                    respuesta
                });

            }
        });
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    } */
})
//PROCESO DE RELACION DE TICKETS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//HOJAS VIAJERAS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/vijeshv', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const id = usuario.id;
    mostAltas(function (error, respuestaAltas) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const sucursal = respuestaAltas.respuesta.find(datos => datos.idCheck === id).Sucursal;
            //console.log(sucursal);
            let sucursalfinal = "";
            switch (sucursal) {
                case "CANOA": sucursalfinal = "PUE"
                    //console.log(sucursalfinal);
                    break;
                case "MORELOS": sucursalfinal = "MOR"
                    //console.log(sucursalfinal);
                    break;
                case "AGUSCALIENTES": sucursalfinal = "AGS"
                    //console.log(sucursalfinal);
                    break;
                case "SAN LUIS POTOSI": sucursalfinal = "SLP"
                    //console.log(sucursalfinal);
                    break;
                case "QUERETARO": sucursalfinal = "QRO"
                    //console.log(sucursalfinal);
                    break;
            }
            mostRegistrofolio(function (error, respuestaRegistro) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const revisarsinfiltro = respuestaRegistro.respuesta.filter(datos => datos.fecha_revision === null && datos.estatus !== "cancelado");
                    //console.log("revisarsinfiltro ",revisarsinfiltro);
                    mostHvviajes(function (error, respuestaViajes) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            const viajes = respuestaViajes.respuesta.filter(viaje => viaje.UDN === sucursalfinal);
                            //console.log("viajes ",viajes);

                            const revisar = viajes.map(datos => {
                                const foliosviaje = revisarsinfiltro.filter(servicio => servicio.idviajes === datos.id).map(servicio2 => ({ id: servicio2.idhojas_viajeras, folios: servicio2.folio }));
                                if (foliosviaje && foliosviaje.length > 0) {
                                    const folios = Object.values(foliosviaje);
                                    return {
                                        idviaje: datos.id,
                                        origen: datos.Origen,
                                        destino: datos.Destino,
                                        fecha: datos.Fecha,
                                        folioshv: folios,

                                    }
                                }
                                return null;
                            }).filter(item => item !== null);
                            //console.log(revisar);

                            const respuesta = viajes.map(datos => {
                                const existe = respuestaRegistro.respuesta.find(datos2 => datos2.idviajes === datos.id && datos2.fecha_revision !== null && datos2.estatus !== "cancelado");
                                if (existe) {
                                    return null;
                                }
                                else {
                                    return {
                                        id: datos.id,
                                        viaje: datos.id + " - " + datos.Origen + " - " + datos.Destino + " - " + datos.Fecha
                                    }
                                }
                            }).filter(item => item !== null);

                            //console.log(respuesta);

                            res.status(200).json({
                                respuesta,
                                revisar
                            })
                        }
                        //console.log(respuesta);
                    })
                }
            })

        }
    })

}
)
app.get('/foliohviajeras', verificar_Token, (req, res) => {
    const usuario = req.usuario;
    //console.log(usuario)
    const id = usuario.id;
    mostAltas(function (error, respuestaAltas) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            const sucursal = respuestaAltas.respuesta.find(datos => datos.idCheck === id).Sucursal;
            //console.log(sucursal);
            let sucursalfinal = "";
            switch (sucursal) {
                case "CANOA": sucursalfinal = "PUE"
                    //console.log(sucursalfinal);
                    break;
                case "MORELOS": sucursalfinal = "MOR"
                    //console.log(sucursalfinal);
                    break;
                case "AGUSCALIENTES": sucursalfinal = "AGS"
                    //console.log(sucursalfinal);
                    break;
                case "SAN LUIS POTOSI": sucursalfinal = "SLP"
                    //console.log(sucursalfinal);
                    break;
                case "QUERETARO": sucursalfinal = "QRO"
                    //console.log(sucursalfinal);
                    break;
            }

            mostHvviajes(function (error, respuestaViajes) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const viajes = respuestaViajes.respuesta.filter(viaje => viaje.UDN === sucursalfinal);
                    //console.log("viajes ",viajes);

                    mostRegistrofolio(function (error, respuestaRegistro) {
                        if (error) {
                            console.log(error)
                            res.status(404).json({
                                mensaje: respuesta.mensaje
                            })
                        }
                        else {
                            //console.log(respuestaRegistro);
                            const respuesta = respuestaRegistro.respuesta.filter(datos2 => datos2.fecha_revision === null && datos2.estatus !== "cancelado").map(datos => {
                                const existe = viajes.find(viaje => viaje.id === datos.idviajes);
                                if (existe) {
                                    // Limpia el sufijo ordinal de la fecha
                                    let fechaFormateada = moment(datos.fecha_registro).format("YYYY-MM-DD");

                                    return {
                                        id: datos.idhojas_viajeras,
                                        viaje: datos.idviajes,
                                        folio: datos.folio,
                                        fecha: fechaFormateada
                                    }
                                }
                                return null;
                            }).filter(item => item !== null);
                            //console.log(respuesta);
                            res.status(200).json({
                                respuesta
                            })
                        }
                        //console.log(respuesta);
                    })
                }
            })
        }
    })
}
)
app.post('/registrarfolio', (req, res) => {
    //console.log(req.body);
    const fecha = moment().format();
    //console.log(fecha);
    if (req.body.viaje && req.body.folio) {
        //idviajes, folio, fecha_registro
        insertarRegistrofolio(req.body.viaje, req.body.folio, fecha, (error, respuesta) => {
            if (error) {
                console.error('Error al insertar asistencia:', error.mensaje);
                res.status(404).json({
                    error
                });

            } else {
                //console.log(respuesta);
                io.emit('registrado', respuesta);
                res.status(200).json({
                    respuesta
                });

            }
        });
    }
    else {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
})

app.put('/revisarFolio', (req, res) => {
    const fecha = moment().format();
    /* id, fecha, adjunto, */
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("Existen datos vacíos");
        res.status(400).json({
            mensaje: "Parece que existen campos vacíos, válida la información nuevamente"
        });
    }
    else {
        console.log(req.body.id);
        if (req.body.id) {
            mostRegistrofolio(function (error, respuestaRegistro) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const id = parseInt(req.body.id);
                    const registros = respuestaRegistro.respuesta.filter(datos => datos.idviajes === id);
                    console.log(registros);
                    const tamaño = registros.length - 1;
                    cargar_adjunto(req, res, (err, archivo) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send('Error al cargar el archivo');
                        } else {
                            console.log(archivo);
                            const estatus = "true";
                            registros.forEach((info, index) => {
                                editRevisarfolio(info.idhojas_viajeras, fecha, archivo, estatus, function (error, respuesta) {
                                    if (error) {
                                        console.log(error)
                                        res.status(404).json({
                                            mensaje: respuesta.mensaje
                                        })
                                    }
                                    else {
                                        if (index === tamaño) {
                                            io.emit('revisado', respuesta.mensaje);
                                            res.status(200).json({
                                                mensaje: respuesta.mensaje
                                            })
                                        }
                                    }
                                    console.log(respuesta);
                                })
                            })
                        }
                    })
                }
            })
        }
        else {
            res.status(400).json({
                mensaje: "Solicite ayuda del desarrollador."
            });
        }


    }
})
app.put('/cancelarfolio', (req, res) => {
    if (req.body.idcheck === "RPMhzte1cvzlfbq5gul") {
        if (req.body.idviaje) {
            mostRegistrofolio(function (error, respuestaRegistro) {
                if (error) {
                    console.log(error)
                    res.status(404).json({
                        mensaje: respuesta.mensaje
                    })
                }
                else {
                    const id = parseInt(req.body.idviaje);
                    const registros = respuestaRegistro.respuesta.filter(datos => datos.idviajes === id);
                    console.log(registros);
                    const tamaño = registros.length - 1;
                    const estatus = "cancelado";

                    registros.forEach((info, index) => {
                        editRevisarfolio(info.idhojas_viajeras, info.fecha_registro, info.adjunto, estatus, function (error, respuesta) {
                            if (error) {
                                console.log(error)
                                res.status(404).json({
                                    mensaje: respuesta.mensaje
                                })
                            }
                            else {
                                if (index === tamaño) {
                                    io.emit('registrado', respuesta.mensaje);
                                    res.status(200).json({
                                        mensaje: respuesta.mensaje
                                    })
                                }
                            }
                            console.log(respuesta);
                        })
                    })
                }
            })
        }
        else{
            res.status(400).json({
                mensaje: "Solicite ayuda del desarrollador."
            });
        }
    }
    else {
        res.status(400).json({
            mensaje: "Solo personal autorizado."
        });
    }
})

//FIN DE HOJAS VIAJERAS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 



//MOVIMIENTO DE PERSONAL LOGISTICA **********************************************************************
app.get('/altarhlogistica', (req, res) => {
    mostAltarhmasculino(function (error, respuestaAlta) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuesta.respuesta);
            const respuesta = respuestaAlta.respuesta.map((sujeto) => {
                return {
                    idAlta: sujeto.idAlta,
                    Sexo: sujeto.Sexo,
                    Sucursal: sujeto.Sucursal,
                    Area: sujeto.Area,
                    idCheck: sujeto.idCheck,
                    Empresa: sujeto.Empresa,
                    NombreCompleto: sujeto.NombreCompleto
                }
            })
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.get('/personalogistica', (req, res) => {
    mostPersonalogistica(function (error, respuestaPersonal) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaPersonal.respuesta);
            const respuesta = respuestaPersonal.respuesta;
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.post('/operadorlog', (req, res) => {
    const puesto = "OPERADOR DE CAMION DE CARGA";
    //console.log(req.body);
    personalogistica(req.body.nombre, puesto, function (error, respuestaPersonal) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaPersonal);
            const respuesta = respuestaPersonal.mensaje;
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
app.put('/editoperadorlog', (req, res) => {
    //console.log(req.body);
    editPersonalogistica(req.body.id, req.body.estatus, function (error, respuestaPersonal) {
        if (error) {
            console.log(error)
            res.status(404).json({
                mensaje: respuesta.mensaje
            })
        }
        else {
            //console.log(respuestaPersonal);
            const respuesta = respuestaPersonal.mensaje;
            res.status(200).json({
                respuesta
            })
        }
        //console.log(respuesta);
    })
}
)
//FIN DE MOVIMIENTO DE PERSONAL LOGISTICA ***************************************************************



app.listen(port, () => {
    loadModels();
    console.log(`Port => ${port}`)
    console.log(`Fecha => ${fecha}`)
})
