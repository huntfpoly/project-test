"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FilterState } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFilterProps {}

const TaskFilter = ({}: TaskFilterProps) => {
  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");

  return (
    <div className="flex items-center justify-center gap-1  text-sm font-medium text-slate-500 sm:gap-4 sm:text-base ">
      <p>Filters: </p>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Task status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value={FilterState.IN_COMPLETE}>In Complete</SelectItem>
            <SelectItem value={FilterState.COMPLETED}>Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilter;
