import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const postsDB =
      await prisma.publicacion.findMany({
        orderBy: {
          fecha: "desc"
        }
      });

    const posts = postsDB.map(post => ({
        ...post,
        fecha:
            new Date(post.fecha)
            .toLocaleString(
                "sv-SE",
                {   
                timeZone: "America/La_Paz"
                }
            )
        }));

    return NextResponse.json(posts);

  } catch(error) {

    console.error(error);

    return NextResponse.json(
      {
        success:false,
        message:"Error al obtener publicaciones"
      },
      {
        status:500
      }
    );

  }

}