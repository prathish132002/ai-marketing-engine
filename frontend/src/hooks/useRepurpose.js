import { useState } from "react";
import { repurposeContent } from "../api/repurpose";

export default function useRepurpose() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async ({ brandId, transcript, topic, ...overrides }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await repurposeContent({ brand_id: brandId, transcript, topic, ...overrides });
      setData(result);
      return result;
    } catch (e) {
      const msg = e?.response?.data?.detail || "Repurposing failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setData(null); setError(null); };

  return { data, loading, error, generate, reset };
}
