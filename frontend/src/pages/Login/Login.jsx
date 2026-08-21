import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alerta from '../../components/common/Alerta';

const Login = () => {
  const navigate = useNavigate();
  const { iniciarSesion, cargando, error, limpiarError } = useAuthStore();
  const [formulario, setFormulario] = useState({ correo: '', contrasena: '' });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    if (error) limpiarError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await iniciarSesion(formulario);
    if (exito) navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Alerta mensaje={error} />
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
              placeholder="••••••"
              required
            />
            <Button tipo="primario" cargando={cargando}>
              Iniciar Sesión
            </Button>
          </form>
          <p className="text-center text-sm text-neutral-500 mt-4">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-black font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
