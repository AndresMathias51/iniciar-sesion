import React from "react";
import Image from "next/image";
import "./Descripcion.css";

type Props = {
  descripcion: string;
};

export default function Descripcion({ descripcion }: Props) {

  return (
    <div className="bloque_des">
      <div className="sujetador_des" />

      <p>{descripcion}</p>

    </div>
  );
}