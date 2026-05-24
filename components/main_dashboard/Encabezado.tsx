"use client"

import React, {
    useEffect,
    useRef,
    useState
} from "react";
import PerfilMenu from "@/components/perfil/PerfilMenu"
import Image from "next/image";
import "./Encabezado.css";

type Usuario = {
    nombre:string;
    correo:string;
};
type Props = {
    nombre: string;
    barraBusqueda?: React.ReactNode;
};

export default function Encabezado({ nombre, barraBusqueda }: Props) {
    const dir = "/dashboard/rata.svg";
    const dir2 = "/dashboard/perfil.svg";
    const [usuario,setUsuario] = useState<Usuario | null>(null);
    const [mostrarMenu,setMostrarMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    // =========================
    // OBTENER SESIÓN
    // =========================
    async function obtenerSesion(){

        try {

            const response = await fetch(
                "/api/auth/me"
            );

            const data = await response.json();

            if(data.success){

                setUsuario(data.usuario);

            }else{

                setUsuario(null);

            }

        } catch(error){

            console.log(error);

            setUsuario(null);

        }

    }

    // =========================
    // CARGAR SESIÓN
    // =========================
    useEffect(() => {

        obtenerSesion();

    }, []);

    // =========================
    // CERRAR MENÚ AL HACER CLICK FUERA
    // =========================
    useEffect(() => {

        function handleClickOutside(
            event: MouseEvent
        ){

            if(
                menuRef.current &&
                !menuRef.current.contains(
                    event.target as Node
                )
            ){

                setMostrarMenu(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    return (
        <div className="bloque">

            <div className="sub_bloque">

                <button className="boton_encabezado">

                    <Image
                        className="imagen"
                        src={dir}
                        alt=""
                        width={50}
                        height={50}
                    />

                </button>

                <h1 className="nombre_materia">
                    {nombre}
                </h1>

            </div>

            {barraBusqueda}

            <div
                className="sub_bloque"
                ref={menuRef}
            >
                <h2>
                    {
                        usuario
                        ? usuario.nombre
                        : "Invitado"
                    }
                </h2>
                <button
                    className="boton_encabezado"
                    onClick={() =>
                        setMostrarMenu(
                            !mostrarMenu
                        )
                    }
                >
                    <Image
                        className="imagen"
                        src={dir2}
                        alt=""
                        width={40}
                        height={40}
                    />
                </button>
                {
                    mostrarMenu && (
                        <div className="menu_perfil">
                            <PerfilMenu/>
                        </div>
                    )
                }

            </div>

        </div>
    );
}