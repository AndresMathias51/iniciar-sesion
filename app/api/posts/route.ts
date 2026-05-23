import { NextResponse } from "next/server";

export async function GET() {

    const posts = [

        {
            id:1,
            autor:"Andres Mathias",
            fecha:"19-05-2026",
            titulo:"Post Markdown",
            contenido:`
# Hola

Este es un texto normal.

**Texto en negrita**

*Texto cursiva*

~~Texto tachado~~

---

## Lista

* obj1
* obj2

> Hola esto es un blockquote

![image](https://picsum.photos/500/300)
            `
        },

        {
            id:2,
            autor:"Carlos",
            fecha:"17-05-2026",
            titulo:"Imagen local",
            contenido:`
Texto antes

![image](https://picsum.photos/500/300)

Texto después
            `
        }

    ];

    return NextResponse.json(posts);

}