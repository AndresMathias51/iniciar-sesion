export async function POST(req: Request) {
  const body = await req.json();
  const {correo, contraseña} = body;
  return Response.json({
    message: `Iniciando sesion con correo ${correo}`
  });
}