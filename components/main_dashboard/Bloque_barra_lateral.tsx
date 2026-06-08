import "./Bloque_barra_lateral.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  titulo:string;
  contenido:string;
};

export default function Bloque_barra_lateral({
  titulo,
  contenido
}:Props) {

  return (
    <div className="bloque_barra_lateral">
      <div className="encabezado_bloque_lateral">
        <p>{titulo}</p>
      </div>

      <div className="contenido_bloque_lateral">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contenido}
        </ReactMarkdown>
      </div>
    </div>
  );

}