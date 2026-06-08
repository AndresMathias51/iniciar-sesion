import { codigosRecuperacion } from "../forgot-password/route";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      correo,
      codigo
    } = body;
    // =========================
    // VALIDAR
    // =========================
    if(
      !correo ||
      !codigo
    ){
      return Response.json(
        {
          success: false,
          message: "Datos incompletos"
        },
        {
          status: 400
        }
      );
    }
    // =========================
    // OBTENER CÓDIGO
    // =========================
    const codigoGuardado =
      codigosRecuperacion.get(correo);
    // =========================
    // VERIFICAR
    // =========================
    if(codigoGuardado !== codigo){
      return Response.json(
        {
          success: false,
          message: "Código incorrecto"
        },
        {
          status: 401
        }
      );
    }
    codigosRecuperacion.delete(correo);
    return Response.json(
      {
        success: true,
        message: "Código correcto"
      },
      {
        status: 200
      }
    );
  } catch(error){
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