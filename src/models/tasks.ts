import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
	title: string;
	completed: boolean;
}

const taskSchema = new mongoose.Schema<ITask>({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
