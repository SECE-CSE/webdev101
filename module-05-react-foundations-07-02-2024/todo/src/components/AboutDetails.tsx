import React from 'react'

interface AboutProps {
  title: string;
  ratings: number;
}

export default function AboutDetails({ title, ratings }: AboutProps) {
  return (
      <div>
            <h2>About details page</h2>
            <p>Title: {title}</p>
            <p>Ratings: {ratings}</p>
    </div>
  )
}
