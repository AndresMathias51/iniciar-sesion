import { cookies } from "next/headers";
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

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    const usuarioCookie = cookieStore.get("usuario");

    if (!usuarioCookie) {
      return Response.json(
        {
          success: false,
          message: "No hay sesión",
        },
        {
          status: 401,
        }
      );
    }

    const usuario = JSON.parse(usuarioCookie.value);

    if (!usuario?.id) {
      return Response.json(
        {
          success: false,
          message: "Sesión inválida",
        },
        {
          status: 400,
        }
      );
    }

    const idUsuario = Number(usuario.id);

    if (!idUsuario || Number.isNaN(idUsuario)) {
      return Response.json(
        {
          success: false,
          message: "El id del usuario no es válido",
        },
        {
          status: 400,
        }
      );
    }

    const resultado = await prisma.$queryRaw<
      { data: EliminarEstudianteRespuesta | null }[]
    >`
      SELECT eliminar_estudiante_json(${idUsuario}, ${13}) AS data;
    `;

    const data = resultado[0]?.data;

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "No se pudo procesar la eliminación",
        },
        {
          status: 500,
        }
      );
    }

    if (!data.eliminado) {
      return Response.json(
        {
          success: false,
          message: data.mensaje,
        },
        {
          status: 400,
        }
      );
    }

    cookieStore.delete("usuario");
    cookieStore.delete("codigoEliminarCuenta");

    return Response.json(
      {
        success: true,
        message: "Cuenta eliminada correctamente",
        publicacionesReasignadas: data.publicacionesReasignadas ?? 0,
        usuarioDefault: data.usuarioDefault,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}