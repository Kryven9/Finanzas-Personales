import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Repeat, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useTransactionStore from '../../stores/transactionStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import FormularioTransaccion from './FormularioTransaccion';
import Alerta from '../../components/common/Alerta';

const formatearMoneda = (monto) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monto);
};

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
};

const Transacciones = () => {
  const {
    transacciones,
    recurrentes,
    cuentas,
    categorias,
    cargando,
    error,
    cargarDatos,
    listarTransacciones,
    crearTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    listarRecurrentes,
    desactivarRecurrencia,
  } = useTransactionStore();

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);
  const [modalRecurrentes, setModalRecurrentes] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [filtros, setFiltros] = useState({ fechaInicio: '', fechaFin: '' });

  useEffect(() => {
    cargarDatos();
    listarTransacciones();
  }, [cargarDatos, listarTransacciones]);

  const handleCrear = async (datos) => {
    const exito = await crearTransaccion(datos);
    if (exito) {
      setModalCrear(false);
      listarTransacciones(filtros);
    }
  };

  const handleEditar = async (datos) => {
    const exito = await actualizarTransaccion(modalEditar.id, datos);
    if (exito) {
      setModalEditar(null);
      listarTransacciones(filtros);
    }
  };

  const handleEliminar = async () => {
    setEliminando(true);
    const exito = await eliminarTransaccion(modalEliminar.id);
    setEliminando(false);
    if (exito) {
      setModalEliminar(null);
      listarTransacciones(filtros);
    }
  };

  const handleDesactivarRecurrencia = async (id) => {
    const exito = await desactivarRecurrencia(id);
    if (exito) {
      listarRecurrentes();
      listarTransacciones(filtros);
    }
  };

  const aplicarFiltros = () => {
    listarTransacciones(filtros);
  };

  const limpiarFiltros = () => {
    setFiltros({ fechaInicio: '', fechaFin: '' });
    listarTransacciones({});
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Transacciones</h1>
          <p className="text-sm text-neutral-500 mt-1">{transacciones.length} transacciones</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setModalRecurrentes(true); listarRecurrentes(); }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors shrink-0"
          >
            <Repeat className="w-4 h-4" />
            Recurrentes
          </button>
          <button
            onClick={() => setModalCrear(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Nueva
          </button>
        </div>
      </div>

      <Alerta tipo="error" mensaje={error} />

      {/* filtros */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs text-neutral-500 mb-1 block">Desde</label>
            <input
              type="date"
              value={filtros.fechaInicio}
              onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })}
              className="w-full py-2 px-3 rounded-lg border border-neutral-300 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-neutral-500 mb-1 block">Hasta</label>
            <input
              type="date"
              value={filtros.fechaFin}
              onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })}
              className="w-full py-2 px-3 rounded-lg border border-neutral-300 text-sm"
            />
          </div>
          <button
            onClick={aplicarFiltros}
            className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Filtrar
          </button>
          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Limpiar
          </button>
        </div>
      </Card>

      {/* listado */}
      {cargando && transacciones.length === 0 ? (
        <p className="text-sm text-neutral-400">Cargando transacciones...</p>
      ) : transacciones.length === 0 ? (
        <Card>
          <p className="text-sm text-neutral-400 text-center py-4">
            No hay transacciones registradas.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {transacciones.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  t.tipo === 'INGRESO' ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  {t.tipo === 'INGRESO'
                    ? <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    : <ArrowDownRight className="w-4 h-4 text-red-500" />
                  }
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {t.descripcion || t.categoria?.nombre}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {t.cuenta?.nombre} · {t.categoria?.nombre} · {formatearFecha(t.fecha)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-sm font-bold ${t.tipo === 'INGRESO' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {t.tipo === 'INGRESO' ? '+' : '-'}{formatearMoneda(t.monto)}
                </span>
                <div className="flex gap-1">
                  {t.esRecurrente && (
                    <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-xs text-neutral-500" title="Recurrente">
                      <Repeat className="w-3 h-3 inline" />
                    </span>
                  )}
                  <button
                    onClick={() => setModalEditar(t)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => setModalEliminar(t)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal crear */}
      <Modal abierto={modalCrear} onClose={() => setModalCrear(false)} titulo="Nueva Transacción">
        <FormularioTransaccion
          cuentas={cuentas}
          categorias={categorias}
          onSubmit={handleCrear}
          cargando={cargando}
          error={error}
        />
      </Modal>

      {/* modal editar */}
      <Modal abierto={!!modalEditar} onClose={() => setModalEditar(null)} titulo="Editar Transacción">
        {modalEditar && (
          <FormularioTransaccion
            transaccion={modalEditar}
            cuentas={cuentas}
            categorias={categorias}
            onSubmit={handleEditar}
            cargando={cargando}
            error={error}
          />
        )}
      </Modal>

      {/* modal eliminar */}
      <Modal abierto={!!modalEliminar} onClose={() => setModalEliminar(null)} titulo="Eliminar Transacción">
        <div className="flex flex-col gap-4">
          <Alerta tipo="error" mensaje={error} />
          <p className="text-sm text-neutral-600">
            ¿Estás seguro de que deseas eliminar esta transacción?
          </p>
          <div className="flex gap-3">
            <Button tipo="secundario" onClick={() => setModalEliminar(null)}>Cancelar</Button>
            <Button tipo="peligro" onClick={handleEliminar} cargando={eliminando}>Eliminar</Button>
          </div>
        </div>
      </Modal>

      {/* modal recurrentes */}
      <Modal abierto={modalRecurrentes} onClose={() => setModalRecurrentes(false)} titulo="Transacciones Recurrentes">
        <div className="flex flex-col gap-3">
          {recurrentes.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-4">No hay transacciones recurrentes.</p>
          ) : (
            recurrentes.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{r.descripcion || r.categoria?.nombre}</p>
                  <p className="text-xs text-neutral-400">
                    {formatearMoneda(r.monto)} · {r.frecuenciaRecurrencia} · Próxima: {formatearFecha(r.proximaFecha)}
                  </p>
                </div>
                <button
                  onClick={() => handleDesactivarRecurrencia(r.id)}
                  className="text-xs text-neutral-500 hover:text-red-600 transition-colors"
                >
                  Desactivar
                </button>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Transacciones;
