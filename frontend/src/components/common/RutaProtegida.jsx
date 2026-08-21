import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

const RutaProtegida = ({ children }) => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;
