import { CircleX } from "lucide-react"
import { formatDateTime } from "../../../utils/functions";
import type { Task } from "../../../types/task.types";

interface TaskViewModalProps {
  onClose: () => void;
  task: Task
}

const TaskViewModal = ({
  onClose,
  task,
}: TaskViewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full border border-panel-border">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 h-6 w-6 rounded-full cursor-pointer flex items-center justify-center z-50"
          >
            <CircleX className="w-6 h-6 text-red-600" />
          </button>

          <div className="flex flex-col gap-5 p-4">
            <h1 className="text-base md:text-xl text-center underline text-foreground font-semibold">Task Details</h1>
            
            <div className="flex flex-col gap-4 md:gap-3">
              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Task Title</span>
                <p className="text-muted-foreground text-sm">{task.title}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Task Description</span>
                <p className="text-muted-foreground text-sm break-all">{task.description}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Task Status</span>
                <p className={`${task.isTaskDone ? "text-green-700" : "text-gray-700"} uppercase text-sm`}>{task.isTaskDone ? "Completed" : "Open"}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Created Time</span>
                <p className="text-muted-foreground text-sm">{formatDateTime(task.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TaskViewModal
