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
  semana: string;
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
  publicacionesPorSemana: PublicacionSemana[];
  temasPorCategoria: TemaPorCategoria[];
};