import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import { AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DisputeResolution() {
  const disputes = mockChallans.filter((c) => c.status === 'disputed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dispute Resolution</h1>
        <p className="text-gray-600">Review and resolve citizen appeals</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Review</p>
          <p className="text-3xl font-bold text-gray-900">{disputes.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Approved</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Rejected</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Resolution Rate</p>
          <p className="text-3xl font-bold text-gray-900">65%</p>
        </div>
      </div>

      <div className="space-y-4">
        {disputes.map((challan) => {
          const penaltyType = penaltyTypes.find((p) => p.id === challan.penaltyTypeId);

          return (
            <div key={challan.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{challan.challanNumber}</h3>
                      <p className="text-sm text-gray-600">{penaltyType?.name}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      PENDING REVIEW
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Violator: </span>
                      <span className="text-gray-900 font-medium">{challan.violatorName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Amount: </span>
                      <span className="text-gray-900 font-medium">₹{challan.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Issue Date: </span>
                      <span className="text-gray-900 font-medium">
                        {new Date(challan.issueDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Location: </span>
                      <span className="text-gray-900 font-medium">{challan.location}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Appeal Reason</p>
                    <p className="text-sm text-gray-700">
                      Citizen claims the vehicle was not parked in a no-parking zone and has provided
                      photographic evidence showing proper parking signage was not visible.
                    </p>
                  </div>

                  {challan.evidenceUrl && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Original Evidence</p>
                      <img
                        src={challan.evidenceUrl}
                        alt="Evidence"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="lg:w-80 space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-3">Review Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Approve Appeal
                      </button>
                      <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Reject Appeal
                      </button>
                      <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Request More Info
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Internal Notes</h4>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      placeholder="Add notes for review..."
                    />
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>Submitted: 2 days ago</p>
                    <p>Officer: {challan.officerName}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
