import { z } from "zod";
import { FilterState, IPriority } from "@/app/types";

export const CreateTaskSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.optional(z.string()),
  status: z.enum([FilterState.IN_COMPLETE, FilterState.COMPLETED]),
  dueDate: z.optional(
    z
      .date()
      .or(z.string().nullable())
      .refine((date) => date === null || date > new Date(), {
        message: "Due date must be in th e future.",
      }),
  ),
  priority: z.enum([IPriority.LOW, IPriority.MEDIUM, IPriority.HIGH]),
});
