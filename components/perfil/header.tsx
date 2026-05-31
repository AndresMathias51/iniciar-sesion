import styles from "@/components/tarjeta_datos/header.module.css";

type Props = {
email:string
}

const AccountHeader = ({email}:Props) => {

return(

<div className={styles.account_header}>

<span className={styles.account_email}>{email}</span>

<button className={styles.close_btn}>✕</button>

</div>

)

}

export default AccountHeader;