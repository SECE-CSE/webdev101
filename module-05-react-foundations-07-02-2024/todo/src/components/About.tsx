import React, { useEffect, useState } from 'react';
import AboutDetails from './AboutDetails';
import { DashboardLayout } from './DashboardLayout';

interface AboutProps {
  title: string;
  ratings: number;
}

export default function About({ title, ratings }: AboutProps) {
  return (
    <div>
      <h2>About page</h2>

      <DashboardLayout>
        <AboutDetails title={title} ratings={ratings} />
      </DashboardLayout>
    </div>
  );
}
