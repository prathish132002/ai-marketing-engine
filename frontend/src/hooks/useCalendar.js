import { useState } from "react";
import { generateCalendar } from "../api/calendar";

export default function useCalendar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async ({ brandId, month, ...overrides }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCalendar({ 
        brand_id: brandId, 
        month, 
        ...overrides 
      });
      setData(result);
      return result;
    } catch (e) {
      const msg = e?.response?.data?.detail || "Calendar generation failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setData(null); setError(null); };

  return { data, loading, error, generate, reset };
}
