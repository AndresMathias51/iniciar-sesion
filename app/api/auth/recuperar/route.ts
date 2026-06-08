import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      correo,
      password
    } = body;

    if(
      !correo ||
      !password
    ){

      return Response.json(
        {
          success:false,
          message:"Datos incompletos"
        },
        {
          status:400
        }
      );

    }

    const usuario =
      await prisma.usuario.findUnique({
        where:{
          correo
        }
      });

    if(!usuario){

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

    const nuevoHash =
      await bcrypt.hash(
        password,
        10
      );

    await prisma.usuario.update({
      where:{
        correo
      },
      data:{
        password:nuevoHash
      }
    });

    return Response.json(
      {
        success:true,
        message:"Contraseña actualizada"
      },
      {
        status:200
      }
    );

  } catch(error){

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