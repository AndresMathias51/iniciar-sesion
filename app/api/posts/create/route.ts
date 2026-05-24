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

    // =========================
    // USUARIO LOGUEADO
    // =========================

    const usuario =
      JSON.parse(usuarioCookie.value);

    // =========================
    // DATOS FRONTEND
    // =========================

    const body = await req.json();

    const {
      titulo,
      contenido,
      id_tema
    } = body;

    // =========================
    // VALIDAR CAMPOS
    // =========================

    if(
      !titulo ||
      !contenido ||
      !id_tema
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
    // OBJETO A GUARDAR
    // =========================

    const nuevoPost = {

      autor:usuario.nombre,

      correo:usuario.correo,

      titulo,

      contenido,

      id_tema,

      fecha:new Date()
        .toLocaleDateString("es-BO")

    };

    // =========================
    // AQUÍ IRÍA LA BASE DE DATOS
    // =========================

    /*
      EJEMPLO SQL:

      INSERT INTO posts
      (
        autor,
        correo,
        titulo,
        contenido,
        id_tema,
        fecha
      )
      VALUES
      (
        ...datos
      )
    */

    console.log(
      "POST A INSERTAR:",
      nuevoPost
    );

    return NextResponse.json(
      {
        success:true,
        message:"Post creado correctamente",
        post:nuevoPost
      },
      {
        status:201
      }
    );

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