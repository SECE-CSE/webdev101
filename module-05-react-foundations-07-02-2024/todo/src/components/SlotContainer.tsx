import React, { FC, ReactNode } from 'react';

interface SlotContainerProps {
  children: ReactNode;
}

export const SlotContainer: FC<SlotContainerProps> = ({ children }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {children}
    </div>
  );
};