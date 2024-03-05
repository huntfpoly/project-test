"use client";

import React, { createContext } from "react";
import { AddTask } from "@/components/AddTask";
import TaskFilter from "@/components/TaskFilter";
import { FilterState } from "@/app/types";
import { useSearchParams } from "next/navigation";
import Task from "@/components/Task";

const TaskList = () => {
  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");
  const filteredTasks = [
    {
      id: 1,
      title: "Task 1",
      description:
        'Task 1 Description b-8 flex flex-col gap- asdf sdaf sda sda fd4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">',
      status: "in_complete",
      date: "2021-10-10",
      priority: true,
    },
  ];
  const ThemeContext = createContext("light");

  return (
    <div className="w-full ">
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-300 py-4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
        <TaskFilter />
        <AddTask />
      </div>
      <div className=" grid max-h-[600px] grid-cols-4  overflow-auto px-4 py-5">
        {filteredTasks.map((task: any) => (
          <Task key={task.id} item={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
