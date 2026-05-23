"use client";

import React from "react";
import Image from "next/image";
import Barra_buscar from "./Barra_buscar";
import "./Encabezado.css";

type Props = {
  nombre: string;
};

export default function Encabezado({ nombre }: Props) {
  const dir = "/dashboard/rata.svg";
  const dir2 = "/dashboard/perfil.svg";

  return (
    <div className="bloque">
      <div className="sub_bloque">
        <button className="boton_encabezado">
          <Image className="imagen" src={dir} alt="" width={50} height={50} />
        </button>

        <h1 className="nombre_materia">{nombre}</h1>
      </div>

      <Barra_buscar />

      <div className="sub_bloque">
        <h2>Invitado</h2>

        <button className="boton_encabezado">
          <Image className="imagen" src={dir2} alt="" width={40} height={40} />
        </button>
      </div>
    </div>
  );
}