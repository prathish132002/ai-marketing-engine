import client from "./client";

/**
 * Save brand to the database and return the created record (with DB id).
 * Called from BrandSetup on every successful save.
 */
export const saveBrand = (payload) =>
  client.post("/brand/", payload).then((r) => r.data);
