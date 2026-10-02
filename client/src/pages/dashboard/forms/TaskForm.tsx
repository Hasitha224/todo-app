import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../../hooks/useTask";
import toast from "react-hot-toast";
import { Hatch } from "ldrs/react";
import { useEffect } from "react";
import { taskFormSchema, type TaskFormSchemaType } from "../../../validations/taskFormSchema";

interface TaskFormProps {
  isEditing: boolean;
}
const TaskForm = ({
  isEditing = false
}: TaskFormProps) => {
    const {id : taskId} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        createTaskMutation,
        updateTaskMutation,
        useTaskById,
    } = useTasks();

    const {
        data,
        isLoading
    } = useTaskById(taskId!);

    const taskData = isEditing ? data?.data.data : undefined;
    const isTaskLoading = isEditing && isLoading;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, dirtyFields, isValid }
    } = useForm<TaskFormSchemaType>({
        resolver: zodResolver(taskFormSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
        }
    })

    useEffect(() => {
        if (isEditing && taskData) {
            reset({
                title: taskData.title ?? "",
                description: taskData.description ?? "",
            });
        }
    }, [isEditing, taskData, reset]);
    
    const onSubmit = async (data: TaskFormSchemaType) => {
        try {
            if(isEditing && taskId) {
                await updateTaskMutation.mutateAsync({taskId, editData: data});
                toast.success("Task edited successfully");
                navigate("/");
            } else {
                await createTaskMutation.mutateAsync(data);
                toast.success("Task created successfully");
                navigate("/");
            }
        } catch(error) {
            if(error) {
                console.error("Failed to save task: ", error);
                toast.error("Failed to save task");
            }
        } 
    }

    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-4 md:gap-5">
            <div className="flex w-full items-start gap-2">
                <ChevronLeft
                    className="h-9 w-9 shrink-0 cursor-pointer text-muted-foreground"
                    onClick={handleNavigateBack}
                />
                <div className="flex flex-col gap-1">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-muted-foreground">
                        {isEditing ? "Edit Task" : "Add Task"}
                    </h1>
                    <p className="text-foreground">
                        {`${isEditing ? "Update" : "Fill"} the task details given below.`}
                    </p>
                </div>
            </div>
            {isTaskLoading ? (
                <div className="flex items-center justify-center bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center text-muted-foreground"
                role="status"
                aria-live="polite"
                aria-busy="true">
                    <div className="flex gap-5 justify-center items-center space-x-2">
                        <Hatch size={35} speed={2.75} color="#3d5a5c" stroke={4} />
                        Loading Task...
                    </div>
                </div>
            ): (
                <div className="flex flex-col max-h-fit min-h-0 flex-1 gap-5 md:gap-6 p-4 md:p-6 bg-white rounded-2xl border border-panel-border shadow-sm">
                    <h1 className="text-base font-bold text-foreground underline">
                        {isEditing ? "Edit Form" : "Add Form"}
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 flex-1 min-h-0">
                        <div className="grid grid-cols-1 gap-5 md:gap-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 flex-1 min-h-0 overflow-y-auto scroll-smooth">
                            <div className="flex flex-col gap-2">
                                <label
                                className="block text-sm font-medium text-foreground"
                                htmlFor="title"
                                >
                                    Tast Title*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    maxLength={200}
                                    className="w-full pl-3 text-sm pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all bg-white text-gray-800"
                                    placeholder="Enter Task Title"
                                    {...register("title")}
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500">{errors.title.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                className="block text-sm font-medium text-foreground"
                                htmlFor="description"
                                >
                                    Task Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    maxLength={1000}
                                    className="w-full resize-none pl-3 pr-4 py-3 text-sm border rounded-lg
                                            focus:outline-none focus:border-blue-500 focus:ring-blue-500
                                            transition-all bg-white text-gray-800"
                                    placeholder="Enter Task Description"
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <p className="text-xs text-red-500">{errors.description.message}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex justify-end">
                                <button
                                type="submit"
                                disabled={Object.keys(dirtyFields).length === 0 || !isValid}
                                className="w-full md:w-fit bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                            >
                                {createTaskMutation.isPending || updateTaskMutation.isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                    </svg>
                                    <span>
                                        {isEditing ? "Editing task..." : "Adding task..."}
                                    </span>
                                </span>
                                ) : (
                                <span>
                                    {isEditing ? "Edit Task" : "Add Task"}
                                </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )

            }
            
        </div>
    )
}

export default TaskForm
