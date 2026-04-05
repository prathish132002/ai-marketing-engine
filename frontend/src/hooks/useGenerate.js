import { useState } from "react";
import { generateContent } from "../api/content";

/**
 * useGenerate — hook for calling the content generation API.
 * Reads brand context from useBrandStore automatically.
 */
export default function useGenerate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async ({ brandId, topic, ...overrides }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateContent({ brand_id: brandId, topic, ...overrides });
      setData(result);
      return result;
    } catch (e) {
      const msg = e?.response?.data?.detail || "Generation failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setData(null); setError(null); };

  return { data, loading, error, generate, reset };
}
