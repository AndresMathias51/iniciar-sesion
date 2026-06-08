import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type CategoriaApi = {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  idMateria: number;
  cantidadTemas: number;
};

type CrearEditarCategoriaBody = {
  nombre?: string;
  descripcion?: string;
  imagenUrl?: string;
  imagen?: string;
  idMateria?: string | number;
};

type CrearCategoriaRespuesta = {
  creado: boolean;
  mensaje: string;
  categoria?: CategoriaApi;
};

type EditarCategoriaRespuesta = {
  actualizado: boolean;
  mensaje: string;
  categoria?: CategoriaApi;
};

type BorrarCategoriaRespuesta = {
  eliminado: boolean;
  mensaje: string;
  categoria?: CategoriaApi;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CrearEditarCategoriaBody;

    const nombre = String(body.nombre ?? "").trim();
    const descripcion = String(body.descripcion ?? "").trim();
    const imagen = String(body.imagenUrl ?? body.imagen ?? "/ico_pc.svg").trim();
    const idMateria = Number(body.idMateria);

    if (!nombre || !descripcion || !idMateria || Number.isNaN(idMateria)) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para crear la categoría." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: CrearCategoriaRespuesta | null }[]
    >`
      SELECT crear_categoria_json(
        ${nombre},
        ${descripcion},
        ${imagen},
        ${idMateria}
      ) AS data;
    `;

    const data = resultado[0]?.data;

    if (!data) {
      return NextResponse.json(
        { error: "No se pudo procesar la creación." },
        { status: 500 }
      );
    }

    if (!data.creado || !data.categoria) {
      return NextResponse.json(
        { error: data.mensaje },
        { status: 400 }
      );
    }

    return NextResponse.json(data.categoria, { status: 201 });
  } catch (error) {
    console.error("Error al crear categoría:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const idCategoria = Number(id);

    if (!idCategoria || Number.isNaN(idCategoria)) {
      return NextResponse.json(
        { error: "El id de la categoría no es válido." },
        { status: 400 }
      );
    }

    const body = (await request.json()) as CrearEditarCategoriaBody;

    const nombre = String(body.nombre ?? "").trim();
    const descripcion = String(body.descripcion ?? "").trim();
    const imagen = String(body.imagenUrl ?? body.imagen ?? "/ico_pc.svg").trim();
    const idMateria = body.idMateria ? Number(body.idMateria) : null;

    if (!nombre || !descripcion) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para editar la categoría." },
        { status: 400 }
      );
    }

    if (idMateria !== null && Number.isNaN(idMateria)) {
      return NextResponse.json(
        { error: "El id de la materia no es válido." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: EditarCategoriaRespuesta | null }[]
    >`
      SELECT editar_categoria_json(
        ${idCategoria},
        ${nombre},
        ${descripcion},
        ${imagen},
        ${idMateria}
      ) AS data;
    `;

    const data = resultado[0]?.data;

    if (!data) {
      return NextResponse.json(
        { error: "No se pudo procesar la actualización." },
        { status: 500 }
      );
    }

    if (!data.actualizado || !data.categoria) {
      return NextResponse.json(
        { error: data.mensaje },
        { status: 404 }
      );
    }

    return NextResponse.json(data.categoria);
  } catch (error) {
    console.error("Error al editar categoría:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const idCategoria = Number(id);

    if (!idCategoria || Number.isNaN(idCategoria)) {
      return NextResponse.json(
        { error: "El id de la categoría no es válido." },
        { status: 400 }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: BorrarCategoriaRespuesta | null }[]
    >`
      SELECT borrar_categoria_json(${idCategoria}) AS data;
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
    console.error("Error al eliminar categoría:", error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}