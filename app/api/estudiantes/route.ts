import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type EliminarEstudianteRespuesta = {
  eliminado: boolean;
  mensaje: string;
  publicacionesReasignadas?: number;
  usuario?: {
    id: number;
    nombre: string;
    correo: string;
    rolAnterior: string;
    rolNuevo: string;
  };
  usuarioDefault?: {
    id: number;
    nombre: string;
    correo: string;
  };
};

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const idUsuario = Number(id);

    if (!idUsuario || Number.isNaN(idUsuario)) {
      return NextResponse.json(
        { error: "El id del estudiante no es válido." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: EliminarEstudianteRespuesta | null }[]
    >`
      SELECT eliminar_estudiante_json(${idUsuario}, ${13}) AS data;
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
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}