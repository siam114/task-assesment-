export enum TaskStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  COLLABORATIVE="COLLABORATIVE"
}

export type Task = {
  id: string,
  description: string,
  status: TaskStatus,
  category: string,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date,
}