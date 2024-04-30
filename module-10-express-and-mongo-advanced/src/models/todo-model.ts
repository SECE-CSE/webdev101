import mongoose, { type Document, Schema } from "mongoose";

interface TodoDocument extends Document {
	title: string;
	description?: string;
	completed?: boolean;
	dueDate?: Date;
}

const todoSchema = new Schema<TodoDocument>({
	title: { type: String, required: true },
	description: String,
	completed: { type: Boolean, default: false },
	dueDate: Date,
});

const Todo = mongoose.model<TodoDocument>("Todo", todoSchema);

export default Todo;
