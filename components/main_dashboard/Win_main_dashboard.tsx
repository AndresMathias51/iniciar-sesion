"use client";

import { useMemo, useState } from "react";

import Encabezado from "@/components/main_dashboard/Encabezado";
import Descripcion from "@/components/main_dashboard/Descripcion";
import Categoria from "@/components/main_dashboard/Categoria";
import Barra_lateral from "./Barra_lateral";
import Win_posts_panel from "@/components/posts_panel/Win_posts_panel";
import BarraBusqueda from "@/components/busqueda/BarraBusqueda";
import FrameResultados from "@/components/busqueda/FrameResultados";
import { generarSugerenciasBusqueda } from "@/components/busqueda/busqueda.helpers";

import publicacionesData from "@/components/busqueda/ejemplo.json";

import type {
  Categoria as CategoriaBusqueda,
  Publicacion
} from "@/components/busqueda/types";

import "./Win_main_dashboard.css";

type TemaType = {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
};

type CategoriaType = {
  id: number;
  nombre: string;
  temas: TemaType[];
};

type DashboardData = {
  encabezado: {
    nombre: string;
  };
  descripcion: {
    descripcion: string;
  };
  categorias: CategoriaType[];
};

type Props = {
  data: DashboardData;
};

export default function Win_main_dashboard({ data }: Props) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [busquedaConfirmada, setBusquedaConfirmada] = useState("");

  const publicaciones = publicacionesData as Publicacion[];
  const categorias = data.categorias as CategoriaBusqueda[];

  const sugerencias = useMemo(() => {
    return generarSugerenciasBusqueda({
      textoBusqueda,
      publicaciones,
      categorias,
      limite: 8
    });
  }, [textoBusqueda, publicaciones, categorias]);

  function confirmarBusqueda(valor: string) {
    const valorLimpio = valor.trim();

    if (!valorLimpio) return;

    setBusquedaConfirmada(valorLimpio);
  }

  const hayBusquedaConfirmada = busquedaConfirmada.trim().length > 0;

  return (
    <div className="div_main_dashboard">
      <div className="dashboard_encabezado">
        <Encabezado
          nombre={data.encabezado.nombre}
          barraBusqueda={
            <BarraBusqueda
              valor={textoBusqueda}
              sugerencias={sugerencias}
              placeholder="Buscar publicaciones, autores, temas o categorías..."
              onChange={(valor) => {
                setTextoBusqueda(valor);

                if (valor.trim() === "") {
                  setBusquedaConfirmada("");
                }
              }}
              onBuscar={confirmarBusqueda}
            />
          }
        />
      </div>

      <div className="contenido_central">
        <div className="contenido_categorias">
          {hayBusquedaConfirmada ? (
            <FrameResultados
              busqueda={busquedaConfirmada}
              publicaciones={publicaciones}
              categorias={categorias}
            />
          ) : (
            <>
              <Descripcion descripcion={data.descripcion.descripcion} />

              {data.categorias.map((categoria) => (
                <Categoria
                  key={categoria.id}
                  id={categoria.id}
                  nombre={categoria.nombre}
                  temas={categoria.temas}
                />
              ))}
            </>
          )}
        </div>
        <Barra_lateral />
      </div>
    </div>
  );
}