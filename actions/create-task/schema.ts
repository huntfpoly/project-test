import { z } from "zod";
import { TaskPriority, TaskStatus } from "@prisma/client";

export const CreateTaskSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.optional(z.string()),
  status: z.enum([TaskStatus.IN_COMPLETE, TaskStatus.COMPLETED]),
  dueDate: z.optional(z.date().or(z.undefined())),
  priority: z.optional(z.undefined().or(z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]))),
});
