import { useState } from "react";
import { penaltyTypes, PenaltyType } from "../../data/penaltyTypes";
import * as Icons from "lucide-react";
import { Info, X, Shield, Building2, IndianRupee } from "lucide-react";

export default function FineCategories() {
  const [selected, setSelected] = useState<PenaltyType | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fine Categories</h1>
        <p className="text-gray-600">
          All penalty types managed by the municipal corporation
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {penaltyTypes.map((type) => {
          const IconComponent = (Icons as any)[type.icon];

          return (
            <div
              key={type.id}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${type.color}20` }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: type.color }} />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{type.name}</h3>

                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      type.severity === "critical"
                        ? "bg-red-100 text-red-700"
                        : type.severity === "high"
                        ? "bg-orange-100 text-orange-700"
                        : type.severity === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {type.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{type.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fine Range:</span>
                  <span className="font-semibold text-gray-900">
                    ₹{type.minAmount.toLocaleString()} - ₹
                    {type.maxAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium text-gray-700">
                    {type.department}
                  </span>
                </div>
              </div>

              {/* VIEW BUTTON */}
              <button
                onClick={() => setSelected(type)}
                className="mt-4 w-full bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Info className="w-4 h-4" />
                View Rules
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${selected.color}20` }}
                >
                  {(() => {
                    const Icon = (Icons as any)[selected.icon];
                    return (
                      <Icon
                        className="w-5 h-5"
                        style={{ color: selected.color }}
                      />
                    );
                  })()}
                </div>

                <div>
                  <h2 className="font-bold text-lg text-gray-900">
                    {selected.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Department: {selected.department}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5">

              {/* SEVERITY */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Severity Level</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selected.severity === "critical"
                      ? "bg-red-100 text-red-700"
                      : selected.severity === "high"
                      ? "bg-orange-100 text-orange-700"
                      : selected.severity === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selected.severity.toUpperCase()}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selected.description}
                </p>
              </div>

              {/* RANGE */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-700 text-sm font-medium">
                    <IndianRupee className="w-4 h-4" />
                    Minimum Fine
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ₹{selected.minAmount.toLocaleString()}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                    <IndianRupee className="w-4 h-4" />
                    Maximum Fine
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ₹{selected.maxAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* RULES SECTION */}
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-600" />
                  Enforcement Guidelines
                </h4>

                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                  <li>Violation is recorded via field inspection or evidence.</li>
                  <li>Fine amount depends on severity and repeat offense.</li>
                  <li>Appeal can be submitted within 7–15 days.</li>
                  <li>Officer discretion applies for on-spot escalation.</li>
                </ul>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}