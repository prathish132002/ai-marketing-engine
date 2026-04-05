import { useState } from "react";
import useBrandStore from "../store/brandStore";
import useRepurpose from "../hooks/useRepurpose";
import FormatTabs from "../components/content/FormatTabs";
import ContentCard from "../components/content/ContentCard";

function LinkedInPanel({ data, brand }) {
  if (!data?.variants) return null;
  return (
    <div className="space-y-4">
      {data.variants.map((v, i) => (
        <ContentCard
          key={v.id || i}
          label={`LinkedIn Variant ${i + 1}`}
          copy={v.copy}
          meta={{ chars: v.character_count || 0 }}
          platform="LinkedIn"
          brandName={brand.name}
          tones={brand.tones}
          accent="violet"
        />
      ))}
    </div>
  );
}

function TwitterPanel({ data, brand }) {
  if (!data?.posts) return null;
  return (
    <div className="space-y-4">
      {data.posts.map((p, i) => (
        <ContentCard
          key={p.id || i}
          label={`Tweet ${i + 1}`}
          copy={p.copy}
          meta={{ chars: p.character_count || 0 }}
          platform="Twitter"
          brandName={brand.name}
          tones={brand.tones}
          accent="sky"
        />
      ))}
    </div>
  );
}

export default function Repurpose() {
  const brand = useBrandStore((s) => s.brand);
  const [transcript, setTranscript] = useState("");
  const [activeTab, setActiveTab] = useState("coverage");
  
  const { data, loading, error, generate, reset } = useRepurpose();

  const handleGenerate = async () => {
    if (!transcript.trim()) return;
    if (!brand?.brandName && !brand?.id) {
      alert("Please complete Brand Setup first.");
      return;
    }
    // Hardcoding brandId=1 since auth/db isn't completely wired to the frontend yet 
    await generate({ brandId: brand.id || 1, transcript, topic: "Repurpose" });
    setActiveTab("coverage");
  };

  const sharedProps = { brand: brand || {} };
  const genData = data?.generated_content;
  const coverage = data?.extraction;

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E8E6DF] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold text-[#1A1A18]">Content Repurposing</h1>
          <p className="text-xs text-[#9B9892]">M3 · Paste transcript to break down and generate assets</p>
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
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-3">
                Source Document or Transcript
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste the raw text of a blog post, webinar transcript, or podcast..."
                rows={12}
                className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300 transition placeholder:text-gray-400 mb-4"
              />
              <div className="flex justify-end">
                  <button
                    onClick={handleGenerate}
                    disabled={!transcript.trim()}
                    className="px-6 py-3 bg-[#1A1A18] hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    ✦ Extract & Repurpose
                  </button>
              </div>
            </div>
        )}

        {loading && (
          <div className="space-y-4 animate-pulse flex flex-col items-center py-12">
            <span className="flex items-center gap-3 text-gray-500 font-semibold mb-4 text-xl">
              <svg className="animate-spin h-6 w-6 text-[#1A1A18]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Thinking... (this may take up to a minute)
            </span>
            <div className="h-10 bg-gray-200 rounded-xl w-3/4" />
            <div className="h-48 bg-gray-200 rounded-2xl w-full" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            ⚠ {error}
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveTab("coverage")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === "coverage"
                    ? "bg-[#1A1A18] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                🗺 Coverage Map
              </button>
              
              {genData && ["linkedin", "twitter"].map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === key
                        ? "bg-[#1A1A18] text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)} Assets
                  </button>
              ))}
            </div>

            <div className="min-h-[400px]">
              {activeTab === "coverage" && coverage && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 shadow-sm">
                   <div>
                     <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Main Thesis</h3>
                     <p className="text-lg font-bold text-gray-900 border-l-4 border-amber-400 pl-4 py-1">{coverage.main_thesis}</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Key Insights</h3>
                       <ul className="space-y-2">
                         {coverage.key_insights?.map((ins, i) => (
                           <li key={i} className="flex gap-2 text-sm text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-100">
                             <span className="text-amber-500 font-bold">•</span>
                             {ins}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div>
                       <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Memorable Quotes</h3>
                       <ul className="space-y-2">
                         {coverage.memorable_quotes?.map((q, i) => (
                           <li key={i} className="text-sm italic text-gray-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                             "{q}"
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                </div>
              )}

              {activeTab === "linkedin" && genData?.linkedin && <LinkedInPanel data={genData.linkedin} {...sharedProps} />}
              {activeTab === "twitter" && genData?.twitter && <TwitterPanel data={genData.twitter} {...sharedProps} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}