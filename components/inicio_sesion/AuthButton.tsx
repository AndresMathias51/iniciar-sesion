import styles from "@/components/inicio_sesion/AuthButton.module.css"

type Props = {
  text: string;
  onClick: () => void;
};

const AuthButton = ({ text, onClick}: Props) => {
  return (
    <button className={styles.authButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthButton;