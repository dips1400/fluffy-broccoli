import { useParams, Link } from 'react-router';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import {
  Calendar,
  MapPin,
  User,
  Phone,
  Car,
  Home,
  Download,
  CreditCard,
  MessageSquare,
  QrCode,
} from 'lucide-react';

export default function ChallanDetails() {
  const { id } = useParams();
  const challan = mockChallans.find((c) => c.id === id);

  if (!challan) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Challan not found</p>
        <Link to="/citizen" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const penaltyType = penaltyTypes.find((p) => p.id === challan.penaltyTypeId);
  const IconComponent = penaltyType ? (Icons as any)[penaltyType.icon] : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Link to="/citizen" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Challan Details</h1>
          <p className="text-gray-600">{challan.challanNumber}</p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
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

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-start gap-4 mb-6">
              {IconComponent && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${penaltyType.color}20` }}>
                  <IconComponent className="w-8 h-8" style={{ color: penaltyType.color }} />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{penaltyType?.name}</h2>
                <p className="text-gray-600">{penaltyType?.description}</p>
                <div className="flex gap-4 mt-3">
                  <span className="text-sm text-gray-500">
                    Department: <span className="font-medium text-gray-700">{challan.department}</span>
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      penaltyType?.severity === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : penaltyType?.severity === 'high'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {penaltyType?.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-medium mb-1">Fine Amount</p>
              <p className="text-4xl font-bold text-blue-900">₹{challan.amount.toLocaleString()}</p>
              {challan.status !== 'paid' && (
                <p className="text-sm text-blue-700 mt-2">
                  Due Date: {new Date(challan.dueDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>

          {challan.evidenceUrl && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">Violation Evidence</h3>
              <img
                src={challan.evidenceUrl}
                alt="Violation evidence"
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-600 mt-3">{challan.notes}</p>
            </div>
          )}

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-bold text-gray-900 mb-4">Violation Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(challan.issueDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{challan.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Violator Name</p>
                  <p className="font-medium text-gray-900">{challan.violatorName}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium text-gray-900">{challan.violatorContact}</p>
                </div>
              </div>

              {challan.vehicleNumber && (
                <div className="flex gap-3">
                  <Car className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Number</p>
                    <p className="font-medium text-gray-900">{challan.vehicleNumber}</p>
                  </div>
                </div>
              )}

              {challan.propertyNumber && (
                <div className="flex gap-3">
                  <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Property Number</p>
                    <p className="font-medium text-gray-900">{challan.propertyNumber}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Issuing Officer</p>
                  <p className="font-medium text-gray-900">{challan.officerName}</p>
                  <p className="text-xs text-gray-500">{challan.officerId}</p>
                </div>
              </div>
            </div>
          </div>

          {challan.paymentDate && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-900 mb-2">Payment Completed</h3>
              <p className="text-sm text-green-700">
                Paid on: {new Date(challan.paymentDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Digital Challan QR
            </h3>
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">{challan.qrCode}</p>
              </div>
            </div>
            <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download QR
            </button>
          </div>

          {challan.status !== 'paid' && challan.status !== 'cancelled' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border space-y-3">
              <h3 className="font-bold text-gray-900 mb-4">Actions</h3>

              <Link
                to={`/citizen/payment/${challan.id}`}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <CreditCard className="w-5 h-5" />
                Pay Now
              </Link>

              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium">
                <Download className="w-5 h-5" />
                Download PDF
              </button>

              <Link
                to={`/citizen/appeal/${challan.id}`}
                className="w-full border-2 border-orange-300 text-orange-700 py-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <MessageSquare className="w-5 h-5" />
                Raise Appeal
              </Link>
            </div>
          )}

          {challan.status === 'paid' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium">
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
