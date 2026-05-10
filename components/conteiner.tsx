import "@/components/conteiner.css";
import AccountCard from "@/components/conteiner";

type Props = {
  nombre: string;
  email: string;
  rol: string;
  password: string;
  curso: string;
};

const AccountContainer = (props: Props) => {
  return (
    <div className="account-container">
      <AccountCard {...props}/>
    </div>
  );
};

export default AccountContainer;