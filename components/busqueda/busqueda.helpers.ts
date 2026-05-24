import type {
  Categoria,
  Publicacion,
  SugerenciaBusqueda
} from "./types";

type GenerarSugerenciasParams = {
  textoBusqueda: string;
  publicaciones?: Publicacion[];
  categorias?: Categoria[];
  limite?: number;
};

export function generarSugerenciasBusqueda({
  textoBusqueda,
  publicaciones = [],
  categorias = [],
  limite = 8
}: GenerarSugerenciasParams): SugerenciaBusqueda[] {
  const texto = textoBusqueda.trim().toLowerCase();

  if (!texto) return [];

  const sugerenciasPublicaciones = publicaciones
    .filter(
      (publicacion) =>
        publicacion.titulo.toLowerCase().includes(texto) ||
        publicacion.autor.toLowerCase().includes(texto)
    )
    .map((publicacion) => ({
      id: `publicacion-${publicacion.id}`,
      tipo: "Publicación",
      texto: publicacion.titulo,
      detalle: `Autor: ${publicacion.autor}`
    }));

  const sugerenciasTemas = categorias
    .flatMap((categoria) =>
      categoria.temas.map((tema) => ({
        ...tema,
        categoriaId: categoria.id,
        categoriaNombre: categoria.nombre
      }))
    )
    .filter(
      (tema) =>
        tema.nombre.toLowerCase().includes(texto) ||
        tema.descripcion.toLowerCase().includes(texto) ||
        tema.categoriaNombre.toLowerCase().includes(texto)
    )
    .map((tema) => ({
      id: `tema-${tema.id}`,
      tipo: "Tema",
      texto: tema.nombre,
      detalle: `Categoría: ${tema.categoriaNombre}`
    }));

  const sugerenciasCategorias = categorias
    .filter((categoria) => categoria.nombre.toLowerCase().includes(texto))
    .map((categoria) => ({
      id: `categoria-${categoria.id}`,
      tipo: "Categoría",
      texto: categoria.nombre,
      detalle: "Categoría de la materia"
    }));

  return [
    ...sugerenciasPublicaciones,
    ...sugerenciasTemas,
    ...sugerenciasCategorias
  ].slice(0, limite);
}