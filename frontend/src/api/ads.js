import client from "./client";

export const generateAdVariants = (payload) =>
  client.post("/ads/generate", payload).then((r) => r.data);
