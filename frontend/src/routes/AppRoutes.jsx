import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Registro from '../pages/Register/Registro';
import Dashboard from '../pages/Dashboard/Dashboard';
import EditarPerfil from '../pages/Profile/EditarPerfil';
import Cuentas from '../pages/Accounts/Cuentas';
import Categorias from '../pages/Categories/Categorias';
import Transacciones from '../pages/Transactions/Transacciones';
import RutaProtegida from '../components/common/RutaProtegida';
import LayoutAutenticado from '../components/layout/LayoutAutenticado';

const AppRoutes = () => {
  return (
    <Routes>
      {/* rutas publicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* rutas protegidas con sidebar */}
      <Route
        element={
          <RutaProtegida>
            <LayoutAutenticado />
          </RutaProtegida>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/perfil" element={<EditarPerfil />} />
        <Route path="/cuentas" element={<Cuentas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/presupuestos" element={<Placeholder titulo="Presupuestos" />} />
        <Route path="/metas" element={<Placeholder titulo="Metas de Ahorro" />} />
        <Route path="/reportes" element={<Placeholder titulo="Reportes" />} />
      </Route>

      {/* manejo de rutas inexistentes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const Placeholder = ({ titulo }) => (
  <div>
    <h1 className="text-2xl font-bold mb-4">{titulo}</h1>
    <p className="text-sm text-neutral-400">Módulo en desarrollo.</p>
  </div>
);

export default AppRoutes;
