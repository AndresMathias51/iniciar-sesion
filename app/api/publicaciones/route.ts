import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type EliminarPublicacionRespuesta = {
  eliminado: boolean;
  mensaje: string;
  publicacion?: {
    id: number;
    autor: string;
    id_autor: number;
    titulo: string;
    id_tema: number | null;
  };
  eliminadoPor?: {
    id: number;
    nombre: string;
    rol: string;
    nivel: number;
  };
};

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const idPublicacionParam = searchParams.get("idPublicacion");
    const idUsuarioParam = searchParams.get("idUsuario");

    const idPublicacion = Number(idPublicacionParam);
    const idUsuario = Number(idUsuarioParam);

    if (!idPublicacion || Number.isNaN(idPublicacion)) {
      return NextResponse.json(
        { error: "El id de la publicación no es válido." },
        { status: 400 }
      );
    }

    if (!idUsuario || Number.isNaN(idUsuario)) {
      return NextResponse.json(
        { error: "El id del usuario solicitante no es válido." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: EliminarPublicacionRespuesta | null }[]
    >`
      SELECT eliminar_publicacion_json(
        ${idPublicacion},
        ${idUsuario}
      ) AS data;
    `;

    const data = resultado[0]?.data;

    if (!data) {
      return NextResponse.json(
        { error: "No se pudo procesar la eliminación." },
        { status: 500 }
      );
    }

    if (!data.eliminado) {
      return NextResponse.json(
        { error: data.mensaje },
        { status: 403 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al eliminar publicación:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}