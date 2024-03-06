import { z } from "zod";
import { CreateTaskSchema } from "@/actions/create-task/schema";
import { Task } from "@prisma/client";

export type ActionState<TOutput> = {
  data?: TOutput;
  error?: string;
};
export type InputType = z.infer<typeof CreateTaskSchema>;
export type ReturnType = Task;
