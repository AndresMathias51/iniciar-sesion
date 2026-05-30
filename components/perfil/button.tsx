import styles from "@/components/tarjeta_datos/button.module.css";

const ButtonsSection = () => {

return(

<div className={styles.buttons_section}>


<button className={styles.btn_secondary}>
Actualizar contraseña
</button>

<button className={styles.btn_danger}>
Eliminar cuenta
</button>

<button className={styles.btn_primary}>
Cerrar sesión
</button>

</div>

)

}

export default ButtonsSection;