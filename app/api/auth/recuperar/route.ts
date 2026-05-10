export async function POST(req: Request) {

  const body = await req.json();

  const { password } = body;

  return Response.json({
    success: true,
    message: "Contraseña actualizada",
  });
}