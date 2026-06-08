export type Publicacion = {
  id: number;
  autor: string;
  id_autor: number;
  fecha: string;
  titulo: string;
  id_tema: number;
  contenido: string;
};

export type Tema = {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
};

export type Categoria = {
  id: number;
  nombre: string;
  temas: Tema[];
};

export type SugerenciaBusqueda = {
  id: string;
  tipo: string;
  texto: string;
  detalle: string;
};