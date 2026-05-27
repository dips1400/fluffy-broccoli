import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { mockChallans, penaltyTypes } from '../../data/penaltyTypes';
import { CreditCard, Smartphone, Building2, Wallet, QrCode, CheckCircle } from 'lucide-react';

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
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

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/citizen/history');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your fine has been paid successfully</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
            <p className="text-3xl font-bold text-green-600">₹{challan.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Challan: {challan.challanNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">Receipt sent to {challan.violatorContact}</p>
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link to={`/citizen/challan/${id}`} className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
          ← Back to Challan
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
        <p className="text-gray-600">Complete your payment securely</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-bold text-gray-900 mb-4">Select Payment Method</h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { id: 'upi', icon: Smartphone, label: 'UPI' },
                { id: 'card', icon: CreditCard, label: 'Card' },
                { id: 'netbanking', icon: Building2, label: 'Net Banking' },
                { id: 'wallet', icon: Wallet, label: 'Wallet' },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-medium ${
                      paymentMethod === method.id ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      {method.label}
                    </p>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Or scan QR code to pay</p>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                </select>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="space-y-3">
                {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                  <button
                    key={wallet}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left font-medium"
                  >
                    {wallet}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            Pay ₹{challan.amount.toLocaleString()}
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Challan Number</span>
                <span className="font-medium text-gray-900">{challan.challanNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Violation Type</span>
                <span className="font-medium text-gray-900">{penaltyType?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Department</span>
                <span className="font-medium text-gray-900">{challan.department}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Fine Amount</span>
                <span className="font-medium text-gray-900">₹{challan.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-600">Convenience Fee</span>
                <span className="font-medium text-gray-900">₹0</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">₹{challan.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Secure Payment</h4>
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and secure. We do not store your payment details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
