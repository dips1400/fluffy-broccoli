import { penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function PenaltyManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Penalty Categories</h1>
          <p className="text-gray-600">Manage fine types and amounts</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {penaltyTypes.map((type) => {
          const IconComponent = (Icons as any)[type.icon];

          return (
            <div
              key={type.id}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${type.color}20` }}>
                    <IconComponent className="w-6 h-6" style={{ color: type.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{type.name}</h3>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                        type.severity === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : type.severity === 'high'
                          ? 'bg-orange-100 text-orange-700'
                          : type.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {type.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{type.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Fine Range</span>
                  <span className="font-semibold text-gray-900">
                    ₹{type.minAmount.toLocaleString()} - ₹{type.maxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Department</span>
                  <span className="font-medium text-gray-700">{type.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Issued</span>
                  <span className="font-medium text-gray-700">
                    {Math.floor(Math.random() * 100)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
