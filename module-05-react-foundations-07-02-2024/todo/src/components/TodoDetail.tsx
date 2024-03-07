import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from '../utils/utils';

function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo>();
  const [loading, setLoading] = useState(true);

  // fetch api for todos based on id 
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setTodo(json);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching todo:', error);
        setLoading(false); // Handle errors by setting loading to false
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>Todo Detail</h2>
          <p>{todo?.title}</p>
          <p>{todo?.completed ? 'Completed' : 'Not Completed'}</p>
        </div>
      )}
    </div>
  );
}

export default TodoDetail;
