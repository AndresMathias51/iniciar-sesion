export type UsuariosRegistrados = {
  titulo: string;
  cantidad: number;
  descripcion: string;
};

export type EstudianteInscrito = {
  id: number;
  nombre: string;
  email: string;
};

export type PublicacionSemana = {
  categoria: string;
  cantidad: number;
};

export type TemaPorCategoria = {
  id: number;
  categoria: string;
  cantidadTemas: number;
};

export type EstadisticasData = {
  usuariosRegistrados: UsuariosRegistrados;
  estudiantesInscritos: EstudianteInscrito[];
  publicacionesPorcategoria: PublicacionSemana[];
  temasPorCategoria: TemaPorCategoria[];
};

// moderacion
export type UsuarioEliminar = {
  id: number;
  nombre: string;
  email: string;
};

export type TemaCategoriaDetalle = {
  id: number;
  idCategoria: number;
  titulo: string;
  descripcion: string;
};
