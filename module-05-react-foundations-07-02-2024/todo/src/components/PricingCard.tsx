import React, { useState } from 'react';
import { cn } from '../utils/utils';

export default function PricingCard() {
  const [is_annual, setAnnual] = useState<boolean>(false);
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg shadow/50">
      {is_annual ? (
        <div className={`flex ${is_annual ? 'flex-row' : 'flex-col'}`}>
          <h1 className="line-through">$288/year</h1>
          <h1>$24/month</h1>
        </div>
      ) : (
        <h1>$24/month</h1>
      )}

      

      <h1
        className={cn(
          'font-bold line-through',
          is_annual ? 'text-4xl' : 'text-5xl', // text size
          is_annual ? 'text-red-500' : 'text-green-500', // text color
          is_annual ? 'line-through' : 'no-underline', // text decoration
        )}
      >
        {is_annual ? '$288/yr' : '$24/month'}
      </h1>

      <p>Everything's yours, unlimited use.</p>
      <input
        type="checkbox"
        onChange={(e) => {
          setAnnual(e.target.checked);
        }}
      />
    </div>
  );
}
