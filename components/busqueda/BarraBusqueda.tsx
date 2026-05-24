"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./BarraBusqueda.module.css";
import type { SugerenciaBusqueda } from "./types";

type BarraBusquedaProps = {
  valor: string;
  sugerencias?: SugerenciaBusqueda[];
  placeholder?: string;
  onChange: (valor: string) => void;
  onBuscar: (valor: string) => void;
};

export default function BarraBusqueda({
  valor,
  sugerencias = [],
  placeholder = "Buscar...",
  onChange,
  onBuscar
}: BarraBusquedaProps) {
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  function ejecutarBusqueda(valorBusqueda: string) {
    const valorLimpio = valorBusqueda.trim();

    if (!valorLimpio) return;

    onBuscar(valorLimpio);
    setMostrarSugerencias(false);
  }

  function limpiarBusqueda() {
    onChange("");
    setMostrarSugerencias(false);
  }

  function manejarEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      ejecutarBusqueda(valor);
    }
  }

  function seleccionarSugerencia(texto: string) {
    onChange(texto);
    ejecutarBusqueda(texto);
  }

  return (
    <div className={styles.contenedorBusqueda}>
      <div className={styles.bloqueBusqueda}>
        <input
          className={styles.inputBusqueda}
          type="text"
          value={valor}
          placeholder={placeholder}
          onChange={(event) => {
            onChange(event.target.value);
            setMostrarSugerencias(true);
          }}
          onFocus={() => setMostrarSugerencias(true)}
          onKeyDown={manejarEnter}
        />

        {valor.trim() !== "" && (
          <button
            type="button"
            className={styles.botonLimpiar}
            onClick={limpiarBusqueda}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}

        <button
          type="button"
          className={styles.botonBuscar}
          onClick={() => ejecutarBusqueda(valor)}
          aria-label="Buscar"
        >
          <Image
            src="/dashboard/search.svg"
            alt="Buscar"
            width={24}
            height={24}
            className={styles.iconoBuscar}
          />
        </button>
      </div>

      {mostrarSugerencias && sugerencias.length > 0 && (
        <div className={styles.sugerencias}>
          {sugerencias.map((sugerencia) => (
            <button
              key={sugerencia.id}
              type="button"
              className={styles.itemSugerencia}
              onMouseDown={() => seleccionarSugerencia(sugerencia.texto)}
            >
              <span className={styles.tipoSugerencia}>
                {sugerencia.tipo}
              </span>

              <div className={styles.infoSugerencia}>
                <strong>{sugerencia.texto}</strong>
                <p>{sugerencia.detalle}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}