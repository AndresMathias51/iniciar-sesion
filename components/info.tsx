import "@/components/info.css";

type Props = {
rol:string
password:string
curso:string
}

const InfoSection = ({rol,password,curso}:Props) => {

return(

<div className="info-section">

<div className="info-row">
<span>Rol</span>
<span>{rol}</span>
</div>

<div className="info-row">
<span>Contraseña</span>
<span>{password}</span>
</div>

<div className="info-row">
<span>Curso</span>
<span>{curso}</span>
</div>

</div>

)

}

export default InfoSection;