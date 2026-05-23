import { cookies } from "next/headers";

export async function GET(){
    try {
        const cookieStore = await cookies();
        const usuarioCookie =
            cookieStore.get("usuario");
        // =========================
        // NO HAY SESIÓN
        // =========================
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

        // =========================
        // PARSEAR COOKIE
        // =========================
        const usuario = JSON.parse(
            usuarioCookie.value
        );

        return Response.json({
            success:true,
            usuario
        });

    } catch(error){

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