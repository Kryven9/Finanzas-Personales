import useAuthStore from '../../stores/authStore';

const Dashboard = () => {
  const { usuario } = useAuthStore();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Bienvenido de vuelta, {usuario?.nombre || 'Usuario'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
