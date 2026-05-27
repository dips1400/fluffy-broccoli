import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, MapPin, Users } from 'lucide-react';

export default function DefaulterAnalytics() {
  const areaData = [
    { area: 'Connaught Place', violations: 145, revenue: 289000 },
    { area: 'Karol Bagh', violations: 98, revenue: 196000 },
    { area: 'Saket', violations: 76, revenue: 152000 },
    { area: 'Dwarka', violations: 65, revenue: 130000 },
    { area: 'Rohini', violations: 54, revenue: 108000 },
  ];

  const repeatOffenders = [
    { name: 'Rajesh Kumar', violations: 8, amount: 12000, vehicle: 'DL-01-AB-1234' },
    { name: 'Amit Verma', violations: 6, amount: 9500, vehicle: 'DL-03-CD-5678' },
    { name: 'Priya Sharma', violations: 5, amount: 8000, vehicle: 'DL-05-EF-9012' },
    { name: 'Sunita Devi', violations: 4, amount: 7200, vehicle: 'DL-07-GH-3456' },
  ];

  const monthlyTrend = [
    { month: 'Jan', total: 156, repeat: 23 },
    { month: 'Feb', total: 189, repeat: 31 },
    { month: 'Mar', total: 167, repeat: 28 },
    { month: 'Apr', total: 201, repeat: 35 },
    { month: 'May', total: 145, repeat: 22 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Defaulter Analytics</h1>
        <p className="text-gray-600">Track repeat offenders and violation trends</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Repeat Offenders</p>
          <p className="text-3xl font-bold text-gray-900">67</p>
          <p className="text-xs text-red-600 mt-2">↑ 15% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Defaulters</p>
          <p className="text-3xl font-bold text-gray-900">124</p>
          <p className="text-xs text-orange-600 mt-2">Unpaid violations</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Top Violation Area</p>
          <p className="text-2xl font-bold text-gray-900">Connaught Place</p>
          <p className="text-xs text-blue-600 mt-2">145 violations</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Collection Rate</p>
          <p className="text-3xl font-bold text-gray-900">72%</p>
          <p className="text-xs text-green-600 mt-2">↑ 5% improvement</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Area-wise Violations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="violations" fill="#3B82F6" name="Violations" />
              <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Repeat Offender Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} name="Total Offenders" />
              <Line type="monotone" dataKey="repeat" stroke="#EF4444" strokeWidth={2} name="Repeat Offenders" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Top Repeat Offenders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Total Violations</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {repeatOffenders.map((offender, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{offender.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{offender.vehicle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {offender.violations} violations
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">₹{offender.amount.toLocaleString()}</div>
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
