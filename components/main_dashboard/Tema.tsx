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
                <div className='bloque_ico'>
                  <Image className='ico_tema' src={dir} alt='ico_tema' width={35} height={35}/>
                </div>
                <h3>TITULO</h3>
            </div>
            <div className='bloque_der'>
              <p>Description description description description description </p>
            </div>
        </div>
    </button>
  )
}
