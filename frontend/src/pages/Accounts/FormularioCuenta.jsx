import { useState } from 'react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';
import { esquemaCrearCuenta, esquemaActualizarCuenta } from '../../validations/account.validation';

const tiposCuenta = [
  { valor: 'EFECTIVO', etiqueta: 'Efectivo' },
  { valor: 'BANCO', etiqueta: 'Banco' },
  { valor: 'TARJETA_CREDITO', etiqueta: 'Tarjeta de Crédito' },
  { valor: 'OTRO', etiqueta: 'Otro' },
];

const FormularioCuenta = ({ cuenta, onSubmit, cargando, error }) => {
  const esEdicion = !!cuenta;
  const esquema = esEdicion ? esquemaActualizarCuenta : esquemaCrearCuenta;

  const [formulario, setFormulario] = useState({
    nombre: cuenta?.nombre || '',
    tipo: cuenta?.tipo || '',
    saldoInicial: cuenta?.saldoInicial ?? '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    // limpiar error del campo al modificar
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      nombre: formulario.nombre,
      tipo: formulario.tipo,
      ...(esEdicion ? {} : { saldoInicial: Number(formulario.saldoInicial) || 0 }),
    };

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Alerta mensaje={error} />
      <Input
        label="Nombre"
        name="nombre"
        value={formulario.nombre}
        onChange={handleChange}
        error={errores.nombre}
        placeholder="Ej: Cuenta de ahorros"
      />
      <Select
        label="Tipo"
        name="tipo"
        opciones={tiposCuenta}
        valor={formulario.tipo}
        onChange={handleChange}
        error={errores.tipo}
      />
      {!esEdicion && (
        <Input
          label="Saldo inicial"
          name="saldoInicial"
          tipo="number"
          value={formulario.saldoInicial}
          onChange={handleChange}
          error={errores.saldoInicial}
          placeholder="0"
        />
      )}
      <Button tipo="primario" cargando={cargando}>
        {esEdicion ? 'Guardar Cambios' : 'Crear Cuenta'}
      </Button>
    </form>
  );
};

export default FormularioCuenta;
