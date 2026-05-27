import { Outlet, Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Tags,
  BarChart3,
  Users,
  AlertCircle,
  FileBarChart,
  Shield,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Generate Challan', href: '/admin/generate', icon: FilePlus },
    { name: 'Challan Management', href: '/admin/challans', icon: FileText },
    { name: 'Penalty Categories', href: '/admin/penalties', icon: Tags },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Officers', href: '/admin/officers', icon: Users },
    { name: 'Disputes', href: '/admin/disputes', icon: AlertCircle },
    { name: 'Reports', href: '/admin/reports', icon: FileBarChart },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/admin" className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="font-bold text-lg text-gray-900">Admin Portal</h1>
                  <p className="text-xs text-gray-500">Municipal Corporation</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Officer:</span> Admin User
              </div>
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Exit
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r min-h-[calc(100vh-4rem)] sticky top-16">
            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
