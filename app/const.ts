import { FilterState, ITask } from "@/app/types";

const defaultTask: Omit<ITask, "id"> = {
  title: "",
  description: "",
  status: FilterState.IN_COMPLETE,
  date: '',
  priority: false,
};
