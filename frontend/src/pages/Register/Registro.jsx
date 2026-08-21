import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';

const Registro = () => {
  const navigate = useNavigate();
  const { registrar, cargando, error, limpiarError } = useAuthStore();
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    if (error) limpiarError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await registrar(formulario);
    if (exito) navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h1>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Alerta mensaje={error} />
            <Input
              label="Nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
            <Input
              label="Correo"
              name="correo"
              type="email"
              value={formulario.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
            <Input
              label="Contraseña"
              name="contrasena"
              tipo="password"
              value={formulario.contrasena}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
            <Button tipo="primario" cargando={cargando}>
              Crear Cuenta
            </Button>
          </form>
          <p className="text-center text-sm text-neutral-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-black font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Registro;
