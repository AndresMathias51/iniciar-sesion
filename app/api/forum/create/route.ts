type Foro = {
  id: number,
  titulo: string,
  descripcion: string,
  creadorCorreo: string
};

// SIMULACIÓN BASE DE DATOS
const forosDB: Foro[] = [];
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      titulo,
      descripcion,
      creadorCorreo
    } = body;
    // =========================
    // VALIDAR
    // =========================
    if(
      !titulo ||
      !descripcion ||
      !creadorCorreo
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
    // VERIFICAR DUPLICADOS
    // =========================
    const foroExistente = forosDB.find(
      foro => foro.titulo === titulo
    );
    if(foroExistente){
      return Response.json(
        {
          success: false,
          message: "Ya existe un foro con ese título"
        },
        {
          status: 409
        }
      );
    }
    // =========================
    // NUEVO FORO
    // =========================
    const nuevoForo = {
      id: forosDB.length + 1,
      titulo,
      descripcion,
      creadorCorreo
    };
    // =========================
    // AQUÍ IRÍA LA BD
    // =========================
    // INSERT INTO foros ...
    forosDB.push(nuevoForo);
    return Response.json(
      {
        success: true,
        message: "Foro creado correctamente",
        foro: nuevoForo
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