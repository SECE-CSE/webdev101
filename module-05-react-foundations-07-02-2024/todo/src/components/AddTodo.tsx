import React, { useState } from 'react'
import { Todo } from '../utils/utils';

export default function AddTodo() {

  // add todo form state using https://jsonplaceholder.typicode.com/todos
  const [todo, setTodo] = useState<Todo>({
    userId: 1,
    id: 1,
    title: '',
    completed: false,
  });


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
      .then((json) => console.log(json));
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='title'
            value={todo.title}
            onChange={(e) => {
              setTodo({
                ...todo,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </label>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

