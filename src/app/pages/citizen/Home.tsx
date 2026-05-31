import { useState } from 'react';
import { Link } from 'react-router';
import { Search, CreditCard, Bell, AlertTriangle } from 'lucide-react';
import { penaltyTypes, mockChallans } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';

export default function CitizenHome() {
  const [searchType, setSearchType] = useState<'vehicle' | 'challan' | 'mobile' | 'property'>('vehicle');
  const [searchValue, setSearchValue] = useState('');

  const recentChallans = mockChallans.filter(c => c.status === 'pending' || c.status === 'overdue').slice(0, 3);
  const totalPending = mockChallans.filter(c => c.status === 'pending' || c.status === 'overdue').length;
  const totalOverdue = mockChallans.filter(c => c.status === 'overdue').length;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Citizen Portal</h1>
        <p className="text-blue-100">Search and manage your fines and penalties</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalPending}</p>
              <p className="text-sm text-gray-600">Pending Fines</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalOverdue}</p>
              <p className="text-sm text-gray-600">Overdue Fines</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{mockChallans.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Paid</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Search Fine</h2>

        <div className="flex gap-2 mb-4">
          {[
            { value: 'vehicle', label: 'Vehicle Number' },
            { value: 'challan', label: 'Challan ID' },
            { value: 'mobile', label: 'Mobile Number' },
            { value: 'property', label: 'Property Number' },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setSearchType(type.value as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Enter ${searchType === 'vehicle' ? 'vehicle number (e.g., DL-01-AB-1234)' : searchType === 'challan' ? 'challan ID' : searchType === 'mobile' ? 'mobile number' : 'property number'}`}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>

      {recentChallans.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Violations</h2>
            <Link to="/citizen/history" className="text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentChallans.map((challan) => {
              const penaltyType : any = penaltyTypes.find(p => p.id === challan.penaltyTypeId);
              const IconComponent = penaltyType ? (Icons as any)[penaltyType.icon] : null;

              return (
                <div key={challan.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {IconComponent && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: `${penaltyType.color}20` }}>
                          <IconComponent className="w-6 h-6" style={{ color: penaltyType.color }} />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{penaltyType?.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{challan.challanNumber}</p>
                        <p className="text-sm text-gray-500">{challan.location}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Issued: {new Date(challan.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 mb-2">₹{challan.amount.toLocaleString()}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        challan.status === 'overdue'
                          ? 'bg-red-100 text-red-700'
                          : challan.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {challan.status.toUpperCase()}
                      </span>
                      <Link
                        to={`/citizen/challan/${challan.id}`}
                        className="block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Fine Categories</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {penaltyTypes.slice(0, 8).map((type) => {
            const IconComponent = (Icons as any)[type.icon];
            return (
              <Link
                key={type.id}
                to="/citizen/categories"
                className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-all hover:border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${type.color}20` }}>
                    <IconComponent className="w-5 h-5" style={{ color: type.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{type.name}</p>
                    <p className="text-xs text-gray-500">₹{type.minAmount} - ₹{type.maxAmount}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          to="/citizen/categories"
          className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Categories →
        </Link>
      </div>
    </div>
  );
}
