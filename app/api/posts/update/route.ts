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
      titulo,
      contenido,
      correo
    } = body;

    // =========================
    // VALIDAR AUTOR
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
    // VALIDAR CAMPOS
    // =========================

    if(
      !id ||
      !titulo ||
      !contenido
    ){

      return NextResponse.json(
        {
          success:false,
          message:"Faltan campos"
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

      UPDATE posts
      SET
        titulo = ?,
        contenido = ?
      WHERE id = ?
    */

    console.log(
      "POST A ACTUALIZAR:",
      {
        id,
        titulo,
        contenido
      }
    );

    return NextResponse.json({
      success:true,
      message:"Post actualizado"
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