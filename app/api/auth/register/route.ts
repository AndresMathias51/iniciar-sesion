export async function POST(req: Request) {
  const body = await req.json();
  const {nombre, correo, contraseña} = body;
  return Response.json({
    message: `Cuenta registrada con nombre ${nombre} y correo ${correo}`
  });
}