import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request){

  try{

    const body = await req.json();

    const {
      correo,
      password
    } = body;

    if(!correo || !password){

      return Response.json(
        {
          success:false,
          message:"Debe llenar todos los campos"
        },
        {
          status:400
        }
      );

    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        correo,
      },
      include: {
        rol_usuario_rolTorol: true,
      },
    });

    if(!usuario){

      return Response.json(
        {
          success:false,
          message:"No existe una cuenta"
        },
        {
          status:404
        }
      );

    }

    const passwordCorrecta =
      await bcrypt.compare(
        password,
        usuario.password
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
    // GUARDAR COOKIE
    // =========================

    const cookieStore = await cookies();

    cookieStore.set(
      "usuario",
      JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol_usuario_rolTorol.nombre_rol,
        nivel: usuario.rol_usuario_rolTorol.nivel
      }),
      {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 24
      }
    );

    return Response.json({
      success: true,
      message: "Inicio exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol_usuario_rolTorol.nombre_rol,
        nivel: usuario.rol_usuario_rolTorol.nivel
      }
    });

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