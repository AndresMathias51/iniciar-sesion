import Image from "next/image"
import "./Preview_section.css"

export default function Preview_section() {
  return (
    <div className="preview_card">
        <h1>CREA UN ESPACIO ACADEMICO GRATIS</h1>
        <Image src="/preview.png" alt="preview image" width={800} height={800}/>
    </div>
  )
}
