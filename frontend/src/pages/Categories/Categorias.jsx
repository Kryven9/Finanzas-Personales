import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Lock } from 'lucide-react';
import useCategoryStore from '../../stores/categoryStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import FormularioCategoria from './FormularioCategoria';
import Alerta from '../../components/common/Alerta';

const tiposCategoria = {
  INGRESO: 'Ingreso',
  GASTO: 'Gasto',
};

const coloresTipo = {
  INGRESO: 'bg-emerald-100 text-emerald-700',
  GASTO: 'bg-red-100 text-red-700',
};

const Categorias = () => {
  const {
    categorias,
    cargando,
    error,
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  } = useCategoryStore();

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [filtro, setFiltro] = useState('TODAS');

  useEffect(() => {
    listarCategorias();
  }, [listarCategorias]);

  const handleCrear = async (datos) => {
    const exito = await crearCategoria(datos);
    if (exito) setModalCrear(false);
  };

  const handleEditar = async (datos) => {
    const exito = await actualizarCategoria(modalEditar.id, datos);
    if (exito) setModalEditar(null);
  };

  const handleEliminar = async () => {
    setEliminando(true);
    const exito = await eliminarCategoria(modalEliminar.id);
    setEliminando(false);
    if (exito) setModalEliminar(null);
  };

  const categoriasFiltradas = categorias.filter((cat) => {
    if (filtro === 'TODAS') return true;
    if (filtro === 'PREDEFINIDAS') return cat.esPredefinida;
    if (filtro === 'PROPIAS') return !cat.esPredefinida;
    return cat.tipo === filtro;
  });

  const predefinidas = categorias.filter((c) => c.esPredefinida);
  const propias = categorias.filter((c) => !c.esPredefinida);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Categorías</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {predefinidas.length} predefinidas · {propias.length} propias
          </p>
        </div>
        <button
          onClick={() => setModalCrear(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </button>
      </div>

      <Alerta tipo="error" mensaje={error} />

      {/* filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['TODAS', 'PREDEFINIDAS', 'PROPIAS', 'INGRESO', 'GASTO'].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filtro === f
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {f === 'TODAS'
              ? 'Todas'
              : f === 'PREDEFINIDAS'
                ? 'Predefinidas'
                : f === 'PROPIAS'
                  ? 'Propias'
                  : f === 'INGRESO'
                    ? 'Ingresos'
                    : 'Gastos'}
          </button>
        ))}
      </div>

      {/* listado */}
      {cargando && categorias.length === 0 ? (
        <p className="text-sm text-neutral-400">Cargando categorías...</p>
      ) : categoriasFiltradas.length === 0 ? (
        <Card>
          <p className="text-sm text-neutral-400 text-center py-4">
            No se encontraron categorías con el filtro seleccionado.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoriasFiltradas.map((categoria) => (
            <div
              key={categoria.id}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                categoria.esPredefinida
                  ? 'bg-neutral-50 border-neutral-200'
                  : 'bg-white border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`px-2 py-0.5 rounded text-xs font-medium ${coloresTipo[categoria.tipo]}`}
                >
                  {tiposCategoria[categoria.tipo]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {categoria.nombre}
                  </p>
                  {categoria.esPredefinida && (
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Predefinida
                    </p>
                  )}
                </div>
              </div>

              {!categoria.esPredefinida && (
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setModalEditar(categoria)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => setModalEliminar(categoria)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* modal crear */}
      <Modal abierto={modalCrear} onClose={() => setModalCrear(false)} titulo="Nueva Categoría">
        <FormularioCategoria onSubmit={handleCrear} cargando={cargando} error={error} />
      </Modal>

      {/* modal editar */}
      <Modal abierto={!!modalEditar} onClose={() => setModalEditar(null)} titulo="Editar Categoría">
        {modalEditar && (
          <FormularioCategoria
            categoria={modalEditar}
            onSubmit={handleEditar}
            cargando={cargando}
            error={error}
          />
        )}
      </Modal>

      {/* modal eliminar */}
      <Modal
        abierto={!!modalEliminar}
        onClose={() => setModalEliminar(null)}
        titulo="Eliminar Categoría"
      >
        <div className="flex flex-col gap-4">
          <Alerta tipo="error" mensaje={error} />
          <p className="text-sm text-neutral-600">
            ¿Estás seguro de que deseas eliminar la categoría{' '}
            <strong>{modalEliminar?.nombre}</strong>?
          </p>
          <p className="text-xs text-neutral-400">
            Si tiene transacciones o presupuestos asociados, no se podra eliminar
          </p>
          <div className="flex gap-3">
            <Button tipo="secundario" onClick={() => setModalEliminar(null)}>
              Cancelar
            </Button>
            <Button tipo="peligro" onClick={handleEliminar} cargando={eliminando}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categorias;
