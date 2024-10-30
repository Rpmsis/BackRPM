const mysql = require('./database/index');
const express = require('express')
const cors = require('cors');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const mostUserasistencia = require('./query/mostUserasistencia');
const mostEventosbio = require('./query/mostEventosbio');
const insertarAsistencia = require('./query/insertAsistencia');
const editAsistencia = require('./query/actualizarAsistenciastatus');

const verificar_Token = require('./middleware/Valida_Token');
const { rawListeners } = require('./database');
const { Console } = require('console');
const app = express()
const port = 3005
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const fecha = moment().format("YYYY-MM-DD");
const io = require("socket.io")(3004, {
    cors: {
        methods: ["GET", "POST"]
    }
});

/* ZKHLIB asistencias */
const ZKHLIB = require("zkh-lib");
let obj = new ZKHLIB("192.168.1.69", 4370, 5200, 5000);
//console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));


/* Registrar asistencias del biometrico*/
async function registrarAsistencias() {
    const diasemana = moment().format("dddd");
    //console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));
    try {
        await obj.createSocket();
        //console.log(await obj.createSocket());
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
                                            //console.log(diasemana);
                                            if (diasemana === "Saturday" || diasemana ==="Sunday") {
                                                //console.log("algo esta mal");
                                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                //console.log("HORA SALIDA ", verificar.horasalida);
                                                if (!registrados.find(reg => reg.idusuario === log.deviceUserId)) {
                                                    //console.log("Aqui insertas datos nuevos: ", log.deviceUserId, "bioId", log.userSn, " Fecha: ", fechaForm, "hora: ", horaForm);
                                                    if (horabio > verificar.horaentradaMD) {
                                                        const estatus = "RETARDO";
                                                        const motivo ="NA";
                                                        const horafin = "NA";
                                                        //console.log("Estatus RETARDO");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm,horafin, estatus, motivo, (error, respuesta) => {
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
                                                        const motivo ="NA";
                                                        const horafin = "NA";
                                                        //console.log("estatus ENTRADA");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
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
                                                        if (verificar2.estatus === "RETARDO") {
                                                            if (horabio >= verificar.horasalidaMD) {
                                                                console.log(horabio);
                                                                const motivo= "NA";
                                                                editAsistencia(verificar2.idasistencia, horaForm, verificar2.estatus,motivo, function (error, respuesta) {
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
                                                                console.log("NO TIENE HORA DE SALIDA");

                                                            }
                                                        } else {
                                                            if(verificar2.estatus === "ENTRADA"){
                                                                if (horabio >= verificar.horasalidaMD) {
                                                                    const estatus = "ASISTENCIA";
                                                                    //console.log(horabio);
                                                                    const motivo= "NA";
                                                                    editAsistencia(verificar2.idasistencia, horaForm, estatus,motivo, function (error, respuesta) {
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
                                                            }
                                                            else{
                                                                //console.log("TIENE UN ESTATUS DESCONOCIDO");
                                                            }

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
                                                        const motivo ="NA";
                                                        const horafin = "NA";
                                                        //console.log("Estatus RETARDO");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus,motivo, (error, respuesta) => {
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
                                                        const motivo ="NA";
                                                        const horafin = "NA";
                                                        //console.log("estatus ENTRADA");
                                                        insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
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
                                                        if (verificar2.estatus === "RETARDO") {
                                                            if (horabio >= verificar.horasalida) {
                                                                const estatus = verificar2.estatus;
                                                                //console.log(horabio);
                                                                const motivo= "NA";
                                                                editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
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
                                                            if(verificar2.estatus === "ENTRADA"){
                                                                if (horabio >= verificar.horasalida) {
                                                                    const estatus = "ASISTENCIA";
                                                                    //console.log(horabio);
                                                                    const motivo= "NA";
                                                                    editAsistencia(verificar2.idasistencia, horaForm, estatus, motivo, function (error, respuesta) {
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
                                                            }
                                                            else{
                                                                //console.log("NO un estatus comparable");
                                                            }

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
                                            if (diasemana === "Saturday" || diasemana ==="Sunday") {
                                                //console.log("HORA ENTRADA ", verificar.horaentrada);
                                                //console.log("HORA SALIDA ", verificar.horasalida);

                                                if (horabio > verificar.horaentradaMD) {
                                                    const estatus = "RETARDO";
                                                    const motivo ="NA";
                                                    const horafin = "NA";
                                                    //console.log("Estatus RETARDO");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus, motivo, (error, respuesta) => {
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
                                                    const motivo ="NA";
                                                    const horafin = "NA";
                                                    //console.log("estatus ENTRADA");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus,motivo, (error, respuesta) => {
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
                                                    const motivo ="NA";
                                                    const horafin = "NA";
                                                    //console.log("Estatus RETARDO");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus,motivo, (error, respuesta) => {
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
                                                    const motivo ="NA";
                                                    const horafin = "NA";
                                                    //console.log("estatus ENTRADA");
                                                    insertarAsistencia(log.deviceUserId, fechaForm, horaForm, horafin, estatus,motivo, (error, respuesta) => {
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
setInterval(registrarAsistencias, 2000);
/* fin de mostrar asistencias */


app.get("/Brisa", (req, res) => {
    io.emit('escuchando', "HOLAA MUNDO");
})

//Que hace esta funcion?
io.on('connection', (socket) => {

})
/* Fin de explicacion de socket -------------------------- */



app.listen(port, () => {
    console.log(`Port => ${port}`)
    console.log(`Fecha => ${fecha}`)
})
