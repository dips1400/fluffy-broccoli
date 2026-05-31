import { useState, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  AlertTriangle,
  Building2,
  TrendingUp,
  ShieldAlert,
  ChevronDown,
  BarChart3,
  Palette,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Severity = "low" | "medium" | "high" | "critical";
type SortKey = "name" | "maxFine" | "violations";
type ModalMode = "add" | "edit" | "delete" | null;

interface PenaltyType {
  id: string;
  name: string;
  description: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
  color: string;
  department: string;
  severity: Severity;
  violationCount: number;
}

interface PenaltyForm {
  name: string;
  description: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
  color: string;
  department: string;
  severity: Severity;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ICON_OPTIONS: { emoji: string; label: string }[] = [
  { emoji: "🚗", label: "Car" },
  { emoji: "🏎️", label: "Speed" },
  { emoji: "🚦", label: "Signal" },
  { emoji: "🅿️", label: "Parking" },
  { emoji: "📱", label: "Mobile" },
  { emoji: "🍺", label: "Alcohol" },
  { emoji: "⚠️", label: "Warning" },
  { emoji: "🔒", label: "Security" },
  { emoji: "💼", label: "Business" },
  { emoji: "🏭", label: "Industry" },
  { emoji: "🌿", label: "Environment" },
  { emoji: "🔊", label: "Noise" },
  { emoji: "🐾", label: "Animal" },
  { emoji: "🏗️", label: "Building" },
  { emoji: "⚡", label: "Electrical" },
  { emoji: "🛑", label: "Stop" },
  { emoji: "✋", label: "Halt" },
  { emoji: "💰", label: "Financial" },
  { emoji: "🚧", label: "Construction" },
  { emoji: "🏍️", label: "Motorbike" },
];

const SEVERITY_FILTERS: { value: "all" | Severity; label: string }[] = [
  { value: "all", label: "All" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const DEPARTMENTS = [
  "Traffic Police",
  "Municipal Corporation",
  "Pollution Control Board",
  "Fire Department",
  "Revenue Department",
  "Health Department",
];

const INITIAL_PENALTIES: PenaltyType[] = [
  {
    id: "1",
    name: "Speeding",
    description:
      "Exceeding the posted speed limit. Severity scales with how far over the limit the vehicle was travelling.",
    icon: "🏎️",
    minAmount: 500,
    maxAmount: 5000,
    color: "#EF4444",
    department: "Traffic Police",
    severity: "high",
    violationCount: 142,
  },
  {
    id: "2",
    name: "Signal Jump",
    description:
      "Running a red light or ignoring traffic signals at a controlled intersection.",
    icon: "🚦",
    minAmount: 1000,
    maxAmount: 3000,
    color: "#F97316",
    department: "Traffic Police",
    severity: "critical",
    violationCount: 67,
  },
  {
    id: "3",
    name: "Illegal Parking",
    description:
      "Parking in no-parking zones, on footpaths, or in areas that obstruct traffic flow.",
    icon: "🅿️",
    minAmount: 200,
    maxAmount: 2000,
    color: "#3B82F6",
    department: "Municipal Corporation",
    severity: "low",
    violationCount: 389,
  },
  {
    id: "4",
    name: "Mobile Use While Driving",
    description:
      "Using a handheld mobile device while operating a motor vehicle on a public road.",
    icon: "📱",
    minAmount: 1500,
    maxAmount: 5000,
    color: "#8B5CF6",
    department: "Traffic Police",
    severity: "high",
    violationCount: 91,
  },
  {
    id: "5",
    name: "Drunk Driving",
    description:
      "Operating a vehicle under the influence of alcohol or controlled substances beyond legal limits.",
    icon: "🍺",
    minAmount: 10000,
    maxAmount: 50000,
    color: "#DC2626",
    department: "Traffic Police",
    severity: "critical",
    violationCount: 28,
  },
  {
    id: "6",
    name: "No Helmet",
    description:
      "Riding a two-wheeler without a valid ISI-certified helmet for rider or pillion.",
    icon: "🏍️",
    minAmount: 500,
    maxAmount: 1500,
    color: "#10B981",
    department: "Traffic Police",
    severity: "medium",
    violationCount: 214,
  },
  {
    id: "7",
    name: "Environmental Violation",
    description:
      "Illegal dumping of waste, burning garbage, or causing measurable pollution in public spaces.",
    icon: "🌿",
    minAmount: 2000,
    maxAmount: 25000,
    color: "#16A34A",
    department: "Pollution Control Board",
    severity: "high",
    violationCount: 33,
  },
  {
    id: "8",
    name: "Noise Pollution",
    description:
      "Generating noise levels that exceed permitted decibel thresholds during restricted hours.",
    icon: "🔊",
    minAmount: 500,
    maxAmount: 5000,
    color: "#F59E0B",
    department: "Municipal Corporation",
    severity: "medium",
    violationCount: 55,
  },
];

const DEFAULT_FORM: PenaltyForm = {
  name: "",
  description: "",
  icon: "⚠️",
  minAmount: 0,
  maxAmount: 0,
  color: "#3B82F6",
  department: "",
  severity: "low",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sevConfig: Record<
  Severity,
  { label: string; badgeClass: string; dotColor: string }
> = {
  low: {
    label: "Low",
    badgeClass: "bg-blue-50 text-blue-700 border border-blue-200",
    dotColor: "bg-blue-500",
  },
  medium: {
    label: "Medium",
    badgeClass: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    dotColor: "bg-yellow-500",
  },
  high: {
    label: "High",
    badgeClass: "bg-orange-50 text-orange-700 border border-orange-200",
    dotColor: "bg-orange-500",
  },
  critical: {
    label: "Critical",
    badgeClass: "bg-red-50 text-red-700 border border-red-200",
    dotColor: "bg-red-500",
  },
};

function formatINR(amount: number): string {
  if (amount >= 100000)
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  if (amount >= 1000)
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg = sevConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.badgeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  );
}

function ProgressBar({
  pct,
  color,
  height = 3,
}: {
  pct: number;
  color: string;
  height?: number;
}) {
  return (
    <div
      className="w-full rounded-full overflow-hidden bg-gray-100"
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm">
      <div
        className="p-2.5 rounded-lg"
        style={{ backgroundColor: `${accent}15` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function PenaltyCard({
  penalty,
  maxFine,
  maxCount,
  onEdit,
  onDelete,
}: {
  penalty: PenaltyType;
  maxFine: number;
  maxCount: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const finePct = maxFine > 0 ? (penalty.maxAmount / maxFine) * 100 : 0;
  const countPct =
    maxCount > 0 ? (penalty.violationCount / maxCount) * 100 : 0;
  const avgFine = (penalty.minAmount + penalty.maxAmount) / 2;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col overflow-hidden group">
      {/* color stripe */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ backgroundColor: penalty.color }}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none">{penalty.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900 text-base leading-tight">
                {penalty.name}
              </h3>
              <div className="mt-1">
                <SeverityBadge severity={penalty.severity} />
              </div>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              title="Edit"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onDelete}
              title="Delete"
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {penalty.description}
        </p>

        {/* fine range */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-400 font-medium">
              Fine range
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {formatINR(penalty.minAmount)} – {formatINR(penalty.maxAmount)}
            </span>
          </div>
          <ProgressBar pct={finePct} color={penalty.color} height={3} />
        </div>

        {/* violations */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-400 font-medium">
              Violations this period
            </span>
            <span className="text-sm font-medium text-gray-700">
              {penalty.violationCount.toLocaleString("en-IN")}
            </span>
          </div>
          <ProgressBar
            pct={countPct}
            color={penalty.color}
            height={3}
          />
        </div>

        {/* footer meta */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <Building2 className="w-3 h-3" />
            {penalty.department}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            Avg ≈ {formatINR(avgFine)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  mode,
  formData,
  setFormData,
  targetName,
  onSave,
  onDelete,
  onClose,
}: {
  mode: "add" | "edit" | "delete";
  formData: PenaltyForm;
  setFormData: React.Dispatch<React.SetStateAction<PenaltyForm>>;
  targetName?: string;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [deptDropOpen, setDeptDropOpen] = useState(false);

  const isForm = mode === "add" || mode === "edit";

  const set = <K extends keyof PenaltyForm>(key: K, val: PenaltyForm[K]) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {mode === "add"
              ? "Add penalty category"
              : mode === "edit"
              ? "Edit penalty category"
              : "Delete category"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* form */}
        {isForm ? (
          <div className="px-6 py-5 space-y-4">
            {/* name */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Category name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Speeding"
                value={formData.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              />
            </div>

            {/* description */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief description of the violation…"
                value={formData.description}
                onChange={(e) => set("description", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              />
            </div>

            {/* fine range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Min fine (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.minAmount}
                  onChange={(e) => set("minAmount", Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Max fine (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.maxAmount}
                  onChange={(e) => set("maxAmount", Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            {/* department */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Department
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Traffic Police"
                  value={formData.department}
                  onChange={(e) => set("department", e.target.value)}
                  onFocus={() => setDeptDropOpen(true)}
                  onBlur={() => setTimeout(() => setDeptDropOpen(false), 150)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors pr-8"
                />
                <ChevronDown className="absolute right-2.5 top-3 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                {deptDropOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-40 overflow-y-auto">
                    {DEPARTMENTS.filter((d) =>
                      d
                        .toLowerCase()
                        .includes(formData.department.toLowerCase())
                    ).map((d) => (
                      <button
                        key={d}
                        onMouseDown={() => {
                          set("department", d);
                          setDeptDropOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* severity + color */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Severity
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => set("severity", e.target.value as Severity)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                >
                  {(["low", "medium", "high", "critical"] as Severity[]).map(
                    (s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  <span className="inline-flex items-center gap-1">
                    <Palette className="w-3 h-3" /> Accent color
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => set("color", e.target.value)}
                    className="h-10 w-14 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                  />
                  <span className="text-xs text-gray-400 font-mono">
                    {formData.color.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* icon picker */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Icon
              </label>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{formData.icon}</span>
                <button
                  type="button"
                  onClick={() => setIconPickerOpen(!iconPickerOpen)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {iconPickerOpen ? "Close picker" : "Choose icon"}
                </button>
              </div>
              {iconPickerOpen && (
                <div className="grid grid-cols-8 gap-1.5 max-h-36 overflow-y-auto p-2 border border-gray-100 rounded-xl bg-gray-50">
                  {ICON_OPTIONS.map(({ emoji, label }) => (
                    <button
                      key={emoji}
                      type="button"
                      title={label}
                      onClick={() => {
                        set("icon", emoji);
                        setIconPickerOpen(false);
                      }}
                      className={`p-2 rounded-lg text-xl transition-all hover:bg-white hover:shadow-sm ${
                        formData.icon === emoji
                          ? "bg-blue-100 ring-2 ring-blue-400"
                          : "hover:scale-110"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* preview */}
            <div className="border border-dashed border-gray-200 rounded-xl p-3 bg-gray-50">
              <p className="text-xs text-gray-400 mb-2 font-medium">Preview</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{formData.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {formData.name || "Category name"}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <SeverityBadge severity={formData.severity} />
                    <span
                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: formData.color }}
                    />
                  </div>
                </div>
                {formData.maxAmount > 0 && (
                  <span className="ml-auto text-sm font-semibold text-gray-700">
                    Up to {formatINR(formData.maxAmount)}
                  </span>
                )}
              </div>
            </div>

            {/* actions */}
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={!formData.name.trim()}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {mode === "add" ? "Add category" : "Save changes"}
              </button>
            </div>
          </div>
        ) : (
          /* delete confirmation */
          <div className="px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete "{targetName}"?
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6">
              This permanently removes the category. Any linked violation
              records may be affected. This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-5 py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete category
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PenaltyManagement() {
  const [penalties, setPenalties] = useState<PenaltyType[]>(INITIAL_PENALTIES);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<"all" | Severity>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PenaltyForm>(DEFAULT_FORM);

  const selected = penalties.find((p) => p.id === selectedId) ?? null;

  // ── derived stats ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalViolations = penalties.reduce((a, p) => a + p.violationCount, 0);
    const estRevenue = penalties.reduce(
      (a, p) => a + ((p.minAmount + p.maxAmount) / 2) * p.violationCount,
      0
    );
    const criticalCount = penalties.filter((p) => p.severity === "critical").length;
    return { totalViolations, estRevenue, criticalCount };
  }, [penalties]);

  const maxFine = Math.max(...penalties.map((p) => p.maxAmount), 1);
  const maxCount = Math.max(...penalties.map((p) => p.violationCount), 1);

  // ── filtered & sorted list ───────────────────────────────────────────────
  const displayList = useMemo(() => {
    let list = [...penalties];
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    if (severityFilter !== "all")
      list = list.filter((p) => p.severity === severityFilter);
    list.sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "maxFine") return b.maxAmount - a.maxAmount;
      if (sortKey === "violations") return b.violationCount - a.violationCount;
      return 0;
    });
    return list;
  }, [penalties, search, severityFilter, sortKey]);

  // ── modal helpers ────────────────────────────────────────────────────────
  function openAdd() {
    setFormData({ ...DEFAULT_FORM });
    setSelectedId(null);
    setModalMode("add");
  }

  function openEdit(id: string) {
    const p = penalties.find((x) => x.id === id)!;
    setFormData({
      name: p.name,
      description: p.description,
      icon: p.icon,
      minAmount: p.minAmount,
      maxAmount: p.maxAmount,
      color: p.color,
      department: p.department,
      severity: p.severity,
    });
    setSelectedId(id);
    setModalMode("edit");
  }

  function openDelete(id: string) {
    setSelectedId(id);
    setModalMode("delete");
  }

  function closeModal() {
    setModalMode(null);
    setSelectedId(null);
  }

  function handleSave() {
    if (!formData.name.trim()) return;
    if (modalMode === "add") {
      const newPenalty: PenaltyType = {
        ...formData,
        id: Date.now().toString(),
        violationCount: 0,
      };
      setPenalties((prev) => [...prev, newPenalty]);
    } else if (modalMode === "edit" && selectedId) {
      setPenalties((prev) =>
        prev.map((p) =>
          p.id === selectedId ? { ...p, ...formData } : p
        )
      );
    }
    closeModal();
  }

  function handleDelete() {
    if (!selectedId) return;
    setPenalties((prev) => prev.filter((p) => p.id !== selectedId));
    closeModal();
  }

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-9xl mx-auto sm:px-6 lg:px-1 py-3 space-y-2">

        {/* Page header */}
        <div className="flex flex-wrap gap-4 items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Penalty categories
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage fine types, amounts, departments, and severities
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add category
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total categories"
            value={String(penalties.length)}
            icon={BarChart3}
            accent="#3B82F6"
          />
          <StatCard
            label="Critical types"
            value={String(stats.criticalCount)}
            icon={ShieldAlert}
            accent="#DC2626"
          />
          <StatCard
            label="Total violations"
            value={stats.totalViolations.toLocaleString("en-IN")}
            icon={AlertTriangle}
            accent="#F97316"
          />
          <StatCard
            label="Est. revenue"
            value={formatINR(stats.estRevenue)}
            icon={TrendingUp}
            accent="#10B981"
          />
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, department, or description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white text-gray-700 transition-colors"
            >
              <option value="name">Sort: Name</option>
              <option value="maxFine">Sort: Max fine</option>
              <option value="violations">Sort: Violations</option>
            </select>
          </div>

          {/* severity pills */}
          <div className="flex flex-wrap gap-2">
            {SEVERITY_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSeverityFilter(value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  severityFilter === value
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 flex items-center">
              {displayList.length} of {penalties.length} categories
            </span>
          </div>
        </div>

        {/* Grid */}
        {displayList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayList.map((p) => (
              <PenaltyCard
                key={p.id}
                penalty={p}
                maxFine={maxFine}
                maxCount={maxCount}
                onEdit={() => openEdit(p.id)}
                onDelete={() => openDelete(p.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
            <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No categories found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSeverityFilter("all");
              }}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalMode && (
        <Modal
          mode={modalMode}
          formData={formData}
          setFormData={setFormData}
          targetName={selected?.name}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}