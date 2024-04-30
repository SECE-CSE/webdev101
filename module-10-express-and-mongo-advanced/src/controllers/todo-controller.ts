import type { Request, Response } from "express";
import Todo from "@models/todo-model";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		const todos = await Todo.find().exec();
		res.json(todos);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const createTodo = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const todo = new Todo(req.body);
		await todo.save();
		res.json(todo);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const getTodoById = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const todo = await Todo.findById(req.params.id).exec();
		if (!todo) {
			res.status(404).json({ message: "Todo not found" });
			return;
		}
		res.json(todo);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateTodo = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).exec();
		if (!updatedTodo) {
			res.status(404).json({ message: "Todo not found" });
			return;
		}
		res.json(updatedTodo);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteTodo = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		await Todo.findByIdAndDelete(req.params.id).exec();
		res.json({ message: "Todo deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
