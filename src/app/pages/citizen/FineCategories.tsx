import { penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import { Info } from 'lucide-react';

export default function FineCategories() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fine Categories</h1>
          <p className="text-gray-600">All penalty types managed by the municipal corporation</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {penaltyTypes.map((type) => {
          const IconComponent = (Icons as any)[type.icon];

          return (
            <div
              key={type.id}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${type.color}20` }}>
                  <IconComponent className="w-7 h-7" style={{ color: type.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{type.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    type.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : type.severity === 'high'
                      ? 'bg-orange-100 text-orange-700'
                      : type.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {type.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{type.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fine Range:</span>
                  <span className="font-semibold text-gray-900">
                    ₹{type.minAmount.toLocaleString()} - ₹{type.maxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium text-gray-700">{type.department}</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Info className="w-4 h-4" />
                View Rules
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
