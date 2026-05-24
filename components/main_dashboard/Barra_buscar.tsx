import React from 'react'
import Image from 'next/image'
import "./Barra_buscar.css"
import BarraBusqueda from '@/components/busqueda/BarraBusqueda';

export default function Barra_buscar () {
    const dir = "/dashboard/search.svg"
  return (
    <div className='b_bloque'>
      {/* 
        <input className='input_search' type="text" placeholder="Buscar..." />
        <button className='boton_search'>
            <Image src={dir} alt='lupa' width={24} height={24}/>
        </button>
          */}
    </div>
  )
}
