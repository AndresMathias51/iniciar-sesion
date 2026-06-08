import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type TemaPorCategoria = {
  id: number;
  idCategoria: number;
  titulo: string;
  descripcion: string;
};

type CrearTemaBody = {
  categoriaId?: string | number;
  idCategoria?: string | number;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  imagenUrl?: string;
  imagen?: string;
};

type BorrarTemaRespuesta = {
  eliminado: boolean;
  mensaje: string;
  tema?: TemaPorCategoria;
};

export async function GET() {
  try {
    const resultado = await prisma.$queryRaw<
      { data: TemaPorCategoria[] | null }[]
    >`
      SELECT obtener_temas_json() AS data;
    `;

    const temas = resultado[0]?.data ?? [];

    return NextResponse.json(temas);
  } catch (error) {
    console.error("Error al obtener temas:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CrearTemaBody;

    const titulo = String(body.titulo ?? body.nombre ?? "").trim();
    const descripcion = String(body.descripcion ?? "").trim();
    const idCategoria = Number(body.idCategoria ?? body.categoriaId);
    const imagen = String(body.imagen ?? body.imagenUrl ?? "/ico_pc.svg").trim();

    if (!titulo || !descripcion || !idCategoria || Number.isNaN(idCategoria)) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para crear el tema." },
        { status: 400 }
      );
    }

    const categoriaExiste = await prisma.$queryRaw<{ id: number }[]>`
      SELECT id
      FROM categoria
      WHERE id = ${idCategoria}
      LIMIT 1;
    `;

    if (categoriaExiste.length === 0) {
      return NextResponse.json(
        { error: "La categoría indicada no existe." },
        { status: 404 }
      );
    }

    const nuevoTema = await prisma.$queryRaw<TemaPorCategoria[]>`
      INSERT INTO tema (
        nombre,
        imagen,
        descripcion,
        id_categoria
      )
      VALUES (
        ${titulo},
        ${imagen},
        ${descripcion},
        ${idCategoria}
      )
      RETURNING
        id,
        id_categoria AS "idCategoria",
        nombre AS titulo,
        descripcion;
    `;

    return NextResponse.json(nuevoTema[0], { status: 201 });
  } catch (error) {
    console.error("Error al crear tema:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const tipo = searchParams.get("tipo");
    const id = searchParams.get("id");

    if (tipo !== "tema") {
      return NextResponse.json(
        { error: "Tipo de eliminación no soportado por ahora." },
        { status: 400 }
      );
    }

    const idTema = Number(id);

    if (!idTema || Number.isNaN(idTema)) {
      return NextResponse.json(
        { error: "El id del tema no es válido." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: BorrarTemaRespuesta | null }[]
    >`
      SELECT borrar_tema_json(${idTema}) AS data;
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
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al eliminar tema:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}