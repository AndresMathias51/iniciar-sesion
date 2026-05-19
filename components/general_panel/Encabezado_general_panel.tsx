import Image from "next/image"
import "./Encabezado_general_panel.css"

export default function Encabezado_general_panel() {
    const dir = "/dashboard/rata.svg"
    const dir2 = "/dashboard/perfil.svg"
  return (
    <div className="bloque">
        <div className="sub_bloque">
            <Image src={dir} alt="" width={50} height={50} />
            <h1>TITULO</h1>
        </div>
        <div className="sub_bloque">
            <button className="boton">
            <Image src={dir2} alt="" width={40} height={40}/>
            </button>
        </div>
    </div>  
  )
}
