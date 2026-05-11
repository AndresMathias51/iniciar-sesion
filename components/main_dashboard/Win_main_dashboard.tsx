import Encabezado from "@/components/main_dashboard/Encabezado";
import Descripcion from "@/components/main_dashboard/Descripcion";
import Categoria from "@/components/main_dashboard/Categoria";
import Barra_lateral from "./Barra_lateral";


import "./Win_main_dashboard.css"

export default function Win_main_dashboard() {
  return (
    <div className='div_main_dashboard'>
        <div className="dashboard_encabezado">
          <Encabezado/>
        </div>
        <div className='contenido_central'>
          <div className="contenido_categorias">
            <Descripcion/>
            <Categoria/>
            <Categoria/>
            <Categoria/>
            <Categoria/>
          </div>
          <Barra_lateral/>
        </div>
    </div>
  )
}
