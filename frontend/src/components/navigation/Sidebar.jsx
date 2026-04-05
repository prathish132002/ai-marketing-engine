import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Brand Setup", icon: "⚙️", module: "M1" },
  { path: "/content", label: "Content Hub", icon: "📝", module: "M2" },
  { path: "/repurpose", label: "Repurpose Map", icon: "🗺️", module: "M3" },
  { path: "/ads", label: "A/B Variants", icon: "🎯", module: "M4" },
  { path: "/sentiment", label: "VoC Analytics", icon: "📊", module: "M5" },
  { path: "/calendar", label: "Timeline Grid", icon: "🗓️", module: "M6" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-gray-100 mb-4">
        <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>⚡</span> AI Marketing
        </h2>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">Engine v1.0</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="text-[10px] font-bold opacity-40">{item.module}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
            <span className="text-lg">✦</span>
            <div>
                <p className="text-xs font-bold text-amber-900 leading-tight">Ready to post?</p>
                <p className="text-[10px] text-amber-700 mt-1 line-clamp-2">Ensure your brand tones are fully configured.</p>
            </div>
        </div>
      </div>
    </aside>
  );
}
