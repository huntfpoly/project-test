import { z } from "zod";
import { TaskPriority, TaskStatus } from "@prisma/client";

export const UpdateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.optional(z.string()),
  status: z.enum([TaskStatus.IN_COMPLETE, TaskStatus.COMPLETED]),
  dueDate: z.optional(
    z
      .date()
      .or(z.string().nullable())
      .refine((date) => date === null || date > new Date(), {
        message: "Due date must be in th e future.",
      }),
  ),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]),
});
