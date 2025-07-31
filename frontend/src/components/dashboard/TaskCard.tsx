import { Task, } from "@/types/tasks";
import { formatDate } from "@/utils/datetime";
import { Trash2, CalendarDays, } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";


type TaskCardProps = Task & {
  deleteTask: (id: string) => Promise<void>
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>
}

const statusColors = {
  DONE: "text-green-500",
  IN_PROGRESS: "text-yellow-500",
  PENDING: "text-pink-500",
  COLLABORATIVE: "text-blue-500",
};

const TaskCard = ({ deleteTask, setSelectedTask, ...task }: TaskCardProps) => {
  const { category: title, id, description, endDate, status } = task;
  const router = useRouter()

  const handleSelect = useCallback(() => {
    setSelectedTask(task)
    router.push(`/task-details/${task.id}`)
  }, [task, setSelectedTask])

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm w-full max-w-sm">
      {/* Header: Icon and Title */}
      <div className="flex items-start gap-3">
        {/* Left Icon */}
        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-lg">
          <img src={"/icons/task-icon.svg"} />
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h3 onClick={handleSelect} className="text-md font-semibold text-gray-800 hover:cursor-pointer hover:text-green-600">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 truncate text-wrap line-clamp-4">{description}</p>
        </div>

        {/* Delete Icon */}
        <button onClick={() => deleteTask(id)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <CalendarDays size={16} />
          <span>{`${formatDate(endDate)}`}</span>
        </div>
        <span className={`text-sm font-semibold ${statusColors[status]}`}>
          ● {status}
        </span>
      </div>
    </div>
  );
};

export default memo(TaskCard);
