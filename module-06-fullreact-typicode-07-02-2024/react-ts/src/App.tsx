import './App.css'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';

function App() {
  return (
      <BrowserRouter>
      <nav>
        <ul>
          <Link to='/'>Todo List</Link>
        </ul>
        <ul>
          <Link to='/add'>Add Todo</Link>
        </ul>
      </nav>
      
      <Routes>
        <Route path='/' element={<TodoList/>} />
        <Route path='/todo/:id' element={<TodoDetails/>} />
        <Route path='/add' element={<h1>Add Todo</h1>} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
