import bcrypt from "bcrypt";
import { cookies } from "next/headers";

type Usuario = {
  id:number,
  nombre:string,
  correo:string,
  passwordHash:string
};

const usuariosDB: Usuario[] = [
  {
    id:1,
    nombre:"Andres",
    correo:"andresmathias09877@gmail.com",
    passwordHash: await bcrypt.hash(
      "123456",
      10
    )
  }
];

export async function POST(req:Request){

  try{

    const body = await req.json();

    const {
      correo,
      password
    } = body;

    if(!correo || !password){

      return Response.json(
        {
          success:false,
          message:"Debe llenar todos los campos"
        },
        {
          status:400
        }
      );

    }

    const usuario = usuariosDB.find(
      user => user.correo === correo
    );

    if(!usuario){

      return Response.json(
        {
          success:false,
          message:"No existe una cuenta"
        },
        {
          status:404
        }
      );

    }

    const passwordCorrecta =
      await bcrypt.compare(
        password,
        usuario.passwordHash
      );

    if(!passwordCorrecta){

      return Response.json(
        {
          success:false,
          message:"Contraseña incorrecta"
        },
        {
          status:401
        }
      );

    }

    // =========================
    // GUARDAR COOKIE
    // =========================

    const cookieStore = await cookies();

    cookieStore.set(
      "usuario",
      JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }),
      {
        httpOnly:true,
        secure:false,
        path:"/",
        maxAge:60 * 60 * 24
      }
    );

    return Response.json({
      success:true,
      message:"Inicio exitoso",

      usuario:{
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });

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