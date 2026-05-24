type contenidoPost = {
    tipo: string,
    valor: string
}

type post = {
    id:number;
    autor:string;
    correo:string;
    fecha:string;
    titulo:string;
    id_tema:number;
    contenido:string;
};

type Props = {
    post: post
}
