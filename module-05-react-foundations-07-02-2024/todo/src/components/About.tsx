import React, { useEffect, useState } from 'react';
import AboutDetails from './AboutDetails';
import { SlotContainer } from './SlotContainer';

interface AboutProps {
  title: string;
  ratings: number;
}

export default function About({ title, ratings }: AboutProps) {

  return (
    <div>
      <h2>About page</h2>

      <SlotContainer>
        <AboutDetails title={title} ratings={ratings} />
      </SlotContainer>
    </div>
  );
}
