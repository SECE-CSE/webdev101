// App.tsx
import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoDetail from './components/TodoDetail';
import About from './components/About';
import Counter from './components/Counter';
import ExampleTodo from './components/ExampleTodo';
import FoodDetails from './components/FoodDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto container items-center justify-center">
        <nav>
          <ul className="flex flow-row gap-3 underline text-blue-500">
            <li>
              <Link to="/">Todo List</Link>
            </li>
            <li>
              <Link to="/add">Add Todo</Link>
            </li>

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/exampletodo">Example todo</Link>
            </li>
            <li>
              <Link to="/food/20">Food list</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" Component={TodoList} />
          <Route path="/counter" Component={Counter} />
          <Route path="/add" Component={AddTodo} />
          <Route path="/exampletodo" Component={ExampleTodo} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/todo/:id" Component={TodoDetail} />
          <Route path="/food/:id" Component={FoodDetails} />
          <Route
            path="/about"
            element={<About title="Todo app is nice" ratings={5} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
