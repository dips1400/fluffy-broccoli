import { createBrowserRouter } from "react-router";
import CitizenLayout from "./layouts/CitizenLayout";
import AdminLayout from "./layouts/AdminLayout";
import CitizenHome from "./pages/citizen/Home";
import FineCategories from "./pages/citizen/FineCategories";
import ChallanDetails from "./pages/citizen/ChallanDetails";
import Payment from "./pages/citizen/Payment";
import ViolationHistory from "./pages/citizen/ViolationHistory";
import RaiseAppeal from "./pages/citizen/RaiseAppeal";
import AdminDashboard from "./pages/admin/Dashboard";
import GenerateChallan from "./pages/admin/GenerateChallan";
import ChallanManagement from "./pages/admin/ChallanManagement";
import PenaltyManagement from "./pages/admin/PenaltyManagement";
import DefaulterAnalytics from "./pages/admin/DefaulterAnalytics";
import OfficerManagement from "./pages/admin/OfficerManagement";
import DisputeResolution from "./pages/admin/DisputeResolution";
import Reports from "./pages/admin/Reports";
import LandingPage from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/citizen",
    Component: CitizenLayout,
    children: [
      { index: true, Component: CitizenHome },
      { path: "categories", Component: FineCategories },
      { path: "challan/:id", Component: ChallanDetails },
      { path: "payment/:id", Component: Payment },
      { path: "history", Component: ViolationHistory },
      { path: "appeal/:id", Component: RaiseAppeal },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "generate", Component: GenerateChallan },
      { path: "challans", Component: ChallanManagement },
      { path: "penalties", Component: PenaltyManagement },
      { path: "analytics", Component: DefaulterAnalytics },
      { path: "officers", Component: OfficerManagement },
      { path: "disputes", Component: DisputeResolution },
      { path: "reports", Component: Reports },
    ],
  },
]);
