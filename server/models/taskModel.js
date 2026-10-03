import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    isTaskDone: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

TaskSchema.index({ createdAt: -1});

export default model('Task', TaskSchema);