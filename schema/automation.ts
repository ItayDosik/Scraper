import { z } from "zod";

export const createAutomationSchema = z.object({
  // name: z.string({ message: "Required" }).max(50),
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});

export type createAutomationSchemaType = z.infer<typeof createAutomationSchema>;
