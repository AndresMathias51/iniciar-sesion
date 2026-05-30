import styles from "@/components/inicio_sesion/AuthLayout.module.css"

type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: Props) => {
  return (
    <main className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1 className={styles.tituloAuth}>{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;