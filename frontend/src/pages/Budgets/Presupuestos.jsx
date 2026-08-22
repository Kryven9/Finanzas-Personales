import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import useBudgetStore from '../../stores/budgetStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import FormularioPresupuesto from './FormularioPresupuesto';
import Alerta from '../../components/common/Alerta';

const formatearMoneda = (monto) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monto);
};

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const Presupuestos = () => {
  const {
    presupuestos,
    categorias,
    mesActual,
    anioActual,
    cargando,
    error,
    cargarDatos,
    listarPresupuestos,
    crearPresupuesto,
    actualizarPresupuesto,
    eliminarPresupuesto,
    setMesAnio,
  } = useBudgetStore();

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  useEffect(() => {
    listarPresupuestos(mesActual, anioActual);
  }, [mesActual, anioActual, listarPresupuestos]);

  const handleCrear = async (datos) => {
    const exito = await crearPresupuesto(datos);
    if (exito) {
      setModalCrear(false);
      listarPresupuestos(mesActual, anioActual);
    }
  };

  const handleEditar = async (datos) => {
    const exito = await actualizarPresupuesto(modalEditar.id, datos);
    if (exito) {
      setModalEditar(null);
      listarPresupuestos(mesActual, anioActual);
    }
  };

  const handleEliminar = async () => {
    setEliminando(true);
    const exito = await eliminarPresupuesto(modalEliminar.id);
    setEliminando(false);
    if (exito) {
      setModalEliminar(null);
      listarPresupuestos(mesActual, anioActual);
    }
  };

  const cambiarMes = (delta) => {
    let nuevoMes = mesActual + delta;
    let nuevoAnio = anioActual;
    if (nuevoMes < 1) { nuevoMes = 12; nuevoAnio--; }
    if (nuevoMes > 12) { nuevoMes = 1; nuevoAnio++; }
    setMesAnio(nuevoMes, nuevoAnio);
  };

  const colorAlerta = (alerta) => {
    if (alerta === 'excedido') return 'bg-red-500';
    if (alerta === 'cercano') return 'bg-amber-500';
    return 'bg-neutral-900';
  };

  const colorBarra = (porcentaje) => {
    if (porcentaje >= 100) return 'bg-red-500';
    if (porcentaje >= 80) return 'bg-amber-500';
    return 'bg-neutral-900';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Presupuestos</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {presupuestos.length} presupuestos · {formatearMoneda(presupuestos.reduce((s, p) => s + p.gastoReal, 0))} gastados
          </p>
        </div>
        <button
          onClick={() => setModalCrear(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Nuevo
        </button>
      </div>

      <Alerta tipo="error" mensaje={error} />

      {/* seletor de mes/año */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <button onClick={() => cambiarMes(-1)} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-neutral-500" />
          </button>
          <div className="text-center">
            <p className="text-lg font-bold text-neutral-900">{meses[mesActual - 1]} {anioActual}</p>
          </div>
          <button onClick={() => cambiarMes(1)} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-neutral-500" />
          </button>
        </div>
      </Card>

      {/* listado */}
      {cargando && presupuestos.length === 0 ? (
        <p className="text-sm text-neutral-400">Cargando presupuestos...</p>
      ) : presupuestos.length === 0 ? (
        <Card>
          <p className="text-sm text-neutral-400 text-center py-4">
            No hay presupuestos para este período
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {presupuestos.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-neutral-900">{p.categoria?.nombre}</p>
                  <p className="text-xs text-neutral-400">
                    {formatearMoneda(p.gastoReal)} de {formatearMoneda(p.montoLimite)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {p.alerta && (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${colorAlerta(p.alerta)}`}>
                      {p.alerta === 'excedido' ? 'Excedido' : 'Cercano al límite'}
                    </span>
                  )}
                  <button
                    onClick={() => setModalEditar(p)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => setModalEliminar(p)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* barra del progreso */}
              <div className="w-full bg-neutral-100 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all ${colorBarra(p.porcentajeUsado)}`}
                  style={{ width: `${Math.min(p.porcentajeUsado, 100)}%` }}
                />
              </div>
              <p className="text-xs text-neutral-400 mt-1 text-right">
                {p.porcentajeUsado}%
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* modal crear */}
      <Modal abierto={modalCrear} onClose={() => setModalCrear(false)} titulo="Nuevo Presupuesto">
        <FormularioPresupuesto
          categorias={categorias}
          mes={mesActual}
          anio={anioActual}
          onSubmit={handleCrear}
          cargando={cargando}
          error={error}
        />
      </Modal>

      {/* modal editar */}
      <Modal abierto={!!modalEditar} onClose={() => setModalEditar(null)} titulo="Editar Presupuesto">
        {modalEditar && (
          <FormularioPresupuesto
            presupuesto={modalEditar}
            categorias={categorias}
            mes={mesActual}
            anio={anioActual}
            onSubmit={handleEditar}
            cargando={cargando}
            error={error}
          />
        )}
      </Modal>

      {/* modal eliminar */}
      <Modal abierto={!!modalEliminar} onClose={() => setModalEliminar(null)} titulo="Eliminar Presupuesto">
        <div className="flex flex-col gap-4">
          <Alerta tipo="error" mensaje={error} />
          <p className="text-sm text-neutral-600">
            ¿Estás seguro de que deseas eliminar el presupuesto de{' '}
            <strong>{modalEliminar?.categoria?.nombre}</strong>?
          </p>
          <div className="flex gap-3">
            <Button tipo="secundario" onClick={() => setModalEliminar(null)}>Cancelar</Button>
            <Button tipo="peligro" onClick={handleEliminar} cargando={eliminando}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Presupuestos;
