| Operation           | Example Code                                     | Description                                     |
|---------------------|--------------------------------------------------|-------------------------------------------------|
| **Setup**           | `const express = require('express');`             | Imports Express                                |
|                     | `const app = express();`                          | Creates an Express app                         |
| **Listening**       | `app.listen(3000, () => console.log('Server running on port 3000'));` | Starts the server on a port |
| **GET Route**       | `app.get('/path', (req, res) => { res.send('Hello World!'); });` | Handles GET requests on a specific path |
| **POST Route**      | `app.post('/path', (req, res) => { res.send('Received data'); });` | Handles POST requests on a specific path |
| **PUT Route**       | `app.put('/path', (req, res) => { res.send('Updated data'); });` | Handles PUT requests on a specific path  |
| **DELETE Route**    | `app.delete('/path', (req, res) => { res.send('Deleted data'); });` | Handles DELETE requests on a specific path |
| **Route Parameters**| `app.get('/path/:param', (req, res) => { res.send(`Parameter: ${req.params.param}`); });` | Uses route parameters in a path |
| **Query Parameters**| `app.get('/path', (req, res) => { res.send(`Query: ${req.query.query}`); });` | Uses query parameters in the URL |
| **Middleware**      | `app.use((req, res, next) => { console.log('Request received'); next(); });` | Defines middleware functions |
| **Static Files**    | `app.use(express.static('public'));`              | Serves static files from the specified folder |
| **JSON Parsing**    | `app.use(express.json());`                        | Parses incoming JSON requests                 |
| **URL Encoding**    | `app.use(express.urlencoded({ extended: true }));` | Parses URL-encoded requests                  |
| **404 Handling**    | `app.use((req, res, next) => { res.status(404).send('Not Found'); });` | Handles 404 errors                           |
| **Error Handling**  | `app.use((err, req, res, next) => { res.status(500).send('Server error'); });` | Handles errors                               |
| **Redirect**        | `app.get('/old-path', (req, res) => { res.redirect('/new-path'); });` | Redirects requests to a different path     |
| **CORS**            | `const cors = require('cors');`                    | Imports the CORS package                       |
|                     | `app.use(cors());`                                 | Enables Cross-Origin Resource Sharing       |
| **Cookie Parsing**  | `const cookieParser = require('cookie-parser');`   | Imports the cookie-parser package              |
|                     | `app.use(cookieParser());`                         | Enables cookie parsing                      |
| **Sessions**        | `const session = require('express-session');`      | Imports the express-session package            |
|                     | `app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));` | Sets up sessions |
