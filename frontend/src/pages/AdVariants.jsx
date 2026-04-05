import { useState } from "react";
import useBrandStore from "../store/brandStore";
import useAds from "../hooks/useAds";
import AdCard from "../components/ads/AdCard";

const PLATFORMS = ["Meta Ads", "LinkedIn Ads", "Google Ads", "TikTok Ads", "Twitter Ads"];

export default function AdVariants() {
  const brand = useBrandStore((s) => s.brand);
  const [product, setProduct] = useState("");
  const [offer, setOffer] = useState("");
  const [platform, setPlatform] = useState("Meta Ads");

  const { data, loading, error, generate, reset } = useAds();

  const handleGenerate = async () => {
    if (!product.trim() || !offer.trim()) return;
    if (!brand?.brandName && !brand?.id) {
      alert("Please complete Brand Setup first.");
      return;
    }
    // Hardcoding brandId=1 since auth/db isn't completely wired to the frontend yet 
    await generate({ brandId: brand.id || 1, product, offer, platform });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E8E6DF] px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold text-[#1A1A18]">Ad Copy & A/B Variants</h1>
          <p className="text-xs text-[#9B9892]">M4 · Generate psychological angles side-by-side</p>
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
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8 max-w-3xl mx-auto">
              <div className="space-y-5">
                  <div>
                      <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-2">
                        Target Platform
                      </label>
                      <select 
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300 transition bg-white"
                      >
                          {PLATFORMS.map(p => (
                              <option key={p} value={p}>{p}</option>
                          ))}
                      </select>
                  </div>
                  
                  <div>
                      <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-2">
                        Product / Service Name
                      </label>
                      <input
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        placeholder="e.g. Acme Pro Analytics"
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300 transition placeholder:text-gray-400"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-2">
                        Offer / Core Hook
                      </label>
                      <input
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        placeholder="e.g. Save 50% on annual plans locked in today"
                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300 transition placeholder:text-gray-400"
                      />
                  </div>
              </div>

              <div className="flex justify-end mt-6">
                  <button
                    onClick={handleGenerate}
                    disabled={!product.trim() || !offer.trim()}
                    className="px-6 py-3 bg-[#1A1A18] hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    ✦ Generate Variants
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
              Crafting psychological angles...
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <div className="h-64 bg-gray-200 rounded-2xl w-full" />
                <div className="h-64 bg-gray-200 rounded-2xl w-full" />
                <div className="h-64 bg-gray-200 rounded-2xl w-full" />
                <div className="h-64 bg-gray-200 rounded-2xl w-full" />
                <div className="h-64 bg-gray-200 rounded-2xl w-full" />
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            ⚠ {error}
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-bold text-gray-900 border-l-4 border-rose-500 pl-3">A/B Testing Variants</h2>
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-600 shadow-sm font-medium">
                    Platform: <span className="text-gray-900">{platform}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {data.variants?.map(variant => (
                   <AdCard key={variant.id} variant={variant} />
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}