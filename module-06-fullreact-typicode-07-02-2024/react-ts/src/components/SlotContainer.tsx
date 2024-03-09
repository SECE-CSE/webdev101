import React, { FC, ReactNode } from 'react';

interface SlotContainerProps {
  children: ReactNode;
}

export const SlotContainer: FC<SlotContainerProps> = ({ children }) => {
  return <div className='bg-red-50'>{children}</div>;
};


