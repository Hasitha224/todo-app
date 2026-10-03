import { z } from "zod";

export const taskFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Task Title is required")
        .max(200, "Task Title must be 200 characters or less"),
    description: z
        .string()
        .trim()
        .max(1000, "Task Description must be 1000 characters or less")
        .optional(),
})

export type TaskFormSchemaType = z.infer<typeof taskFormSchema>