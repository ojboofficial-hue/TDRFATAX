import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/vat-management', label: 'VAT Management', icon: '📋' },
    { path: '/corporate-tax', label: 'Corporate Tax', icon: '🏢' },
    { path: '/payments', label: 'Payments', icon: '💳' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">TDRFATAX</h1>
        <p className="text-blue-200 text-sm">Tax Application</p>
      </div>

      <nav className="space-y-2">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-blue-700">
        <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
