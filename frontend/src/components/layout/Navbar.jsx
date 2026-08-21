import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';
import useAuthStore from '../../stores/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAuthStore();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  const handleCerrarSesion = async () => {
    setMenuAbierto(false);
    await cerrarSesion();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-neutral-200 flex items-center justify-end px-6 shrink-0">
      {usuario && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <span className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-sm font-medium text-neutral-600">
              {usuario.nombre.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm text-neutral-700 hidden sm:inline">{usuario.nombre}</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform ${menuAbierto ? 'rotate-180' : ''}`}
            />
          </button>

          {menuAbierto && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  navigate('/perfil');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors w-full"
              >
                <User className="w-4 h-4" />
                Perfil
              </button>
              <button
                onClick={handleCerrarSesion}
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
