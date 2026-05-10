export async function POST(req: Request) {
    const body = await req.json();
    const { codigo } = body;
    const codigoCorrecto = "123456";
    if (codigo !== codigoCorrecto) {
        return Response.json({
        success: false,
        message: "El código ingresado es incorrecto",
        });
    }
    return Response.json({
        success: true,
        message: "Código correcto",
    });
}