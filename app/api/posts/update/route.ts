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
      id,
      titulo,
      contenido
    } = body;

    if (
      !id ||
      !titulo ||
      !contenido
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

    const publicacionActualizada =
      await prisma.publicacion.update({
        where: {
          id
        },
        data: {
          titulo,
          contenido,
          fecha: new Date()
        }
      });

    return NextResponse.json({
      success: true,
      message: "Publicación actualizada",
      post: publicacionActualizada
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