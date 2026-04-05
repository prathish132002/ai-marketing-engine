// frontend/src/pages/BrandSetup.jsx
// M1 — Brand & Campaign Setup

import { useState } from "react";
import TonePicker from "../components/brand/TonePicker";
import PlatformSelector from "../components/brand/PlatformSelector";
import useBrandStore from "../store/brandStore";

const INDUSTRIES = [
  "SaaS / Tech", "E-commerce", "Healthcare", "Finance", "Education",
  "Fashion & Beauty", "Food & Beverage", "Real Estate", "Agency / Consulting",
  "Media & Entertainment", "Non-profit", "Other",
];

const CAMPAIGN_GOALS = [
  { id: "awareness", label: "Brand Awareness", icon: "📣" },
  { id: "leads", label: "Lead Generation", icon: "🎯" },
  { id: "sales", label: "Drive Sales", icon: "💰" },
  { id: "retention", label: "Customer Retention", icon: "🔄" },
  { id: "launch", label: "Product Launch", icon: "🚀" },
  { id: "community", label: "Community Building", icon: "🤝" },
];

export default function BrandSetup() {
  const { brand, setBrand, setConfigured } = useBrandStore();

  const [form, setForm] = useState({
    brandName: brand.brandName || "",
    industry: brand.industry || "",
    targetAudience: brand.targetAudience || "",
    tones: brand.tones || [],
    keywordsInclude: brand.keywordsInclude || "",
    keywordsAvoid: brand.keywordsAvoid || "",
    campaignGoal: brand.campaignGoal || "",
    platforms: brand.platforms || [],
    campaignName: brand.campaignName || "",
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setSaved(false);
  };

  const validate = () => {
    const e = {};
    if (!form.brandName.trim()) e.brandName = "Brand name is required";
    if (!form.industry) e.industry = "Select an industry";
    if (!form.targetAudience.trim()) e.targetAudience = "Describe your target audience";
    if (form.tones.length < 1) e.tones = "Pick at least 1 tone (up to 3)";
    if (form.tones.length > 3) e.tones = "Pick at most 3 tones";
    if (!form.campaignGoal) e.campaignGoal = "Select a campaign goal";
    if (form.platforms.length === 0) e.platforms = "Select at least one platform";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      // scroll to first error
      const firstKey = Object.keys(e)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBrand(form);
    setConfigured(true);
    setSaved(true);
  };

  const sections = ["Brand Identity", "Voice & Tone", "Keywords", "Campaign"];
  const completionPct = (() => {
    let filled = 0;
    if (form.brandName.trim()) filled++;
    if (form.industry) filled++;
    if (form.targetAudience.trim()) filled++;
    if (form.tones.length > 0) filled++;
    if (form.keywordsInclude.trim()) filled++;
    if (form.campaignGoal) filled++;
    if (form.platforms.length > 0) filled++;
    return Math.round((filled / 7) * 100);
  })();

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E8E6DF] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-widest text-[#8B6CF6] uppercase">Module 1</span>
          <span className="text-[#D4D0C8]">·</span>
          <h1 className="text-[15px] font-semibold text-[#1A1A18]">Brand & Campaign Setup</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 rounded-full bg-[#EEEBE4] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#8B6CF6] transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <span className="text-xs text-[#9B9892] tabular-nums">{completionPct}%</span>
          </div>
          <button
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              saved
                ? "bg-[#E1F5EE] text-[#0F6E56]"
                : "bg-[#8B6CF6] text-white hover:bg-[#7B5CE5] active:scale-95"
            }`}
          >
            {saved ? "✓ Saved" : "Save Brand Context"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Section nav pills */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => {
                setActiveSection(i);
                document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === i
                  ? "bg-[#1A1A18] text-white"
                  : "bg-white text-[#6B6A66] border border-[#E8E6DF] hover:border-[#C8C5BC]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── SECTION 0: Brand Identity ── */}
        <Section id="section-0" title="Brand Identity" subtitle="Tell us who you are" onVisible={() => setActiveSection(0)}>

          <Field label="Brand Name" error={errors.brandName} id="brandName">
            <input
              id="brandName"
              type="text"
              value={form.brandName}
              onChange={(e) => update("brandName", e.target.value)}
              placeholder="e.g. Lumina Health"
              className={inputCls(errors.brandName)}
            />
          </Field>

          <Field label="Industry" error={errors.industry} id="industry">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" id="industry">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => update("industry", ind)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    form.industry === ind
                      ? "bg-[#EDE9FF] text-[#6B4EFF] border border-[#C4B5FD]"
                      : "bg-white text-[#4A4A47] border border-[#E8E6DF] hover:border-[#C8C5BC]"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Target Audience" error={errors.targetAudience} id="targetAudience">
            <textarea
              id="targetAudience"
              value={form.targetAudience}
              onChange={(e) => update("targetAudience", e.target.value)}
              placeholder="e.g. Health-conscious millennials aged 25–40 who want science-backed wellness products"
              rows={3}
              className={inputCls(errors.targetAudience) + " resize-none"}
            />
            <p className="mt-1.5 text-xs text-[#9B9892]">Be specific — this shapes every piece of content Claude writes</p>
          </Field>

        </Section>

        {/* ── SECTION 1: Voice & Tone ── */}
        <Section id="section-1" title="Voice & Tone" subtitle="Pick up to 3 tones that define your brand" onVisible={() => setActiveSection(1)}>
          <div id="tones">
            <TonePicker selected={form.tones} onChange={(t) => update("tones", t)} />
            {errors.tones && <p className="mt-2 text-xs text-red-500">{errors.tones}</p>}
          </div>
        </Section>

        {/* ── SECTION 2: Keywords ── */}
        <Section id="section-2" title="Keywords" subtitle="Guide Claude on language to use and avoid" onVisible={() => setActiveSection(2)}>

          <Field label="Keywords to Include" id="keywordsInclude">
            <KeywordInput
              value={form.keywordsInclude}
              onChange={(v) => update("keywordsInclude", v)}
              placeholder="e.g. science-backed, clinically tested, holistic"
              color="green"
            />
          </Field>

          <Field label="Keywords to Avoid" id="keywordsAvoid">
            <KeywordInput
              value={form.keywordsAvoid}
              onChange={(v) => update("keywordsAvoid", v)}
              placeholder="e.g. cheap, quick-fix, guaranteed"
              color="red"
            />
          </Field>

        </Section>

        {/* ── SECTION 3: Campaign ── */}
        <Section id="section-3" title="Campaign" subtitle="Set your campaign name, goal, and target platforms" onVisible={() => setActiveSection(3)}>

          <Field label="Campaign Name" id="campaignName">
            <input
              id="campaignName"
              type="text"
              value={form.campaignName}
              onChange={(e) => update("campaignName", e.target.value)}
              placeholder="e.g. Summer Wellness 2025"
              className={inputCls(false)}
            />
          </Field>

          <Field label="Campaign Goal" error={errors.campaignGoal} id="campaignGoal">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" id="campaignGoal">
              {CAMPAIGN_GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => update("campaignGoal", g.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                    form.campaignGoal === g.id
                      ? "bg-[#EDE9FF] text-[#6B4EFF] border border-[#C4B5FD]"
                      : "bg-white text-[#4A4A47] border border-[#E8E6DF] hover:border-[#C8C5BC]"
                  }`}
                >
                  <span className="text-lg">{g.icon}</span>
                  <span className="leading-tight">{g.label}</span>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Target Platforms" error={errors.platforms} id="platforms">
            <PlatformSelector
              selected={form.platforms}
              onChange={(p) => update("platforms", p)}
            />
            {errors.platforms && <p className="mt-2 text-xs text-red-500">{errors.platforms}</p>}
          </Field>

        </Section>

        {/* Save footer */}
        <div className="mt-8 flex items-center justify-between p-5 bg-white rounded-2xl border border-[#E8E6DF]">
          <div>
            <p className="text-sm font-semibold text-[#1A1A18]">Ready to save?</p>
            <p className="text-xs text-[#9B9892] mt-0.5">Brand context will be injected into every AI prompt across all modules</p>
          </div>
          <button
            onClick={handleSave}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              saved
                ? "bg-[#E1F5EE] text-[#0F6E56]"
                : "bg-[#8B6CF6] text-white hover:bg-[#7B5CE5] active:scale-95 shadow-md shadow-purple-200"
            }`}
          >
            {saved ? "✓ Brand Saved" : "Save Brand Context"}
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Helpers ──

function inputCls(hasError) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm text-[#1A1A18] placeholder-[#C0BDB5] bg-white outline-none transition-all focus:ring-2 focus:ring-[#8B6CF6]/30 focus:border-[#8B6CF6] ${
    hasError ? "border-red-400" : "border-[#E8E6DF] hover:border-[#C8C5BC]"
  }`;
}

function Section({ id, title, subtitle, children, onVisible }) {
  return (
    <div
      id={id}
      className="mb-10 scroll-mt-24"
    >
      <div className="mb-5">
        <h2 className="text-base font-bold text-[#1A1A18] tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-[#9B9892] mt-0.5">{subtitle}</p>}
      </div>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, error, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#4A4A47] uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function KeywordInput({ value, onChange, placeholder, color }) {
  const tags = value ? value.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const clean = draft.trim();
    if (!clean) return;
    const next = [...tags, clean].join(", ");
    onChange(next);
    setDraft("");
  };

  const removeTag = (i) => {
    const next = tags.filter((_, idx) => idx !== i).join(", ");
    onChange(next);
  };

  const colorMap = {
    green: { tag: "bg-[#E1F5EE] text-[#0F6E56] border-[#9FE1CB]", btn: "text-[#0F6E56] hover:text-[#085041]" },
    red: { tag: "bg-[#FAECE7] text-[#993C1D] border-[#F5C4B3]", btn: "text-[#993C1D] hover:text-[#712B13]" },
  };
  const cls = colorMap[color];

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8E6DF] hover:border-[#C8C5BC] text-sm text-[#1A1A18] placeholder-[#C0BDB5] bg-white outline-none focus:ring-2 focus:ring-[#8B6CF6]/30 focus:border-[#8B6CF6] transition-all"
        />
        <button
          onClick={addTag}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E6DF] text-sm text-[#4A4A47] font-medium hover:border-[#C8C5BC] transition-all"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span key={i} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${cls.tag}`}>
              {tag}
              <button onClick={() => removeTag(i)} className={`ml-0.5 ${cls.btn} transition-colors`}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}