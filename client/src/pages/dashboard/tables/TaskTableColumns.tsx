import { CheckSquare, Clock, Edit, Eye, FileText, Trash2 } from "lucide-react";
import type { Column } from "../../../components/ui/DataTable"
import type { Task } from "../../../types/task.types"
import CopyableText from "../../../components/ui/CopyableText";
import { formatDateTime } from "../../../utils/functions";

export const createTaskTableColumns = (
    handleViewTask: (task: Task) => void,
    handleEditTask: (task: Task) => void,
    handleDeleteTask: (task: Task) => void,
    handleCompleteTask: (task: Task) => void,
): Column<Task>[] => {
    return [
        {
            key: "_id",
            label: "Task ID",
            className: "min-w-[120px]",
            render: (value: string, row: Task) => (
                <div className="flex items-center gap-2">
                    <FileText size={14} className={`${row.isTaskDone ? "opacity-50" : ""} text-muted-foreground`}/>
                    <span className={`${row.isTaskDone ? "text-muted-foreground opacity-50" : "text-foreground"} text-xs flex justify-end text-left`}>
                        <CopyableText text={value} truncate iconClassName="!translate-y-0" />
                    </span>
                </div>
            ),
        },
        {
            key: "title",
            label: "Task Title",
            className: "min-w-[120px]",
            render: (value: string, row: Task) => (
                <span className={`${row.isTaskDone ? "text-muted-foreground opacity-50" : "text-foreground"} text-xs text-left`}>
                    {value}
                </span>
            ),
        },
        {
            key: "description",
            label: "Task Description",
            className: "min-w-[250px] max-w-[350px]",
            render: (value: string, row: Task) => (
                <span
                    className={`block max-w-[320px] truncate text-xs text-left
                        ${row.isTaskDone
                            ? "text-muted-foreground opacity-50"
                            : "text-foreground"
                        }`
                    }
                    title={value}
                >
                    {value || "-"}
                </span>
                
            ),
        },
        {
            key: "isTaskDone",
            label: "Task Status",
            className: "min-w-[120px]",
            render: (value: boolean) => (
                <span className={`font-bold uppercase ${value ? "text-green-700 opacity-50" : "text-gray-700"}`}>
                    {value ? "Completed" : "Open"}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Timestamp",
            className: "min-w-[120px]",
            render: (date, row: Task) => {
                return (
                    <div className="flex items-center gap-2">
                        <Clock size={14} className={`${row.isTaskDone ? "opacity-50" : ""} text-muted-foreground`} />
                        <span className={`${row.isTaskDone ? "text-muted-foreground opacity-50" : "text-foreground"} text-xs font-mono`}>{formatDateTime(date)}</span>
                    </div>
                );
            },
        },
        {
            key: "action",
            label: "Actions",
            className: "text-right min-w-[100px]",
            render: (_value: string, row: Task) => (
                <div className="flex items-center gap-2 justify-end">
                    <button
                        onClick={() => handleCompleteTask(row)}
                        className={`px-2 py-1 rounded-lg border cursor-pointer transition-all text-sm font-medium flex items-center gap-2 ${
                            row.isTaskDone
                                ? "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                : "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                        }`}
                    >
                        <CheckSquare size={16} />
                        <span>
                            {row.isTaskDone ? "Mark as Undone" : "Mark as Completed"}
                        </span>
                    </button>
                    {handleViewTask && (
                        <button
                        className="flex h-6 w-6 cursor-pointer items-center justify-center p-0.5 text-foreground"
                        onClick={() => handleViewTask(row)}
                        >
                            <Eye size={18} />
                        </button>
                    )}
                    {handleEditTask && (
                        <button
                        className="flex h-6 w-6 cursor-pointer items-center justify-center p-0.5 text-foreground"
                        onClick={() => handleEditTask(row)}
                        >
                            <Edit size={18} />
                        </button>
                    )}
                    {handleDeleteTask && (
                        <button
                        className="flex h-6 w-6 cursor-pointer items-center justify-center p-0.5 text-foreground"
                        onClick={() => handleDeleteTask(row)}
                        >
                            <Trash2 size={18} className="text-red-500"/>
                        </button>
                    )}
                </div>
            ),
        },
    ]
}