import "@/components/tarjeta.css";
import AccountHeader from "@/components/header";
import ProfileSection from "@/components/text";
import InfoSection from "@/components/info";
import ButtonsSection from "@/components/button";

type Props = {
nombre: string;
email: string;
rol: string;
password: string;
curso: string;
};

const AccountCard = ({nombre,email,rol,password,curso}:Props) => {

return (

<div className="account-card">

<AccountHeader email={email}/>

<ProfileSection nombre={nombre}/>

<InfoSection rol={rol} password={password} curso={curso}/>

<ButtonsSection/>

</div>

)

}

export default AccountCard;