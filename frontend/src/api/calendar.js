import client from "./client";

export const generateCalendar = (payload) =>
  client.post("/calendar/generate", payload).then((r) => r.data);
