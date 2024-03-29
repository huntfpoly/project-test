"use server";

import { InputType } from "./types";
import { db } from "@/lib/db";
import { Task } from "@prisma/client";
import { ActionState } from "@/hooks/useAction";
import { revalidatePath } from "next/cache";

export const createTask = async (data: InputType): Promise<ActionState<InputType, Task>> => {
  let task: Task;
  try {
    task = await db.task.create({ data });
  } catch (error) {
    return {
      error: "Failed to create." + error,
    };
  }

  // revalidatePath allows you to purge cached data on-demand for a specific path.
  revalidatePath(`/`);
  return { data: task };
};
