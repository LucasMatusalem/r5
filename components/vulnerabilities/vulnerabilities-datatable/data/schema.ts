import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dataSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  severity: z.string(),
  host: z.string(),
  description: z.string(),
})

export type dataSchema = z.infer<typeof dataSchema>