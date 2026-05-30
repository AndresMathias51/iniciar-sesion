import styles from "@/components/tarjeta_datos/tarjeta.module.css";
import AccountHeader from "@/components/perfil/header";
import ProfileSection from "@/components/perfil/text";
import InfoSection from "@/components/perfil/info";
import ButtonsSection from "@/components/perfil/button";

type Props = {
nombre: string;
email: string;
rol: string;
password: string;
curso: string;
};

const AccountCard = ({nombre,email,rol,password,curso}:Props) => {

return (

<div className={styles.account_card}>
    <AccountHeader email={email}/>
    <ProfileSection nombre={nombre}/>
    <InfoSection rol={rol} password={password} curso={curso}/>
    <ButtonsSection/>
</div>

)

}

export default AccountCard;