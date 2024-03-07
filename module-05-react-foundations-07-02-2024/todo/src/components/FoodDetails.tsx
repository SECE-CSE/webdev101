import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function FoodDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + 'asdfasd',
      },
    })
      .then((response) => response.json())
      .then((json) => setPost(json))
      .finally(() => console.log('api call completed'));
  }, [id]);

  return (
    <div>
      <h1>Post details</h1>
      <div>
        <h2>{post?.title}</h2>
        <p>{post?.body}</p>
      </div>
    </div>
  );
}
