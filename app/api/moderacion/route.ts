import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type TemasPorCategoria = {
  id: number;
  idCategoria: number;
  titulo: string;
  descripcion: string;
};

export async function GET() {
  try {
    const resultado = await prisma.$queryRaw<
      { data: TemasPorCategoria[] | null }[]
    >`
      SELECT obtener_temas_json() AS data;
    `;

    const estadisticas = resultado[0]?.data ??[];
    
    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}