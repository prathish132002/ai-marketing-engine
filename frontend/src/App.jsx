import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation/Sidebar";

// Modules
import BrandSetup from "./pages/BrandSetup";
import ContentHub from "./pages/ContentHub";
import Repurpose from "./pages/Repurpose";
import AdVariants from "./pages/AdVariants";
import Sentiment from "./pages/Sentiment";
import Calendar from "./pages/Calendar";

export default function App() {
  return (
    <div className="flex bg-[#F7F6F2] min-h-screen">
      {/* Global Sidebar Navigation */}
      <Sidebar />

      {/* Main Feature Mount Route */}
      <main className="flex-1 relative overflow-auto">
        <Routes>
          <Route path="/" element={<BrandSetup />} />
          <Route path="/content" element={<ContentHub />} />
          <Route path="/repurpose" element={<Repurpose />} />
          <Route path="/ads" element={<AdVariants />} />
          <Route path="/sentiment" element={<Sentiment />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </div>
  );
}
