import mongoose from 'mongoose';
import Task from '../models/taskModel.js';

export const taskCreate = async (req,res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({
            title,
            description,
        });
        const savedTask = await task.save();
        return res.status(201).json({
            data: savedTask,
            message: "Task created successfully"
        });
    } catch(error) {
        console.error("Error creating task ", error);
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}

export const taskUpdate = async (req,res) => {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }
    
    try {
        const {title, description} = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
            },
            { returnDocument: "after", runValidators: true },
        );
        if(!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({
            data: updatedTask,
            message: "Task updated successfully",
        });
    } catch(error) {
        console.error("Error updating task ", error);
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllTasks = async (req,res) => {
    try {
        const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);

        const skip = (page - 1) * limit;

        const [tasks, total] = await Promise.all([
            Task.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

            Task.countDocuments(),
        ]);
        
        return res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: tasks
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTaskById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({
            data: task,
            message: 'Task retrieved successfully',
        });
    } catch (error) {
        console.error('Error fetching task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTaskById = async (req,res) => {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
        const deleteData = await Task.findByIdAndDelete(taskId);
        if (!deleteData) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch(error){
        console.error('Error deleting task', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const taskStatusUpdate = async (req,res) => {
    const taskId = req.params.id;
    const { isTaskDone } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    if (typeof isTaskDone !== "boolean") {
        return res.status(400).json({ message: 'taskDone must be a boolean' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { isTaskDone },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({
            data: updatedTask,
            message: 'Task status updated successfully',
        });
    } catch (error) {
        console.error('Error updating status of task', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}