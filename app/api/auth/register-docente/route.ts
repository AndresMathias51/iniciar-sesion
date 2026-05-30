import bcrypt from "bcrypt";

type Usuario = {
  id: number,
  nombre: string,
  correo: string,
  passwordHash: string
};
// SIMULACIÓN BASE DE DATOS
const usuariosDB: Usuario[] = [
  {
    id: 1,
    nombre: "Carlos",
    correo: "carlos@gmail.com",
    passwordHash: "$2b$10$abcdefghijklmnopqrstuv"
  }
];
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nombre,
      correo,
      password
    } = body;
    // =========================
    // VALIDAR CAMPOS
    // =========================
    if(
      !nombre ||
      !correo ||
      !password
    ){
      return Response.json(
        {
          success: false,
          message: "Debe llenar todos los campos"
        },
        {
          status: 400
        }
      );
    }
    // =========================
    // VERIFICAR SI EXISTE
    // =========================
    const usuarioExistente = usuariosDB.find(
      user => user.correo === correo
    );
    if(usuarioExistente){
      return Response.json(
        {
          success: false,
          message: "Ya existe una cuenta con ese correo"
        },
        {
          status: 409
        }
      );
    }
    // =========================
    // HASH PASSWORD
    // =========================
    const passwordHash = await bcrypt.hash(
      password,
      10
    );
    // =========================
    // NUEVO USUARIO
    // =========================
    const nuevoUsuario = {
      id: usuariosDB.length + 1,
      nombre,
      correo,
      passwordHash
    };
    // =========================
    // AQUÍ IRÍA LA BD
    // =========================
    // INSERT INTO usuarios ...
    usuariosDB.push(nuevoUsuario);
    return Response.json(
      {
        success: true,
        message: "Cuenta creada correctamente",
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          correo: nuevoUsuario.correo
        }
      },
      {
        status: 201
      }
    );
  } catch(error){
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error interno del servidor"
      },
      {
        status: 500
      }
    );
  }
}