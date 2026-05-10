import React from 'react'
import Encabezado from "@/components/main_dashboard/Encabezado";
import Descripcion from "@/components/main_dashboard/Descripcion";
import Categoria from "@/components/main_dashboard/Categoria";

import "./Win_main_dashboard.css"

export default function Win_main_dashboard() {
  return (
    <div className='div_main_dashboard'>
        <Encabezado/>
        <Descripcion/>
        <Categoria/>
        <Categoria/>
        <Categoria/>
        <Categoria/>
    </div>
  )
}
