import React from "react";
import Image from "next/image";
import "./Tema.css";

type Props = {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;

  onSeleccionarTema: (id:number) => void;
};

export default function Tema({
  id,
  imagen,
  nombre,
  descripcion,
  onSeleccionarTema
}: Props) {

  return (
    <button
      className="boton"
      onClick={() => onSeleccionarTema(id)}
    >
      <div className="tema_line">

        <div className="bloque_iz">

          <div className="bloque_ico">
            <Image
              className="ico_tema"
              src={imagen}
              alt={nombre}
              width={30}
              height={30}
            />
          </div>

          <h3>{nombre}</h3>

        </div>

        <div className="bloque_der">
          <p className="descripcion_tema">
            {descripcion}
          </p>
        </div>

      </div>
    </button>
  );
}