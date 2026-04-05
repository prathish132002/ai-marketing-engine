import { useState } from "react";

/**
 * ContentCard — reusable output block for every AI-generated piece.
 * Props:
 *   label        — display title (e.g. "LinkedIn Variant 1")
 *   copy         — the main text content
 *   meta         — optional object { key: value } shown as pills
 *   platform     — platform string for refinement API call
 *   brandName    — brand name for refinement API call
 *   tones        — array of tone strings
 *   onRegenerate — () => void   called when user clicks Regenerate
 *   accent       — tailwind color class prefix (e.g. "violet", "emerald")
 */
export default function ContentCard({
  label,
  copy,
  meta = {},
  platform = "general",
  brandName = "",
  tones = [],
  onRegenerate,
  accent = "violet",
}) {
  const [copied, setCopied] = useState(false);
  const [showRefine, setShowRefine] = useState(false);
  const [refineInput, setRefineInput] = useState("");
  const [refinedCopy, setRefinedCopy] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const [refineError, setRefineError] = useState("");

  const displayCopy = refinedCopy ?? copy;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefine = async () => {
    if (!refineInput.trim()) return;
    setIsRefining(true);
    setRefineError("");
    try {
      const res = await fetch("/api/content/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original_copy: displayCopy,
          refinement_instruction: refineInput,
          brand_name: brandName,
          tones,
          platform,
        }),
      });
      if (!res.ok) throw new Error("Refinement failed");
      const data = await res.json();
      setRefinedCopy(data.refined_copy);
      setRefineInput("");
      setShowRefine(false);
    } catch (e) {
      setRefineError("Refinement failed. Try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const accentMap = {
    violet: {
      border: "border-violet-200",
      labelBg: "bg-violet-50 text-violet-700",
      badge: "bg-violet-100 text-violet-600",
      btn: "bg-violet-600 hover:bg-violet-700 text-white",
      ring: "focus:ring-violet-300",
    },
    emerald: {
      border: "border-emerald-200",
      labelBg: "bg-emerald-50 text-emerald-700",
      badge: "bg-emerald-100 text-emerald-600",
      btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
      ring: "focus:ring-emerald-300",
    },
    sky: {
      border: "border-sky-200",
      labelBg: "bg-sky-50 text-sky-700",
      badge: "bg-sky-100 text-sky-600",
      btn: "bg-sky-600 hover:bg-sky-700 text-white",
      ring: "focus:ring-sky-300",
    },
    amber: {
      border: "border-amber-200",
      labelBg: "bg-amber-50 text-amber-700",
      badge: "bg-amber-100 text-amber-600",
      btn: "bg-amber-600 hover:bg-amber-700 text-white",
      ring: "focus:ring-amber-300",
    },
    rose: {
      border: "border-rose-200",
      labelBg: "bg-rose-50 text-rose-700",
      badge: "bg-rose-100 text-rose-600",
      btn: "bg-rose-600 hover:bg-rose-700 text-white",
      ring: "focus:ring-rose-300",
    },
    slate: {
      border: "border-slate-200",
      labelBg: "bg-slate-100 text-slate-600",
      badge: "bg-slate-100 text-slate-500",
      btn: "bg-slate-700 hover:bg-slate-800 text-white",
      ring: "focus:ring-slate-300",
    },
  };

  const c = accentMap[accent] || accentMap.violet;

  return (
    <div className={`rounded-xl border ${c.border} bg-white shadow-sm overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.labelBg}`}>
          {label}
        </span>
        <div className="flex items-center gap-2">
          {Object.entries(meta).map(([k, v]) => (
            <span key={k} className={`text-xs px-2 py-0.5 rounded-full font-mono ${c.badge}`}>
              {k}: {v}
            </span>
          ))}
          {refinedCopy && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">
              ✦ Refined
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-[Georgia,serif]">
          {displayCopy}
        </p>
      </div>

      {/* Refinement box */}
      {showRefine && (
        <div className="px-4 pb-3 space-y-2 border-t border-dashed border-gray-200 pt-3">
          <p className="text-xs text-gray-500 font-medium">✦ Refinement instruction</p>
          <div className="flex gap-2">
            <input
              value={refineInput}
              onChange={(e) => setRefineInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRefine()}
              placeholder='e.g. "make it shorter", "add urgency", "more formal"'
              className={`flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 ${c.ring} transition`}
            />
            <button
              onClick={handleRefine}
              disabled={isRefining}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${c.btn} disabled:opacity-50`}
            >
              {isRefining ? "…" : "Apply"}
            </button>
          </div>
          {refineError && <p className="text-xs text-red-500">{refineError}</p>}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200"
        >
          {copied ? (
            <><span>✓</span> Copied!</>
          ) : (
            <><span>⎘</span> Copy</>
          )}
        </button>

        <button
          onClick={() => setShowRefine((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200"
        >
          <span>✦</span> {showRefine ? "Hide" : "Refine"}
        </button>

        {refinedCopy && (
          <button
            onClick={() => setRefinedCopy(null)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200"
          >
            ↩ Original
          </button>
        )}

        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200"
          >
            ↻ Regenerate
          </button>
        )}
      </div>
    </div>
  );
}
