import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Food = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function FoodDetails() {
  const { food_id } = useParams();
  const [food, setFood] = useState<Food>();

  useEffect(() => {
    fetch(`http://localhost:5173/food/${food_id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .finally(() => {
        console.log('done');
      })
  }, [food_id]);

  return (
    <div>
      <h1>Food details</h1>
      <h1>{food_id}</h1>

      {food && (
        <div>
          <h1>{food.name}</h1>
          <p>{food.description}</p>
          <p>{food.price}</p>
        </div>
      )}
    </div>
  );
}
