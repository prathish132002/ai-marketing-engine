// frontend/src/components/brand/TonePicker.jsx
// M1 — Tone picker, allows selecting up to 3 tones

const TONES = [
  {
    id: "professional",
    label: "Professional",
    icon: "💼",
    desc: "Polished, credible, executive-level",
    example: '"Our platform drives measurable ROI."',
  },
  {
    id: "witty",
    label: "Witty",
    icon: "⚡",
    desc: "Clever, punchy, memorable one-liners",
    example: '"We fixed the thing that made you want to throw your laptop."',
  },
  {
    id: "warm",
    label: "Warm",
    icon: "🌿",
    desc: "Empathetic, human, community-first",
    example: '"We\'re with you at every step of the way."',
  },
  {
    id: "bold",
    label: "Bold",
    icon: "🔥",
    desc: "Confident, direct, takes no prisoners",
    example: '"Stop settling. Start winning."',
  },
  {
    id: "minimalist",
    label: "Minimalist",
    icon: "◻",
    desc: "Less words, more impact",
    example: '"Simple. Powerful. Yours."',
  },
  {
    id: "playful",
    label: "Playful",
    icon: "🎉",
    desc: "Fun, energetic, unexpected",
    example: '"Your inbox called. It misses you. 👀"',
  },
  {
    id: "authoritative",
    label: "Authoritative",
    icon: "🏛",
    desc: "Expert-led, data-backed, trusted",
    example: '"Backed by 15 years of research."',
  },
];

export default function TonePicker({ selected, onChange }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((t) => t !== id));
    } else {
      if (selected.length >= 3) return; // max 3
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#9B9892]">
          {selected.length === 0 && "Pick 1–3 tones"}
          {selected.length === 1 && "1 selected — pick 1 or 2 more"}
          {selected.length === 2 && "2 selected — you can add 1 more"}
          {selected.length === 3 && (
            <span className="text-[#6B4EFF] font-semibold">3 selected — maximum reached</span>
          )}
        </p>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-xs text-[#9B9892] hover:text-[#4A4A47] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {TONES.map((tone, idx) => {
          const isSelected = selected.includes(tone.id);
          const isDisabled = !isSelected && selected.length >= 3;
          const selIdx = selected.indexOf(tone.id);

          return (
            <button
              key={tone.id}
              onClick={() => !isDisabled && toggle(tone.id)}
              disabled={isDisabled}
              className={`group relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                isSelected
                  ? "bg-[#EDE9FF] border-[#C4B5FD] shadow-sm"
                  : isDisabled
                  ? "bg-[#F7F6F2] border-[#E8E6DF] opacity-40 cursor-not-allowed"
                  : "bg-white border-[#E8E6DF] hover:border-[#C4B5FD] hover:shadow-sm cursor-pointer"
              }`}
            >
              {/* Order badge */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#8B6CF6] text-white text-[10px] font-bold flex items-center justify-center">
                  {selIdx + 1}
                </span>
              )}

              <span className="text-2xl mt-0.5 flex-shrink-0">{tone.icon}</span>

              <div className="min-w-0">
                <p className={`text-sm font-semibold leading-tight ${isSelected ? "text-[#6B4EFF]" : "text-[#1A1A18]"}`}>
                  {tone.label}
                </p>
                <p className="text-xs text-[#9B9892] mt-0.5 leading-snug">{tone.desc}</p>
                <p className={`text-xs mt-2 italic leading-snug transition-all ${
                  isSelected ? "text-[#8B6CF6]" : "text-[#B0ADA6]"
                }`}>
                  {tone.example}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected summary strip */}
      {selected.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.map((id) => {
            const t = TONES.find((x) => x.id === id);
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B6CF6] text-white text-xs font-semibold"
              >
                {t.icon} {t.label}
              </span>
            );
          })}
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F0EEF9] text-[#6B4EFF] text-xs">
            Claude will blend these tones in every output
          </span>
        </div>
      )}
    </div>
  );
}
