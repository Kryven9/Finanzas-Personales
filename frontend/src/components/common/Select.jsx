import { useState } from 'react';

const Select = ({
  label,
  error,
  opciones,
  valor,
  onChange,
  placeholder = 'Seleccionar...',
  ...props
}) => {
  const [enfocado, setEnfocado] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      <select
        value={valor}
        onChange={onChange}
        onFocus={() => setEnfocado(true)}
        onBlur={() => setEnfocado(false)}
        className={`w-full py-2.5 px-3 rounded-lg border bg-white text-black transition-colors outline-none appearance-none cursor-pointer ${
          error
            ? 'border-red-500 focus:border-red-600'
            : enfocado
              ? 'border-black'
              : 'border-neutral-300'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default Select;
