import { NextResponse } from "next/server";

export async function GET() {

    const posts = [

        // =========================
        // PROGRAMACIÓN
        // =========================

        {
            id:1,
            autor:"Andres Mathias",
            fecha:"01-05-2026",
            titulo:"Introducción a la programación",
            id_tema:1,
            contenido:`
# Introducción a la programación

La programación permite resolver problemas mediante algoritmos.

* Variables
* Condiciones
* Bucles

![image](https://picsum.photos/500/301)
            `
        },

        {
            id:2,
            autor:"Carlos",
            fecha:"02-05-2026",
            titulo:"Variables y tipos de datos",
            id_tema:2,
            contenido:`
# Variables y tipos de datos

**Tipos básicos**

* int
* float
* string
* boolean

![image](https://picsum.photos/500/302)
            `
        },

        {
            id:3,
            autor:"Lucia",
            fecha:"03-05-2026",
            titulo:"Estructuras condicionales",
            id_tema:3,
            contenido:`
# Condicionales

Uso de:

* if
* else
* else if

> Permiten tomar decisiones.

![image](https://picsum.photos/500/303)
            `
        },

        {
            id:4,
            autor:"Miguel",
            fecha:"04-05-2026",
            titulo:"Bucles y repetición",
            id_tema:4,
            contenido:`
# Bucles

## Tipos

1. for
2. while
3. do while

![image](https://picsum.photos/500/304)
            `
        },

        {
            id:5,
            autor:"Fernanda",
            fecha:"05-05-2026",
            titulo:"Funciones",
            id_tema:5,
            contenido:`
# Funciones

Las funciones permiten reutilizar código.

\`\`\`js
function saludar(){}
\`\`\`

![image](https://picsum.photos/500/305)
            `
        },

        {
            id:6,
            autor:"Andres Mathias",
            fecha:"06-05-2026",
            titulo:"Arreglos",
            id_tema:6,
            contenido:`
# Arreglos

Los arreglos almacenan múltiples datos.

* nombres[]
* edades[]

![image](https://picsum.photos/500/306)
            `
        },

        {
            id:7,
            autor:"Carlos",
            fecha:"07-05-2026",
            titulo:"Programación orientada a objetos",
            id_tema:7,
            contenido:`
# POO

## Conceptos

* Clases
* Objetos
* Métodos

![image](https://picsum.photos/500/307)
            `
        },

        {
            id:8,
            autor:"Lucia",
            fecha:"08-05-2026",
            titulo:"Manejo de errores",
            id_tema:8,
            contenido:`
# Manejo de errores

Uso de try y catch.

~~Ignorar errores nunca es buena idea~~

![image](https://picsum.photos/500/308)
            `
        },

        // =========================
        // BASE DE DATOS
        // =========================

        {
            id:9,
            autor:"Miguel",
            fecha:"09-05-2026",
            titulo:"Modelo entidad relación",
            id_tema:9,
            contenido:`
# Modelo entidad relación

Permite diseñar bases de datos.

* Entidades
* Relaciones

![image](https://picsum.photos/500/309)
            `
        },

        {
            id:10,
            autor:"Fernanda",
            fecha:"10-05-2026",
            titulo:"Modelo relacional",
            id_tema:10,
            contenido:`
# Modelo relacional

Uso de tablas y registros.

> Cada tabla representa una entidad.

![image](https://picsum.photos/500/310)
            `
        },

        {
            id:11,
            autor:"Andres Mathias",
            fecha:"11-05-2026",
            titulo:"Consultas SQL básicas",
            id_tema:11,
            contenido:`
# SQL Básico

\`\`\`sql
SELECT * FROM usuarios;
\`\`\`

![image](https://picsum.photos/500/311)
            `
        },

        {
            id:12,
            autor:"Carlos",
            fecha:"12-05-2026",
            titulo:"Relaciones entre tablas",
            id_tema:12,
            contenido:`
# Relaciones entre tablas

* Uno a uno
* Uno a muchos
* Muchos a muchos

![image](https://picsum.photos/500/312)
            `
        },

        {
            id:13,
            autor:"Lucia",
            fecha:"13-05-2026",
            titulo:"Normalización",
            id_tema:13,
            contenido:`
# Normalización

Evita redundancia de datos.

---

**Primera forma normal**

![image](https://picsum.photos/500/313)
            `
        },

        // =========================
        // DESARROLLO WEB
        // =========================

        {
            id:14,
            autor:"Miguel",
            fecha:"14-05-2026",
            titulo:"HTML semántico",
            id_tema:14,
            contenido:`
# HTML semántico

* header
* nav
* section

![image](https://picsum.photos/500/314)
            `
        },

        {
            id:15,
            autor:"Fernanda",
            fecha:"15-05-2026",
            titulo:"CSS básico",
            id_tema:15,
            contenido:`
# CSS Básico

Uso de:

* colores
* márgenes
* padding

![image](https://picsum.photos/500/315)
            `
        },

        {
            id:16,
            autor:"Andres Mathias",
            fecha:"16-05-2026",
            titulo:"Flexbox",
            id_tema:16,
            contenido:`
# Flexbox

Permite alinear elementos fácilmente.

> justify-content

![image](https://picsum.photos/500/316)
            `
        },

        {
            id:17,
            autor:"Carlos",
            fecha:"17-05-2026",
            titulo:"CSS Grid",
            id_tema:17,
            contenido:`
# CSS Grid

Organiza elementos en filas y columnas.

![image](https://picsum.photos/500/317)
            `
        },

        {
            id:18,
            autor:"Lucia",
            fecha:"18-05-2026",
            titulo:"Diseño responsive",
            id_tema:18,
            contenido:`
# Responsive

Adaptación a móviles y tablets.

![image](https://picsum.photos/500/318)
            `
        },

        {
            id:19,
            autor:"Miguel",
            fecha:"19-05-2026",
            titulo:"Componentes visuales",
            id_tema:19,
            contenido:`
# Componentes visuales

* Botones
* Tarjetas
* Formularios

![image](https://picsum.photos/500/319)
            `
        },

        // =========================
        // SISTEMAS DE INFORMACIÓN
        // =========================

        {
            id:20,
            autor:"Fernanda",
            fecha:"20-05-2026",
            titulo:"Conceptos de sistemas de información",
            id_tema:20,
            contenido:`
# Sistemas de información

Procesan información organizacional.

![image](https://picsum.photos/500/320)
            `
        },

        {
            id:21,
            autor:"Andres Mathias",
            fecha:"21-05-2026",
            titulo:"Procesos organizacionales",
            id_tema:21,
            contenido:`
# Procesos organizacionales

Relacionan actividades empresariales.

![image](https://picsum.photos/500/321)
            `
        },

        {
            id:22,
            autor:"Carlos",
            fecha:"22-05-2026",
            titulo:"Tipos de sistemas",
            id_tema:22,
            contenido:`
# Tipos de sistemas

1. TPS
2. MIS
3. DSS

![image](https://picsum.photos/500/322)
            `
        },

        {
            id:23,
            autor:"Lucia",
            fecha:"23-05-2026",
            titulo:"Requerimientos del sistema",
            id_tema:23,
            contenido:`
# Requerimientos

* Funcionales
* No funcionales

![image](https://picsum.photos/500/323)
            `
        },

        // =========================
        // ARQUITECTURA DE SOFTWARE
        // =========================

        {
            id:24,
            autor:"Miguel",
            fecha:"24-05-2026",
            titulo:"Capas de arquitectura",
            id_tema:24,
            contenido:`
# Capas de arquitectura

* Presentación
* Negocio
* Datos

![image](https://picsum.photos/500/324)
            `
        },

        {
            id:25,
            autor:"Fernanda",
            fecha:"25-05-2026",
            titulo:"Arquitectura cliente-servidor",
            id_tema:25,
            contenido:`
# Cliente servidor

Comunicación entre frontend y backend.

![image](https://picsum.photos/500/325)
            `
        },

        {
            id:26,
            autor:"Andres Mathias",
            fecha:"26-05-2026",
            titulo:"Arquitectura MVC",
            id_tema:26,
            contenido:`
# MVC

* Modelo
* Vista
* Controlador

![image](https://picsum.photos/500/326)
            `
        },

        {
            id:27,
            autor:"Carlos",
            fecha:"27-05-2026",
            titulo:"APIs REST",
            id_tema:27,
            contenido:`
# APIs REST

Métodos HTTP:

* GET
* POST
* PUT
* DELETE

![image](https://picsum.photos/500/327)
            `
        },

        {
            id:28,
            autor:"Lucia",
            fecha:"28-05-2026",
            titulo:"Servicios",
            id_tema:28,
            contenido:`
# Servicios

Separan lógica de negocio.

![image](https://picsum.photos/500/328)
            `
        },

        {
            id:29,
            autor:"Miguel",
            fecha:"29-05-2026",
            titulo:"Escalabilidad",
            id_tema:29,
            contenido:`
# Escalabilidad

Capacidad de crecer.

![image](https://picsum.photos/500/329)
            `
        },

        {
            id:30,
            autor:"Fernanda",
            fecha:"30-05-2026",
            titulo:"Mantenibilidad",
            id_tema:30,
            contenido:`
# Mantenibilidad

Facilidad para modificar sistemas.

![image](https://picsum.photos/500/330)
            `
        },

        // =========================
        // REDES
        // =========================

        {
            id:31,
            autor:"Andres Mathias",
            fecha:"31-05-2026",
            titulo:"Conceptos básicos de redes",
            id_tema:31,
            contenido:`
# Redes

Permiten compartir información.

![image](https://picsum.photos/500/331)
            `
        },

        {
            id:32,
            autor:"Carlos",
            fecha:"01-06-2026",
            titulo:"Modelo OSI",
            id_tema:32,
            contenido:`
# Modelo OSI

Tiene 7 capas.

![image](https://picsum.photos/500/332)
            `
        },

        {
            id:33,
            autor:"Lucia",
            fecha:"02-06-2026",
            titulo:"Direcciones IP",
            id_tema:33,
            contenido:`
# Direcciones IP

Ejemplo:

\`\`\`
192.168.1.1
\`\`\`

![image](https://picsum.photos/500/333)
            `
        }

    ];

    return NextResponse.json(posts);

}