import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type EstadisticasMateria = {
  usuariosRegistrados: {
    titulo: string;
    cantidad: number;
    descripcion: string;
  };
  estudiantesInscritos: {
    id: number;
    nombre: string;
    email: string;
  }[];
  publicacionesPorcategoria: {
    categoria: string;
    cantidad: number;
  }[];
  temasPorCategoria: {
    id: number;
    categoria: string;
    cantidadTemas: number;
  }[];
};

export async function GET() {
  try {
    const resultado = await prisma.$queryRaw<
      { data: EstadisticasMateria | null }[]
    >`
      SELECT obtener_estadisticas() AS data;
    `;

    const estadisticas = resultado[0]?.data;

    if (!estadisticas) {  
      return NextResponse.json(
        { error: "No se encontraron estadísticas." },
        { status: 404 }
      );
    }

    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}