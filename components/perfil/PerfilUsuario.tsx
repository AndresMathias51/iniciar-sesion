"use client";

import { useRouter } from "next/navigation";

import styles from "./PerfilMenu.module.css";

type Props = {
    usuario:{
        nombre:string;
        correo:string;
    };

    onLogout: () => void;
};

export default function PerfilUsuario({
    usuario,
    onLogout
}:Props){

    const router = useRouter();

    // =========================
    // CERRAR SESIÓN
    // =========================
    async function cerrarSesion(){
        await fetch(
            "/api/auth/logout",
            {
                method:"POST"
            }
        );
        onLogout();
        router.refresh();
        router.push("/login");
    }

    // =========================
    // ACTUALIZAR PASSWORD
    // =========================
    function actualizarPassword(){

        router.push("/password");

    }

    // =========================
    // ELIMINAR CUENTA
    // =========================
    function eliminarCuenta(){
        router.push("/eliminar-cuenta");
    }

    return (
        <div className={styles.card}>

            <div className={styles.info}>

                <h3>{usuario.nombre}</h3>

                <p>{usuario.correo}</p>

            </div>

            <button
                className={styles.boton}
                onClick={actualizarPassword}
            >
                Actualizar Contraseña
            </button>

            <button
                className={styles.botonEliminar}
                onClick={eliminarCuenta}
            >
                Eliminar Cuenta
            </button>

            <button
                className={styles.botonCerrar}
                onClick={cerrarSesion}
            >
                Cerrar Sesión
            </button>

        </div>
    );
}