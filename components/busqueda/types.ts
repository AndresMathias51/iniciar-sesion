export type Publicacion = {
  id: number;
  autor: string;
  fecha: string;
  titulo: string;
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