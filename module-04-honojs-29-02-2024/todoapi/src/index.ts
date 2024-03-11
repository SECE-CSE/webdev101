import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth';
import { cors } from 'hono/cors'


type Todo = {
  id: string; // 1
  task: string; // "Buy milk"
  description: string; // "Buy 2% milk from the grocery store"
  is_completed: boolean; // false
  created_at: string; // "2021-08-01T12:00:00Z"
  updated_at: string; // "2021-08-01T12:00:00Z"
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


// All KV namespace routes
app.get('/', (c) => {
  return c.text('Welcome to Todo API')
})

// get all todos
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

// get all todos faster with map
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

// create a new todo
app.post('/todos/new', async (c) => {

  // Get the body data from the request
  const {id, task, description, is_completed } = await c.req.json()
  
  // Pass the body data to object
  const newTodo: Todo = {
    id: id,
    task: task,
    description: description,
    is_completed: is_completed,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Add to database
  await c.env.TODOKV.put(`todo:${newTodo.id}`, JSON.stringify(newTodo), {
  expirationTtl: 60 * 60 * 24 * 7, // 1 week
  })

  // return success message
  return c.text('Todo created')
})

// get a todo by id
app.get('/todos/:id', async (c) => {
  // get the todo id from the request
  const id = c.req.param('id')

  // get the todo by id
  const todo = await c.env.TODOKV.get(id)

  // return the todo
  return c.json(todo)
})
// update a todo by id
app.put('/todos/update/:id', async (c) => {
  // get the todo id from the request
  const id = c.req.param('id')

  // Get the body data from the request
  const { task, description, is_completed } = await c.req.json()

  // Get the todo by id
  const todo = await c.env.TODOKV.get(id)

  // Parse the todo
  const parsedTodo: Todo = JSON.parse(todo!)

  // Update the todo
  parsedTodo.task = task
  parsedTodo.description = description
  parsedTodo.is_completed = is_completed
  parsedTodo.updated_at = new Date().toISOString()

  // Save the updated todo
  await c.env.TODOKV.put(`todo:${parsedTodo.id}`, JSON.stringify(parsedTodo))

  // return success message
  return c.text('Todo updated')
})

// delete a todo by id
app.delete('/delete/:id', async (c) => {
  // get the todo id from the request
  const id = c.req.param('id')

  // delete the todo by id
  await c.env.TODOKV.delete(id)

  // return success message
  return c.text('Todo deleted')
})

// delete all todos
app.delete('/todos', async (c) => {
  // find all todos with the prefix "todo:"
  const allTodos = await c.env.TODOKV.list({ prefix: 'todo:' })

  // delete all todos
  await Promise.all(allTodos.keys.map((key) => c.env.TODOKV.delete(key.name)))

  return c.text('All todos deleted')
});


// d1 database routes (SQLite)

// get all todos from d1 database
app.get('/todos/sql/get-all', async (c) => {

  // Get all tasks from the database
  const tasks = await c.env.DB.prepare(`
    SELECT * FROM tasks;
  `).all()

  // return the tasks
  return c.json(tasks)
})


// create a new todo in d1 database
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

// get a todo by id from d1 database
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

// delete a todo by id from d1 database
app.delete('/todos/sql/delete/:id', async (c) => {
    // get the todo id from the request
    const id = c.req.param('id')
  
    // delete the todo by id
    const { success } = await c.env.DB.prepare(`
      DELETE FROM tasks WHERE task_id = ?;
    `).bind(id).run()
  
    // return success message
    if (success) {
      return c.text('Task deleted')
    } else {
      return c.text('Task deletion failed')
    }
})

// search todos by title from d1 database
app.get('/todos/sql/search', async (c) => {
  // get the title from the request
  const title = c.req.query('title')

  // search for todos by title
  const tasks = await c.env.DB.prepare(`
    SELECT * FROM tasks WHERE title LIKE ?;
  `).bind(`%${title}%`).all()

  // return the tasks
  return c.json(tasks)
})




export default app
