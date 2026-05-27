import { useState } from 'react';
import { Link } from 'react-router';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import { Filter, Download, Search } from 'lucide-react';

export default function ViolationHistory() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChallans = mockChallans.filter((challan) => {
    const matchesStatus = statusFilter === 'all' || challan.status === statusFilter;
    const matchesSearch =
      searchTerm === '' ||
      challan.challanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challan.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockChallans.length,
    pending: mockChallans.filter((c) => c.status === 'pending').length,
    paid: mockChallans.filter((c) => c.status === 'paid').length,
    overdue: mockChallans.filter((c) => c.status === 'overdue').length,
    disputed: mockChallans.filter((c) => c.status === 'disputed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Violation History</h1>
          <p className="text-gray-600">View and manage all your fines and penalties</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'blue' },
          { label: 'Pending', value: stats.pending, color: 'orange' },
          { label: 'Paid', value: stats.paid, color: 'green' },
          { label: 'Overdue', value: stats.overdue, color: 'red' },
          { label: 'Disputed', value: stats.disputed, color: 'purple' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-4 shadow-sm border">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by challan number or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'paid', label: 'Paid' },
            { value: 'overdue', label: 'Overdue' },
            { value: 'disputed', label: 'Disputed' },
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
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredChallans.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border text-center">
            <p className="text-gray-500">No challans found</p>
          </div>
        ) : (
          filteredChallans.map((challan) => {
            const penaltyType = penaltyTypes.find((p) => p.id === challan.penaltyTypeId);
            const IconComponent = penaltyType ? (Icons as any)[penaltyType.icon] : null;

            return (
              <div
                key={challan.id}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    {IconComponent && (
                      <div
                        className="p-3 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${penaltyType.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: penaltyType.color }} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{penaltyType?.name}</h3>
                          <p className="text-sm text-gray-600">{challan.challanNumber}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
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
                      </div>

                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">Location: </span>
                          <span className="text-gray-900">{challan.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Issue Date: </span>
                          <span className="text-gray-900">
                            {new Date(challan.issueDate).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        {challan.vehicleNumber && (
                          <div>
                            <span className="text-gray-500">Vehicle: </span>
                            <span className="text-gray-900">{challan.vehicleNumber}</span>
                          </div>
                        )}
                        {challan.paymentDate && (
                          <div>
                            <span className="text-gray-500">Paid On: </span>
                            <span className="text-gray-900">
                              {new Date(challan.paymentDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{challan.amount.toLocaleString()}
                      </p>
                      {challan.status !== 'paid' && (
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {new Date(challan.dueDate).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>
                    <Link
                      to={`/citizen/challan/${challan.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
