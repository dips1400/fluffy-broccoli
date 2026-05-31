import { useState } from 'react';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import { Search, Filter, Download, Eye, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router';

export default function ChallanManagement() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChallan, setSelectedChallan] = useState<any>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
  const [challans, setChallans] = useState(mockChallans);

  const filteredChallans = mockChallans.filter((challan) => {
    const matchesStatus = statusFilter === 'all' || challan.status === statusFilter;
    const matchesSearch =
      searchTerm === '' ||
      challan.challanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challan.violatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challan.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const [editForm, setEditForm] = useState<any>({});

  const handleViewDetails = (challanId: string) => {
    const challan = challans.find((c) => c.id === challanId);

    if (challan) {
      setSelectedChallan(challan);
      setModalType('view');
    }
  };

  const handleEdit = (challanId: string) => {
    const challan = challans.find((c) => c.id === challanId);

    if (challan) {
      setSelectedChallan(challan);
      setEditForm(challan);
      setModalType('edit');
    }
  };

  const handleDelete = (challanId: string) => {
    const challan = challans.find((c) => c.id === challanId);

    if (challan) {
      setSelectedChallan(challan);
      setModalType('delete');
    }
  };

  const saveChanges = () => {
    setChallans(
      challans.map((c) =>
        c.id === editForm.id ? editForm : c
      )
    );

    closeModal();
  };

  const confirmDelete = () => {
    setChallans(
      challans.filter((c) => c.id !== selectedChallan.id)
    );

    closeModal();
  };

  const closeModal = () => {
    setSelectedChallan(null);
    setModalType(null);
  };

  return (
    <>
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
                className={`px-4 py-2 rounded-lg transition-colors ${statusFilter === filter.value
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
                  const penaltyType: any = penaltyTypes.find((p) => p.id === challan.penaltyTypeId);
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
                          className={`px-3 py-1 rounded-full text-xs font-medium ${challan.status === 'paid'
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
                          {/* <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleViewDetails(challan.id)}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button> */}
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            onClick={() => handleViewDetails(challan.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => handleEdit(challan.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => handleDelete(challan.id)}
                          >
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
      {modalType && selectedChallan && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center border-b p-6">
              <h2 className="text-2xl font-bold">
                {modalType === 'view' && 'Challan Details'}
                {modalType === 'edit' && 'Edit Challan'}
                {modalType === 'delete' && 'Delete Challan'}
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* VIEW */}
            {modalType === 'view' && (
              <div className="p-6">

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="text-gray-500 text-sm">
                      Challan Number
                    </label>
                    <p className="font-semibold">
                      {selectedChallan.challanNumber}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Status
                    </label>
                    <p className="font-semibold capitalize">
                      {selectedChallan.status}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Violator Name
                    </label>
                    <p>{selectedChallan.violatorName}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Contact
                    </label>
                    <p>{selectedChallan.violatorContact}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Vehicle Number
                    </label>
                    <p>{selectedChallan.vehicleNumber || '-'}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Property Number
                    </label>
                    <p>{selectedChallan.propertyNumber || '-'}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Amount
                    </label>
                    <p className="font-bold text-red-600">
                      ₹{selectedChallan.amount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Department
                    </label>
                    <p>{selectedChallan.department}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Issue Date
                    </label>
                    <p>
                      {new Date(
                        selectedChallan.issueDate
                      ).toLocaleDateString('en-IN')}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-500 text-sm">
                      Due Date
                    </label>
                    <p>
                      {new Date(
                        selectedChallan.dueDate
                      ).toLocaleDateString('en-IN')}
                    </p>
                  </div>

                </div>

                <div className="mt-6">
                  <label className="text-gray-500 text-sm">
                    Location
                  </label>
                  <p>{selectedChallan.location}</p>
                </div>

                <div className="mt-6">
                  <label className="text-gray-500 text-sm">
                    Officer Details
                  </label>

                  <div className="bg-gray-50 rounded-lg p-4 mt-2">
                    <p>{selectedChallan.officerName}</p>
                    <p className="text-gray-500">
                      {selectedChallan.officerId}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-gray-500 text-sm">
                    Notes
                  </label>

                  <div className="bg-gray-50 rounded-lg p-4 mt-2">
                    {selectedChallan.notes || 'No notes available'}
                  </div>
                </div>

                {selectedChallan.evidenceUrl && (
                  <div className="mt-6">
                    <label className="text-gray-500 text-sm">
                      Evidence
                    </label>

                    <img
                      src={selectedChallan.evidenceUrl}
                      alt="Evidence"
                      className="mt-2 rounded-lg w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* EDIT */}
            {modalType === 'edit' && (
              <div className="p-6 space-y-4">

                <input
                  value={editForm.violatorName}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      violatorName: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                  placeholder="Violator Name"
                />

                <input
                  value={editForm.violatorContact}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      violatorContact: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                  placeholder="Contact"
                />

                <input
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                  placeholder="Location"
                />

                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      amount: Number(e.target.value),
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="disputed">Disputed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <textarea
                  rows={4}
                  value={editForm.notes || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      notes: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveChanges}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* DELETE */}
            {modalType === 'delete' && (
              <div className="p-8 text-center">

                <Trash2 className="w-14 h-14 text-red-500 mx-auto mb-4" />

                <h3 className="text-xl font-bold mb-2">
                  Delete Challan?
                </h3>

                <p className="text-gray-600">
                  You are about to delete
                  <span className="font-semibold ml-1">
                    {selectedChallan.challanNumber}
                  </span>
                </p>

                <p className="text-red-500 mt-2">
                  This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
