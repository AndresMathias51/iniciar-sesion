const RoleSelect = () => {
  return (
    <div className="inputGroup">
      <label>Rol</label>

      <select>
        <option>Docente</option>
        <option>Estudiante</option>
        <option>Invitado</option>
      </select>
    </div>
  );
};

export default RoleSelect;