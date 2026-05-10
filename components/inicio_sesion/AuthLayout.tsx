import "@/components/inicio_sesion/AuthLayout.css"

type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: Props) => {
  return (
    <main className="authPage">
      <div className="authContainer">
        <h1 className="tituloAuth">{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;