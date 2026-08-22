import { useState } from 'react';

const Input = ({ label, error, tipo = 'text', ...props }) => {
  const [enfocado, setEnfocado] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      <input
        type={tipo}
        className={`w-full py-2.5 px-3 rounded-lg border bg-white text-black transition-colors outline-none ${
          error
            ? 'border-red-500 focus:border-red-600'
            : enfocado
              ? 'border-black'
              : 'border-neutral-300'
        }`}
        onFocus={() => setEnfocado(true)}
        onBlur={() => setEnfocado(false)}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default Input;
