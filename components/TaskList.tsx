"use client";

import React, { createContext, useState } from "react";
import { AddTask } from "@/components/AddTask";
import TaskFilter from "@/components/TaskFilter";
import { FilterState } from "@/app/types";
import { useSearchParams } from "next/navigation";
import TaskItem from "@/components/TaskItem";
import { Task } from "@prisma/client";

interface TaskListProps {
  data: Task[];
}
const TaskList = ({ data }: TaskListProps) => {
  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");
  const [orderedData, setOrderedData] = useState(data);

  const ThemeContext = createContext("light");

  return (
    <div className="w-full ">
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-300 py-4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
        <TaskFilter />
        <AddTask />
      </div>
      <div className=" grid max-h-[600px] grid-cols-4 space-x-4 overflow-auto py-5">
        {orderedData.map((task: any) => (
          <TaskItem key={task.id} item={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
