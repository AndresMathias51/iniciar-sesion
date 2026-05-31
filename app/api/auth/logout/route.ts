import { cookies } from "next/headers";

export async function POST(){

    const cookieStore = await cookies();

    cookieStore.delete("usuario");

    return Response.json({
        success:true,
        message:"Sesión cerrada"
    });

}