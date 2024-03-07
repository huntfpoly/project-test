"use client";
import React from "react";
import TaskFilter from "@/app/_components/TaskFilter";
import { Button } from "@/components/ui/button";
import { useCardModal } from "@/hooks/useCardModal";

const Header = () => {
  const onOpen = useCardModal((state) => state.onOpen);
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-slate-300 py-4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
      <TaskFilter />
      <Button variant="default" onClick={() => onOpen()}>
        Add New Task
      </Button>
    </div>
  );
};

export default Header;
