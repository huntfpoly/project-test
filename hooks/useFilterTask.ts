"use client";
import { create } from "zustand";
import { TaskStatus } from "@prisma/client";

export type FilterState = TaskStatus | "all";
type filterStore = {
  filter: FilterState;
  onChangeFilter: (filter: FilterState) => void;
};

export const useFilterTask = create<filterStore>((set) => ({
  filter: "all",
  onChangeFilter: (filter: FilterState) => {
    set({ filter });
  },
}));
