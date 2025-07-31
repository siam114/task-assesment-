"use client";

import { useCallback, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Task, TaskStatus } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/datetime";

type Props = {
  deleteTask: (id: string) => Promise<void>,
  task: Task,
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>
  updateTask: (id: string, taskData: any) => Promise<any>
};

const TaskDetails = ({ deleteTask, task, updateTask, setSelectedTask, }: Props) => {
  const router = useRouter()
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const statusOptions: Record<TaskStatus, string> = {
    [TaskStatus.IN_PROGRESS]: "Ongoing",
    [TaskStatus.DONE]: "Done",
    [TaskStatus.COLLABORATIVE]: "Collaborative Task",
    [TaskStatus.PENDING]: "Pending"
  };

  const handleDelete = useCallback(async () => {
    await deleteTask(task.id)
    router.replace("/task-list")
    setSelectedTask(null)
  }, [task.id])

  const handleUpdate = useCallback(async () => {
    const updated = await updateTask(task.id, { status })
    setSelectedTask(updated)
  }, [task.id, status])

  const handleBack = useCallback(async () => {
    router.back()
    setSelectedTask(null)
  }, [])

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Left Side - Subheading */}
        <h3 className="text-md font-bold">Task Details</h3>

        {/* Right Side - Points & Buttons */}
        <div className="flex gap-3">
          <span className="text-[#C716F3] font-semibold text-sm self-center">
            20 Points
          </span>
          {/* <button className="bg-[#ffaa0031] text-[#ffaa00] border border-gray-300 px-4 py-2 rounded hover:bg-gray-200 text-sm font-medium">
            Edit Task
          </button> */}
          <button onClick={handleBack} className="bg-[#60E5AE] border border-gray-300 px-6 py-2 rounded hover:bg-gray-200 text-sm font-medium">
            Back
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-black mb-3">{task.category}</h2>

      <p className="text-sm text-gray-700 mb-6 leading-relaxed">
        {task.description}
      </p>

      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-1">End Date</p>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span>📅</span>
          <span>{formatDate(task.endDate)}</span>
          <span className="text-yellow-600 font-medium">• {status}</span>
        </div>
      </div>

      {/* Change Status */}
      <div className="relative mb-10 max-w-xs">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm text-left flex justify-between items-center"
        >
          {status === "DONE" ? (
            <span className="text-green-600">✔ Done</span>
          ) : (
            statusOptions[status as TaskStatus]
          )}
          <ChevronDownIcon className="h-4 w-4 text-gray-600" />
        </button>
        {dropdownOpen && (
          <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow z-10">
            {Object.keys(statusOptions).map((option, index) => (
              <div
                key={option}
                onClick={() => {
                  setStatus(option as TaskStatus);
                  setDropdownOpen(false);
                }}

                className={`px-4 py-0.5 text-sm cursor-pointer hover:bg-gray-100 ${status == option ? "bg-gray-100 font-medium" : ""
                  }`}
              >
                {statusOptions[option as TaskStatus]}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-medium">
          Delete Task
        </button>
        <button onClick={handleUpdate} className="bg-[#60E5AE] hover:bg-green-700 px-6 py-2 rounded font-medium">
          Submit
        </button>
      </div>
    </>
  );
};

export default TaskDetails;
