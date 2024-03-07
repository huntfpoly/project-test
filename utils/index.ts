import { FilterState } from "@/hooks/useFilterTask";
import { TaskPriority, TaskStatus } from "@prisma/client";

export const getTaskStatusClass = (status: FilterState) => {
  if (status === TaskStatus.IN_COMPLETE) {
    return "text-yellow-500 bg-warning-background";
  }
  return "bg-green-100 text-green-600";
};
export const getTaskPriorityClass = (priority: TaskPriority) => {
  if (priority === TaskPriority.HIGH) {
    return "text-red-600 bg-red-100";
  }
  if (priority === TaskPriority.MEDIUM) {
    return "text-yellow-600 bg-yellow-100";
  }
  return "text-green-600 bg-green-100";
};
