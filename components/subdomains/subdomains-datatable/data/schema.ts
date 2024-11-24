import { z } from "zod";

export const dataSchema = z.object({
  id: z.number(),
  host: z.string(),
  ip: z.string(),
  firstseen: z.string(),
  lastseen: z.string(),
  domain: z.string(),
});

export type dataSchema = z.infer<typeof dataSchema>;
