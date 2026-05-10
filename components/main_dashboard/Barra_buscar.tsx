import React from 'react'
import Image from 'next/image'
import "./Barra_buscar.css"


export default function Barra_buscar () {
    const dir = "/dashboard/search.svg"
  return (
    <div className='b_bloque'>
        <h2>Buscar</h2>
        <div className='boton_search'>
            <Image src={dir} alt='lupa' width={24} height={24}/>
        </div>
    </div>
  )
}
