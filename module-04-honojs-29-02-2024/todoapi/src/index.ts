import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth';
import { cors } from 'hono/cors'


type Todo = {
  id: string; // 1
  task: string; // "Buy milk"
  description: string; // "Buy 2% milk from the grocery store"
  is_completed: boolean; // false
};

type Bindings = {
  TODOKV: KVNamespace;
  DB: D1Database;
  USERNAME: string;
  PASSWORD: string;
  AUTH_TOKEN: string;
  ALLOWED_ORIGIN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', async (c, next) => {

  // CORS middleware configuration
  const corsMiddleware = cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
    allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })

  // Apply CORS middleware to all routes to allow cross-origin requests
  return await corsMiddleware(c, next)
})

app.on('all', '/*', async (c, next) => {
  // Apply bearer token auth to all routes to protect them
  const applyAuth = bearerAuth({token: c.env.AUTH_TOKEN })
  return applyAuth(c, next);
})

app.post('/todos/sql/new', async (c) => {

  // Get the body data from the request
  const {id, title, description, is_completed } = await c.req.json()

  // Add to d1 database. Here we are using bind to prevent SQL injection
  const { success } = await c.env.DB.prepare(`
    INSERT INTO tasks (task_id, title, description, is_completed) values (?, ?, ?, ?);
  `).bind(id, title, description, is_completed).run()

  if (success) {
    return c.text('Task created')
  } else {
    return c.text('Task creation failed')
  }
})

app.get('/todos/sql/get-all', async (c) => {

  // Get all tasks from the database
  const tasks = await c.env.DB.prepare(`
    SELECT * FROM tasks;
  `).all()

  // return the tasks
  return c.json(tasks)
})

app.put('/todos/sql/update/:id', async (c) => {

  // get the todo id from the request
  const id = c.req.param('id')

  // Get the body data from the request
  const { title, description, is_completed } = await c.req.json()

  // Update the todo by id. We use bind to prevent SQL injection
  const { success } = await c.env.DB.prepare(`
    UPDATE tasks SET title = ?, description = ?, is_completed = ? WHERE task_id = ?;
  `).bind(title, description, is_completed, id).run()

  // return success message
  if (success) {
    return c.text('Task updated')
  } else {
    return c.text('Task update failed')
  }
})

app.post('/todos/new', async (c) => {

  // Get the body data from the request
  const {id, task, description, is_completed } = await c.req.json()
  
  // Pass the body data to object
  const newTodo: Todo = {
    id: id,
    task: task,
    description: description,
    is_completed: is_completed,
  }

  // Add to database
  await c.env.TODOKV.put(`todo:${newTodo.id}`, JSON.stringify(newTodo))

  // return success message
  return c.text('Todo created')
})

app.get('/todos', async (c) => {
  // Get all keys with prefix "todo:"
  const all_todos = await c.env.TODOKV.list({ prefix: "todo:" });
  const todos = [];

  // loop through keys and get the items
  for (let key of all_todos.keys) {

    // get the todo by key name
    const todo = await c.env.TODOKV.get(key.name);
    todos.push(todo);
  }

  // Since we are using JSON.stringify to save the todos, we need to parse them back to objects here to return as json
  const parsedtodos: Todo[] = todos.map((todo: string | null) => {
    if (todo) {
      // parse the todo
      return JSON.parse(todo);
    }

    // return null if todo is not found
    return null;
  });

  return c.json(parsedtodos)
})

app.get('/todos-faster', async (c) => {
   // Get all keys with prefix "todo:"
  const all_todos = await c.env.TODOKV.list({ prefix: "todo:" });

  // Map keys to promises of getting each todo item
  const todoPromises = all_todos.keys.map(key => c.env.TODOKV.get(key.name));

  // Wait for all promises to resolve
  const todos = await Promise.all(todoPromises);

  // Since we are using JSON.stringify to save the todos, we need to parse them back to objects here to return as json
  const parsedtodos: Todo[] = todos.map((todo: string | null) => {
    if (todo) {
      return JSON.parse(todo);
    }
    return null;
  });

  // Return todos in response
  return c.json(parsedtodos);
})

app.get('/todos/:id', async (c) => {
  // get the todo id from the request
  const id = c.req.param('id')

  // get the todo by id
  const todo = await c.env.TODOKV.get(id)

  // return the todo
  return c.json(todo)
})

app.delete('/delete/:id', async (c) => {
  // get the todo id from the request
  const id = c.req.param('id')

  // delete the todo by id
  await c.env.TODOKV.delete(id)

  // return success message
  return c.text('Todo deleted')
})

app.get('/', (c) => {
  return c.text('Welcome to Todo API')
})

app.delete('/todos/:id', async (c) => {
  // get the todo id from the request
  const id = c.req.param('id')

  // get all todos
  const todos = JSON.parse(await c.env.TODOKV.get('todos') || '[]') as Todo[]

  // remove the todo
  const updatedTodos = todos.filter((todo) => todo.id !== id)

  // save the updated todos
  await c.env.TODOKV.put('todos', JSON.stringify(updatedTodos))

  // return the updated todos
  return c.json(updatedTodos)
});

app.delete('/todos', async (c) => {
  // find all todos with the prefix "todo:"
  const allTodos = await c.env.TODOKV.list({ prefix: 'todo:' })

  // delete all todos
  await Promise.all(allTodos.keys.map((key) => c.env.TODOKV.delete(key.name)))

  return c.text('All todos deleted')
});


export default app
