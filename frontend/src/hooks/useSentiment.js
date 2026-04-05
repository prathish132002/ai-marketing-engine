import { useState } from "react";
import { analyzeSentiment } from "../api/sentiment";

export default function useSentiment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async ({ brandId, reviews_text, ...overrides }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSentiment({ 
        brand_id: brandId, 
        reviews_text, 
        ...overrides 
      });
      setData(result);
      return result;
    } catch (e) {
      const msg = e?.response?.data?.detail || "Sentiment analysis failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setData(null); setError(null); };

  return { data, loading, error, analyze, reset };
}
