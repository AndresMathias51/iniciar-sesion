import React from "react";
import "./Categoria.css";
import Tema from "./Tema";

type TemaType = {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
};

type Props = {
  id: number;
  nombre: string;
  temas: TemaType[];
};

export default function Categoria({ id, nombre, temas }: Props) {
  return (
    <div className="categoria">
      <div className="bloque_categoria">
        <h2>{nombre}</h2>
      </div>

      <div className="bloque_temas">
        {temas.map((tema) => (
          <Tema
            key={tema.id}
            id={tema.id}
            imagen={tema.imagen}
            nombre={tema.nombre}
            descripcion={tema.descripcion}
          />
        ))}
      </div>
    </div>
  );
}