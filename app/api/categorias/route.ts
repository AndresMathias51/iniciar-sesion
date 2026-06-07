import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type CrearCategoriaBody = {
  nombre?: string;
  descripcion?: string;
  imagenUrl?: string;
  idMateria?: string | number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CrearCategoriaBody;

    const nombre = String(body.nombre ?? "").trim();
    const descripcion = String(body.descripcion ?? "").trim();
    const imagen = String(body.imagenUrl ?? "/ico_pc.svg").trim();
    const idMateria = Number(body.idMateria);

    if (!nombre || !descripcion || !idMateria || Number.isNaN(idMateria)) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para crear la categoría." },
        { status: 400 }
      );
    }

    const nuevaCategoria = await prisma.$queryRaw<
      {
        id: number;
        nombre: string;
        descripcion: string;
        imagenUrl: string;
        idMateria: number;
      }[]
    >`
      INSERT INTO categoria (
        nombre,
        descripcion,
        imagen,
        id_materia
      )
      VALUES (
        ${nombre},
        ${descripcion},
        ${imagen},
        ${idMateria}
      )
      RETURNING
        id,
        nombre,
        descripcion,
        imagen AS "imagenUrl",
        id_materia AS "idMateria";
    `;

    return NextResponse.json(nuevaCategoria[0], { status: 201 });
  } catch (error) {
    console.error("Error al crear categoría:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}