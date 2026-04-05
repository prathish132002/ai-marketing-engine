// frontend/src/store/brandStore.js
// Zustand store — brand context shared across all modules
// Every module reads from this before making API calls

import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_BRAND = {
  brandName: "",
  industry: "",
  targetAudience: "",
  tones: [],            // array of tone ids, max 3
  keywordsInclude: "",  // comma-separated string
  keywordsAvoid: "",    // comma-separated string
  campaignGoal: "",
  campaignName: "",
  platforms: [],        // array of platform ids
};

const useBrandStore = create(
  persist(
    (set, get) => ({
      brand: { ...DEFAULT_BRAND },
      isConfigured: false,

      /** Set the full brand object (called on Save) */
      setBrand: (updates) =>
        set((state) => ({
          brand: { ...state.brand, ...updates },
        })),

      /** Mark brand as configured (after first successful save) */
      setConfigured: (val) => set({ isConfigured: val }),

      /** Reset brand back to defaults */
      resetBrand: () => set({ brand: { ...DEFAULT_BRAND }, isConfigured: false }),

      /**
       * Returns a structured context object ready to inject into Claude prompts.
       * Use this in every service call — never read brand fields individually.
       *
       * Example usage in a service:
       *   const ctx = useBrandStore.getState().getBrandContext();
       *   const prompt = buildPrompt(ctx, userInput);
       */
      getBrandContext: () => {
        const { brand } = get();
        return {
          brandName: brand.brandName,
          industry: brand.industry,
          targetAudience: brand.targetAudience,
          tones: brand.tones,                          // ["professional", "warm"]
          keywordsInclude: brand.keywordsInclude
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
          keywordsAvoid: brand.keywordsAvoid
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
          campaignGoal: brand.campaignGoal,
          campaignName: brand.campaignName,
          platforms: brand.platforms,
        };
      },
    }),
    {
      name: "brand-context",          // localStorage key
      partialize: (state) => ({       // only persist brand data, not derived helpers
        brand: state.brand,
        isConfigured: state.isConfigured,
      }),
    }
  )
);

export default useBrandStore;
