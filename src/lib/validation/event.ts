import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  slug: z.string().min(3),
  startDatetime: z.coerce.date(),
  endDatetime: z.coerce.date(),
  seats: z.number().int().positive(),
  amount: z.number().nonnegative(),
  visibility: z.enum(["INTERNAL", "PUBLIC"]),
  creatorId: z.string(),
});