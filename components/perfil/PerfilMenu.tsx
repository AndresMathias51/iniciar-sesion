"use client";

import {
    useEffect,
    useState
} from "react";

import PerfilInvitado from "@/components/perfil/PerfilInvitado";

import PerfilUsuario from "@/components/perfil/PerfilUsuario";

type Usuario = {
    nombre:string;
    correo:string;
};

export default function PerfilMenu() {

    const [usuario,setUsuario] =
        useState<Usuario | null>(null);

    async function obtenerSesion(){

        const response = await fetch(
            "/api/auth/me"
        );

        const data = await response.json();

        if(data.success){

            setUsuario(data.usuario);

        }else{

            setUsuario(null);

        }

    }

    useEffect(() => {

        obtenerSesion();

    }, []);

    if(!usuario){

        return (
            <PerfilInvitado/>
        );

    }

    return (
        <PerfilUsuario
            usuario={usuario}
            onLogout={obtenerSesion}
        />
    );
}