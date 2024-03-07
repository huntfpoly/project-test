import { z } from "zod";
import { Task } from "@prisma/client";
import { UpdateTaskSchema } from "@/actions/edit-task/schema";

export type InputType = z.infer<typeof UpdateTaskSchema>;
export type ReturnType = Task;
