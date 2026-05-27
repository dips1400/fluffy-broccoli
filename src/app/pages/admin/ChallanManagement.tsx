import { useState } from 'react';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import { Search, Filter, Download, Eye, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router';

export default function ChallanManagement() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChallans = mockChallans.filter((challan) => {
    const matchesStatus = statusFilter === 'all' || challan.status === statusFilter;
    const matchesSearch =
      searchTerm === '' ||
      challan.challanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challan.violatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challan.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Challan Management</h1>
          <p className="text-gray-600">View and manage all issued challans</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            to="/admin/generate"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Generate New
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by challan ID, name, or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'all', label: 'All', count: mockChallans.length },
            { value: 'pending', label: 'Pending', count: mockChallans.filter(c => c.status === 'pending').length },
            { value: 'paid', label: 'Paid', count: mockChallans.filter(c => c.status === 'paid').length },
            { value: 'overdue', label: 'Overdue', count: mockChallans.filter(c => c.status === 'overdue').length },
            { value: 'disputed', label: 'Disputed', count: mockChallans.filter(c => c.status === 'disputed').length },
            { value: 'cancelled', label: 'Cancelled', count: 0 },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Challan ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Violator
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Violation Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredChallans.map((challan) => {
                const penaltyType = penaltyTypes.find((p) => p.id === challan.penaltyTypeId);
                const IconComponent = penaltyType ? (Icons as any)[penaltyType.icon] : null;

                return (
                  <tr key={challan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 text-sm">{challan.challanNumber}</div>
                      <div className="text-xs text-gray-500">{challan.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{challan.violatorName}</div>
                      <div className="text-xs text-gray-500">{challan.violatorContact}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <div className="p-1.5 rounded" style={{ backgroundColor: `${penaltyType.color}20` }}>
                            <IconComponent className="w-4 h-4" style={{ color: penaltyType.color }} />
                          </div>
                        )}
                        <span className="text-sm text-gray-900">{penaltyType?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">₹{challan.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          challan.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : challan.status === 'overdue'
                            ? 'bg-red-100 text-red-700'
                            : challan.status === 'pending'
                            ? 'bg-orange-100 text-orange-700'
                            : challan.status === 'disputed'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {challan.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(challan.issueDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
