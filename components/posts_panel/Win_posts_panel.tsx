"use client"
import { useState } from "react"
import { useEffect } from "react"
import { useMemo } from "react"
import styles from "./Win_posts_panel.module.css"
import Barra_lateral from '@/components/main_dashboard/Barra_lateral'
import BarraBusqueda from "@/components/busqueda/BarraBusqueda";
import FrameResultados from "@/components/busqueda/FrameResultados";
import { generarSugerenciasBusqueda } from "@/components/busqueda/busqueda.helpers";
import publicacionesData from "@/components/busqueda/ejemplo.json";
import Encabezado from '@/components/main_dashboard/Encabezado'
import Categoria from "@/components/main_dashboard/Categoria";
import Post from './Post'
import Descripcion from "@/components/main_dashboard/Descripcion";
import ModalEliminar from "./ModalEliminar"

import type {
  Categoria as CategoriaBusqueda,
  Publicacion
} from "@/components/busqueda/types";

type TemaType = {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
};

type CategoriaType = {
  id: number;
  nombre: string;
  temas: TemaType[];
};

type DashboardData = {
  encabezado: {
    nombre: string;
  };
  descripcion: {
    descripcion: string;
  };
  categorias: CategoriaType[];
};
type Props = {
  data: DashboardData;
};
export default function Win_posts_panel({ data }: Props) {
    //barrabuscar
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [busquedaConfirmada, setBusquedaConfirmada] = useState("");
    const publicaciones = publicacionesData as Publicacion[];
    const categorias = data.categorias as CategoriaBusqueda[];
    const sugerencias = useMemo(() => {
        return generarSugerenciasBusqueda({
          textoBusqueda,
          publicaciones,
          categorias,
          limite: 8
        });
      }, [textoBusqueda, publicaciones, categorias]);
    
      function confirmarBusqueda(valor: string) {
        const valorLimpio = valor.trim();
    
        if (!valorLimpio) return;
    
        setBusquedaConfirmada(valorLimpio);
      }
    
      const hayBusquedaConfirmada = busquedaConfirmada.trim().length > 0;
    //mostar posts
    const [posts, setPosts] = useState<post[]>([]);
    const [ascendente, setAscendente] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [idEliminar, setIdEliminar] = useState<number | null>(null);

    const abrirModalEliminar = (id:number) => {
        setMostrarModal(true);
        setIdEliminar(id);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setIdEliminar(null);
    };

    const confirmarEliminar = () => {
        const nuevosPosts = posts.filter(
            post => post.id !== idEliminar
        );
        setPosts(nuevosPosts);
        cerrarModal();
    };

    useEffect(() => {
        const obtenerPosts = async () => {
            const response = await fetch("/api/posts");
            const data = await response.json();
            setPosts(data);
        };
        obtenerPosts();
    }, []);
    
    const ordenarPorFecha = () => {
        const postsOrdenados = [...posts].sort((a, b) => {
            const [diaA, mesA, anioA] = a.fecha.split("-");
            const [diaB, mesB, anioB] = b.fecha.split("-");
            const fechaA = new Date(`${anioA}-${mesA}-${diaA}`);
            const fechaB = new Date(`${anioB}-${mesB}-${diaB}`);
            return ascendente
                ? fechaA.getTime() - fechaB.getTime()
                : fechaB.getTime() - fechaA.getTime();
        });
        setPosts(postsOrdenados);
        setAscendente(!ascendente);
    };

    return (
        <div>
            <div className={styles.dashboard_encabezado}>
                <Encabezado nombre={data.encabezado.nombre}
                    // barraBusqueda={
                    //         <BarraBusqueda
                    //           valor={textoBusqueda}
                    //           sugerencias={sugerencias}
                    //           placeholder="Buscar publicaciones, autores, temas o categorías..."
                    //           onChange={(valor) => {
                    //             setTextoBusqueda(valor);
                
                    //             if (valor.trim() === "") {
                    //               setBusquedaConfirmada("");
                    //             }
                    //           }}
                    //           onBuscar={confirmarBusqueda}
                    //         />
                    //       }
                />
            </div>
            <div className={styles.contenido_central}>
                <div className={styles.contenido_posts}>
                    <Descripcion descripcion={data.descripcion.descripcion}/>
                    <button
                        className={styles.btn_ordenar}
                        onClick={ordenarPorFecha}
                    >
                        Ordenar por fecha {ascendente ? "↑" : "↓"}
                    </button>
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onEliminar={abrirModalEliminar}
                        />
                    ))}
                </div>
                <Barra_lateral/>
            </div>
            <ModalEliminar
                visible={mostrarModal}
                onClose={cerrarModal}
                onConfirmar={confirmarEliminar}
            />
        </div>
    )
}