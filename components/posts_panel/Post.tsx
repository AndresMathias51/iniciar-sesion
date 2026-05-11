import Image from 'next/image'
import "./Post.css"

export default function Post() {
  return (
    <div className="post_card">
        <div className='encabezado_post'>
            <Image src="/dashboard/perfil.svg" alt="perfil ico" width={20} height={20}/>
            <h4>NOMBRE USUARIO</h4>
        </div>
        <div className='contenido_post'>
            <p>CONTENIDO</p>
        </div>
        <div className='pie_post'>
            <div className='detalle_1'></div>
            <div className='detalle_2'>FECHA</div>
        </div>

    </div>
  )
}
