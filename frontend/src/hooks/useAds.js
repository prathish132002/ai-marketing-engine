import { useState } from "react";
import { generateAdVariants } from "../api/ads";

export default function useAds() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async ({ brandId, product, offer, platform, ...overrides }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateAdVariants({ 
        brand_id: brandId, 
        product, 
        offer, 
        platform, 
        ...overrides 
      });
      setData(result);
      return result;
    } catch (e) {
      const msg = e?.response?.data?.detail || "Ad generation failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setData(null); setError(null); };

  return { data, loading, error, generate, reset };
}
