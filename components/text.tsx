import "@/components/text.css";

type Props = {
nombre:string
}

const ProfileSection = ({nombre}:Props) => {

return(

<div className="profile-section">

<div className="avatar">
{nombre.charAt(0)}
</div>

<h2 className="welcome">
¡Hola, {nombre}!
</h2>

</div>

)

}

export default ProfileSection;