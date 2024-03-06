export enum FilterState {
  IN_COMPLETE = "in_complete",
  COMPLETED = "completed",
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: FilterState;
  dueDate: string;
  priority: IPriority;
}
export interface ITaskList {
  [key: string]: ITask;
}
export enum IPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
