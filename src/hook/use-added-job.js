import { create } from "zustand";

export const useJobsStore = create((set) => ({
  addedJob: [],
  setAddedJob: (job) =>
    set((state) => ({
      addedJob: [...state.addedJob, job],
    })),
}));
