import React from 'react'
import "./Categoria.css"
import Tema from './Tema'

export default function Categoria() {
  return (
    <div className='categoria'>
        <div className='bloque_categoria'>
            <h2>CATEGORIA 1</h2>
        </div>
        <div className='bloque_temas'>
            <Tema/>
            <Tema/>
            <Tema/>
            <Tema/>
            <Tema/>
            <Tema/>
            <Tema/>
            <Tema/>
        </div>
    </div>
  )
}
