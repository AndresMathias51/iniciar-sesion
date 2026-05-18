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
                <div className='tema_ico'>
                  <Image  src={dir} alt='ico_tema' width={35} height={35}/>
                </div>
                <h3>TITULO</h3>
            </div>
            <p>Description description description description description </p>
        </div>
    </button>
  )
}
