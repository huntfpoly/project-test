export enum FilterState {
  IN_COMPLETE = "in_complete",
  COMPLETED = "completed",
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  status: FilterState;
  date: string;
  priority: boolean;
}
