import { z } from 'zod'

export const dataSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  severity: z.string(),
  host: z.string(),
  description: z.string(),
})

export type dataSchema = z.infer<typeof dataSchema>