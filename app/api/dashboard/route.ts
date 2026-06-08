import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type DashboardMateria = {
  encabezado: {
    nombre: string;
  };
  descripcion: {
    descripcion: string;
  };
  categorias: {
    id: number;
    nombre: string;
    temas: {
      id: number;
      imagen: string;
      nombre: string;
      descripcion: string;
    }[];
  }[];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const idMateria = Number(searchParams.get("idMateria"));

    if (!idMateria || Number.isNaN(idMateria)) {
      return NextResponse.json(
        { error: "Debe enviar un idMateria válido." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: DashboardMateria | null }[]
    >`
      SELECT obtener_dashboard_materia(${idMateria}) AS data;
    `;

    const dashboard = resultado[0]?.data;

    if (!dashboard) {
      return NextResponse.json(
        { error: "No se encontró la materia solicitada." },
        { status: 404 }
      );
    }

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Error al obtener dashboard de materia:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}