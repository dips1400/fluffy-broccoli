import { useState } from 'react';
import { penaltyTypes } from '../../data/penaltyTypes';
import * as Icons from 'lucide-react';
import { MapPin, Camera, QrCode, CheckCircle } from 'lucide-react';

export default function GenerateChallan() {
  const [selectedPenalty, setSelectedPenalty] = useState('');
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedPenaltyType = penaltyTypes.find((p) => p.id === selectedPenalty);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPenalty('');
      setAmount('');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Challan Generated!</h2>
          <p className="text-gray-600 mb-6">QR-coded digital challan created successfully</p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="bg-gray-200 w-48 h-48 rounded-lg flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Challan Number</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">MC/2026/{selectedPenaltyType?.id.toUpperCase()}/{Math.floor(Math.random() * 10000).toString().padStart(6, '0')}</p>
            <p className="text-sm text-gray-500">Amount: <span className="font-bold text-gray-900">₹{amount}</span></p>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Download PDF
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Send via SMS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Challan</h1>
        <p className="text-gray-600">Issue a new digital challan with QR code</p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-bold text-gray-900 mb-4">Select Violation Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {penaltyTypes.map((type) => {
              const IconComponent = (Icons as any)[type.icon];
              const isSelected = selectedPenalty === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setSelectedPenalty(type.id);
                    setAmount(type.minAmount.toString());
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: isSelected ? `${type.color}40` : `${type.color}20` }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: type.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {type.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">₹{type.minAmount} - ₹{type.maxAmount}</p>
                </button>
              );
            })}
          </div>
        </div>

        {selectedPenalty && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-bold text-gray-900 mb-4">Violator Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter violator name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="DL-01-AB-1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="H-123/45"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-bold text-gray-900 mb-4">Violation Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fine Amount *
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={selectedPenaltyType?.minAmount}
                    max={selectedPenaltyType?.maxAmount}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Range: ₹{selectedPenaltyType?.minAmount} - ₹{selectedPenaltyType?.maxAmount}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter violation location"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Use Current GPS Location
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes / Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Add any additional notes about the violation..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-bold text-gray-900 mb-4">Evidence</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-1">Upload or capture evidence photo</p>
                <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 5MB</p>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Browse Files
                  </button>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Take Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-bold text-gray-900 mb-4">Officer Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Officer Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="Inspector Sharma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Officer ID *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="OFF-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedPenaltyType?.department}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Generate QR Challan
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
