import { useState } from "react";
import useBrandStore from "../store/brandStore";
import useSentiment from "../hooks/useSentiment";

export default function Sentiment() {
  const brand = useBrandStore((s) => s.brand);
  const isConfigured = useBrandStore((s) => s.isConfigured);
  const [reviews, setReviews] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const { data, loading, error, analyze, reset } = useSentiment();
  const resolvedBrandId = brand?.brandId || 1;

  const handleAnalyze = async () => {
    if (!reviews.trim()) return;
    if (!isConfigured) {
      alert("Please complete Brand Setup (Module 1) first and click Save.");
      return;
    }
    await analyze({ brandId: resolvedBrandId, reviews_text: reviews });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* How to Use Banner */}
      <div className="bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 text-sm">💡</span>
            <p className="text-xs text-emerald-800 font-medium">
              <strong>How to use:</strong> Paste raw customer reviews from any platform and click <strong>Analyze Sentiment</strong> to get an instant VoC (Voice of Customer) breakdown with actionable insights.
            </p>
          </div>
          <button onClick={() => setShowHelp(!showHelp)} className="text-xs text-emerald-700 hover:underline ml-4 shrink-0">
            {showHelp ? "Hide ▲" : "Guide ▼"}
          </button>
        </div>
        {showHelp && (
          <div className="max-w-7xl mx-auto px-6 pb-3">
            <ol className="space-y-1 text-xs text-emerald-800">
              <li>1. Copy reviews from <strong>Trustpilot, G2, Amazon, App Store</strong> or any review platform.</li>
              <li>2. Paste them all into the text box — you can paste multiple reviews at once.</li>
              <li>3. Click <strong>Analyze Sentiment</strong> to process the reviews.</li>
              <li>4. View the <strong>Overall Health Score</strong>, positive/neutral/negative breakdown, and top themes.</li>
              <li>5. Read the <strong>Strategic Recommendations</strong> to learn how to improve your product messaging.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E8E6DF] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold text-[#1A1A18]">Sentiment Analysis</h1>
          <p className="text-xs text-[#9B9892]">M5 · Voice of Customer Analytics Dashboard</p>
        </div>
        {data && (
            <button
              onClick={reset}
              className="text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              ✕ Clear results
            </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!data && !loading && !error && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8 max-w-4xl mx-auto">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-3">
                Raw Customer Reviews
              </label>
              <textarea
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                placeholder="Paste raw reviews from TrustPilot, G2, Amazon, or app stores here..."
                rows={12}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300 transition placeholder:text-gray-400 mb-4"
              />
              <div className="flex justify-end">
                  <button
                    onClick={handleAnalyze}
                    disabled={!reviews.trim()}
                    className="px-6 py-3 bg-[#1A1A18] hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    ✦ Analyze Sentiment
                  </button>
              </div>
            </div>
        )}

        {loading && (
          <div className="space-y-4 animate-pulse flex flex-col items-center py-12">
            <span className="flex items-center gap-3 text-gray-500 font-semibold mb-8 text-xl">
              <svg className="animate-spin h-6 w-6 text-[#1A1A18]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Processing Voice of Customer data...
            </span>
            <div className="h-64 bg-gray-200 rounded-2xl w-full max-w-4xl mx-auto" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 max-w-4xl mx-auto">
            ⚠ {error}
          </div>
        )}

        {data && !loading && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Top metrics and segmented bar */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 items-center border-b border-gray-100 pb-8">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Overall Health</p>
                        <p className="text-5xl font-black text-gray-900">{data.overall_score}<span className="text-2xl text-gray-400">/100</span></p>
                    </div>
                    <div className="col-span-3">
                        <div className="flex h-6 rounded-full overflow-hidden shadow-inner w-full bg-gray-100">
                           {data.positive_pct > 0 && <div style={{width: `${data.positive_pct}%`}} className="bg-emerald-500 transition-all duration-1000"></div>}
                           {data.neutral_pct > 0 && <div style={{width: `${data.neutral_pct}%`}} className="bg-gray-300 transition-all duration-1000"></div>}
                           {data.negative_pct > 0 && <div style={{width: `${data.negative_pct}%`}} className="bg-rose-500 transition-all duration-1000"></div>}
                        </div>
                        <div className="flex justify-between mt-3 text-xs font-semibold px-1">
                            <span className="text-emerald-600">{data.positive_pct}% Positive</span>
                            <span className="text-gray-500">{data.neutral_pct}% Neutral</span>
                            <span className="text-rose-600">{data.negative_pct}% Negative</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">VoC Summary</h3>
                    <p className="text-gray-700 leading-relaxed font-[Georgia,serif] text-lg bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        {data.voice_of_customer_summary}
                    </p>
                </div>
            </div>

            {/* Themes and Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full">
                     <h3 className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wide">Top Themes Discovered</h3>
                     <div className="space-y-4">
                         {data.top_themes?.map((theme, i) => (
                             <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                 <div className="flex justify-between items-center mb-2">
                                     <span className="font-bold text-gray-900">{theme.theme}</span>
                                     <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-sm ${
                                         theme.sentiment.toLowerCase() === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                                         theme.sentiment.toLowerCase() === 'negative' ? 'bg-rose-100 text-rose-800' :
                                         'bg-gray-200 text-gray-700'
                                     }`}>
                                         {theme.sentiment} x{theme.frequency}
                                     </span>
                                 </div>
                                 <p className="text-xs text-gray-600 italic">"{theme.example_quote}"</p>
                             </div>
                         ))}
                     </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
                     <h3 className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wide">Strategic Recommendations</h3>
                     <ul className="space-y-4 mb-8">
                         {data.recommendations?.map((rec, i) => (
                             <li key={i} className="flex gap-3 items-start">
                                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1A1A18] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                                     {i + 1}
                                 </span>
                                 <span className="text-sm text-gray-800 leading-relaxed">{rec}</span>
                             </li>
                         ))}
                     </ul>

                     <div className="mt-auto">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Frequent Terms</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.top_words?.map((tw, i) => (
                                <span key={i} className="bg-amber-50 border border-amber-100 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-medium">
                                    {tw.word} <span className="opacity-50 ml-1">{tw.count}</span>
                                </span>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}