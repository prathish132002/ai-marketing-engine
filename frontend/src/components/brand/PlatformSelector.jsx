// frontend/src/components/brand/PlatformSelector.jsx
// M1 — Platform multi-selector

const PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", icon: "in", color: "#0A66C2", bg: "#E8F1FB" },
  { id: "instagram", label: "Instagram", icon: "IG", color: "#C13584", bg: "#FCE8F4" },
  { id: "twitter", label: "Twitter / X", icon: "𝕏", color: "#0F1419", bg: "#F0F0F0" },
  { id: "facebook", label: "Facebook", icon: "f", color: "#1877F2", bg: "#E7F0FD" },
  { id: "tiktok", label: "TikTok", icon: "TT", color: "#010101", bg: "#F0F0F0" },
  { id: "youtube", label: "YouTube", icon: "▶", color: "#FF0000", bg: "#FFEEEE" },
  { id: "email", label: "Email", icon: "✉", color: "#4A4A47", bg: "#F1EFE8" },
  { id: "blog", label: "Blog / SEO", icon: "✍", color: "#0F6E56", bg: "#E1F5EE" },
  { id: "google_ads", label: "Google Ads", icon: "G", color: "#4285F4", bg: "#EAF1FD" },
];

export default function PlatformSelector({ selected, onChange }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const toggleAll = () => {
    if (selected.length === PLATFORMS.length) {
      onChange([]);
    } else {
      onChange(PLATFORMS.map((p) => p.id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#9B9892]">
          {selected.length === 0
            ? "Select all platforms you'll publish to"
            : `${selected.length} platform${selected.length > 1 ? "s" : ""} selected`}
        </p>
        <button
          onClick={toggleAll}
          className="text-xs text-[#8B6CF6] hover:text-[#6B4EFF] font-medium transition-colors"
        >
          {selected.length === PLATFORMS.length ? "Deselect all" : "Select all"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const isSelected = selected.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
                isSelected
                  ? "border-transparent shadow-sm"
                  : "bg-white border-[#E8E6DF] text-[#4A4A47] hover:border-[#C8C5BC]"
              }`}
              style={
                isSelected
                  ? { backgroundColor: p.bg, borderColor: p.color + "55", color: p.color }
                  : {}
              }
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all ${
                  isSelected ? "text-white" : "bg-[#F1EFE8] text-[#6B6A66]"
                }`}
                style={isSelected ? { backgroundColor: p.color } : {}}
              >
                {p.icon}
              </span>
              {p.label}
              {isSelected && (
                <span className="ml-0.5 text-xs opacity-60">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <p className="mt-3 text-xs text-[#9B9892]">
          Claude will tailor tone, format, and character count for each selected platform
        </p>
      )}
    </div>
  );
}
