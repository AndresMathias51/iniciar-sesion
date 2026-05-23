import Encabezado from "@/components/main_dashboard/Encabezado";
import Descripcion from "@/components/main_dashboard/Descripcion";
import Categoria from "@/components/main_dashboard/Categoria";
import Barra_lateral from "./Barra_lateral";

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
  return (
    <div className="div_main_dashboard">
      <div className="dashboard_encabezado">
        <Encabezado nombre={data.encabezado.nombre} />
      </div>

      <div className="contenido_central">
        <div className="contenido_categorias">
          <Descripcion descripcion={data.descripcion.descripcion} />

          {data.categorias.map((categoria) => (
            <Categoria
              key={categoria.id}
              id={categoria.id}
              nombre={categoria.nombre}
              temas={categoria.temas}
            />
          ))}
        </div>

        <Barra_lateral />
      </div>
    </div>
  );
}