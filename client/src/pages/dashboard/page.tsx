import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { GetTasksParams, Task } from "../../types/task.types";
import { parseAsInteger, useQueryState } from "nuqs";
import toast from "react-hot-toast";
import { Hatch } from "ldrs/react";
import { getTotalPages } from "../../utils/functions";
import { CheckSquare, CircleQuestionMark, File, Plus } from "lucide-react"
import { DataTable } from "../../components/ui/DataTable";
import PaginationControls from "../../components/ui/PaginationControls";
import ConfirmationModal from "../../components/ui/modals/ConfirmationModal";
import { createTaskTableColumns } from "./tables/TaskTableColumns";
import { useTasks } from "../../hooks/useTask";
import TaskViewModal from "./modals/TaskViewModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTaskViewModal, setShowTaskViewModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDeleteConfirmationModal , setShowDeleteConfirmationModal] = useState<boolean>(false);
  const [showStatusConfirmationModal , setShowStatusConfirmationModal] = useState<boolean>(false);

  // Use nuqs for filter state
  const [currentPage, setCurrentPage] = useQueryState("page",parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState("limit",parseAsInteger.withDefault(10));

  const queryParams = useMemo<GetTasksParams>(() => {
    const params: GetTasksParams = {
      page: currentPage,
      limit: pageSize,
    }
    return params;
  },[currentPage, pageSize]);

  const {
    tasks,
    total,
    loading,
    error,
    deleteTaskMutation,
    updateTaskStatusMutation,
  } = useTasks(
    queryParams,
    () => {},
  );

  const viewTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskViewModal(true);
  }
  
  const handleCreateTask = () => {
    navigate("/task/create");
  }

  const editTask = (task: Task) => {
    navigate(`/task/edit/${task._id}`)
  }

  const deleteTask = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteConfirmationModal(true);
  }

  const handleDeleteTask = async () => {
    try {
      if(selectedTask) {
        await deleteTaskMutation.mutateAsync({taskId: selectedTask?._id});
        toast.success("Task deleted successfully");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setShowDeleteConfirmationModal(false);
    };
  }

  const completeTask = (task: Task) => {
    setSelectedTask(task);
    setShowStatusConfirmationModal(true);
  }

  const handleCompleteTaskStatus = async () => {
    if (!selectedTask) return;
    try {
      await updateTaskStatusMutation.mutateAsync({
          taskId: selectedTask._id,
          status: !selectedTask.isTaskDone,
      });
      toast.success(
          selectedTask.isTaskDone
            ? "Task marked as undone"
            : "Task marked as completed"
      );
    } catch (error: unknown) {
      if(error) {
        console.error("Failed to update task status", error);
        toast.error("Failed to update task status");
      }
    } finally {
      setShowStatusConfirmationModal(false);
    };
  }
  
  const columns = createTaskTableColumns(viewTask, editTask, deleteTask, completeTask);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-muted-foreground mb-2">
        Task Dashboard
      </h1>
      
      <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
        <button
            onClick={handleCreateTask}
            className="flex justify-center w-full lg:w-50 items-center gap-2 px-4 py-2.5 cursor-pointer border border-panel-border rounded-lg hover:bg-gray-50 transition-all duration-300 ease-in-out text-sm font-medium text-gray-700 bg-white shadow-sm"
        >
            <Plus size={20} />
            <span>Create Task</span>
        </button>
      </div>
      {loading ? (
        <div className="bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center text-muted-foreground">
          <div className="flex gap-5 justify-center items-center space-x-2">
            <Hatch size={35} speed={2.75} color="#3d5a5c" stroke={4} />
            Loading Tasks...
          </div>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center">
            <h3 className="text-lg font-semibold text-red-700">
                Failed to Load Tasks
            </h3>

            <p className="mt-2 text-sm text-red-600">
                {error}
            </p>
        </div>
      ) : (
        <>
          {tasks && tasks.length > 0 ? (
              <div className="flex flex-col gap-1">
                <DataTable
                  data={tasks}
                  columns={columns}
                />
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={getTotalPages(total, pageSize)}
                  pageSize={pageSize}
                  totalRecords={total}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center">
                <File
                  className="mx-auto text-muted-foreground mb-4"
                  size={48}
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Tasks Found
                </h3>
                <p className="text-muted-foreground mb-4">
                    There are no tasks to display.
                </p>
              </div>
            )}
        </>
      )}
      {showTaskViewModal && selectedTask && (
        <TaskViewModal
          onClose={() => setShowTaskViewModal(false)}
          task={selectedTask}
        />
      )}
      {showDeleteConfirmationModal && selectedTask && (
        <ConfirmationModal
          onCancel={() => setShowDeleteConfirmationModal(false)}
          onConfirm={handleDeleteTask}
          title="Delete Task"
          description="Are you sure to delete this task?"
          isLoading={deleteTaskMutation.isPending}
          icon={<CircleQuestionMark className="w-6 h-6 text-red-600" />}
        />
      )}
      {showStatusConfirmationModal && selectedTask && (
        <ConfirmationModal
          onCancel={() => setShowStatusConfirmationModal(false)}
          onConfirm={handleCompleteTaskStatus}
          title={`Update Task Status to ${selectedTask.isTaskDone ? "Open" : "Completed"}`}
          description={`Are you sure to mark this task as ${selectedTask.isTaskDone ? "Open" : "Completed"}?`}
          isLoading={updateTaskStatusMutation.isPending}
          icon={<CheckSquare className={`w-6 h-6 ${selectedTask.isTaskDone ? "text-gray-600" : "text-green-600"}`} />}
          variant={selectedTask.isTaskDone ? "neutral" : "success"} 
        />
      )}
    </div>
  )
}

export default Dashboard
