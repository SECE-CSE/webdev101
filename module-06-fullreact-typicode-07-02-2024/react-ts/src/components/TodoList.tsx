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
    const [search, setSearch] = useState<string>('')
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
    const [hoveredTodo, setHoveredTodo] = useState<number | null>(null)
    
    useEffect(() => { 
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .finally(() => console.log('Todos fetched'))
    }, [])   
    

    useEffect(() => {
        const filteredTodos = todos.filter((todo) => {
            return todo.title.includes(search)
        })        
        setFilteredTodos(filteredTodos)
    }, [search])


    
 async function deleteTodo(id: number) {
      await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mysupertoken'
            }
        }).then(() => console.log('Todo deleted'))
 }
    

  
  return (
    <div>
          <h1>Todo List</h1>
          <input
              type="text"
              value={search}
              placeholder='Search somthing'
              onChange={(e) => setSearch(e.target.value)}
          />
          
          {
              search.length > 0 ?(
                  filteredTodos.map((todo) => (
                  <Link to={`/todo/${todo.id}`}>
                      <h3>{todo.title}</h3>
                      <p>{todo.completed}</p>
                  </Link>
              ))
              ) : (
                  todos.map((todo) => (
                      <Link to={`/todo/${todo.id}`}
                          className={`${hoveredTodo === todo.id ? 'scale-50' : ''}`}
                          onMouseEnter={() => setHoveredTodo(todo.id)}
                          onMouseLeave={() => setHoveredTodo(null)}>
                          <h3>{todo.title}</h3>
                          <p>{todo.completed}</p>

                          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </Link>
                  ))
              )
          }
    </div>
  )
}
