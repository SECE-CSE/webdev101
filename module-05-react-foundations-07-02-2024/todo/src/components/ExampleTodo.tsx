import React, { useEffect, useState } from 'react';

type TodoKV = {
  id: string;
  task: string;
  description: string;
  is_completed: boolean;
};

export default function ExampleTodo() {

  /**
   * * This is a dummy token, you should never expose your token in the frontend. 
   * * IRL, you should store the token in a .env file and use process.env to access it
   */

  const auth_token =
    '13e20026d166d99418c737e0a65cb1482ea2e7f7de5fde9986bb4006c108edde';
  
  const [todos, setTodos] = useState<TodoKV[]>([]);

  useEffect(() => {
    fetch(`https://todoapi.spikeysanju.workers.dev/todos-faster`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .finally(() => console.log('finally api request completed'));
  }, []);

  return (
    <div>
      <h2>Todos List</h2>
      {todos.map((todo) => {
        return <div key={todo.id}>{todo.task}</div>;
      })}
    </div>
  );
}
