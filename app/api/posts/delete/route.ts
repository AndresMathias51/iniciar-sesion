import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function POST(req:Request){

  try{

    // =========================
    // VALIDAR SESIÓN
    // =========================

    const cookieStore =
      await cookies();

    const usuarioCookie =
      cookieStore.get("usuario");

    if(!usuarioCookie){

      return NextResponse.json(
        {
          success:false,
          message:"Debe iniciar sesión"
        },
        {
          status:401
        }
      );

    }

    const usuario =
      JSON.parse(usuarioCookie.value);

    // =========================
    // DATOS FRONTEND
    // =========================

    const body = await req.json();

    const {
      id,
      correo
    } = body;

    // =========================
    // VALIDAR DUEÑO
    // =========================

    if(usuario.correo !== correo){

      return NextResponse.json(
        {
          success:false,
          message:"No autorizado"
        },
        {
          status:403
        }
      );

    }

    // =========================
    // VALIDAR ID
    // =========================

    if(!id){

      return NextResponse.json(
        {
          success:false,
          message:"ID inválido"
        },
        {
          status:400
        }
      );

    }

    // =========================
    // AQUÍ IRÍA LA BASE DE DATOS
    // =========================

    /*
      EJEMPLO SQL:

      DELETE FROM posts
      WHERE id = ?
    */

    console.log(
      "POST A ELIMINAR:",
      id
    );

    return NextResponse.json({
      success:true,
      message:"Post eliminado"
    });

  }catch(error){

    console.log(error);

    return NextResponse.json(
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