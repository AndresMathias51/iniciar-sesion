"use client"
import { useState } from "react"
import { useEffect } from "react"
import styles from "./Win_posts_panel.module.css"
import Post from './Post'
import Descripcion from "@/components/main_dashboard/Descripcion";
import ModalEliminar from "./ModalEliminar"
type Props= {
    descripcion: string
}
export default function Win_posts_panel({descripcion}:Props) {
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
            <div className={styles.contenido_central}>
                <div className={styles.contenido_posts}>
                    <Descripcion descripcion={descripcion}/>
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
            </div>
            <ModalEliminar
                visible={mostrarModal}
                onClose={cerrarModal}
                onConfirmar={confirmarEliminar}
            />
        </div>
    )
}