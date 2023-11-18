import { z } from "zod";

export const examSchema = z.object({
  kelas: z
    .string({ required_error: "Url is required" })
    .min(1, { message: "Kelas is required" }),
  url: z
    .string({ required_error: "Url is required" })
    .min(1, { message: "Url is required" }),
  startTime: z.string({ required_error: "Start time is required" }),
  endTime: z.string({ required_error: "End time is required" }),
});
