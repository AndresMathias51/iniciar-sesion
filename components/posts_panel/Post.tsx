import Image from 'next/image'
import "./Post.css"

export default function Post() {
  return (
    <div className="post_card">
        <div className='encabezado_post'>
            <div className='encabezado_iz'>
                <Image src="/dashboard/perfil.svg" alt="perfil ico" width={20} height={20}/>
                <h4>NOMBRE USUARIO</h4>
            </div>
            <div className='encabezo_der'>
                <span>01-01-2026</span>
            </div>
        </div>
        <div className='contenido_post'>
            <p>Contenido del post contenido del post contenido del post contenido del post
                contenido del post contenido del post contenido del post contenido del post
            </p>
        </div>


    </div>
  )
}
