import { TaskPriority, TaskStatus } from "@prisma/client";

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  priority: TaskPriority;
}
