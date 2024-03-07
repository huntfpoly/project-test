"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Task } from "@prisma/client";
import TaskItem from "@/app/_components/TaskItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

interface TaskListProps {
  data: Task[];
  totalPages: number;
  totalCount: number;
}
const TaskList = ({ data, totalPages, totalCount }: TaskListProps) => {
  const searchParams = useSearchParams();

  // Get the current page number from the query string parameters
  const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

  const params = new URLSearchParams(searchParams.toString());
  // Create a function to generate a URL with the updated page number
  const createPage = (page: number) => {
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };
  return (
    <>
      <div className="grid max-h-[600px] grid-cols-1 gap-4 overflow-auto py-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((task: any) => (
          <TaskItem key={task.id} item={task} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink isActive={i + 1 === page} href={createPage(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default TaskList;
