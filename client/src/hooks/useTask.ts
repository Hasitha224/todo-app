import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import type { GetTasksData, GetTasksParams, Task, TaskData, TaskFormData } from "../types/task.types";
import type { Response } from "../types/response.types";
import { createTask, deleteTask, editTask, getAllTasks, getTaskById, updateTaskStatus } from "../apis/task.api";

const POLLING_INTERVAL = 30 * 1000;

interface UseTasksReturn {
    tasks: Task[];
    loading: boolean;
    isFetching: boolean;
    isRefetching: boolean;
    error: string | null;
    total: number;
    currentPage: number;
    params?: GetTasksParams;
    setParams?: (params: GetTasksParams) => void;
    useTaskById: (taskId: string) => UseQueryResult<Response<TaskData>>;
    createTaskMutation: ReturnType<typeof useMutation<Response<TaskData>, Error, TaskFormData>>;
    updateTaskMutation: ReturnType<typeof useMutation<Response<TaskData>, Error, {taskId: string; editData: TaskFormData }>>;
    deleteTaskMutation: ReturnType<typeof useMutation<Response<Partial<TaskData>>, Error, {taskId: string}>>;
    updateTaskStatusMutation: ReturnType<typeof useMutation<Response<Task>, Error, {taskId: string; status: boolean; }>>;
}

export const useTasks = (
    params?: GetTasksParams,
    setParams?: (params: GetTasksParams) => void,
    pollingInterval: number = POLLING_INTERVAL,
): UseTasksReturn => {
    const queryClient = useQueryClient();

    const {
        data: taskData,
        isLoading,
        error: queryError,
        isFetching,
        isRefetching,
    } = useQuery<GetTasksData>({
        queryKey: ['tasks', params],
        queryFn: async () => {
            const res = await getAllTasks(params);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        staleTime: 10 * 1000,
        refetchInterval: pollingInterval,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
    })

    const useTaskById = (taskId: string) => {
        return useQuery({
            queryKey: ['tasks', taskId],
            queryFn: () => getTaskById(taskId),
            enabled: !!taskId,
            staleTime: 10 * 1000,
            refetchOnWindowFocus: true,
        })
    }

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    })
    
    const updateTaskMutation = useMutation({
        mutationFn: ({taskId, editData} : { taskId: string; editData: TaskFormData }) => 
            editTask(taskId, editData),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    })

    const updateTaskStatusMutation = useMutation({
        mutationFn: ({ taskId, status }: { taskId: string; status: boolean; }) =>
            updateTaskStatus(taskId, status),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: ({taskId}: {taskId: string}) => deleteTask(taskId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
    
    return {
        tasks: taskData?.data ?? [],
        loading: isLoading,
        isFetching,
        isRefetching,
        error: queryError?.message ?? null,
        total: taskData?.total ?? 0,
        currentPage: taskData?.page ?? 1,
        params,
        setParams: setParams ?? (() => {}),
        useTaskById,
        createTaskMutation,
        updateTaskMutation,
        deleteTaskMutation,
        updateTaskStatusMutation,
    }
} 