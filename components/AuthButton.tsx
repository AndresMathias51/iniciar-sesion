import "@/components/AuthButton.css"

type Props = {
  text: string;
  onClick: () => void;
};

const AuthButton = ({ text, onClick}: Props) => {
  return (
    <button className="authButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthButton;