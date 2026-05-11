import "./Win_posts_panel.css"
import Barra_lateral from '@/components/main_dashboard/Barra_lateral'
import Encabezado from '@/components/main_dashboard/Encabezado'
import Descripcion_post from './Descripcion_post'
import Post from './Post'

export default function Win_posts_panel() {
  return (
    <div>
      <div className="dashboard_encabezado">
        <Encabezado/>
      </div>
      <div className='contenido_central'>
        <div className="contenido_posts">
          <Descripcion_post/> 
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
        <Barra_lateral/>
      </div>
    </div>
  )
}
