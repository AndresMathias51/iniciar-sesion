import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";

export async function POST(req:Request){

    try{

        const body = await req.json();

        const {
            correo,
            password,
            codigo,
            accion
        } = body;

        const cookieStore =
            await cookies();

        const usuarioCookie =
            cookieStore.get("usuario");

        if(!usuarioCookie){

            return Response.json(
                {
                    success:false,
                    message:"No hay sesión"
                },
                {
                    status:401
                }
            );

        }

        const usuarioSesion =
            JSON.parse(
                usuarioCookie.value
            );

        // =========================
        // ENVIAR CÓDIGO
        // =========================
        if(accion === "enviar"){

            if(!correo || !password){

                return Response.json(
                    {
                        success:false,
                        message:
                            "Debe llenar todos los campos"
                    },
                    {
                        status:400
                    }
                );

            }

            if(usuarioSesion.correo !== correo){

                return Response.json(
                    {
                        success:false,
                        message:
                            "El correo no coincide con la sesión"
                    },
                    {
                        status:401
                    }
                );

            }

            // =========================
            // BUSCAR USUARIO EN BD
            // =========================

            const usuarioDB =
                await prisma.usuario.findUnique({
                    where:{
                        correo
                    }
                });

            if(!usuarioDB){

                return Response.json(
                    {
                        success:false,
                        message:"Usuario no encontrado"
                    },
                    {
                        status:404
                    }
                );

            }

            // =========================
            // VALIDAR PASSWORD
            // =========================

            const passwordCorrecta =
                await bcrypt.compare(
                    password,
                    usuarioDB.password
                );

            if(!passwordCorrecta){

                return Response.json(
                    {
                        success:false,
                        message:"Contraseña incorrecta"
                    },
                    {
                        status:401
                    }
                );

            }

            // =========================
            // GENERAR CÓDIGO
            // =========================
            const codigoGenerado =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                ).toString();

            // guardar cookie
            cookieStore.set(
                "codigoEliminarCuenta",
                codigoGenerado,
                {
                    httpOnly:true,

                    secure:false,

                    path:"/",

                    maxAge:60 * 10
                }
            );

            // =========================
            // EMAIL
            // =========================
            const transporter =
                nodemailer.createTransport({

                    service:"gmail",

                    auth:{
                        user:
                            process.env.EMAIL_USER,

                        pass:
                            process.env.EMAIL_PASS
                    }
                });

            await transporter.sendMail({

                from:
                    process.env.EMAIL_USER,

                to:correo,

                subject:
                    "Eliminar cuenta",

                html:`
                    <h2>
                        Eliminar cuenta
                    </h2>

                    <p>
                        Tu código es:
                    </p>

                    <h1>
                        ${codigoGenerado}
                    </h1>
                `
            });

            return Response.json(
                {
                    success:true,
                    message:
                        "Código enviado"
                },
                {
                    status:200
                }
            );

        }

        // =========================
        // VERIFICAR CÓDIGO
        // =========================
        if(accion === "verificar"){

            if(!codigo){

                return Response.json(
                    {
                        success:false,
                        message:
                            "Debe ingresar el código"
                    },
                    {
                        status:400
                    }
                );

            }

            const codigoGuardado =
                cookieStore.get(
                    "codigoEliminarCuenta"
                );

            if(!codigoGuardado){

                return Response.json(
                    {
                        success:false,
                        message:
                            "Código expirado"
                    },
                    {
                        status:401
                    }
                );

            }

            if(
                codigoGuardado.value !==
                codigo
            ){

                return Response.json(
                    {
                        success:false,
                        message:
                            "Código incorrecto"
                    },
                    {
                        status:401
                    }
                );

            }

            return Response.json(
                {
                    success:true,
                    message:
                        "Código correcto"
                },
                {
                    status:200
                }
            );

        }

        return Response.json(
            {
                success:false,
                message:"Acción inválida"
            },
            {
                status:400
            }
        );

    }catch(error){

        console.log(error);

        return Response.json(
            {
                success:false,
                message:"Error interno"
            },
            {
                status:500
            }
        );

    }

}