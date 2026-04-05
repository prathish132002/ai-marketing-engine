/**
 * RefinementBox — standalone refinement input (used inside ContentCard).
 * Exported separately so it can be used outside ContentCard if needed.
 */
export default function RefinementBox({ onSubmit, isLoading }) {
  return (
    <div className="mt-3 flex gap-2">
      <input
        id="refine-input"
        placeholder='e.g. "make it shorter", "add more urgency"'
        className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-300 transition"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit(e.target.value);
        }}
      />
      <button
        disabled={isLoading}
        onClick={() => {
          const input = document.getElementById("refine-input");
          onSubmit(input.value);
        }}
        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
      >
        {isLoading ? "…" : "Apply"}
      </button>
    </div>
  );
}
