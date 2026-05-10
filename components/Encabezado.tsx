'use client'

import React from "react";
import Image from "next/image";
import Barra_buscar from "./Barra_buscar";
import "./Encabezado.css"


export default function Encabezado() {
    const dir = "/dashboard/rata.svg"
    const dir2 = "/dashboard/perfil.svg"
  return (
    <div className="bloque">
        <div className="sub_bloque">
            <Image src={dir} alt="" width={50} height={50} />
            <h1>TITULO</h1>
        </div>
        <Barra_buscar/>
        <div className="sub_bloque">
            <h2>Invitado</h2>
            <Image src={dir2} alt="" width={40} height={40}/>
        </div>
    </div>  
  );
}
