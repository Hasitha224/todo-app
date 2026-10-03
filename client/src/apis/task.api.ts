import type { GetTasksData, GetTasksParams, Task, TaskData, TaskFormData } from "../types/task.types";
import type { Response } from "../types/response.types";
import axiosInstance from "../utils/axios";

export const getAllTasks = async (params?: GetTasksParams): Promise<Response<GetTasksData>> => {
    try {
        const response = await axiosInstance.get("/todos", {params});
        return {
            success: true,
            data: response.data,
            message: "Tasks fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return {
            success: false,
            data: {} as GetTasksData,
            message: error instanceof Error ? error.message : "Failed to fetch tasks",
        };
    }
}

export const getTaskById = async (id: string): Promise<Response<TaskData>> => {
    try {
        const response = await axiosInstance.get(`/todos/${id}`);
        return {
            success: true,
            data: response.data,
            message: "Task fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching task:", error);
        return {
            success: false,
            data: {} as TaskData,
            message: error instanceof Error ? error.message : "Failed to fetch task",
        };
    }
}

export const createTask = async (data: TaskFormData): Promise<Response<TaskData>> => {
    try {
        const response = await axiosInstance.post("/todos", data);
        return {
            success: true,
            data: response.data,
            message: "Task created successfully",
        };
    } catch (error) {
        console.error("Error creating task:", error);
        return {
            success: false,
            data: {} as TaskData,
            message: error instanceof Error ? error.message : "Failed to create task",
        };
    }
}

export const editTask = async (id: string, editTaskData: TaskFormData): Promise<Response<TaskData>> => {
    try {
        const response = await axiosInstance.put(`/todos/${id}`, editTaskData);
        return {
            success: true,
            data: response.data,
            message: "Task edited successfully",
        };
    } catch (error) {
        console.error("Error editing task:", error);
        return {
            success: false,
            data: {} as TaskData,
            message: error instanceof Error ? error.message : "Failed to edit task",
        };
    }
}

export const deleteTask = async (id: string): Promise<Response<Partial<TaskData>>> => {
    try {
        const response = await axiosInstance.delete(`/todos/${id}`);
        return {
            success: true,
            data: response.data,
            message: "Task deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting task:", error);
        return {
            success: false,
            data: {} as Partial<TaskData>,
            message: error instanceof Error ? error.message : "Failed to delete task",
        };
    }
}

export const updateTaskStatus = async (id: string, status: boolean): Promise<Response<Task>> => {
    try {
        const response = await axiosInstance.patch(`/todos/${id}/done`, {isTaskDone: status});
        return {
            success: true,
            data: response.data,
            message: "Task status updated successfully",
        };
    } catch (error) {
        console.error("Error updating task status", error);
        return {
            success: false,
            data: {} as Task,
            message: error instanceof Error ? error.message : "Failed to update task status",
        };
    }
}