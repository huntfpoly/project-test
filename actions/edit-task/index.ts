"use server";

import { InputType } from "./types";
import { db } from "@/lib/db";
import { Task } from "@prisma/client";
import { ActionState } from "@/hooks/useAction";
import { revalidatePath } from "next/cache";

export const updateTask = async (data: InputType): Promise<ActionState<InputType, Task>> => {
  let task: Task;
  try {
    task = await db.task.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create." + error,
    };
  }
  revalidatePath(`/`);
  return { data: task };
};
