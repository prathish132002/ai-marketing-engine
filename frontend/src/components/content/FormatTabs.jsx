/**
 * FormatTabs — tab bar for selecting active content format in ContentHub.
 */
const TABS = [
  { id: "linkedin",         label: "LinkedIn",       icon: "💼", accent: "violet" },
  { id: "instagram",        label: "Instagram",      icon: "📸", accent: "rose" },
  { id: "twitter",          label: "Twitter / X",    icon: "𝕏",  accent: "sky" },
  { id: "video_scripts",    label: "Video Scripts",  icon: "🎬", accent: "amber" },
  { id: "email_newsletter", label: "Email",          icon: "✉️", accent: "emerald" },
  { id: "blog_outline",     label: "Blog Outline",   icon: "📝", accent: "slate" },
  { id: "google_ad",        label: "Google Ads",     icon: "🎯", accent: "rose" },
  { id: "seo_meta",         label: "SEO Meta",       icon: "🔍", accent: "sky" },
];

export { TABS };

export default function FormatTabs({ active, onChange, available = true }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          disabled={!available}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
            ${active === tab.id
              ? "bg-gray-900 text-white shadow-md scale-[1.02]"
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
