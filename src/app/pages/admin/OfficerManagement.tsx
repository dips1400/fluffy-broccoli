import { useState } from "react";
import {
  Users,
  UserPlus,
  Award,
  TrendingUp,
  X,
  Eye,
} from "lucide-react";

export default function OfficerManagement() {
  const [officers, setOfficers] = useState([
    {
      id: "OFF-001",
      name: "Inspector Sharma",
      department: "Traffic",
      challans: 45,
      revenue: 89000,
      status: "active",
    },
    {
      id: "OFF-012",
      name: "Officer Gupta",
      department: "Sanitation",
      challans: 38,
      revenue: 76000,
      status: "active",
    },
    {
      id: "OFF-008",
      name: "Inspector Mehra",
      department: "Land & Building",
      challans: 32,
      revenue: 64000,
      status: "active",
    },
    {
      id: "OFF-025",
      name: "Traffic Officer Singh",
      department: "Traffic",
      challans: 41,
      revenue: 82000,
      status: "active",
    },
    {
      id: "OFF-034",
      name: "Revenue Officer Kapoor",
      department: "Revenue",
      challans: 28,
      revenue: 156000,
      status: "active",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [viewOfficer, setViewOfficer] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    department: "",
    challans: "",
    revenue: "",
    status: "active",
  });

  function handleAddOfficer() {
    if (!form.name || !form.department) return;

    const newOfficer = {
      id: `OFF-${Math.floor(Math.random() * 900 + 100)}`,
      name: form.name,
      department: form.department,
      challans: Number(form.challans || 0),
      revenue: Number(form.revenue || 0),
      status: form.status,
    };

    setOfficers((prev) => [newOfficer, ...prev]);
    setShowAddModal(false);
    setForm({
      name: "",
      department: "",
      challans: "",
      revenue: "",
      status: "active",
    });
  }

  return (
    <div className="space-y-6 relative">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Officer Management
          </h1>
          <p className="text-gray-600">
            Manage enforcement officers and departments
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Officer
        </button>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <Users className="w-6 h-6 text-blue-600" />
          <p className="text-sm text-gray-600 mt-2">Total Officers</p>
          <p className="text-3xl font-bold">42</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <p className="text-sm text-gray-600 mt-2">Avg Performance</p>
          <p className="text-3xl font-bold">87%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <Award className="w-6 h-6 text-purple-600" />
          <p className="text-sm text-gray-600 mt-2">Top Performer</p>
          <p className="font-bold">Inspector Sharma</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <Users className="w-6 h-6 text-orange-600" />
          <p className="text-sm text-gray-600 mt-2">Departments</p>
          <p className="text-3xl font-bold">8</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Officer List</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs">ID</th>
              <th className="px-4 py-3 text-left text-xs">Name</th>
              <th className="px-4 py-3 text-left text-xs">Dept</th>
              <th className="px-4 py-3 text-left text-xs">Challans</th>
              <th className="px-4 py-3 text-left text-xs">Revenue</th>
              <th className="px-4 py-3 text-left text-xs">Action</th>
            </tr>
          </thead>

          <tbody>
            {officers.map((o) => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{o.id}</td>
                <td className="px-4 py-3">{o.name}</td>
                <td className="px-4 py-3">{o.department}</td>
                <td className="px-4 py-3">{o.challans}</td>
                <td className="px-4 py-3">₹{o.revenue}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setViewOfficer(o)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────── ADD OFFICER MODAL ───────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-3 top-3"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Add Officer</h2>

            <div className="space-y-3">
              <input
                placeholder="Name"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Department"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />

              <input
                placeholder="Challans"
                type="number"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, challans: e.target.value })
                }
              />

              <input
                placeholder="Revenue"
                type="number"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, revenue: e.target.value })
                }
              />

              <button
                onClick={handleAddOfficer}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Add Officer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────── VIEW OFFICER MODAL ───────── */}
      {viewOfficer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setViewOfficer(null)}
              className="absolute right-3 top-3"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Officer Details</h2>

            <div className="space-y-2 text-sm">
              <p><b>ID:</b> {viewOfficer.id}</p>
              <p><b>Name:</b> {viewOfficer.name}</p>
              <p><b>Department:</b> {viewOfficer.department}</p>
              <p><b>Challans:</b> {viewOfficer.challans}</p>
              <p><b>Revenue:</b> ₹{viewOfficer.revenue}</p>
              <p><b>Status:</b> {viewOfficer.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}