import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "@routes/todo-routes";
import errorMiddleware from "@middlewares/error-middleware";

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use("/api/todos", todoRoutes);

// Centralized error handling
app.use(errorMiddleware);

export default app;
