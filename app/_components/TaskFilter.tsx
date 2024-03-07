"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterState, useFilterTask } from "@/hooks/useFilterTask";
import { useRouter, useSearchParams } from "next/navigation";
import { TaskStatus } from "@prisma/client";

interface TaskFilterProps {}

const TaskFilter = ({}: TaskFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const filterTask = params.get("status") as TaskStatus;
  const onChangeFilter = useFilterTask((state) => state.onChangeFilter);
  const onChange = (value: FilterState) => {
    onChangeFilter(value);
    params.set("status", value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-1  text-sm font-medium text-slate-500 sm:gap-4 sm:text-base ">
      <p>Filters: </p>
      <Select onValueChange={onChange} defaultValue={filterTask || "all"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Task status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={TaskStatus.IN_COMPLETE}>In Complete</SelectItem>
            <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilter;
