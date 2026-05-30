import { cookies } from "next/headers";

export async function DELETE(){

    try{

        const cookieStore =
            await cookies();

        const usuarioCookie =
            cookieStore.get("usuario");

        if(!usuarioCookie){

            return Response.json(
                {
                    success:false,
                    message:"No hay sesión"
                },
                {
                    status:401
                }
            );

        }

        const usuario =
            JSON.parse(
                usuarioCookie.value
            );

        // =========================
        // AQUÍ ELIMINARÍAS EN BD
        // =========================

        console.log(
            "Cuenta eliminada:",
            usuario.correo
        );

        // =========================
        // ELIMINAR COOKIES
        // =========================
        cookieStore.delete("usuario");

        cookieStore.delete(
            "codigoEliminarCuenta"
        );

        return Response.json(
            {
                success:true,
                message:
                    "Cuenta eliminada"
            },
            {
                status:200
            }
        );

    }catch(error){

        console.log(error);

        return Response.json(
            {
                success:false,
                message:"Error interno"
            },
            {
                status:500
            }
        );

    }

}