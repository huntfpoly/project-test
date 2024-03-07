"use client";

import { toast } from "sonner";
import { Task } from "@prisma/client";
import { ElementRef, useRef } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/useAction";
import { deleteTask } from "@/actions/delete-task";

interface TaskDeleteProps {
  data: Task;
}

export const TaskDelete = ({ data }: TaskDeleteProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    executeDelete({ id });
  };

  return (
    <form action={onDelete}>
      <input hidden readOnly name="id" id="id" value={data.id} />
      <Button
        variant="ghost"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <TrashIcon />
      </Button>
    </form>
  );
};
