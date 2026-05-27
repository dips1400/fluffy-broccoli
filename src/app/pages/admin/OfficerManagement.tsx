import { Users, UserPlus, Award, TrendingUp } from 'lucide-react';

export default function OfficerManagement() {
  const officers = [
    { id: 'OFF-001', name: 'Inspector Sharma', department: 'Traffic', challans: 45, revenue: 89000, status: 'active' },
    { id: 'OFF-012', name: 'Officer Gupta', department: 'Sanitation', challans: 38, revenue: 76000, status: 'active' },
    { id: 'OFF-008', name: 'Inspector Mehra', department: 'Land & Building', challans: 32, revenue: 64000, status: 'active' },
    { id: 'OFF-025', name: 'Traffic Officer Singh', department: 'Traffic', challans: 41, revenue: 82000, status: 'active' },
    { id: 'OFF-034', name: 'Revenue Officer Kapoor', department: 'Revenue', challans: 28, revenue: 156000, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Officer Management</h1>
          <p className="text-gray-600">Manage enforcement officers and departments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Officer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Officers</p>
          <p className="text-3xl font-bold text-gray-900">42</p>
          <p className="text-xs text-green-600 mt-2">24 active today</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg. Performance</p>
          <p className="text-3xl font-bold text-gray-900">87%</p>
          <p className="text-xs text-green-600 mt-2">↑ 5% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Top Performer</p>
          <p className="text-xl font-bold text-gray-900">Inspector Sharma</p>
          <p className="text-xs text-purple-600 mt-2">45 challans this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Departments</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-xs text-gray-500 mt-2">Active departments</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Officer List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Officer ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Challans Issued</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Revenue Generated</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {officers.map((officer) => (
                <tr key={officer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{officer.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-600">{officer.name.charAt(0)}</span>
                      </div>
                      <div className="font-medium text-gray-900">{officer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{officer.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{officer.challans}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">₹{officer.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
