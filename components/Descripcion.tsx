import React from 'react'
import Image from 'next/image'
import "./Descripcion.css"

export default function Descripcion() {
    const dir = "/dashboard/rata.svg"
  return (
    <div className='bloque_des'>
        <div className='sujetador_des'/>
        <p>
            Description  description description description 
            description description description description 
            description   Description  description 
            description description description 
            description description description 
            description   Description  description 
            description description description 
            description
        </p>
        <Image src={dir} alt='ico' width={160} height={160}/>
    </div>
  )
}
