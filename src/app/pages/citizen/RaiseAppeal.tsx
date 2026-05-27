import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import { Upload, X, CheckCircle } from 'lucide-react';

export default function RaiseAppeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/citizen/history');
    }, 3000);
  };

  const handleFileUpload = () => {
    setUploadedFiles([...uploadedFiles, 'document-' + (uploadedFiles.length + 1) + '.pdf']);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appeal Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your appeal has been submitted successfully and is under review
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Challan Number</p>
            <p className="font-medium text-gray-900">{challan.challanNumber}</p>
            <p className="text-sm text-gray-500 mt-3">Appeal ID</p>
            <p className="font-medium text-gray-900">APL-{Date.now().toString().slice(-8)}</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            You will be notified about the status via SMS and email
          </p>
          <Link
            to="/citizen/history"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link to={`/citizen/challan/${id}`} className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
          ← Back to Challan
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Raise Appeal</h1>
        <p className="text-gray-600">Contest this challan with supporting evidence</p>
      </div>

      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
        <h3 className="font-medium text-orange-900 mb-2">Important Information</h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Appeals must be submitted within 30 days of challan issue</li>
          <li>• Provide clear evidence and explanation for your appeal</li>
          <li>• Appeals typically take 7-15 working days to process</li>
          <li>• Payment deadline is not extended during appeal process</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="font-bold text-gray-900 mb-4">Challan Information</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Challan Number</p>
            <p className="font-medium text-gray-900">{challan.challanNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Violation Type</p>
            <p className="font-medium text-gray-900">{penaltyType?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Fine Amount</p>
            <p className="font-medium text-gray-900">₹{challan.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Issue Date</p>
            <p className="font-medium text-gray-900">
              {new Date(challan.issueDate).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-bold text-gray-900 mb-4">Appeal Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Appeal *
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason</option>
                <option value="incorrect">Incorrect Information</option>
                <option value="notguilty">Not Guilty of Violation</option>
                <option value="emergency">Emergency Situation</option>
                <option value="duplicate">Duplicate Challan</option>
                <option value="technical">Technical Error</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Explanation *
              </label>
              <textarea
                required
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Provide a detailed explanation for your appeal. Include relevant facts, dates, and circumstances..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 50 characters required</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-bold text-gray-900 mb-4">Upload Evidence</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload photos, documents, or any evidence supporting your appeal (Optional)
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">Click to upload files</p>
            <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB each</p>
            <button
              type="button"
              onClick={handleFileUpload}
              className="mt-4 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Browse Files
            </button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{file}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                defaultValue={challan.violatorContact}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to={`/citizen/challan/${id}`}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Appeal
          </button>
        </div>
      </form>
    </div>
  );
}
