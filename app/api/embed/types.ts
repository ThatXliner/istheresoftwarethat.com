import { z } from "zod/v4";
export const getResponseSchema = z.object({
  embedding: z.array(z.number()),
  cached: z.boolean(),
});
