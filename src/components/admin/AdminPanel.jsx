import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetDashboardStatsQuery } from '../../store/slices/adminSlice';
import { logout } from '../../store/slices/authSlice';
import ProductManagement from './ProductManagement';
import OrderHistory from './OrderHistory';
import GalleryManagement from './GalleryManagement';
import OrderManagement from './OrderManagement';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: stats, isLoading } = useGetDashboardStatsQuery();
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Башкы бет', icon: '📊' },
    { id: 'products', label: 'Продуктулар', icon: '🍽️' },
    { id: 'orders', label: 'Заказдар', icon: '📋' },
    { id: 'history', label: 'История', icon: '📚' },
    { id: 'gallery', label: 'Галерея', icon: '🖼️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Продуктулар</h3>
              <p className="text-3xl font-bold text-amber-600">
                {stats?.total_products || 0}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Активдүү заказдар</h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats?.active_orders || 0}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Күтүлүүдө</h3>
              <p className="text-3xl font-bold text-orange-600">
                {stats?.pending_orders || 0}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Даяр</h3>
              <p className="text-3xl font-bold text-green-600">
                {stats?.ready_orders || 0}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Тарыхта</h3>
              <p className="text-3xl font-bold text-gray-600">
                {stats?.delivered_orders || 0}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Жалпы киреше</h3>
              <p className="text-3xl font-bold text-purple-600">
                {stats?.total_revenue || 0} сом
              </p>
            </div>
          </div>
        );
      
      case 'products':
        return <ProductManagement />;
      
      case 'orders':
        return <OrderManagement />;
      
      case 'history':
        return <OrderHistory />;
      
      case 'gallery':
        return <GalleryManagement />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Админ панель</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Чыгуу
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;