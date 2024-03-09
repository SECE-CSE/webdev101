import React from 'react';
import { Link } from 'react-router-dom';
import { Todo, cn } from '../utils/utils';
import useFetch from '../hooks/useFetch';

export default function TodoList() {

  const { data: todos, loading, error } = useFetch({
    url: 'https://jsonplaceholder.typicode.com/todos',
  });

  return (

    <div
      className={cn('mx-auto container items-center justify-center p-6 m-6')}
    >
      <div className="flex flex-row items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight">Todo List</h2>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {todos.map((todo: Todo) => (
            <li key={todo.id}>
              <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {error && <h2>Error: {error}</h2>}
    </div>
  );
}
