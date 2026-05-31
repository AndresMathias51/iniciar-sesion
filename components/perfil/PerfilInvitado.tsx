"use client";

import Link from "next/link";

import styles from "./PerfilMenu.module.css";

export default function PerfilInvitado() {

    return (
        <div className={styles.card}>

            <Link
                href="/login"
                className={styles.boton}
            >
                Iniciar Sesión
            </Link>

            <Link
                href="/register"
                className={styles.boton}
            >
                Registrarse
            </Link>

        </div>
    );
}