import React from 'react'
import Image from 'next/image'
import "./Tema.css"

type Props = {
  text: string;
  onClick: () => void;
};

export default function Tema() {
    const dir = '/dashboard/rata.svg'
  return (
    <button 
        className='boton'
    >   
        <div className='tema_line'>

            <div className='bloque_iz'>
                <Image className='tema_ico' src={dir} alt='ico_tema' width={20} height={20}/>
                <h3>TITULO</h3>
            </div>
            <p>Description  description description description description description description description description </p>
        </div>
    </button>
  )
}
