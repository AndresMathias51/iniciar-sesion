import Encabezado_general_panel from "./Encabezado_general_panel"
import Preview_section from "./Preview_section"
import "./Win_general_panel.css"

export default function Win_general_panel() {
  return (
    <div>
        <div className="encabezado_general_panel">
            <Encabezado_general_panel/>
        </div>
        <div className="content_section">
            <Preview_section/>
        </div>
    </div>
  )
}
