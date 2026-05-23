"use client";

import styles from "@/components/inicio_sesion/ForoForm.module.css"
import AuthLayout from "./AuthLayout";

type Props = {
  titulo: string,
  setTitulo: (value:string)=>void,
  descripcion: string,
  setDescripcion: (value:string)=>void
};
const ForoForm = ({
  titulo,
  setTitulo,
  descripcion,
  setDescripcion
}: Props) => {
  return (
    <AuthLayout title={`Información Del Foro`}>
      <div className={styles.inputGroup}>
        <label>
          Título de tu foro
        </label>
        <input
          type="text"
          placeholder="Título de tu foro"
          value={titulo}
          onChange={(e)=>setTitulo(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>
          Descripción
        </label>
        <textarea
          placeholder="Describe el tema de tu foro"
          value={descripcion}
          onChange={(e)=>setDescripcion(e.target.value)}
          className={styles.inputDescriptionGroup}
        />
      </div>
    </AuthLayout>
  );
};

export default ForoForm;