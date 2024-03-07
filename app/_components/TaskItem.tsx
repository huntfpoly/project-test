import React from "react";
import { useCardModal } from "@/hooks/useCardModal";
import { TaskDelete } from "@/app/_components/TaskDelete";
import { Task, TaskPriority, TaskStatus } from "@prisma/client";
import BadgeStatus from "@/app/_components/BadgeStatus";
import BadgePriority from "@/app/_components/BadgePriority";

const TaskItem = ({ item }: { item: Task }) => {
  const cardModal = useCardModal();

  return (
    <>
      <div
        className="flex flex-col rounded-lg bg-white p-4 shadow-sm transition-all hover:cursor-pointer hover:shadow-lg"
        onClick={() => cardModal.onOpen(item.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <BadgeStatus status={item.status} />
            {item.priority && <BadgePriority priority={item.priority} />}
          </div>
          <TaskDelete data={item} />
        </div>
        <div>
          <h3 className="truncate text-lg font-semibold">{item.title}</h3>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
