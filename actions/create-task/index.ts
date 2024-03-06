"use server";

import { ActionState, InputType } from "./types";
import { db } from "@/lib/db";
import { Task } from "@prisma/client";

export const createTask = async (data: InputType): Promise<ActionState<Task>> => {
  let task: Task;
  try {
    task = await db.task.create({ data });
  } catch (error) {
    return {
      error: "Failed to create." + error, // get error create fail
    };
  }
  // revalidatePath(`/board/${boardId}`);
  return { data: task };
};
