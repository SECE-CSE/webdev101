import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    
    useEffect(() => { 
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .finally(() => console.log('Todos fetched'))
    }, [])    

  return (
    <div>
          <h1>Todo List</h1>
          
          {
              todos.map((todo) => (
                  <Link to={`/todo/${todo.id}`}>
                      <h3>{todo.title}</h3>
                      <p>{todo.completed}</p>
                  </Link>
              ))
          }
    </div>
  )
}
