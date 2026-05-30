import styles from "@/components/tarjeta_datos/text.module.css";

type Props = {
nombre:string
}

const ProfileSection = ({nombre}:Props) => {

return(
<div className={styles.profile_section}>
    <div className={styles.avatar}>
        {nombre.charAt(0)}
    </div>
    <h2 className={styles.welcome}>
        ¡Hola, {nombre}!
    </h2>
</div>
)

}

export default ProfileSection;