import { Outlet, Link, useLocation } from 'react-router';
import { Home, Grid3x3, History, FileText, Shield } from 'lucide-react';

export default function CitizenLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/citizen', icon: Home },
    { name: 'Categories', href: '/citizen/categories', icon: Grid3x3 },
    { name: 'History', href: '/citizen/history', icon: History },
  ];

  const isActive = (href: string) => {
    if (href === '/citizen') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/citizen" className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-lg text-gray-900">Citizen Portal</h1>
                <p className="text-xs text-gray-500">Fine & Penalty Management</p>
              </div>
            </Link>

            <div className="flex gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
