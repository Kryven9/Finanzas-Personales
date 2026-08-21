import { useEffect, useState } from 'react';
import { Wallet, Plus, Pencil, Trash2 } from 'lucide-react';
import useAccountStore from '../../stores/accountStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import FormularioCuenta from './FormularioCuenta';
import Alerta from '../../components/common/Alerta';

const formatearMoneda = (monto) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monto);
};

const tiposCuenta = {
  EFECTIVO: 'Efectivo',
  BANCO: 'Banco',
  TARJETA_CREDITO: 'Tarjeta Crédito',
  OTRO: 'Otro',
};

const Cuentas = () => {
  const {
    cuentas,
    patrimonioNeto,
    cargando,
    error,
    listarCuentas,
    crearCuenta,
    actualizarCuenta,
    eliminarCuenta,
  } = useAccountStore();

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalEliminar, setModalEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    listarCuentas();
  }, [listarCuentas]);

  const handleCrear = async (datos) => {
    const exito = await crearCuenta(datos);
    if (exito) setModalCrear(false);
  };

  const handleEditar = async (datos) => {
    const exito = await actualizarCuenta(modalEditar.id, datos);
    if (exito) setModalEditar(null);
  };

  const handleEliminar = async () => {
    setEliminando(true);
    const exito = await eliminarCuenta(modalEliminar.id);
    setEliminando(false);
    if (exito) setModalEliminar(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Cuentas</h1>
          <p className="text-sm text-neutral-500 mt-1">Gestiona tus cuentas financieras</p>
        </div>
        <Button tipo="primario" onClick={() => setModalCrear(true)}>
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nueva Cuenta
          </span>
        </Button>
      </div>

      <Alerta tipo="error" mensaje={error} />

      {/* Patrimonio neto */}
      <Card className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Patrimonio Neto</p>
            <p className="text-2xl font-bold text-neutral-900">{formatearMoneda(patrimonioNeto)}</p>
          </div>
        </div>
      </Card>

      {/* Listado de cuentas */}
      {cargando && cuentas.length === 0 ? (
        <p className="text-sm text-neutral-400">Cargando cuentas...</p>
      ) : cuentas.length === 0 ? (
        <Card>
          <p className="text-sm text-neutral-400 text-center py-4">
            No tienes cuentas creadas. Crea tu primera cuenta para comenzar.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cuentas.map((cuenta) => (
            <Card key={cuenta.id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-neutral-900">{cuenta.nombre}</h3>
                  <p className="text-xs text-neutral-400">{tiposCuenta[cuenta.tipo]}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setModalEditar(cuenta)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => setModalEliminar(cuenta)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100">
                <p className="text-xs text-neutral-400">Saldo actual</p>
                <p className="text-xl font-bold text-neutral-900">
                  {formatearMoneda(cuenta.saldoActual)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* modal crear */}
      <Modal abierto={modalCrear} onClose={() => setModalCrear(false)} titulo="Nueva Cuenta">
        <FormularioCuenta onSubmit={handleCrear} cargando={cargando} error={error} />
      </Modal>

      {/* modal editar */}
      <Modal
        abierto={!!modalEditar}
        onClose={() => setModalEditar(null)}
        titulo="Editar Cuenta"
      >
        {modalEditar && (
          <FormularioCuenta
            cuenta={modalEditar}
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
        titulo="Eliminar Cuenta"
      >
        <div className="flex flex-col gap-4">
          <Alerta tipo="error" mensaje={error} />
          <p className="text-sm text-neutral-600">
            ¿Estás seguro de que deseas eliminar la cuenta{' '}
            <strong>{modalEliminar?.nombre}</strong>?
          </p>
          <p className="text-xs text-neutral-400">
            Esta acción no se puede deshacer.
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

export default Cuentas;
