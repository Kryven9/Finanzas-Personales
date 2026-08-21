import { useState } from 'react';
import useAuthStore from '../../stores/authStore';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';

const EditarPerfil = () => {
  const { usuario, actualizarPerfil, cargando, error, limpiarError } = useAuthStore();
  const [formulario, setFormulario] = useState(() => ({
    nombre: usuario?.nombre || '',
    correo: usuario?.correo || '',
    contrasena: '',
  }));
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    if (error) limpiarError();
    if (exito) setExito(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExito(false);

    const datos = {};
    if (formulario.nombre) datos.nombre = formulario.nombre;
    if (formulario.correo) datos.correo = formulario.correo;
    if (formulario.contrasena) datos.contrasena = formulario.contrasena;

    const resultado = await actualizarPerfil(datos);
    if (resultado) {
      setExito(true);
      setFormulario({ ...formulario, contrasena: '' });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
      <Card className="max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Alerta tipo="error" mensaje={error} />
          <Alerta tipo="exito" mensaje={exito ? 'Perfil actualizado correctamente' : ''} />
          <Input
            label="Nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
          <Input
            label="Correo"
            name="correo"
            type="email"
            value={formulario.correo}
            onChange={handleChange}
            required
          />
          <Input
            label="Nueva contraseña (dejar vacio para no cambiar)"
            name="contrasena"
            tipo="password"
            value={formulario.contrasena}
            onChange={handleChange}
            placeholder="••••••"
          />
          <Button tipo="primario" cargando={cargando}>
            Guardar Cambios
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditarPerfil;
