import { Link } from 'react-router';
import { Shield, Users, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-xl text-gray-900">Municipal Corporation</h1>
                <p className="text-xs text-gray-500">Fine & Penalty Management</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Digital Civic Enforcement System
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, paperless, and efficient management of municipal penalties and challans
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/citizen"
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-600 transition-colors">
                <Users className="w-8 h-8 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Citizen Portal</h3>
            </div>
            <p className="text-gray-600 mb-6">
              View and pay your fines, track violation history, and raise appeals
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>• Search by vehicle or challan number</li>
              <li>• Pay online with multiple options</li>
              <li>• Download QR-coded digital challans</li>
              <li>• Track payment history</li>
            </ul>
            <div className="mt-6 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Access Portal →
            </div>
          </Link>

          <Link
            to="/admin"
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-4 rounded-xl group-hover:bg-green-600 transition-colors">
                <BarChart3 className="w-8 h-8 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Admin Portal</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Generate challans, track enforcement, and analyze penalty data
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>• Issue digital challans with QR codes</li>
              <li>• Real-time analytics dashboard</li>
              <li>• Manage departments and officers</li>
              <li>• Handle dispute resolution</li>
            </ul>
            <div className="mt-6 text-green-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Admin Login →
            </div>
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600">Penalty Categories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Paperless Process</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Online Payment</div>
          </div>
        </div>
      </main>
    </div>
  );
}
