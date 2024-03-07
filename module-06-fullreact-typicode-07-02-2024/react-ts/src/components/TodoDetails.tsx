import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}
export default function TodoDetails() {

    const { id } = useParams();
    const [todo, setTodo] = useState<Todo>()
    
    useEffect(() => { 
        fetch('https://jsonplaceholder.typicode.com/todos/' + id)
        .then((response) => response.json())
        .then((data) => setTodo(data))
        .finally(() => console.log('Todos fetched'))
    }, [id])  

    return (
    <div>
            <h1>Todo Details</h1>
            <div>
                <h3>{todo?.title}</h3>
                <p>{todo?.completed}</p>
            </div>
    </div>
  )
}
