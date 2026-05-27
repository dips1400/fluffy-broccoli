import { Download, Calendar, FileBarChart, TrendingUp } from 'lucide-react';

export default function Reports() {
  const reportTypes = [
    {
      id: 'daily',
      name: 'Daily Collection Report',
      description: 'Daily summary of fines issued and revenue collected',
      icon: Calendar,
      color: 'blue',
    },
    {
      id: 'monthly',
      name: 'Monthly Revenue Report',
      description: 'Comprehensive monthly revenue and performance analytics',
      icon: TrendingUp,
      color: 'green',
    },
    {
      id: 'department',
      name: 'Department-wise Report',
      description: 'Performance breakdown by department and violation type',
      icon: FileBarChart,
      color: 'purple',
    },
    {
      id: 'audit',
      name: 'Audit Trail Report',
      description: 'Complete audit log of all system activities',
      icon: FileBarChart,
      color: 'orange',
    },
  ];

  const recentReports = [
    { name: 'May 2026 Revenue Report', date: '2026-05-27', size: '2.4 MB', type: 'PDF' },
    { name: 'Weekly Analytics - Week 21', date: '2026-05-25', size: '1.8 MB', type: 'Excel' },
    { name: 'Traffic Department Report', date: '2026-05-20', size: '3.1 MB', type: 'PDF' },
    { name: 'Defaulter Analysis Q2', date: '2026-05-15', size: '4.2 MB', type: 'PDF' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and download system reports</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <div
                className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon className={`w-6 h-6 text-${report.color}-600`} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Format</label>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      PDF
                    </button>
                    <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      Excel
                    </button>
                  </div>
                </div>

                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium mt-2">
                  <Download className="w-4 h-4" />
                  Generate Report
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReports.map((report, index) => (
            <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileBarChart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(report.date).toLocaleDateString('en-IN')} · {report.size} · {report.type}
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Automated Report Scheduling</h3>
        <p className="text-blue-100 mb-6">
          Set up automated reports to be generated and sent via email at regular intervals
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
          Configure Auto Reports
        </button>
      </div>
    </div>
  );
}
