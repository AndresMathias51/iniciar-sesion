import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
type Usuario = {
  id: number,
  correo: string
};
// SIMULACIÓN BASE DATOS
// SIMULACIÓN CÓDIGOS
export const codigosRecuperacion = new Map();
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { correo } = body;
    // =========================
    // VALIDAR
    // =========================
    if(!correo){
      return Response.json(
        {
          success: false,
          message: "Debe ingresar un correo"
        },
        {
          status: 400
        }
      );
    }
    // =========================
    // VERIFICAR USUARIO
    // =========================
    const usuario = await prisma.usuario.findUnique({
      where: {
        correo
      }
    });
    if(!usuario){
      return Response.json(
        {
          success: false,
          message: "No existe una cuenta con ese correo"
        },
        {
          status: 404
        }
      );
    }
    // =========================
    // GENERAR CÓDIGO
    // =========================
    const codigo = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    codigosRecuperacion.set(
      correo,
      codigo
    );
    // =========================
    // CONFIGURAR EMAIL
    // =========================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    // =========================
    // ENVIAR EMAIL
    // =========================
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: correo,
      subject: "Código de recuperación",
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Tu código es:</p>
        <h1>${codigo}</h1>
      `
    });
    return Response.json(
      {
        success: true,
        message: "Código enviado correctamente"
      },
      {
        status: 200
      }
    );
  } catch(error){
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error al enviar el código"
      },
      {
        status: 500
      }
    );
  }
}