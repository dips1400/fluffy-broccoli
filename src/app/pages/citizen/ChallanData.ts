// ─── Shared Types ─────────────────────────────────────────────────────────────

export type ChallanStatus = "pending" | "paid" | "overdue" | "disputed" | "cancelled";
export type Severity = "low" | "medium" | "high" | "critical";

export interface PenaltyType {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  color: string;
  severity: Severity;
  department: string;
  minAmount: number;
  maxAmount: number;
}

export interface Challan {
  id: string;
  challanNumber: string;
  penaltyTypeId: string;
  violatorName: string;
  violatorContact: string;
  vehicleNumber?: string;
  propertyNumber?: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  location: string;
  department: string;
  officerName: string;
  officerId: string;
  status: ChallanStatus;
  evidenceUrl?: string;
  notes?: string;
  qrCode: string;
  lateFeePct: number; // percent per week after due date
}

// ─── Penalty Types ─────────────────────────────────────────────────────────────

export const penaltyTypes: PenaltyType[] = [
  {
    id: "pt1",
    name: "Speeding",
    description: "Exceeding the posted speed limit on a public road.",
    icon: "🏎️",
    color: "#EF4444",
    severity: "high",
    department: "Traffic Police",
    minAmount: 500,
    maxAmount: 5000,
  },
  {
    id: "pt2",
    name: "Signal Jump",
    description: "Running a red light or ignoring a traffic signal.",
    icon: "🚦",
    color: "#F97316",
    severity: "critical",
    department: "Traffic Police",
    minAmount: 1000,
    maxAmount: 3000,
  },
  {
    id: "pt3",
    name: "Illegal Parking",
    description: "Parking in a no-parking zone or obstruction zone.",
    icon: "🅿️",
    color: "#3B82F6",
    severity: "low",
    department: "Municipal Corporation",
    minAmount: 200,
    maxAmount: 2000,
  },
  {
    id: "pt4",
    name: "Mobile Use While Driving",
    description: "Using a handheld mobile device while operating a vehicle.",
    icon: "📱",
    color: "#8B5CF6",
    severity: "high",
    department: "Traffic Police",
    minAmount: 1500,
    maxAmount: 5000,
  },
  {
    id: "pt5",
    name: "Drunk Driving",
    description: "Operating a vehicle beyond legal blood alcohol limits.",
    icon: "🍺",
    color: "#DC2626",
    severity: "critical",
    department: "Traffic Police",
    minAmount: 10000,
    maxAmount: 50000,
  },
  {
    id: "pt6",
    name: "No Helmet",
    description: "Riding a two-wheeler without an ISI-certified helmet.",
    icon: "🏍️",
    color: "#10B981",
    severity: "medium",
    department: "Traffic Police",
    minAmount: 500,
    maxAmount: 1500,
  },
];

// ─── Mock Challans ─────────────────────────────────────────────────────────────

export const mockChallans: Challan[] = [
  {
    id: "c1",
    challanNumber: "MH-2024-08821",
    penaltyTypeId: "pt3",
    violatorName: "Rajesh Kumar Sharma",
    violatorContact: "+91 98765 43210",
    vehicleNumber: "MH 01 AB 4521",
    amount: 2000,
    issueDate: "2024-05-10",
    dueDate: "2024-06-10",
    location: "Linking Road, Bandra West, Mumbai",
    department: "Municipal Corporation",
    officerName: "Constable D. Patil",
    officerId: "TC-4421",
    status: "pending",
    notes: "Vehicle found blocking pedestrian crossing. Warning issued first.",
    qrCode: "QR-MH-2024-08821-C1",
    lateFeePct: 5,
  },
  {
    id: "c2",
    challanNumber: "MH-2024-09103",
    penaltyTypeId: "pt4",
    violatorName: "Priya Mehta",
    violatorContact: "+91 91234 56789",
    vehicleNumber: "MH 02 CD 7891",
    amount: 5000,
    issueDate: "2024-05-14",
    dueDate: "2024-05-28",
    location: "Western Express Highway, Andheri, Mumbai",
    department: "Traffic Police",
    officerName: "Sub-Inspector R. Desai",
    officerId: "SI-1187",
    status: "overdue",
    evidenceUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    notes: "Captured on speed camera. CCTV footage retained.",
    qrCode: "QR-MH-2024-09103-C2",
    lateFeePct: 5,
  },
  {
    id: "c3",
    challanNumber: "MH-2024-07654",
    penaltyTypeId: "pt6",
    violatorName: "Suresh Naik",
    violatorContact: "+91 87654 32100",
    vehicleNumber: "MH 04 EF 2233",
    amount: 1000,
    issueDate: "2024-04-20",
    dueDate: "2024-05-20",
    paymentDate: "2024-05-05T14:32:00",
    location: "SV Road, Borivali West, Mumbai",
    department: "Traffic Police",
    officerName: "Constable P. More",
    officerId: "TC-3309",
    status: "paid",
    qrCode: "QR-MH-2024-07654-C3",
    lateFeePct: 5,
  },
  {
    id: "c4",
    challanNumber: "MH-2024-06311",
    penaltyTypeId: "pt2",
    violatorName: "Anita Joshi",
    violatorContact: "+91 70000 12345",
    vehicleNumber: "MH 03 GH 5567",
    amount: 3000,
    issueDate: "2024-05-02",
    dueDate: "2024-06-02",
    location: "Pedder Road, Mumbai",
    department: "Traffic Police",
    officerName: "Inspector K. Kulkarni",
    officerId: "INS-0221",
    status: "disputed",
    notes: "Signal camera recorded the violation.",
    qrCode: "QR-MH-2024-06311-C4",
    lateFeePct: 5,
  },
];