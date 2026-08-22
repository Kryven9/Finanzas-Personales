import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Tags,
  ArrowLeftRight,
  PiggyBank,
  Target,
  BarChart3,
  ChevronLeft,
} from 'lucide-react';

const enlaces = [
  { to: '/', etiqueta: 'Dashboard', icono: LayoutDashboard },
  { to: '/cuentas', etiqueta: 'Cuentas', icono: Wallet },
  { to: '/categorias', etiqueta: 'Categorías', icono: Tags },
  { to: '/transacciones', etiqueta: 'Transacciones', icono: ArrowLeftRight },
  { to: '/presupuestos', etiqueta: 'Presupuestos', icono: PiggyBank },
  { to: '/metas', etiqueta: 'Metas', icono: Target },
  { to: '/reportes', etiqueta: 'Reportes', icono: BarChart3 },
];

const Sidebar = ({ abierto, onToggle }) => {
  return (
    <aside
      className={`h-screen bg-neutral-900 text-white flex flex-col fixed left-0 top-0 z-40 transition-all duration-200 ${
        abierto ? 'w-60' : 'w-16'
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-neutral-700 shrink-0">
        {abierto ? (
          <span className="font-bold text-lg tracking-tight">Finanzas</span>
        ) : (
          <span className="font-bold text-lg mx-auto">F</span>
        )}
      </div>

      {/* Navegacion */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {enlaces.map((enlace) => {
          const Icono = enlace.icono;
          return (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === '/'}
              title={!abierto ? enlace.etiqueta : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                } ${!abierto ? 'justify-center' : ''}`
              }
            >
              <Icono className="w-5 h-5 shrink-0" strokeWidth={1.8} />
              {abierto && <span>{enlace.etiqueta}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Boton de colapsar */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 w-6 h-6 bg-neutral-800 border border-neutral-600 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors z-50"
        title={abierto ? 'Colapsar' : 'Expandir'}
      >
        <ChevronLeft
          className={`w-3.5 h-3.5 transition-transform ${!abierto ? 'rotate-180' : ''}`}
        />
      </button>
    </aside>
  );
};

export default Sidebar;
