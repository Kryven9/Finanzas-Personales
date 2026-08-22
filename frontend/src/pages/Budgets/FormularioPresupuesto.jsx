import { useState } from 'react';
import Select from '../../components/common/Select';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';
import { esquemaCrearPresupuesto, esquemaActualizarPresupuesto } from '../../validations/budget.validation';

const FormularioPresupuesto = ({ presupuesto, categorias, mes, anio, onSubmit, cargando, error }) => {
  const esEdicion = !!presupuesto;
  const esquema = esEdicion ? esquemaActualizarPresupuesto : esquemaCrearPresupuesto;

  const categoriasGasto = categorias.filter((c) => c.tipo === 'GASTO' && !c.esPredefinida || c.esPredefinida);

  const [formulario, setFormulario] = useState({
    idCategoria: presupuesto?.idCategoria || '',
    montoLimite: presupuesto?.montoLimite ?? '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = esEdicion
      ? { montoLimite: Number(formulario.montoLimite) }
      : {
          idCategoria: formulario.idCategoria,
          montoLimite: Number(formulario.montoLimite),
          mes,
          anio,
        };

    const resultado = esquema.safeParse(datos);

    if (!resultado.success) {
      const erroresValidacion = {};
      resultado.error.issues.forEach((issue) => {
        erroresValidacion[issue.path[0]] = issue.message;
      });
      setErrores(erroresValidacion);
      return;
    }

    setErrores({});
    onSubmit(resultado.data);
  };

  const opcionesCategoria = categoriasGasto.map((c) => ({ valor: c.id, etiqueta: c.nombre }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Alerta mensaje={error} />

      {!esEdicion && (
        <Select
          label="Categoría"
          name="idCategoria"
          opciones={opcionesCategoria}
          valor={formulario.idCategoria}
          onChange={handleChange}
          error={errores.idCategoria}
          placeholder="Seleccionar categoría..."
        />
      )}

      <Input
        label="Monto límite"
        name="montoLimite"
        tipo="number"
        value={formulario.montoLimite}
        onChange={handleChange}
        error={errores.montoLimite}
        placeholder="0"
      />

      <Button tipo="primario" cargando={cargando}>
        {esEdicion ? 'Guardar Cambios' : 'Crear Presupuesto'}
      </Button>
    </form>
  );
};

export default FormularioPresupuesto;
