import { useState } from "react";
import useGenerate from "../hooks/useGenerate";
import useBrandStore from "../store/brandStore";
import FormatTabs, { TABS } from "../components/content/FormatTabs";
import ContentCard from "../components/content/ContentCard";
// eslint-disable-next-line no-unused-vars
const _TABS = TABS;

// ── Accent colours per format ───────────────────────────────────────────────
const FORMAT_ACCENT = {
  linkedin:         "violet",
  instagram:        "rose",
  twitter:          "sky",
  video_scripts:    "amber",
  email_newsletter: "emerald",
  blog_outline:     "slate",
  google_ad:        "rose",
  seo_meta:         "sky",
};

// ── Format renderers ─────────────────────────────────────────────────────────

function LinkedInPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      {data.variants.map((v, i) => (
        <ContentCard
          key={v.id}
          label={`LinkedIn Variant ${i + 1}`}
          copy={v.copy}
          meta={{ chars: v.character_count, hook: v.hook.slice(0, 30) + "…" }}
          platform="LinkedIn"
          brandName={brand.name}
          tones={brand.tones}
          accent="violet"
          onRegenerate={() => onRegenerate("linkedin")}
        />
      ))}
    </div>
  );
}

function InstagramPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      <ContentCard
        label="Instagram Caption"
        copy={data.caption}
        meta={{ chars: data.character_count }}
        platform="Instagram"
        brandName={brand.name}
        tones={brand.tones}
        accent="rose"
        onRegenerate={() => onRegenerate("instagram")}
      />
      <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-3">Hashtags</p>
        <div className="flex flex-wrap gap-2">
          {data.hashtags.map((tag) => (
            <span key={tag} className="bg-white border border-rose-200 text-rose-700 text-xs px-3 py-1 rounded-full font-medium">
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TwitterPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      {data.posts.map((p, i) => (
        <ContentCard
          key={p.id}
          label={`Tweet ${i + 1}`}
          copy={p.copy}
          meta={{ chars: p.character_count }}
          platform="Twitter"
          brandName={brand.name}
          tones={brand.tones}
          accent="sky"
          onRegenerate={() => onRegenerate("twitter")}
        />
      ))}
    </div>
  );
}

function VideoPanel({ data, brand, onRegenerate }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[
        { key: "thirty_sec", label: "30-Second Script" },
        { key: "sixty_sec",  label: "60-Second Script" },
      ].map(({ key, label }) => (
        <div key={key} className="space-y-3">
          <ContentCard
            label={label}
            copy={data[key].full_script}
            meta={{ words: data[key].word_count }}
            platform="Video"
            brandName={brand.name}
            tones={brand.tones}
            accent="amber"
            onRegenerate={() => onRegenerate("video_scripts")}
          />
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { title: "Hook", text: data[key].hook },
              { title: "Body", text: data[key].body },
              { title: "CTA",  text: data[key].cta },
            ].map(({ title, text }) => (
              <div key={title} className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <p className="font-semibold text-amber-700 mb-1">{title}</p>
                <p className="text-amber-900 leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmailPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Subject Line</p>
          <p className="text-sm font-medium text-gray-900">{data.subject_line}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Preview Text</p>
          <p className="text-sm text-gray-700">{data.preview_text}</p>
        </div>
      </div>
      <ContentCard
        label="Email Body"
        copy={data.body}
        platform="Email"
        brandName={brand.name}
        tones={brand.tones}
        accent="emerald"
        onRegenerate={() => onRegenerate("email_newsletter")}
      />
      <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-100 bg-white">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CTA Button:</span>
        <span className="bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-lg">
          {data.cta_button_text}
        </span>
      </div>
    </div>
  );
}

function BlogPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Blog Title</p>
        <p className="text-xl font-bold text-gray-900 font-[Georgia,serif]">{data.title}</p>
        <p className="text-sm text-slate-600">{data.meta_description}</p>
        <p className="text-xs text-slate-400">Est. {data.estimated_word_count.toLocaleString()} words</p>
      </div>
      <div className="space-y-3">
        {data.sections.map((s, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-xs font-bold text-slate-400 mt-1 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">{s.heading}</p>
                <ul className="space-y-1">
                  {s.key_points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-slate-300 mt-0.5">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onRegenerate("blog_outline")}
          className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition"
        >
          ↻ Regenerate Outline
        </button>
      </div>
    </div>
  );
}

function GoogleAdPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      {/* Ad preview */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-xs text-gray-400 mb-1">Ad Preview</p>
        <p className="text-[10px] text-green-700 font-medium mb-1">yourwebsite.com</p>
        <div className="space-y-0.5">
          <p className="text-blue-700 text-sm font-medium hover:underline cursor-pointer">
            {data.headline_1} | {data.headline_2} | {data.headline_3}
          </p>
          <p className="text-xs text-gray-600">{data.description_1}</p>
          <p className="text-xs text-gray-600">{data.description_2}</p>
        </div>
      </div>
      {/* Individual fields */}
      <div className="space-y-2">
        {[
          { label: "Headline 1", value: data.headline_1, max: 30 },
          { label: "Headline 2", value: data.headline_2, max: 30 },
          { label: "Headline 3", value: data.headline_3, max: 30 },
          { label: "Description 1", value: data.description_1, max: 90 },
          { label: "Description 2", value: data.description_2, max: 90 },
        ].map(({ label, value, max }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <span className="text-xs font-semibold text-gray-500 w-28 shrink-0">{label}</span>
            <span className="text-sm text-gray-800 flex-1">{value}</span>
            <span className={`text-xs font-mono ${value.length > max ? "text-red-500" : "text-gray-400"}`}>
              {value.length}/{max}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button onClick={() => onRegenerate("google_ad")} className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition">
          ↻ Regenerate
        </button>
      </div>
    </div>
  );
}

function SeoPanel({ data, brand, onRegenerate }) {
  return (
    <div className="space-y-4">
      {[
        { label: "SEO Title",        value: data.title,            max: 60  },
        { label: "Meta Description", value: data.meta_description, max: 160 },
        { label: "OG Title",         value: data.og_title,         max: 60  },
        { label: "OG Description",   value: data.og_description,   max: 200 },
      ].map(({ label, value, max }) => (
        <div key={label} className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">{label}</span>
            <span className={`text-xs font-mono ${value.length > max ? "text-red-500" : "text-sky-400"}`}>
              {value.length}/{max}
            </span>
          </div>
          <p className="text-sm text-gray-800">{value}</p>
        </div>
      ))}
      <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-3">Keywords</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-sky-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            🎯 {data.focus_keyword}
          </span>
          {data.secondary_keywords.map((kw) => (
            <span key={kw} className="bg-white border border-sky-200 text-sky-700 text-xs px-3 py-1 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={() => onRegenerate("seo_meta")} className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition">
          ↻ Regenerate
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ContentHub() {
  const brand = useBrandStore((s) => s.brand);
  const isConfigured = useBrandStore((s) => s.isConfigured);
  const [topic, setTopic] = useState("");
  const [activeTab, setActiveTab] = useState("linkedin");
  const [showHelp, setShowHelp] = useState(false);
  const { data, loading, error, generate, reset } = useGenerate();

  // Use the DB id if we have it, otherwise fall back to 1 (first saved brand)
  const resolvedBrandId = brand?.brandId || 1;

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    if (!isConfigured) {
      alert("Please complete Brand Setup (Module 1) first and click Save.");
      return;
    }
    await generate({ brandId: resolvedBrandId, topic });
    setActiveTab("linkedin");
  };

  const handleRegenerate = async () => {
    await generate({ brandId: resolvedBrandId, topic });
  };

  const sharedProps = { brand: brand || {}, onRegenerate: handleRegenerate };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* How to Use Banner */}
      <div className="bg-violet-50 border-b border-violet-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-violet-500 text-sm">💡</span>
            <p className="text-xs text-violet-700 font-medium">
              <strong>How to use:</strong> Type a content topic below and click <strong>Generate All</strong> to create LinkedIn, Instagram, Twitter, Video, Email, Blog, Google Ad, and SEO content in one click.
            </p>
          </div>
          <button onClick={() => setShowHelp(!showHelp)} className="text-xs text-violet-600 hover:underline ml-4 shrink-0">
            {showHelp ? "Hide ▲" : "Guide ▼"}
          </button>
        </div>
        {showHelp && (
          <div className="max-w-7xl mx-auto px-6 pb-3">
            <ol className="space-y-1 text-xs text-violet-700">
              <li>1. Make sure you've saved your brand in <strong>Module 1 (Brand Setup)</strong> first.</li>
              <li>2. Type a <strong>content topic</strong> — e.g. "Why SMEs need AI-powered marketing in 2025".</li>
              <li>3. Click <strong>Generate All</strong> and wait ~15 seconds for all 8 formats to be created.</li>
              <li>4. Use the <strong>format tabs</strong> (LinkedIn, Instagram, Twitter…) to switch between content types.</li>
              <li>5. Click <strong>Copy</strong> on any card to copy the content to your clipboard.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Content Hub</h1>
            <p className="text-xs text-gray-500">
              M2 · {isConfigured ? (
                <span className="font-medium text-gray-700">{brand?.brandName}</span>
              ) : (
                <span className="text-amber-600">⚠ Complete Brand Setup first</span>
              )}
            </p>
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
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Topic input */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Content Topic
          </label>
          <div className="flex gap-3">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. 'Why SMEs need AI-powered marketing in 2025'"
              className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-300 transition font-[Georgia,serif] placeholder:font-sans placeholder:text-gray-400"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Generating…
                </span>
              ) : (
                "✦ Generate All"
              )}
            </button>
          </div>

          {/* Brand context pills */}
          {brand && (
            <div className="mt-4 flex flex-wrap gap-2">
              {brand.tones?.map((t) => (
                <span key={t} className="text-xs bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-1 rounded-full font-medium">
                  {t}
                </span>
              ))}
              {brand.platforms?.map((p) => (
                <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            ⚠ {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-gray-100 rounded-xl w-3/4" />
            <div className="h-48 bg-gray-100 rounded-2xl" />
            <div className="h-48 bg-gray-100 rounded-2xl" />
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <div className="space-y-6">
            {/* Format tabs */}
            <FormatTabs active={activeTab} onChange={setActiveTab} available={!!data} />

            {/* Panel */}
            <div className="min-h-[400px]">
              {activeTab === "linkedin"         && <LinkedInPanel  data={data.linkedin}         {...sharedProps} />}
              {activeTab === "instagram"        && <InstagramPanel data={data.instagram}        {...sharedProps} />}
              {activeTab === "twitter"          && <TwitterPanel   data={data.twitter}          {...sharedProps} />}
              {activeTab === "video_scripts"    && <VideoPanel     data={data.video_scripts}    {...sharedProps} />}
              {activeTab === "email_newsletter" && <EmailPanel     data={data.email_newsletter} {...sharedProps} />}
              {activeTab === "blog_outline"     && <BlogPanel      data={data.blog_outline}     {...sharedProps} />}
              {activeTab === "google_ad"        && <GoogleAdPanel  data={data.google_ad}        {...sharedProps} />}
              {activeTab === "seo_meta"         && <SeoPanel       data={data.seo_meta}         {...sharedProps} />}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!data && !loading && !error && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">✦</div>
            <p className="text-lg font-medium text-gray-500">Enter a topic to generate your full content suite</p>
            <p className="text-sm mt-1">LinkedIn · Instagram · Twitter · Video · Email · Blog · Ads · SEO</p>
          </div>
        )}
      </div>
    </div>
  );
}