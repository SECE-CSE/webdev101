import React, { useState } from 'react'

type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}
export default function AddTodo() {


  const [todo, setTodo] = useState<Todo>()

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log('Todo created:', json));
  };

  const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ 'access_token'
      },
      body: JSON.stringify(todo)
    }).then(response => response.json())
      .finally(() => console.log('Todo created'));
      
  }

    return (
    <div>
        <h1>Add Todo</h1>

        <div>{JSON.stringify(todo)}</div>

        <form onSubmit={onSubmitData}>

          <input
            type='number'
            name='id'
            placeholder='Enter your id'
            value={todo?.id}
            onChange={(data) => {
              setTodo({
                ...todo!,
                id: Number(data.target.value),
              })
            }}
          />

          <input
            type='number'
            name='userId'
            placeholder='Enter your userId'
             value={todo?.userId}
            onChange={(data) => {
              setTodo({
                ...todo!,
                userId: Number(data.target.value),
              })
            }}
          />

          <input
            type='text'
            name='title'
            placeholder='Enter your title'
            value={todo?.title}
            onChange={(data) => {
              setTodo({
                ...todo!,
                title: data.target.value,
              })
            }}
          />

          <input type='checkbox'
            name='completed'
            placeholder='Enter your completed'
            onChange={(data) => {
              setTodo({
                ...todo!,
                completed: data.target.checked,
              })
            }}/>
          
          <button type='submit' >Create todo</button>
        </form>
    
        





        {/* <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='title'
            value={todo?.title}
            onChange={(e) => {
              setTodo({
                ...todo!,
                title: e.target.value,
              });
            }}
          />
        </label>
        <button type='submit'>Add</button>
        </form> */}
           
    </div>
  )
}
