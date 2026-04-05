import client from "./client";

export const analyzeSentiment = (payload) =>
  client.post("/sentiment/analyze", payload).then((r) => r.data);
