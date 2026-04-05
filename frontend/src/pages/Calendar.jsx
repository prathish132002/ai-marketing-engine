import { useState } from "react";
import useBrandStore from "../store/brandStore";
import useCalendar from "../hooks/useCalendar";

// Helper to format "YYYY-MM" to "Month YYYY"
const formatMonthLabel = (yyyyMm) => {
  if (!yyyyMm) return "";
  const [year, month] = yyyyMm.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

// Simple platform colors
const PLATFORM_COLORS = {
  "linkedin": "bg-violet-100 text-violet-800 border-violet-200",
  "twitter": "bg-sky-100 text-sky-800 border-sky-200",
  "instagram": "bg-rose-100 text-rose-800 border-rose-200",
  "facebook": "bg-blue-100 text-blue-800 border-blue-200",
  "tiktok": "bg-gray-200 text-gray-900 border-gray-300",
  "youtube": "bg-red-100 text-red-800 border-red-200",
  "email": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "blog": "bg-amber-100 text-amber-800 border-amber-200"
};

const getBadgeStyle = (platformStr) => {
    const key = String(platformStr).toLowerCase();
    for (const p in PLATFORM_COLORS) {
        if (key.includes(p)) return PLATFORM_COLORS[p];
    }
    return "bg-gray-100 text-gray-800 border-gray-200"; // default
};

export default function Calendar() {
  const brand = useBrandStore((s) => s.brand);
  const [monthInput, setMonthInput] = useState("");

  const { data, loading, error, generate, reset } = useCalendar();

  const handleGenerate = async () => {
    if (!monthInput) return;
    if (!brand?.brandName && !brand?.id) {
      alert("Please complete Brand Setup first.");
      return;
    }
    const formattedMonth = formatMonthLabel(monthInput);
    
    // Hardcoding brandId=1 since auth/db isn't completely wired to the frontend yet 
    await generate({ brandId: brand.id || 1, month: formattedMonth });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E8E6DF] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold text-[#1A1A18]">Content Calendar</h1>
          <p className="text-xs text-[#9B9892]">M6 · Schedule & Platform mapping</p>
        </div>
        {data && (
            <button
              onClick={reset}
              className="text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              ✕ Clear schedule
            </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!data && !loading && !error && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8 max-w-sm mx-auto text-center">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-3">
                Target Posting Month
              </label>
              <input
                type="month"
                value={monthInput}
                onChange={(e) => setMonthInput(e.target.value)}
                className="w-full text-center text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-300 transition mb-6"
              />
              <button
                onClick={handleGenerate}
                disabled={!monthInput}
                className="w-full px-6 py-3 bg-[#1A1A18] hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                ✦ Generate Timeline
              </button>
            </div>
        )}

        {loading && (
          <div className="space-y-4 animate-pulse flex flex-col items-center py-12">
            <span className="flex items-center gap-3 text-gray-500 font-semibold mb-8 text-xl">
              <svg className="animate-spin h-6 w-6 text-[#1A1A18]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Mapping out optimal posting schedule...
            </span>
            <div className="w-full space-y-4 flex flex-col items-center">
                <div className="h-24 bg-gray-200 rounded-2xl w-full max-w-2xl" />
                <div className="h-24 bg-gray-200 rounded-2xl w-full max-w-2xl" />
                <div className="h-24 bg-gray-200 rounded-2xl w-full max-w-2xl" />
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 max-w-md mx-auto">
            ⚠ {error}
          </div>
        )}

        {data && !loading && (
          <div className="space-y-8 max-w-2xl mx-auto relative">
             <div className="mb-6 flex items-center justify-between bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-200">
                 <span className="font-bold text-gray-900 border-l-4 border-violet-500 pl-3">
                     Schedule for {formatMonthLabel(monthInput)}
                 </span>
                 <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                     {data.suggestions?.length || 0} posts planned
                 </span>
             </div>

             {/* Vertical Timeline line */}
             <div className="absolute left-[38px] top-[80px] bottom-0 w-0.5 bg-gray-200 -z-10"></div>
             
             <div className="space-y-6">
                {data.suggestions?.sort((a, b) => a.day - b.day).map((post, i) => (
                    <div key={i} className="flex gap-6 relative group">
                        {/* Day node */}
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full border-[3px] border-gray-100 shadow-sm flex flex-col items-center justify-center transition group-hover:border-violet-200 ml-3">
                            <span className="text-[9px] uppercase font-bold text-gray-400 -mb-1 leading-none pt-1">Day</span>
                            <span className="text-sm font-black text-gray-900 leading-none">{post.day}</span>
                        </div>
                        
                        {/* Content Card */}
                        <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition">
                             <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-gray-100 pb-3">
                                 <div className="flex gap-2">
                                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeStyle(post.platform)}`}>
                                         {post.platform}
                                     </span>
                                     <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600">
                                         {post.content_type}
                                     </span>
                                 </div>
                                 <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded border border-violet-100 flex items-center gap-1">
                                     🕒 {post.best_time}
                                 </span>
                             </div>

                             <div>
                                 <h4 className="text-[10px] uppercase font-bold text-gray-400 mb-1">Content Topic & Angle</h4>
                                 <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                     {post.topic}
                                 </p>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}