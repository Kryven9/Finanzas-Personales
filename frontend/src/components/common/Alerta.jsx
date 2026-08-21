const Alerta = ({ tipo = 'error', mensaje }) => {
  if (!mensaje) return null;

  const estilos = {
    error: 'bg-red-50 text-red-700 border-red-200',
    exito: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <div className={`p-3 rounded-lg border text-sm ${estilos[tipo]}`}>
      {mensaje}
    </div>
  );
};

export default Alerta;
