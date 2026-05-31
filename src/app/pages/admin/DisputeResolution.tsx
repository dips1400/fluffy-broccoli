import { useState, useMemo } from "react";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  X,
  ChevronDown,
  MessageSquare,
  Eye,
  FileText,
  MapPin,
  User,
  Calendar,
  IndianRupee,
  Shield,
  Filter,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Info,
  Hash,
  Building2,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type DisputeStatus = "pending" | "approved" | "rejected" | "info_requested";
type SortKey = "date" | "amount" | "challan";
type FilterStatus = "all" | DisputeStatus;

interface Dispute {
  id: string;
  challanNumber: string;
  violatorName: string;
  vehicleNumber: string;
  amount: number;
  penaltyType: string;
  issueDate: string;
  submittedDate: string;
  location: string;
  officerName: string;
  officerBadge: string;
  department: string;
  appealReason: string;
  citizenDescription: string;
  evidenceProvided: boolean;
  evidenceImages?: string[];
  status: DisputeStatus;
  priority: "low" | "medium" | "high";
  notes: string;
  history: HistoryEntry[];
}

interface HistoryEntry {
  action: string;
  by: string;
  at: string;
  note?: string;
}


// ─── Constants ─────────────────────────────────────────────────────────────────

const APPEAL_REASONS = [
  "Signage not visible",
  "Wrong vehicle details",
  "Technical malfunction",
  "Medical emergency",
  "Proper documentation available",
  "Wrong location recorded",
  "Officer misconduct",
];

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "d1",
    challanNumber: "MH-2024-08821",
    violatorName: "Rajesh Kumar Sharma",
    vehicleNumber: "MH 01 AB 4521",
    amount: 2000,
    penaltyType: "Illegal Parking",
    issueDate: "2024-05-10",
    submittedDate: "2024-05-12",
    location: "Linking Road, Bandra West, Mumbai",
    officerName: "Constable D. Patil",
    officerBadge: "TC-4421",
    department: "Traffic Police",
    appealReason: "Signage not visible",
    citizenDescription:
      "The no-parking signage at Linking Road was obscured by a construction hoarding installed by BMC. I have attached photographs clearly showing the obstruction. My vehicle was parked legally as there was no visible restriction.",
    evidenceProvided: true,
    status: "pending",
    priority: "high",
    notes: "",
    evidenceImages: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    ],
    history: [
      { action: "Challan issued", by: "Constable D. Patil", at: "2024-05-10 10:32 AM" },
      { action: "Appeal submitted", by: "Rajesh Kumar Sharma", at: "2024-05-12 03:15 PM", note: "Submitted via citizen portal" },
    ],
  },
  {
    id: "d2",
    challanNumber: "MH-2024-09103",
    violatorName: "Priya Mehta",
    vehicleNumber: "MH 02 CD 7891",
    amount: 5000,
    penaltyType: "Mobile Use While Driving",
    issueDate: "2024-05-14",
    submittedDate: "2024-05-15",
    location: "Western Express Highway, Andheri, Mumbai",
    officerName: "Sub-Inspector R. Desai",
    officerBadge: "SI-1187",
    department: "Traffic Police",
    appealReason: "Wrong vehicle details",
    citizenDescription:
      "The vehicle number on the challan is incorrect. I was not on Western Express Highway on this date — I have GPS records from my phone and office entry logs as alibi. The challan appears to have been issued for a different vehicle with a similar plate number.",
    evidenceProvided: true,
    status: "pending",
    priority: "high",
    notes: "",
    evidenceImages: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    ],
    history: [
      { action: "Challan issued", by: "Sub-Inspector R. Desai", at: "2024-05-14 08:50 AM" },
      { action: "Appeal submitted", by: "Priya Mehta", at: "2024-05-15 11:00 AM" },
    ],
  },
  {
    id: "d3",
    challanNumber: "MH-2024-07654",
    violatorName: "Suresh Naik",
    vehicleNumber: "MH 04 EF 2233",
    amount: 1000,
    penaltyType: "No Helmet",
    issueDate: "2024-05-08",
    submittedDate: "2024-05-11",
    location: "SV Road, Borivali West, Mumbai",
    officerName: "Constable P. More",
    officerBadge: "TC-3309",
    department: "Traffic Police",
    appealReason: "Proper documentation available",
    citizenDescription:
      "I was wearing a helmet at the time. The helmet was a DOT-certified full-face helmet. The officer cited the wrong vehicle. I have a dashcam recording that clearly shows me wearing headgear. I am requesting a review of this challan.",
    evidenceProvided: true,
    status: "pending",
    priority: "medium",
    evidenceImages: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    ],
    notes: "",
    history: [
      { action: "Challan issued", by: "Constable P. More", at: "2024-05-08 07:20 AM" },
      { action: "Appeal submitted", by: "Suresh Naik", at: "2024-05-11 06:45 PM" },
    ],
  },
  {
    id: "d4",
    challanNumber: "MH-2024-06311",
    violatorName: "Anita Joshi",
    vehicleNumber: "MH 03 GH 5567",
    amount: 10000,
    penaltyType: "Drunk Driving",
    issueDate: "2024-05-02",
    submittedDate: "2024-05-05",
    location: "Pedder Road, Mumbai",
    officerName: "Inspector K. Kulkarni",
    officerBadge: "INS-0221",
    department: "Traffic Police",
    appealReason: "Technical malfunction",
    citizenDescription:
      "The breathalyser used by the officer was not calibrated. I requested a second test which was denied. I have a private blood alcohol test done within 30 minutes at a nearby clinic that reads 0.000 mg/L. I am challenging the validity of the roadside test instrument.",
    evidenceProvided: true,
    status: "pending",
    priority: "high",
    evidenceImages: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    ],
    notes: "",
    history: [
      { action: "Challan issued", by: "Inspector K. Kulkarni", at: "2024-05-02 01:15 AM" },
      { action: "Legal notice sent", by: "System", at: "2024-05-03 09:00 AM" },
      { action: "Appeal submitted", by: "Anita Joshi", at: "2024-05-05 10:30 AM" },
    ],
  },
  {
    id: "d5",
    challanNumber: "MH-2024-05892",
    violatorName: "Mohammed Farhan",
    vehicleNumber: "MH 05 IJ 8810",
    amount: 500,
    penaltyType: "Signal Jump",
    issueDate: "2024-04-28",
    submittedDate: "2024-05-01",
    location: "Juhu Circle, Mumbai",
    officerName: "Constable A. Sawant",
    officerBadge: "TC-5512",
    department: "Traffic Police",
    appealReason: "Medical emergency",
    citizenDescription:
      "I ran the signal due to a medical emergency — my passenger was having a severe allergic reaction and I was rushing to Kokilaben Hospital. I have the hospital admission receipt and the doctor's letter confirming the emergency. This was not reckless driving.",
    evidenceProvided: true,
    status: "pending",
    priority: "medium",
    evidenceImages: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    ],
    notes: "",
    history: [
      { action: "Challan issued", by: "Constable A. Sawant", at: "2024-04-28 06:40 PM" },
      { action: "Appeal submitted", by: "Mohammed Farhan", at: "2024-05-01 12:00 PM" },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function daysAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86400000
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const priorityCfg = {
  high: { label: "High priority", classes: "bg-red-50 text-red-700 border border-red-200" },
  medium: { label: "Medium priority", classes: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  low: { label: "Low priority", classes: "bg-gray-100 text-gray-600 border border-gray-200" },
};

const statusCfg: Record<DisputeStatus, { label: string; icon: React.ElementType; classes: string }> = {
  pending: { label: "Pending review", icon: Clock, classes: "bg-purple-50 text-purple-700 border border-purple-200" },
  approved: { label: "Appeal approved", icon: CheckCircle, classes: "bg-green-50 text-green-700 border border-green-200" },
  rejected: { label: "Appeal rejected", icon: XCircle, classes: "bg-red-50 text-red-700 border border-red-200" },
  info_requested: { label: "Info requested", icon: Info, classes: "bg-blue-50 text-blue-700 border border-blue-200" },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  bgColor,
  textColor,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${bgColor}`}>
          <Icon className={`w-5 h-5 ${textColor}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: DisputeStatus }) {
  const cfg = statusCfg[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.classes}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" }) {
  const cfg = priorityCfg[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

function Timeline({ history }: { history: HistoryEntry[] }) {
  return (
    <div className="space-y-3">
      {history.map((h, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
            {i < history.length - 1 && (
              <div className="w-px flex-1 bg-gray-200 mt-1" />
            )}
          </div>
          <div className="pb-3 flex-1">
            <p className="text-sm font-medium text-gray-800">{h.action}</p>
            <p className="text-xs text-gray-500">{h.by} · {h.at}</p>
            {h.note && (
              <p className="text-xs text-gray-400 mt-0.5 italic">{h.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

function DetailPanel({
  dispute,
  onAction,
  onClose,
}: {
  dispute: Dispute;
  onAction: (id: string, action: DisputeStatus, note: string) => void;
  onClose: () => void;
}) {
  const [note, setNote] = useState(dispute.notes);
  const [tab, setTab] = useState<"details" | "history">("details");

  function submit(action: DisputeStatus) {
    if (!note.trim() && action !== "approved") return;
    onAction(dispute.id, action, note);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white h-full w-full max-w-2xl shadow-2xl overflow-y-auto flex flex-col">
        {/* header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-900">{dispute.challanNumber}</span>
              <StatusBadge status={dispute.status} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{dispute.penaltyType}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* tabs */}
        <div className="flex gap-1 px-6 pt-4">
          {(["details", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${tab === t
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              {t === "details" ? "Case details" : "Timeline"}
            </button>
          ))}
        </div>

        <div className="flex-1 px-6 py-4 space-y-5">
          {tab === "details" ? (
            <>
              {/* violator info */}
              <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-3">
                {[
                  { icon: User, label: "Violator", value: dispute.violatorName },
                  { icon: FileText, label: "Vehicle", value: dispute.vehicleNumber },
                  { icon: IndianRupee, label: "Fine amount", value: `₹${dispute.amount.toLocaleString("en-IN")}` },
                  { icon: Calendar, label: "Issued on", value: fmtDate(dispute.issueDate) },
                  { icon: MapPin, label: "Location", value: dispute.location },
                  { icon: Building2, label: "Department", value: dispute.department },
                  { icon: Shield, label: "Officer", value: `${dispute.officerName} (${dispute.officerBadge})` },
                  { icon: Clock, label: "Submitted", value: daysAgo(dispute.submittedDate) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* appeal reason */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Appeal reason
                </p>
                <span className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-100">
                  {dispute.appealReason}
                </span>
              </div>

              {/* citizen statement */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Citizen's statement
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {dispute.citizenDescription}
                  </p>
                </div>
              </div>

              {/* evidence */}
              {/* evidence */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Evidence
                </p>

                {dispute.evidenceImages?.length ? (
                  <div className="grid grid-cols-2 gap-3">
                    {dispute.evidenceImages.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition"
                      >
                        <img
                          src={img}
                          alt={`evidence-${index}`}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    {dispute.evidenceProvided ? (
                      <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Evidence documents attached
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <XCircle className="w-3.5 h-3.5" />
                        No evidence provided
                      </span>
                    )}

                    <PriorityBadge priority={dispute.priority} />
                  </div>
                )}
              </div>

              {/* internal note */}
              {dispute.status === "pending" && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Internal review note
                  </p>
                  <textarea
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your review notes here before taking action…"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    A note is required when rejecting or requesting more information.
                  </p>
                </div>
              )}

              {dispute.status !== "pending" && dispute.notes && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Review note
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 border border-gray-100">
                    {dispute.notes}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Timeline history={dispute.history} />
          )}
        </div>

        {/* action footer */}
        {dispute.status === "pending" && (
          <div className="px-6 py-4 border-t border-gray-100 bg-white sticky bottom-0">
            <p className="text-xs text-gray-500 mb-3 font-medium">Review actions</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => submit("approved")}
                className="flex flex-col items-center gap-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <ThumbsUp className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => submit("rejected")}
                className="flex flex-col items-center gap-1.5 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <ThumbsDown className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => submit("info_requested")}
                className="flex flex-col items-center gap-1.5 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                Need info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dispute Row Card ──────────────────────────────────────────────────────────

function DisputeCard({
  dispute,
  onView,
  onAction,
}: {
  dispute: Dispute;
  onView: () => void;
  onAction: (action: DisputeStatus) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all 
    duration-200 overflow-hidden flex-center align-center">
      {/* left accent by priority */}
      <div
        className={`h-1 w-full ${dispute.priority === "high"
            ? "bg-red-500"
            : dispute.priority === "medium"
              ? "bg-yellow-400"
              : "bg-gray-300"
          }`}
      />

      <div className="p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* main info */}
          <div className="flex-1 space-y-4 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-semibold text-gray-900">
                    {dispute.challanNumber}
                  </span>
                  <StatusBadge status={dispute.status} />
                  <PriorityBadge priority={dispute.priority} />
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{dispute.penaltyType}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {daysAgo(dispute.submittedDate)}
              </span>
            </div>

            {/* meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: User, label: dispute.violatorName },
                { icon: FileText, label: dispute.vehicleNumber },
                { icon: IndianRupee, label: `₹${dispute.amount.toLocaleString("en-IN")}` },
                { icon: MapPin, label: dispute.location, truncate: true },
              ].map(({ icon: Icon, label, truncate }, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className={`text-sm text-gray-700 ${truncate ? "truncate" : ""}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* appeal reason + snippet */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">
                {dispute.appealReason}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {dispute.citizenDescription}
              </p>
            </div>

            {/* evidence + officer */}
            <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
              {dispute.evidenceProvided && (
                <span className="inline-flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  Evidence attached
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {dispute.officerName}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Issued {fmtDate(dispute.issueDate)}
              </span>
            </div>
          </div>

          {/* actions sidebar */}
          <div className="lg:w-44 flex flex-row lg:flex-col gap-2 flex-shrink-0">
            <button
              onClick={onView}
              className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              View details
            </button>
            {dispute.status === "pending" && (
              <>
                <button
                  onClick={() => onAction("approved")}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 px-3 rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => onAction("rejected")}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 px-3 rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <ThumbsDown className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function DisputeResolution() {
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    action: DisputeStatus;
  } | null>(null);
  const [confirmNote, setConfirmNote] = useState("");

  const active = disputes.find((d) => d.id === activeId) ?? null;

  // ── stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const pending = disputes.filter((d) => d.status === "pending").length;
    const approved = disputes.filter((d) => d.status === "approved").length;
    const rejected = disputes.filter((d) => d.status === "rejected").length;
    const infoReq = disputes.filter((d) => d.status === "info_requested").length;
    const resolved = approved + rejected;
    const total = disputes.length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    const totalAmount = disputes
      .filter((d) => d.status === "pending")
      .reduce((a, d) => a + d.amount, 0);
    return { pending, approved, rejected, infoReq, rate, totalAmount };
  }, [disputes]);

  // ── filtered list ────────────────────────────────────────────────────────
  const displayList = useMemo(() => {
    let list = [...disputes];
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter(
        (d) =>
          d.challanNumber.toLowerCase().includes(q) ||
          d.violatorName.toLowerCase().includes(q) ||
          d.vehicleNumber.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    if (statusFilter !== "all") list = list.filter((d) => d.status === statusFilter);
    if (priorityFilter !== "all") list = list.filter((d) => d.priority === priorityFilter);
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      if (sortKey === "amount") cmp = b.amount - a.amount;
      if (sortKey === "challan") cmp = a.challanNumber.localeCompare(b.challanNumber);
      return sortAsc ? -cmp : cmp;
    });
    return list;
  }, [disputes, search, statusFilter, priorityFilter, sortKey, sortAsc]);

  // ── action handler ───────────────────────────────────────────────────────
  function handleAction(id: string, action: DisputeStatus, note: string) {
    const now = new Date().toLocaleString("en-IN", { hour12: true });
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
            ...d,
            status: action,
            notes: note,
            history: [
              ...d.history,
              {
                action:
                  action === "approved"
                    ? "Appeal approved"
                    : action === "rejected"
                      ? "Appeal rejected"
                      : "More information requested",
                by: "Review Officer",
                at: now,
                note: note || undefined,
              },
            ],
          }
          : d
      )
    );
    setActiveId(null);
    setConfirmAction(null);
  }

  function quickAction(id: string, action: DisputeStatus) {
    setConfirmAction({ id, action });
    setConfirmNote("");
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  }

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-wrap gap-4 items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dispute resolution</h1>
            <p className="text-sm text-gray-500 mt-1">
              Review and resolve citizen appeals against issued challans
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl hover:bg-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Pending review"
            value={stats.pending}
            icon={Clock}
            bgColor="bg-purple-100"
            textColor="text-purple-600"
            sub={`₹${stats.totalAmount.toLocaleString("en-IN")} at stake`}
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            icon={CheckCircle}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={XCircle}
            bgColor="bg-red-100"
            textColor="text-red-600"
          />
          <StatCard
            label="Resolution rate"
            value={`${stats.rate}%`}
            icon={AlertCircle}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
            sub={`${stats.infoReq} awaiting info`}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search challan, name, vehicle, location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-700"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="info_requested">Info requested</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as "all" | "low" | "medium" | "high")}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-700"
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="flex gap-1">
              {(["date", "amount", "challan"] as SortKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => toggleSort(k)}
                  className={`inline-flex items-center gap-1 px-3 py-2.5 text-xs rounded-lg border transition-colors ${sortKey === k
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {k === "date" ? "Date" : k === "amount" ? "Amount" : "Challan"}
                  <ChevronDown className={`w-3 h-3 transition-transform ${sortKey === k && sortAsc ? "rotate-180" : ""}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="inline-flex items-center gap-1">
              <Filter className="w-3 h-3" />
              {displayList.length} of {disputes.length} disputes
            </span>
            {(search || statusFilter !== "all" || priorityFilter !== "all") && (
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); setPriorityFilter("all"); }}
                className="text-blue-500 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* List */}
        {displayList.length > 0 ? (
          <div className="space-y-3">
            {displayList.map((d) => (
              <DisputeCard
                key={d.id}
                dispute={d}
                onView={() => setActiveId(d.id)}
                onAction={(action) => quickAction(d.id, action)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
            <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No disputes found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {active && (
        <DetailPanel
          dispute={active}
          onAction={handleAction}
          onClose={() => setActiveId(null)}
        />
      )}

      {/* Quick-action confirm dialog */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <div className="px-6 py-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${confirmAction.action === "approved" ? "bg-green-100" : "bg-red-100"
                }`}>
                {confirmAction.action === "approved" ? (
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <h3 className="text-base font-semibold text-gray-900 text-center mb-1">
                {confirmAction.action === "approved"
                  ? "Approve this appeal?"
                  : "Reject this appeal?"}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                {disputes.find((d) => d.id === confirmAction.id)?.challanNumber}
              </p>
              <textarea
                rows={3}
                value={confirmNote}
                onChange={(e) => setConfirmNote(e.target.value)}
                placeholder={
                  confirmAction.action === "approved"
                    ? "Optional: add a note for the record…"
                    : "Required: reason for rejection…"
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAction(confirmAction.id, confirmAction.action, confirmNote)}
                  className={`flex-1 py-2.5 rounded-xl text-sm text-white font-medium transition-colors ${confirmAction.action === "approved"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  Confirm {confirmAction.action === "approved" ? "approval" : "rejection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}