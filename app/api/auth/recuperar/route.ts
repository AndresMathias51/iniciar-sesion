import bcrypt from "bcrypt";
type Usuario = {
  id: number,
  correo: string,
  passwordHash: string
};
// SIMULACIÓN BD
const usuariosDB: Usuario[] = [
  {
    id: 1,
    correo: "andresmathias09877@gmail.com",
    passwordHash: "hash123"
  }
];
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      correo,
      password
    } = body;
    // =========================
    // VALIDAR
    // =========================
    if(
      !correo ||
      !password
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
    // BUSCAR USUARIO
    // =========================
    const usuario = usuariosDB.find(
      user => user.correo === correo
    );
    if(!usuario){
      return Response.json(
        {
          success: false,
          message: "Usuario no encontrado"
        },
        {
          status: 404
        }
      );
    }
    // =========================
    // HASH NUEVA PASSWORD
    // =========================
    const nuevoHash = await bcrypt.hash(
      password,
      10
    );
    // =========================
    // ACTUALIZAR BD
    // =========================
    usuario.passwordHash = nuevoHash;
    // UPDATE usuarios SET ...
    return Response.json(
      {
        success: true,
        message: "Contraseña actualizada"
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