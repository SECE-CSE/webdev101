import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Create Express server
const app = express();

// Express configuration
const port = 3000;

// Connect to MongoDB
mongoose
	.connect(
		"mongodb://root:rj7nEFvvJWzE6nuv7OWupKTlIW972T92ZhBMK0vTvEU0N4xD0SiXFLLsE5RPaD9y@95.217.223.21:9876/?directConnection=true",
	)
	.then(() => {
		console.log("Yay! We are connected to the database!");
	})
	.catch((err) => {
		console.log("Well, that did not go as planned...");
		console.error(err);
	});

// Use body parser to read request body as JSON or form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the Todo model
const todoSchema = new mongoose.Schema({
	title: String,
	description: String,
	completed: Boolean,
	dueDate: Date,
});

// new schema for the user
const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

// Create the Todo model from the schema
const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

// Define API routes
app.get("/api/todos", async (req, res) => {
	const todos = await Todo.find().exec();
	res.json(todos);
});

app.post("/api/todos", async (req, res) => {
	const todo = new Todo(req.body);
	await todo.save();
	res.json(todo);
});

app.get("/api/todos/:id", async (req, res) => {
	const id = req.params.id;
	const todo = await Todo.findById(id).exec();
	if (!todo) {
		res.status(404).json({ message: "Todo not found" });
	} else {
		res.json(todo);
	}
});

app.put("/api/todos/:id", async (req, res) => {
	const id = req.params.id;
	const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true }).exec();
	if (!todo) {
		res.status(404).json({ message: "Todo not found" });
	} else {
		res.json(todo);
	}
});

app.delete("/api/todos/:id", async (req, res) => {
	const id = req.params.id;
	await Todo.findByIdAndDelete(id).exec();
	res.json({ message: "Todo deleted" });
});

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// health check
app.get("/health", (req, res) => {
	res.send("OK");
});

// Start Express server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
