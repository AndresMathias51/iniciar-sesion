import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const cookieStore =
      await cookies();

    const usuarioCookie =
      cookieStore.get("usuario");

    if (!usuarioCookie) {

      return NextResponse.json(
        {
          success: false,
          message: "Debe iniciar sesión"
        },
        {
          status: 401
        }
      );

    }

    const usuario =
      JSON.parse(usuarioCookie.value);

    const body =
      await req.json();

    const {
      titulo,
      contenido,
      id_tema
    } = body;

    if (
      !titulo ||
      !contenido ||
      !id_tema
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos"
        },
        {
          status: 400
        }
      );

    }

    const nuevoPost =
      await prisma.publicacion.create({

        data: {

          autor: usuario.nombre,

          id_autor: usuario.id,

          titulo,

          contenido,

          id_tema: Number(id_tema)

        }

      });

    return NextResponse.json(
      {
        success: true,
        message: "Post creado correctamente",
        post: nuevoPost
      },
      {
        status: 201
      }
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error interno"
      },
      {
        status: 500
      }
    );

  }

}