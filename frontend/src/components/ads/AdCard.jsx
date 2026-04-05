export default function AdCard({ variant }) {
  const isTesting = variant.status === "Testing";
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-rose-100">
          {variant.tone_label}
        </span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
          isTesting ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
        }`}>
          {variant.status}
        </span>
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <p className="text-[10px] text-gray-400 font-semibold mb-1 uppercase tracking-wide">Headline</p>
          <p className="text-sm font-bold text-gray-900 leading-tight">{variant.headline}</p>
        </div>
        
        <div>
          <p className="text-[10px] text-gray-400 font-semibold mb-1 uppercase tracking-wide">Primary Text</p>
          <p className="text-sm text-gray-700 leading-relaxed font-[Georgia,serif] whitespace-pre-wrap">{variant.body}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">CTA</span>
        <button className="bg-[#1A1A18] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm">
          {variant.cta}
        </button>
      </div>
    </div>
  );
}
