const Button = ({ children, tipo = 'primario', disabled = false, cargando = false, ...props }) => {
  const estilos = {
    primario: 'bg-black text-white hover:bg-neutral-800',
    secundario: 'bg-neutral-200 text-black hover:bg-neutral-300',
    peligro: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${estilos[tipo]}`}
      disabled={disabled || cargando}
      {...props}
    >
      {cargando ? 'Cargando...' : children}
    </button>
  );
};

export default Button;
