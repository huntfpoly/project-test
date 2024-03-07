"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";

export const deleteTask = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;
  let list;

  try {
    list = await db.task.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/`);
  return { data: list };
};
