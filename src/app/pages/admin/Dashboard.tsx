import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  AlertTriangle,
  CheckCircle,
  Users,
  BarChart3,
} from 'lucide-react';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const stats = {
    totalFines: mockChallans.length,
    revenueCollected: mockChallans
      .filter((c) => c.status === 'paid')
      .reduce((sum, c) => sum + c.amount, 0),
    pendingAmount: mockChallans
      .filter((c) => c.status === 'pending' || c.status === 'overdue')
      .reduce((sum, c) => sum + c.amount, 0),
    overdueCount: mockChallans.filter((c) => c.status === 'overdue').length,
  };

  const categoryData = penaltyTypes.slice(0, 6).map((type) => ({
    name: type.name.split(' ')[0],
    count: mockChallans.filter((c) => c.penaltyTypeId === type.id).length,
    revenue: mockChallans
      .filter((c) => c.penaltyTypeId === type.id && c.status === 'paid')
      .reduce((sum, c) => sum + c.amount, 0),
  }));

  const statusData = [
    { name: 'Paid', value: mockChallans.filter((c) => c.status === 'paid').length, color: '#10B981' },
    { name: 'Pending', value: mockChallans.filter((c) => c.status === 'pending').length, color: '#F59E0B' },
    { name: 'Overdue', value: mockChallans.filter((c) => c.status === 'overdue').length, color: '#EF4444' },
    { name: 'Disputed', value: mockChallans.filter((c) => c.status === 'disputed').length, color: '#8B5CF6' },
  ];

  const monthlyData = [
    { month: 'Jan', fines: 45, revenue: 89000 },
    { month: 'Feb', fines: 52, revenue: 105000 },
    { month: 'Mar', fines: 48, revenue: 96000 },
    { month: 'Apr', fines: 61, revenue: 122000 },
    { month: 'May', fines: 38, revenue: 76000 },
  ];

  const recentActivity = [
    { action: 'New challan issued', officer: 'Inspector Sharma', time: '5 mins ago', type: 'success' },
    { action: 'Payment received', officer: 'System', time: '12 mins ago', type: 'success' },
    { action: 'Appeal submitted', officer: 'Citizen', time: '1 hour ago', type: 'warning' },
    { action: 'Challan disputed', officer: 'Officer Gupta', time: '2 hours ago', type: 'error' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of fine and penalty management</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Fines Issued</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalFines}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Revenue Collected</p>
          <p className="text-3xl font-bold text-gray-900">₹{(stats.revenueCollected / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
          <p className="text-3xl font-bold text-gray-900">₹{(stats.pendingAmount / 1000).toFixed(0)}K</p>
          <p className="text-xs text-orange-600 mt-2">{mockChallans.filter(c => c.status === 'pending').length} challans</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Overdue Challans</p>
          <p className="text-3xl font-bold text-gray-900">{stats.overdueCount}</p>
          <p className="text-xs text-red-600 mt-2">Requires immediate action</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="fines"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Fines Issued"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Violation Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" name="Count" />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                <div
                  className={`p-2 rounded-lg ${
                    activity.type === 'success'
                      ? 'bg-green-100'
                      : activity.type === 'warning'
                      ? 'bg-orange-100'
                      : 'bg-red-100'
                  }`}
                >
                  {activity.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : activity.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.officer}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <Users className="w-8 h-8 mb-3 opacity-90" />
          <p className="text-blue-100 mb-1">Active Officers</p>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-blue-100 mt-2">Currently on duty</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <CheckCircle className="w-8 h-8 mb-3 opacity-90" />
          <p className="text-green-100 mb-1">Collection Rate</p>
          <p className="text-3xl font-bold">78%</p>
          <p className="text-sm text-green-100 mt-2">This month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <BarChart3 className="w-8 h-8 mb-3 opacity-90" />
          <p className="text-purple-100 mb-1">Avg Fine Amount</p>
          <p className="text-3xl font-bold">₹{(stats.revenueCollected / mockChallans.filter(c => c.status === 'paid').length).toFixed(0)}</p>
          <p className="text-sm text-purple-100 mt-2">Per challan</p>
        </div>
      </div>
    </div>
  );
}
