import client from "./client";

export const generateContent = (payload) =>
  client.post("/content/generate", payload).then((r) => r.data);

export const refineContent = (payload) =>
  client.post("/content/refine", payload).then((r) => r.data);
