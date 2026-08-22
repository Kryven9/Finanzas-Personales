import { useState } from 'react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';
import { esquemaCrearTransaccion, esquemaActualizarTransaccion } from '../../validations/transaction.validation';

const tiposTransaccion = [
  { valor: 'INGRESO', etiqueta: 'Ingreso' },
  { valor: 'GASTO', etiqueta: 'Gasto' },
];

const frecuencias = [
  { valor: 'SEMANAL', etiqueta: 'Semanal' },
  { valor: 'MENSUAL', etiqueta: 'Mensual' },
  { valor: 'ANUAL', etiqueta: 'Anual' },
];

const FormularioTransaccion = ({ transaccion, cuentas, categorias, onSubmit, cargando, error }) => {
  const esEdicion = !!transaccion;
  const esquema = esEdicion ? esquemaActualizarTransaccion : esquemaCrearTransaccion;

  const [formulario, setFormulario] = useState({
    idCuenta: transaccion?.idCuenta || '',
    idCategoria: transaccion?.idCategoria || '',
    tipo: transaccion?.tipo || '',
    monto: transaccion?.monto ?? '',
    descripcion: transaccion?.descripcion || '',
    fecha: transaccion?.fecha ? transaccion.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
    esRecurrente: transaccion?.esRecurrente || false,
    frecuenciaRecurrencia: transaccion?.frecuenciaRecurrencia || '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      ...formulario,
      monto: Number(formulario.monto),
      fecha: new Date(formulario.fecha + 'T00:00:00'),
    };
    Object.keys(datos).forEach((clave) => {
      if (datos[clave] === '') delete datos[clave];
    });
    if (!datos.esRecurrente) delete datos.frecuenciaRecurrencia;

    const resultado = esquema.safeParse(datos);

    if (!resultado.success) {
      const erroresValidacion = {};
      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0];
        erroresValidacion[campo] = issue.message;
      });
      setErrores(erroresValidacion);
      return;
    }

    setErrores({});
    onSubmit(resultado.data);
  };

  const opcionesCuenta = cuentas.map((c) => ({ valor: c.id, etiqueta: c.nombre }));
  const opcionesCategoria = categorias.map((c) => ({ valor: c.id, etiqueta: c.nombre }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Alerta mensaje={error} />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Tipo"
          name="tipo"
          opciones={tiposTransaccion}
          valor={formulario.tipo}
          onChange={handleChange}
          error={errores.tipo}
        />
        <Input
          label="Monto"
          name="monto"
          tipo="number"
          value={formulario.monto}
          onChange={handleChange}
          error={errores.monto}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Cuenta"
          name="idCuenta"
          opciones={opcionesCuenta}
          valor={formulario.idCuenta}
          onChange={handleChange}
          error={errores.idCuenta}
          placeholder="Seleccionar..."
        />
        <Select
          label="Categoría"
          name="idCategoria"
          opciones={opcionesCategoria}
          valor={formulario.idCategoria}
          onChange={handleChange}
          error={errores.idCategoria}
          placeholder="Seleccionar..."
        />
      </div>

      <Input
        label="Fecha"
        name="fecha"
        tipo="date"
        value={formulario.fecha}
        onChange={handleChange}
        error={errores.fecha}
      />

      <Input
        label="Descripción (opcional)"
        name="descripcion"
        value={formulario.descripcion}
        onChange={handleChange}
        placeholder="Ej: Almuerzo con amigos"
      />

      <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
        <input
          type="checkbox"
          name="esRecurrente"
          checked={formulario.esRecurrente}
          onChange={handleChange}
          className="w-4 h-4 rounded border-neutral-300"
        />
        Recurrente
      </label>

      {formulario.esRecurrente && (
        <Select
          label="Frecuencia"
          name="frecuenciaRecurrencia"
          opciones={frecuencias}
          valor={formulario.frecuenciaRecurrencia}
          onChange={handleChange}
          error={errores.frecuenciaRecurrencia}
        />
      )}

      <Button tipo="primario" cargando={cargando}>
        {esEdicion ? 'Guardar Cambios' : 'Crear Transacción'}
      </Button>
    </form>
  );
};

export default FormularioTransaccion;
