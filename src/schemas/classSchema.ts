import { z } from "zod";

export const classSchema = z.object({
  title: z.string().min(1, { message: "Kelas is required" }),
});
