export interface Task {
    _id: string;
    title: string;
    description?: string;
    isTaskDone: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetTasksData {
    data: Task[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface TaskData {
    data: Task;
    message: string;
}

export interface GetTasksParams {
    page?: number;
    limit?: number;
}

export interface TaskFormData {
    title: string;
    description?: string;
}