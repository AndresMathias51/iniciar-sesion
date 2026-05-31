import { NextResponse } from "next/server";

export async function GET() {
    const posts = {
        "usuariosRegistrados": {
            "titulo": "Usuarios registrados",
            "cantidad": 128,
            "descripcion": "Total de usuarios registrados en el sistema"
        },
        "estudiantesInscritos": [
            {
            "id": 1,
            "nombre": "Carlos Mendoza",
            "email": "carlos.mendoza@correo.com"
            },
            {
            "id": 2,
            "nombre": "María Fernández",
            "email": "maria.fernandez@correo.com"
            },
            {
            "id": 3,
            "nombre": "Luis Ramírez",
            "email": "luis.ramirez@correo.com"
            },
            {
            "id": 4,
            "nombre": "Ana Torres",
            "email": "ana.torres@correo.com"
            },
            {
            "id": 5,
            "nombre": "Fernando Salazar",
            "email": "fernando.salazar@correo.com"
            },
            {
            "id": 6,
            "nombre": "Lucía Vargas",
            "email": "lucia.vargas@correo.com"
            },
            {
            "id": 7,
            "nombre": "Diego Rojas",
            "email": "diego.rojas@correo.com"
            },
            {
            "id": 8,
            "nombre": "Valeria Suárez",
            "email": "valeria.suarez@correo.com"
            }
        ],
        "publicacionesPorSemana": [
            {
            "semana": "Semana 1",
            "cantidad": 12
            },
            {
            "semana": "Semana 2",
            "cantidad": 18
            },
            {
            "semana": "Semana 3",
            "cantidad": 9
            },
            {
            "semana": "Semana 4",
            "cantidad": 24
            }
        ],
        "temasPorCategoria": [
            {
            "id": 1,
            "categoria": "Programación",
            "cantidadTemas": 8
            },
            {
            "id": 2,
            "categoria": "Base de Datos",
            "cantidadTemas": 5
            },
            {
            "id": 3,
            "categoria": "Diseño Web",
            "cantidadTemas": 6
            },
            {
            "id": 4,
            "categoria": "Sistemas de Información",
            "cantidadTemas": 4
            },
            {
            "id": 5,
            "categoria": "Arquitectura de Software",
            "cantidadTemas": 7
            },
            {
            "id": 6,
            "categoria": "Redes",
            "cantidadTemas": 3
            }
        ]
    };
    return NextResponse.json(posts);
}
