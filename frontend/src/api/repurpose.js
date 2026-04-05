import client from "./client";

export const repurposeContent = (payload) =>
  client.post("/repurpose/", payload).then((r) => r.data);
