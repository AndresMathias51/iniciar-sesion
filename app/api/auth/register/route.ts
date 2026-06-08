import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      nombre,
      correo,
      password
    } = body;

    if (
      !nombre ||
      !correo ||
      !password
    ) {

      return Response.json(
        {
          success: false,
          message: "Debe llenar todos los campos"
        },
        {
          status: 400
        }
      );

    }

    const usuarioExistente =
      await prisma.usuario.findUnique({
        where: {
          correo
        }
      });

    if (usuarioExistente) {

      return Response.json(
        {
          success: false,
          message: "El correo ya tiene una cuenta registrada"
        },
        {
          status: 409
        }
      );

    }

    const passwordHash =
      await bcrypt.hash(
        password,
        10
      );

    const nuevoUsuario =
      await prisma.usuario.create({
        data: {
          nombre,
          correo,
          password: passwordHash,
          rol: 2
        }
      });

    return Response.json(
      {
        success: true,
        message: "Cuenta registrada correctamente",
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          correo: nuevoUsuario.correo,
          rol: nuevoUsuario.rol
        }
      },
      {
        status: 201
      }
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Error interno del servidor"
      },
      {
        status: 500
      }
    );

  }

}