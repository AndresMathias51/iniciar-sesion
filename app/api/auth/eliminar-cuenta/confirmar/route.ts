import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function DELETE() {

    try {

        const cookieStore =
            await cookies();

        const usuarioCookie =
            cookieStore.get("usuario");

        if (!usuarioCookie) {

            return Response.json(
                {
                    success: false,
                    message: "No hay sesión"
                },
                {
                    status: 401
                }
            );

        }

        const usuario =
            JSON.parse(
                usuarioCookie.value
            );

        // =========================
        // GENERAR DATOS INVÁLIDOS
        // =========================

        const passwordEliminada =
            await bcrypt.hash(
                crypto.randomUUID(),
                10
            );

        // =========================
        // DESACTIVAR CUENTA
        // =========================

        await prisma.usuario.update({
            where: {
                id: usuario.id
            },
            data: {
                nombre: "Usuario eliminado",

                correo:
                    `eliminado_${usuario.id}_${Date.now()}@deleted.local`,

                password:
                    passwordEliminada
            }
        });

        // =========================
        // ELIMINAR COOKIES
        // =========================

        cookieStore.delete("usuario");

        cookieStore.delete(
            "codigoEliminarCuenta"
        );

        return Response.json(
            {
                success: true,
                message: "Cuenta eliminada correctamente"
            },
            {
                status: 200
            }
        );

    } catch (error) {

        console.log(error);

        return Response.json(
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