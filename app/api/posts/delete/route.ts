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

    const { id } = body;

    if (!id) {

      return NextResponse.json(
        {
          success: false,
          message: "ID inválido"
        },
        {
          status: 400
        }
      );

    }

    const publicacion =
      await prisma.publicacion.findUnique({
        where: {
          id
        }
      });

    if (!publicacion) {

      return NextResponse.json(
        {
          success: false,
          message: "Publicación no encontrada"
        },
        {
          status: 404
        }
      );

    }

    const esAutor =
      usuario.id === publicacion.id_autor;

    const esDocente =
      usuario.nivel === 1;

    if (!esAutor && !esDocente) {

      return NextResponse.json(
        {
          success: false,
          message: "No autorizado"
        },
        {
          status: 403
        }
      );

    }

    await prisma.publicacion.delete({
      where: {
        id
      }
    });

    return NextResponse.json({
      success: true,
      message: "Publicación eliminada"
    });

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