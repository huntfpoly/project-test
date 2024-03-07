import { z } from "zod";
import { CreateTaskSchema } from "@/actions/create-task/schema";
import { Task } from "@prisma/client";

export type InputType = z.infer<typeof CreateTaskSchema>;
export type ReturnType = Task;
