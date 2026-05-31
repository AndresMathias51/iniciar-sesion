import bcrypt from "bcrypt";

type Usuario = {
  id: number,
  nombre: string,
  correo: string,
  passwordHash: string
};
// SIMULACIÓN DE BASE DE DATOS
// luego esto vendrá de PostgreSQL/MySQL/MongoDB
const usuariosDB: Usuario[] = [
  {
    id: 1,
    nombre: "Carlos",
    correo: "carlos@gmail.com",
    passwordHash: "$2b$10$EjemploHash123"
  },
  {
    id: 2,
    nombre: "Alvaro",
    correo: "alvaro@gmail.com",
    passwordHash: "$2b$10$OtroHash456"
  }
];
export async function POST(req: Request) {
  try {
    // =========================
    // RECIBIR DATOS FRONTEND
    // =========================
    const body = await req.json();
    const {
      nombre,
      correo,
      password
    } = body;
    // =========================
    // VALIDAR CAMPOS VACÍOS
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
    // VALIDAR SI EL CORREO YA EXISTE
    // =========================
    const usuarioExistente = usuariosDB.find(
      usuario => usuario.correo === correo
    );
    if(usuarioExistente){
      return Response.json(
        {
          success: false,
          message: "El correo ya tiene una cuenta registrada"
        },
        {
          status: 409
        }
      );
    }
    // =========================
    // HASH DE CONTRASEÑA
    // =========================
    const passwordHash = await bcrypt.hash(
      password,
      10
    );
    // =========================
    // OBJETO QUE SE GUARDARÍA
    // EN BASE DE DATOS
    // =========================
    const nuevoUsuario: Usuario = {
      id: usuariosDB.length + 1,
      nombre,
      correo,
      passwordHash
    };
    // =========================
    // SIMULACIÓN INSERT EN BD
    // =========================
    usuariosDB.push(nuevoUsuario);
    // =========================
    // RESPUESTA
    // =========================
    return Response.json(
      {
        success: true,
        message: "Cuenta registrada correctamente",
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          correo: nuevoUsuario.correo,
          password: passwordHash
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