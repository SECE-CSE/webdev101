# Todo Application Documentation

## Project Structure

- **controllers/**: Contains controller functions for handling requests and responses for different models.
- **models/**: Defines Mongoose schemas and models for Todo and User.
- **routes/**: Defines Express routes for handling API requests related to Todo and User.
- **middlewares/**: Contains middleware functions for authentication and error handling.
- **config/**: Contains configuration for database connection and environment variables.
- **.env**: Stores environment variables such as database URI and server port.
- **app.ts**: Main application file where Express app and middleware are set up.
- **server.ts**: Entry point for the server where the application starts and connects to the database.

## Models

### Todo

- **title**: String (required) - Title of the Todo.
- **description**: String - Description of the Todo.
- **completed**: Boolean (default: false) - Indicates whether the Todo is completed.
- **dueDate**: Date - Due date of the Todo.

## Controllers

### Todo Controller

- **getTodos(req, res)**: Fetches all Todos.
- **createTodo(req, res)**: Creates a new Todo.
- **getTodoById(req, res)**: Fetches a Todo by its ID.
- **updateTodo(req, res)**: Updates a Todo by its ID.
- **deleteTodo(req, res)**: Deletes a Todo by its ID.

## Routes

### Todo Routes

- `GET /api/todos`: Fetches all Todos.
- `POST /api/todos`: Creates a new Todo.
- `GET /api/todos/:id`: Fetches a Todo by its ID.
- `PUT /api/todos/:id`: Updates a Todo by its ID.
- `DELETE /api/todos/:id`: Deletes a Todo by its ID.

### User Routes

- `GET /api/users`: Fetches all Users.
- `POST /api/users`: Creates a new User.

## Middlewares

- **authMiddleware**: Example authentication middleware. Verifies authorization tokens.
- **errorMiddleware**: Centralized error handling middleware.

## Configuration

- **dbConfig**: Configures connection to MongoDB.
- **envConfig**: Loads environment variables from a `.env` file.

## Running the Application

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with the following variables:
    - `MONGODB_URI`: The MongoDB connection URI.
    - `PORT`: The port number on which the server will listen.
4. Run `npm run build` to compile the TypeScript code.
5. Run `npm start` to start the application.

The server will start running on the specified port (default: 3000).

## Notes

- Add your custom authentication logic to the `authMiddleware`.
- Customize the error handling logic in the `errorMiddleware`.
- Extend the controllers and routes as needed for additional functionality.