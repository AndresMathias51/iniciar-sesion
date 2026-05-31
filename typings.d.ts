type contenidoPost = {
    tipo: string,
    valor: string
}

type post = {
    id:number;
    autor:string;
    fecha:string;
    titulo:string;
    contenido:string;
};

type Props = {
    post: post
}