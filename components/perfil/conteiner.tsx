import styles from "@/components/tarjeta_datos/conteiner.module.css";
import AccountCard from "@/components/perfil/conteiner";

type Props = {
  nombre: string;
  email: string;
  rol: string;
  password: string;
  curso: string;
};

const AccountContainer = (props: Props) => {
  return (
    <div className={styles.account_container}>
      <AccountCard {...props}/>
    </div>
  );
};

export default AccountContainer;