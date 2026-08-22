import { useState } from 'react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';
import {
  esquemaCrearCategoria,
  esquemaActualizarCategoria,
} from '../../validations/category.validation';

const tiposCategoria = [
  { valor: 'INGRESO', etiqueta: 'Ingreso' },
  { valor: 'GASTO', etiqueta: 'Gasto' },
];

const FormularioCategoria = ({ categoria, onSubmit, cargando, error }) => {
  const esEdicion = !!categoria;
  const esquema = esEdicion ? esquemaActualizarCategoria : esquemaCrearCategoria;

  const [formulario, setFormulario] = useState({
    nombre: categoria?.nombre || '',
    tipo: categoria?.tipo || '',
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

    const resultado = esquema.safeParse(formulario);

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
        placeholder="Ej: Mascotas"
      />
      <Select
        label="Tipo"
        name="tipo"
        opciones={tiposCategoria}
        valor={formulario.tipo}
        onChange={handleChange}
        error={errores.tipo}
      />
      <Button tipo="primario" cargando={cargando}>
        {esEdicion ? 'Guardar Cambios' : 'Crear Categoría'}
      </Button>
    </form>
  );
};

export default FormularioCategoria;
